package com.smartlogix.envios.service;

import com.smartlogix.envios.model.Envio;
import com.smartlogix.envios.repository.EnvioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnvioService {

    @Autowired
    private EnvioRepository envioRepository;

    public List<Envio> obtenerTodos() {
        return envioRepository.findAll();
    }

    public Optional<Envio> obtenerPorId(Long id) {
        return envioRepository.findById(id);
    }

    public List<Envio> obtenerPorPedido(Long pedidoId) {
        return envioRepository.findByPedidoId(pedidoId);
    }

    public List<Envio> obtenerPorEstado(Envio.EstadoEnvio estado) {
        return envioRepository.findByEstadoEnvio(estado);
    }

    public Envio crear(Envio envio) {
        return envioRepository.save(envio);
    }

    public Optional<Envio> actualizar(Long id, Envio envioActualizado) {
        return envioRepository.findById(id).map(envio -> {
            envio.setTransportista(envioActualizado.getTransportista());
            envio.setDireccionDestino(envioActualizado.getDireccionDestino());
            envio.setCiudad(envioActualizado.getCiudad());
            envio.setRegion(envioActualizado.getRegion());
            envio.setEstadoEnvio(envioActualizado.getEstadoEnvio());
            envio.setFechaEstimada(envioActualizado.getFechaEstimada());
            return envioRepository.save(envio);
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