package com.smartlogix.inventario.service;

import com.smartlogix.inventario.dto.ProductoDTO;
import com.smartlogix.inventario.model.Producto;
import com.smartlogix.inventario.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    private String generarId() {
        String id;
        do {
            int num = (int) (Math.random() * 1_000_000);
            id = "PR" + String.format("%06d", num);
        } while (productoRepository.existsById(id));
        return id;
    }

    private ProductoDTO convertirADTO(Producto producto) {
        return new ProductoDTO(
            producto.getProductoId(),
            producto.getNombre(),
            producto.getDescripcion(),
            producto.getCategoria(),
            producto.getPrecio(),
            producto.getStock()
        );
    }

    public List<ProductoDTO> obtenerTodos() {
        return productoRepository.findAll().stream().map(this::convertirADTO).collect(Collectors.toList());
    }

    public Optional<ProductoDTO> obtenerPorId(String id) {
        return productoRepository.findById(id).map(this::convertirADTO);
    }

    public List<ProductoDTO> obtenerPorCategoria(String categoria) {
        return productoRepository.findByCategoria(categoria).stream().map(this::convertirADTO).collect(Collectors.toList());
    }

    public List<ProductoDTO> buscarPorNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre).stream().map(this::convertirADTO).collect(Collectors.toList());
    }

    public List<ProductoDTO> obtenerStockBajo(Integer limite) {
        return productoRepository.findByStockLessThanEqual(limite).stream().map(this::convertirADTO).collect(Collectors.toList());
    }

    public ProductoDTO crear(Producto producto) {
        producto.setProductoId(generarId());
        return convertirADTO(productoRepository.save(producto));
    }

    public Optional<ProductoDTO> actualizar(String id, Producto productoActualizado) {
        return productoRepository.findById(id).map(producto -> {
            producto.setNombre(productoActualizado.getNombre());
            producto.setDescripcion(productoActualizado.getDescripcion());
            producto.setCategoria(productoActualizado.getCategoria());
            producto.setPrecio(productoActualizado.getPrecio());
            producto.setStock(productoActualizado.getStock());
            return convertirADTO(productoRepository.save(producto));
        });
    }

    public Optional<ProductoDTO> descontarStock(String id, Integer cantidad) {
        return productoRepository.findById(id).map(producto -> {
            if (producto.getStock() < cantidad) {
                throw new RuntimeException("Stock insuficiente. Stock actual: " + producto.getStock());
            }
            producto.setStock(producto.getStock() - cantidad);
            return convertirADTO(productoRepository.save(producto));
        });
    }

    public boolean eliminar(String id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
