package com.smartlogix.inventario;

import com.smartlogix.inventario.dto.ProductoDTO;
import com.smartlogix.inventario.model.Producto;
import com.smartlogix.inventario.repository.ProductoRepository;
import com.smartlogix.inventario.service.ProductoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InventarioServiceApplicationTests {

    @Mock
    private ProductoRepository productoRepository;

    @InjectMocks
    private ProductoService productoService;

    private Producto producto;
    private Producto producto2;

    @BeforeEach
    void setUp() {
        producto = new Producto();
        producto.setProductoId(1L);
        producto.setNombre("Zapatillas Nike");
        producto.setCategoria("Calzado");
        producto.setPrecio(59990.0);
        producto.setStock(45);

        producto2 = new Producto();
        producto2.setProductoId(2L);
        producto2.setNombre("Polera Adidas");
        producto2.setCategoria("Ropa");
        producto2.setPrecio(24990.0);
        producto2.setStock(3);
    }

    @Test
    void obtenerTodos_debeRetornarListaDeProductos() {
        when(productoRepository.findAll()).thenReturn(Arrays.asList(producto, producto2));
        List<ProductoDTO> resultado = productoService.obtenerTodos();
        assertEquals(2, resultado.size());
    }

    @Test
    void obtenerTodos_debeRetornarListaVacia_cuandoNoHayProductos() {
        when(productoRepository.findAll()).thenReturn(Collections.emptyList());
        List<ProductoDTO> resultado = productoService.obtenerTodos();
        assertTrue(resultado.isEmpty());
    }

    @Test
    void obtenerPorId_debeRetornarProducto_cuandoExiste() {
        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto));
        Optional<ProductoDTO> resultado = productoService.obtenerPorId(1L);
        assertTrue(resultado.isPresent());
        assertEquals("Zapatillas Nike", resultado.get().getNombre());
    }

    @Test
    void obtenerPorId_debeRetornarVacio_cuandoNoExiste() {
        when(productoRepository.findById(99L)).thenReturn(Optional.empty());
        Optional<ProductoDTO> resultado = productoService.obtenerPorId(99L);
        assertFalse(resultado.isPresent());
    }

    @Test
    void crear_debeGuardarYRetornarProductoDTO() {
        when(productoRepository.save(producto)).thenReturn(producto);
        ProductoDTO resultado = productoService.crear(producto);
        assertNotNull(resultado);
        assertEquals("Zapatillas Nike", resultado.getNombre());
        verify(productoRepository, times(1)).save(producto);
    }

    @Test
    void crear_debeRetornarProductoConPrecioCorrector() {
        when(productoRepository.save(producto)).thenReturn(producto);
        ProductoDTO resultado = productoService.crear(producto);
        assertEquals(59990.0, resultado.getPrecio());
    }

    @Test
    void actualizar_debeModificarProducto_cuandoExiste() {
        Producto actualizado = new Producto();
        actualizado.setNombre("Zapatillas Nike Air");
        actualizado.setCategoria("Calzado");
        actualizado.setPrecio(69990.0);
        actualizado.setStock(30);

        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto));
        when(productoRepository.save(any(Producto.class))).thenReturn(producto);

        Optional<ProductoDTO> resultado = productoService.actualizar(1L, actualizado);
        assertTrue(resultado.isPresent());
        verify(productoRepository, times(1)).save(any(Producto.class));
    }

    @Test
    void actualizar_debeRetornarVacio_cuandoNoExiste() {
        when(productoRepository.findById(99L)).thenReturn(Optional.empty());
        Optional<ProductoDTO> resultado = productoService.actualizar(99L, producto);
        assertFalse(resultado.isPresent());
    }

    @Test
    void eliminar_debeRetornarTrue_cuandoExiste() {
        when(productoRepository.existsById(1L)).thenReturn(true);
        boolean resultado = productoService.eliminar(1L);
        assertTrue(resultado);
        verify(productoRepository, times(1)).deleteById(1L);
    }

    @Test
    void eliminar_debeRetornarFalse_cuandoNoExiste() {
        when(productoRepository.existsById(99L)).thenReturn(false);
        boolean resultado = productoService.eliminar(99L);
        assertFalse(resultado);
        verify(productoRepository, never()).deleteById(99L);
    }
}
