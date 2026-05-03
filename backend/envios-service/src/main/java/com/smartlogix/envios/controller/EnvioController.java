package com.smartlogix.envios.controller;

import com.smartlogix.envios.model.Envio;
import com.smartlogix.envios.service.EnvioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/envios")
public class EnvioController {

    @Autowired
    private EnvioService envioService;

    @GetMapping
    public List<Envio> obtenerTodos() {
        return envioService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Envio> obtenerPorId(@PathVariable Long id) {
        return envioService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/pedido/{pedidoId}")
    public List<Envio> obtenerPorPedido(@PathVariable Long pedidoId) {
        return envioService.obtenerPorPedido(pedidoId);
    }

    @GetMapping("/estado/{estado}")
    public List<Envio> obtenerPorEstado(@PathVariable Envio.EstadoEnvio estado) {
        return envioService.obtenerPorEstado(estado);
    }

    @PostMapping
    public Envio crear(@Valid @RequestBody Envio envio) {
        return envioService.crear(envio);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Envio> actualizar(@PathVariable Long id, @Valid @RequestBody Envio envio) {
        return envioService.actualizar(id, envio)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (envioService.eliminar(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}