package com.smartlogix.envios.service;

import com.smartlogix.envios.dto.EnvioDTO;
import com.smartlogix.envios.model.Envio;
import com.smartlogix.envios.repository.EnvioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EnvioService {

    @Autowired
    private EnvioRepository envioRepository;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String PEDIDOS_URL = "http://pedidos-service:8002/api/pedidos";

    private String generarId() {
        String id;
        do {
            int num = (int) (Math.random() * 1_000_000);
            id = "EN" + String.format("%06d", num);
        } while (envioRepository.existsById(id));
        return id;
    }

    private EnvioDTO convertirADTO(Envio envio) {
        return new EnvioDTO(
            envio.getEnvioId(),
            envio.getPedidoId(),
            envio.getTransportista(),
            envio.getDireccionDestino(),
            envio.getCiudad(),
            envio.getRegion(),
            envio.getEstadoEnvio().name(),
            envio.getFechaEstimada()
        );
    }

    private void sincronizarEstadoPedido(String pedidoId, Envio.EstadoEnvio estadoEnvio) {
        try {
            String estadoPedido = switch (estadoEnvio) {
                case EN_CAMINO -> "ENVIADO";
                case ENTREGADO -> "ENTREGADO";
                case FALLIDO -> "CANCELADO";
                default -> null;
            };
            if (estadoPedido != null) {
                String url = PEDIDOS_URL + "/" + pedidoId + "/estado?estado=" + estadoPedido;
                restTemplate.patchForObject(url, null, Void.class);
            }
        } catch (Exception e) {
            System.out.println("No se pudo sincronizar estado del pedido: " + e.getMessage());
        }
    }

    public List<EnvioDTO> obtenerTodos() {
        return envioRepository.findAll().stream().map(this::convertirADTO).collect(Collectors.toList());
    }

    public Optional<EnvioDTO> obtenerPorId(String id) {
        return envioRepository.findById(id).map(this::convertirADTO);
    }

    public List<EnvioDTO> obtenerPorPedido(String pedidoId) {
        return envioRepository.findByPedidoId(pedidoId).stream().map(this::convertirADTO).collect(Collectors.toList());
    }

    public List<EnvioDTO> obtenerPorEstado(Envio.EstadoEnvio estado) {
        return envioRepository.findByEstadoEnvio(estado).stream().map(this::convertirADTO).collect(Collectors.toList());
    }

    public EnvioDTO crear(Envio envio) {
        if (envioRepository.existsByPedidoId(envio.getPedidoId())) {
            throw new RuntimeException("El pedido " + envio.getPedidoId() + " ya tiene un envío asignado.");
        }
        envio.setEnvioId(generarId());
        EnvioDTO dto = convertirADTO(envioRepository.save(envio));
        sincronizarEstadoPedido(envio.getPedidoId(), envio.getEstadoEnvio());
        return dto;
    }

    public Optional<EnvioDTO> actualizar(String id, Envio envioActualizado) {
        return envioRepository.findById(id).map(envio -> {
            envio.setTransportista(envioActualizado.getTransportista());
            envio.setDireccionDestino(envioActualizado.getDireccionDestino());
            envio.setCiudad(envioActualizado.getCiudad());
            envio.setRegion(envioActualizado.getRegion());
            envio.setEstadoEnvio(envioActualizado.getEstadoEnvio());
            envio.setFechaEstimada(envioActualizado.getFechaEstimada());
            EnvioDTO dto = convertirADTO(envioRepository.save(envio));
            sincronizarEstadoPedido(envio.getPedidoId(), envio.getEstadoEnvio());
            return dto;
        });
    }

    public boolean eliminar(String id) {
        if (envioRepository.existsById(id)) {
            envioRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
