package com.smartlogix.envios.service;

import com.smartlogix.envios.dto.EnvioDTO;
import com.smartlogix.envios.model.Envio;
import com.smartlogix.envios.repository.EnvioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EnvioService {

    @Autowired
    private EnvioRepository envioRepository;

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

    public List<EnvioDTO> obtenerTodos() {
        return envioRepository.findAll().stream().map(this::convertirADTO).collect(Collectors.toList());
    }

    public Optional<EnvioDTO> obtenerPorId(Long id) {
        return envioRepository.findById(id).map(this::convertirADTO);
    }

    public List<EnvioDTO> obtenerPorPedido(Long pedidoId) {
        return envioRepository.findByPedidoId(pedidoId).stream().map(this::convertirADTO).collect(Collectors.toList());
    }

    public List<EnvioDTO> obtenerPorEstado(Envio.EstadoEnvio estado) {
        return envioRepository.findByEstadoEnvio(estado).stream().map(this::convertirADTO).collect(Collectors.toList());
    }

    public EnvioDTO crear(Envio envio) {
        return convertirADTO(envioRepository.save(envio));
    }

    public Optional<EnvioDTO> actualizar(Long id, Envio envioActualizado) {
        return envioRepository.findById(id).map(envio -> {
            envio.setTransportista(envioActualizado.getTransportista());
            envio.setDireccionDestino(envioActualizado.getDireccionDestino());
            envio.setCiudad(envioActualizado.getCiudad());
            envio.setRegion(envioActualizado.getRegion());
            envio.setEstadoEnvio(envioActualizado.getEstadoEnvio());
            envio.setFechaEstimada(envioActualizado.getFechaEstimada());
            return convertirADTO(envioRepository.save(envio));
        });
    }

    public boolean eliminar(Long id) {
        if (envioRepository.existsById(id)) {
            envioRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
