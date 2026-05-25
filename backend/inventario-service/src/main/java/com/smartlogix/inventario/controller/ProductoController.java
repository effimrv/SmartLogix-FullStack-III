package com.smartlogix.inventario.controller;

import com.smartlogix.inventario.dto.ProductoDTO;
import com.smartlogix.inventario.model.Producto;
import com.smartlogix.inventario.service.ProductoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventario")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping
    public List<ProductoDTO> obtenerTodos() {
        return productoService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> obtenerPorId(@PathVariable String id) {
        return productoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/categoria/{categoria}")
    public List<ProductoDTO> obtenerPorCategoria(@PathVariable String categoria) {
        return productoService.obtenerPorCategoria(categoria);
    }

    @GetMapping("/buscar")
    public List<ProductoDTO> buscarPorNombre(@RequestParam String nombre) {
        return productoService.buscarPorNombre(nombre);
    }

    @GetMapping("/stock-bajo")
    public List<ProductoDTO> obtenerStockBajo(@RequestParam(defaultValue = "5") Integer limite) {
        return productoService.obtenerStockBajo(limite);
    }

    @PostMapping
    public ProductoDTO crear(@Valid @RequestBody Producto producto) {
        return productoService.crear(producto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> actualizar(@PathVariable String id, @Valid @RequestBody Producto producto) {
        return productoService.actualizar(id, producto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/descontar")
    public ResponseEntity<ProductoDTO> descontarStock(@PathVariable String id, @RequestParam Integer cantidad) {
        try {
            return productoService.descontarStock(id, cantidad)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        if (productoService.eliminar(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
