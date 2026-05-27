package com.smartlogix.pedidos;

import com.smartlogix.pedidos.dto.PedidoDTO;
import com.smartlogix.pedidos.dto.PedidoRequest;
import com.smartlogix.pedidos.model.DetallePedido;
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
import java.util.ArrayList;
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
        DetallePedido detalle1 = new DetallePedido();
        detalle1.setDetalleId(1L);
        detalle1.setProductoId("PR000001");
        detalle1.setCantidad(2);
        detalle1.setPrecioUnitario(59990.0);

        pedido = new Pedido();
        pedido.setPedidoId("PE000001");
        pedido.setClienteId("US000001");
        pedido.setTotal(119980.0);
        pedido.setEstadoPedido(Pedido.EstadoPedido.PENDIENTE);
        pedido.setFechaPedido(LocalDate.now());
        pedido.setDetalles(new ArrayList<>(Arrays.asList(detalle1)));

        DetallePedido detalle2 = new DetallePedido();
        detalle2.setDetalleId(2L);
        detalle2.setProductoId("PR000002");
        detalle2.setCantidad(1);
        detalle2.setPrecioUnitario(59990.0);

        pedido2 = new Pedido();
        pedido2.setPedidoId("PE000002");
        pedido2.setClienteId("US000002");
        pedido2.setTotal(59990.0);
        pedido2.setEstadoPedido(Pedido.EstadoPedido.ENVIADO);
        pedido2.setFechaPedido(LocalDate.now());
        pedido2.setDetalles(new ArrayList<>(Arrays.asList(detalle2)));
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
        when(pedidoRepository.findById("PE000001")).thenReturn(Optional.of(pedido));
        Optional<PedidoDTO> resultado = pedidoService.obtenerPorId("PE000001");
        assertTrue(resultado.isPresent());
        assertEquals("US000001", resultado.get().getClienteId());
    }

    @Test
    void obtenerPorId_debeRetornarVacio_cuandoNoExiste() {
        when(pedidoRepository.findById("PE999999")).thenReturn(Optional.empty());
        Optional<PedidoDTO> resultado = pedidoService.obtenerPorId("PE999999");
        assertFalse(resultado.isPresent());
    }

    @Test
    void crear_debeGuardarYRetornarPedidoDTO() {
        PedidoRequest request = new PedidoRequest();
        request.setClienteId("US000001");
        request.setFechaPedido(LocalDate.now());
        PedidoRequest.DetalleRequest dr = new PedidoRequest.DetalleRequest();
        dr.setProductoId("PR000001");
        dr.setCantidad(2);
        dr.setPrecioUnitario(59990.0);
        request.setDetalles(new ArrayList<>(Arrays.asList(dr)));

        doNothing().when(restTemplate).put(anyString(), any());
        when(pedidoRepository.existsById(anyString())).thenReturn(false);
        when(pedidoRepository.save(any(Pedido.class))).thenReturn(pedido);

        PedidoDTO resultado = pedidoService.crear(request);
        assertNotNull(resultado);
        assertEquals(119980.0, resultado.getTotal());
        verify(pedidoRepository, times(1)).save(any(Pedido.class));
    }

    @Test
    void crear_debeRetornarPedidoConEstadoPendiente() {
        PedidoRequest request = new PedidoRequest();
        request.setClienteId("US000001");
        request.setFechaPedido(LocalDate.now());
        PedidoRequest.DetalleRequest dr = new PedidoRequest.DetalleRequest();
        dr.setProductoId("PR000001");
        dr.setCantidad(2);
        dr.setPrecioUnitario(59990.0);
        request.setDetalles(new ArrayList<>(Arrays.asList(dr)));

        doNothing().when(restTemplate).put(anyString(), any());
        when(pedidoRepository.existsById(anyString())).thenReturn(false);
        when(pedidoRepository.save(any(Pedido.class))).thenReturn(pedido);

        PedidoDTO resultado = pedidoService.crear(request);
        assertEquals("PENDIENTE", resultado.getEstadoPedido());
    }

    @Test
    void obtenerPorCliente_debeRetornarPedidosDelCliente() {
        when(pedidoRepository.findByClienteId("US000001")).thenReturn(Arrays.asList(pedido));
        List<PedidoDTO> resultado = pedidoService.obtenerPorCliente("US000001");
        assertEquals(1, resultado.size());
        assertEquals("US000001", resultado.get(0).getClienteId());
    }

    @Test
    void pedidoDTO_debeIncluirDetalles() {
        when(pedidoRepository.findById("PE000001")).thenReturn(Optional.of(pedido));
        Optional<PedidoDTO> resultado = pedidoService.obtenerPorId("PE000001");
        assertTrue(resultado.isPresent());
        assertFalse(resultado.get().getDetalles().isEmpty());
        assertEquals("PR000001", resultado.get().getDetalles().get(0).getProductoId());
    }

    @Test
    void actualizar_debeModificarEstado_cuandoExiste() {
        PedidoRequest request = new PedidoRequest();
        request.setEstadoPedido("EN_PROCESO");

        when(pedidoRepository.findById("PE000001")).thenReturn(Optional.of(pedido));
        when(pedidoRepository.save(any(Pedido.class))).thenReturn(pedido);

        Optional<PedidoDTO> resultado = pedidoService.actualizar("PE000001", request);
        assertTrue(resultado.isPresent());
        verify(pedidoRepository, times(1)).save(any(Pedido.class));
    }

    @Test
    void eliminar_debeRetornarTrue_cuandoExiste() {
        when(pedidoRepository.existsById("PE000001")).thenReturn(true);
        boolean resultado = pedidoService.eliminar("PE000001");
        assertTrue(resultado);
        verify(pedidoRepository, times(1)).deleteById("PE000001");
    }

    @Test
    void eliminar_debeRetornarFalse_cuandoNoExiste() {
        when(pedidoRepository.existsById("PE999999")).thenReturn(false);
        boolean resultado = pedidoService.eliminar("PE999999");
        assertFalse(resultado);
        verify(pedidoRepository, never()).deleteById("PE999999");
    }
}
