package com.smartlogix.envios.controller;

import com.smartlogix.envios.dto.EnvioDTO;
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
    public List<EnvioDTO> obtenerTodos() {
        return envioService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnvioDTO> obtenerPorId(@PathVariable String id) {
        return envioService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/pedido/{pedidoId}")
    public List<EnvioDTO> obtenerPorPedido(@PathVariable String pedidoId) {
        return envioService.obtenerPorPedido(pedidoId);
    }

    @GetMapping("/estado/{estado}")
    public List<EnvioDTO> obtenerPorEstado(@PathVariable Envio.EstadoEnvio estado) {
        return envioService.obtenerPorEstado(estado);
    }

    @PostMapping
    public ResponseEntity<EnvioDTO> crear(@Valid @RequestBody Envio envio) {
        try {
            return ResponseEntity.ok(envioService.crear(envio));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnvioDTO> actualizar(@PathVariable String id, @Valid @RequestBody Envio envio) {
        return envioService.actualizar(id, envio)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        if (envioService.eliminar(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
