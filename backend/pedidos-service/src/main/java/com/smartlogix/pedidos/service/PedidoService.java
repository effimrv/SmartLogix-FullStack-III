package com.smartlogix.pedidos.service;

import com.smartlogix.pedidos.dto.DetallePedidoDTO;
import com.smartlogix.pedidos.dto.PedidoDTO;
import com.smartlogix.pedidos.dto.PedidoRequest;
import com.smartlogix.pedidos.model.DetallePedido;
import com.smartlogix.pedidos.model.Pedido;
import com.smartlogix.pedidos.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private RestTemplate restTemplate;

    private final String INVENTARIO_URL = "http://inventario-service:8001/api/inventario";
    private final String ENVIOS_URL = "http://envios-service:8003/api/envios";

    private String generarId() {
        String id;
        do {
            int num = (int) (Math.random() * 1_000_000);
            id = "PE" + String.format("%06d", num);
        } while (pedidoRepository.existsById(id));
        return id;
    }

    private PedidoDTO convertirADTO(Pedido pedido) {
        List<DetallePedidoDTO> detallesDTO = pedido.getDetalles().stream()
            .map(d -> new DetallePedidoDTO(d.getDetalleId(), d.getProductoId(), d.getCantidad(), d.getPrecioUnitario()))
            .collect(Collectors.toList());
        return new PedidoDTO(
            pedido.getPedidoId(),
            pedido.getClienteId(),
            pedido.getTotal(),
            pedido.getEstadoPedido().name(),
            pedido.getFechaPedido(),
            detallesDTO
        );
    }

    private void autoCrearEnvio(String pedidoId) {
        try {
            Map<String, Object> body = new HashMap<>();
            body.put("pedidoId", pedidoId);
            body.put("transportista", "Por asignar");
            body.put("direccionDestino", "Por asignar");
            body.put("estadoEnvio", "EN_CAMINO");
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            restTemplate.postForObject(ENVIOS_URL, new HttpEntity<>(body, headers), Object.class);
        } catch (Exception e) {
            System.out.println("No se pudo crear envío automático: " + e.getMessage());
        }
    }

    public List<PedidoDTO> obtenerTodos() {
        return pedidoRepository.findAll().stream()
            .map(this::convertirADTO)
            .collect(Collectors.toList());
    }

    public Optional<PedidoDTO> obtenerPorId(String id) {
        return pedidoRepository.findById(id).map(this::convertirADTO);
    }

    public List<PedidoDTO> obtenerPorCliente(String clienteId) {
        return pedidoRepository.findByClienteId(clienteId).stream()
            .map(this::convertirADTO)
            .collect(Collectors.toList());
    }

    public List<PedidoDTO> obtenerPorEstado(Pedido.EstadoPedido estado) {
        return pedidoRepository.findByEstadoPedido(estado).stream()
            .map(this::convertirADTO)
            .collect(Collectors.toList());
    }

    public PedidoDTO crear(PedidoRequest request) {
        if (request.getDetalles() == null || request.getDetalles().isEmpty()) {
            throw new RuntimeException("El pedido debe tener al menos un producto.");
        }

        List<DetallePedido> detalles = new ArrayList<>();
        double total = 0.0;

        for (PedidoRequest.DetalleRequest dr : request.getDetalles()) {
            try {
                restTemplate.put(INVENTARIO_URL + "/" + dr.getProductoId() + "/descontar?cantidad=" + dr.getCantidad(), null);
            } catch (Exception e) {
                throw new RuntimeException("Stock insuficiente o producto no encontrado (ID: " + dr.getProductoId() + ").");
            }
            DetallePedido detalle = new DetallePedido();
            detalle.setProductoId(dr.getProductoId());
            detalle.setCantidad(dr.getCantidad());
            detalle.setPrecioUnitario(dr.getPrecioUnitario());
            detalles.add(detalle);
            total += dr.getPrecioUnitario() * dr.getCantidad();
        }

        Pedido pedido = new Pedido();
        pedido.setPedidoId(generarId());
        pedido.setClienteId(request.getClienteId());
        pedido.setFechaPedido(request.getFechaPedido() != null ? request.getFechaPedido() : LocalDate.now());
        pedido.setEstadoPedido(Pedido.EstadoPedido.PENDIENTE);
        pedido.setDetalles(detalles);
        pedido.setTotal(Math.round(total * 100.0) / 100.0);

        return convertirADTO(pedidoRepository.save(pedido));
    }

    public Optional<PedidoDTO> actualizar(String id, PedidoRequest request) {
        return pedidoRepository.findById(id).map(pedido -> {
            boolean cambiaAEnviado = false;
            if (request.getEstadoPedido() != null) {
                Pedido.EstadoPedido nuevoEstado = Pedido.EstadoPedido.valueOf(request.getEstadoPedido());
                if (nuevoEstado == Pedido.EstadoPedido.ENVIADO && pedido.getEstadoPedido() != Pedido.EstadoPedido.ENVIADO) {
                    cambiaAEnviado = true;
                }
                pedido.setEstadoPedido(nuevoEstado);
            }
            if (request.getFechaPedido() != null) {
                pedido.setFechaPedido(request.getFechaPedido());
            }
            PedidoDTO dto = convertirADTO(pedidoRepository.save(pedido));
            if (cambiaAEnviado) {
                autoCrearEnvio(pedido.getPedidoId());
            }
            return dto;
        });
    }

    public Optional<PedidoDTO> actualizarEstado(String id, String estado) {
        return pedidoRepository.findById(id).map(pedido -> {
            Pedido.EstadoPedido nuevoEstado = Pedido.EstadoPedido.valueOf(estado);
            boolean cambiaAEnviado = nuevoEstado == Pedido.EstadoPedido.ENVIADO
                && pedido.getEstadoPedido() != Pedido.EstadoPedido.ENVIADO;
            pedido.setEstadoPedido(nuevoEstado);
            PedidoDTO dto = convertirADTO(pedidoRepository.save(pedido));
            if (cambiaAEnviado) {
                autoCrearEnvio(pedido.getPedidoId());
            }
            return dto;
        });
    }

    public boolean eliminar(String id) {
        if (pedidoRepository.existsById(id)) {
            pedidoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
