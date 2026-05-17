package com.smartlogix.pedidos.service;

import com.smartlogix.pedidos.dto.PedidoDTO;
import com.smartlogix.pedidos.model.Pedido;
import com.smartlogix.pedidos.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String INVENTARIO_URL = "http://inventario-service:8001/api/inventario";

    private PedidoDTO convertirADTO(Pedido pedido) {
        return new PedidoDTO(
            pedido.getPedidoId(),
            pedido.getUsuarioId(),
            pedido.getProductoId(),
            pedido.getCantidad(),
            pedido.getTotal(),
            pedido.getEstadoPedido().name(),
            pedido.getFechaPedido()
        );
    }

    public List<PedidoDTO> obtenerTodos() {
        return pedidoRepository.findAll().stream().map(this::convertirADTO).collect(Collectors.toList());
    }

    public Optional<PedidoDTO> obtenerPorId(Long id) {
        return pedidoRepository.findById(id).map(this::convertirADTO);
    }

    public List<PedidoDTO> obtenerPorUsuario(Long usuarioId) {
        return pedidoRepository.findByUsuarioId(usuarioId).stream().map(this::convertirADTO).collect(Collectors.toList());
    }

    public List<PedidoDTO> obtenerPorEstado(Pedido.EstadoPedido estado) {
        return pedidoRepository.findByEstadoPedido(estado).stream().map(this::convertirADTO).collect(Collectors.toList());
    }

    public PedidoDTO crear(Pedido pedido) {
        try {
            String url = INVENTARIO_URL + "/" + pedido.getProductoId() + "/descontar?cantidad=" + pedido.getCantidad();
            restTemplate.put(url, null);
        } catch (Exception e) {
            throw new RuntimeException("Stock insuficiente o producto no encontrado.");
        }
        return convertirADTO(pedidoRepository.save(pedido));
    }

    public Optional<PedidoDTO> actualizar(Long id, Pedido pedidoActualizado) {
        return pedidoRepository.findById(id).map(pedido -> {
            pedido.setCantidad(pedidoActualizado.getCantidad());
            pedido.setTotal(pedidoActualizado.getTotal());
            pedido.setEstadoPedido(pedidoActualizado.getEstadoPedido());
            return convertirADTO(pedidoRepository.save(pedido));
        });
    }

    public boolean eliminar(Long id) {
        if (pedidoRepository.existsById(id)) {
            pedidoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
