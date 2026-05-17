package com.smartlogix.pedidos;

import com.smartlogix.pedidos.dto.PedidoDTO;
import com.smartlogix.pedidos.model.Pedido;
import com.smartlogix.pedidos.repository.PedidoRepository;
import com.smartlogix.pedidos.service.PedidoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PedidosServiceApplicationTests {

    @Mock
    private PedidoRepository pedidoRepository;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private PedidoService pedidoService;

    private Pedido pedido;
    private Pedido pedido2;

    @BeforeEach
    void setUp() {
        pedido = new Pedido();
        pedido.setPedidoId(1L);
        pedido.setClienteId(1L);
        pedido.setProductoId(1L);
        pedido.setCantidad(2);
        pedido.setTotal(119980.0);
        pedido.setEstadoPedido(Pedido.EstadoPedido.PENDIENTE);
        pedido.setFechaPedido(LocalDate.now());

        pedido2 = new Pedido();
        pedido2.setPedidoId(2L);
        pedido2.setClienteId(2L);
        pedido2.setProductoId(2L);
        pedido2.setCantidad(1);
        pedido2.setTotal(59990.0);
        pedido2.setEstadoPedido(Pedido.EstadoPedido.ENVIADO);
        pedido2.setFechaPedido(LocalDate.now());
    }

    @Test
    void obtenerTodos_debeRetornarListaDePedidos() {
        when(pedidoRepository.findAll()).thenReturn(Arrays.asList(pedido, pedido2));
        List<PedidoDTO> resultado = pedidoService.obtenerTodos();
        assertEquals(2, resultado.size());
    }

    @Test
    void obtenerTodos_debeRetornarListaVacia_cuandoNoHayPedidos() {
        when(pedidoRepository.findAll()).thenReturn(Collections.emptyList());
        List<PedidoDTO> resultado = pedidoService.obtenerTodos();
        assertTrue(resultado.isEmpty());
    }

    @Test
    void obtenerPorId_debeRetornarPedido_cuandoExiste() {
        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));
        Optional<PedidoDTO> resultado = pedidoService.obtenerPorId(1L);
        assertTrue(resultado.isPresent());
        assertEquals(1L, resultado.get().getClienteId());
    }

    @Test
    void obtenerPorId_debeRetornarVacio_cuandoNoExiste() {
        when(pedidoRepository.findById(99L)).thenReturn(Optional.empty());
        Optional<PedidoDTO> resultado = pedidoService.obtenerPorId(99L);
        assertFalse(resultado.isPresent());
    }

    @Test
    void crear_debeGuardarYRetornarPedidoDTO() {
        doNothing().when(restTemplate).put(anyString(), any());
        when(pedidoRepository.save(pedido)).thenReturn(pedido);
        PedidoDTO resultado = pedidoService.crear(pedido);
        assertNotNull(resultado);
        assertEquals(119980.0, resultado.getTotal());
        verify(pedidoRepository, times(1)).save(pedido);
    }

    @Test
    void crear_debeRetornarPedidoConEstadoPendiente() {
        doNothing().when(restTemplate).put(anyString(), any());
        when(pedidoRepository.save(pedido)).thenReturn(pedido);
        PedidoDTO resultado = pedidoService.crear(pedido);
        assertEquals("PENDIENTE", resultado.getEstadoPedido());
    }

    @Test
    void obtenerPorCliente_debeRetornarPedidosDelCliente() {
        when(pedidoRepository.findByClienteId(1L)).thenReturn(Arrays.asList(pedido));
        List<PedidoDTO> resultado = pedidoService.obtenerPorCliente(1L);
        assertEquals(1, resultado.size());
        assertEquals(1L, resultado.get(0).getClienteId());
    }

    @Test
    void actualizar_debeModificarPedido_cuandoExiste() {
        Pedido actualizado = new Pedido();
        actualizado.setCantidad(3);
        actualizado.setTotal(179970.0);
        actualizado.setEstadoPedido(Pedido.EstadoPedido.EN_PROCESO);

        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));
        when(pedidoRepository.save(any(Pedido.class))).thenReturn(pedido);

        Optional<PedidoDTO> resultado = pedidoService.actualizar(1L, actualizado);
        assertTrue(resultado.isPresent());
        verify(pedidoRepository, times(1)).save(any(Pedido.class));
    }

    @Test
    void eliminar_debeRetornarTrue_cuandoExiste() {
        when(pedidoRepository.existsById(1L)).thenReturn(true);
        boolean resultado = pedidoService.eliminar(1L);
        assertTrue(resultado);
        verify(pedidoRepository, times(1)).deleteById(1L);
    }

    @Test
    void eliminar_debeRetornarFalse_cuandoNoExiste() {
        when(pedidoRepository.existsById(99L)).thenReturn(false);
        boolean resultado = pedidoService.eliminar(99L);
        assertFalse(resultado);
        verify(pedidoRepository, never()).deleteById(99L);
    }
}
