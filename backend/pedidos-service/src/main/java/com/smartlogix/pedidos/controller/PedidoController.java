package com.smartlogix.pedidos.controller;

import com.smartlogix.pedidos.dto.PedidoDTO;
import com.smartlogix.pedidos.dto.PedidoRequest;
import com.smartlogix.pedidos.model.Pedido;
import com.smartlogix.pedidos.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public List<PedidoDTO> obtenerTodos() {
        return pedidoService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoDTO> obtenerPorId(@PathVariable String id) {
        Optional<PedidoDTO> resultado = pedidoService.obtenerPorId(id);
        if (resultado.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(resultado.get());
    }

    @GetMapping("/cliente/{clienteId}")
    public List<PedidoDTO> obtenerPorCliente(@PathVariable String clienteId) {
        return pedidoService.obtenerPorCliente(clienteId);
    }

    @GetMapping("/estado/{estado}")
    public List<PedidoDTO> obtenerPorEstado(@PathVariable Pedido.EstadoPedido estado) {
        return pedidoService.obtenerPorEstado(estado);
    }

    @PostMapping
    public ResponseEntity<PedidoDTO> crear(@RequestBody PedidoRequest pedidoRequest) {
        return ResponseEntity.ok(pedidoService.crear(pedidoRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PedidoDTO> actualizar(@PathVariable String id, @RequestBody PedidoRequest pedidoRequest) {
        Optional<PedidoDTO> resultado = pedidoService.actualizar(id, pedidoRequest);
        if (resultado.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(resultado.get());
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<PedidoDTO> actualizarEstado(@PathVariable String id, @RequestParam String estado) {
        Optional<PedidoDTO> resultado = pedidoService.actualizarEstado(id, estado);
        if (resultado.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(resultado.get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        if (pedidoService.eliminar(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
