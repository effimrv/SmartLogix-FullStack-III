package com.smartlogix.envios;

import com.smartlogix.envios.dto.EnvioDTO;
import com.smartlogix.envios.model.Envio;
import com.smartlogix.envios.repository.EnvioRepository;
import com.smartlogix.envios.service.EnvioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EnviosServiceApplicationTests {

    @Mock
    private EnvioRepository envioRepository;

    @InjectMocks
    private EnvioService envioService;

    private Envio envio;
    private Envio envio2;

    @BeforeEach
    void setUp() {
        envio = new Envio();
        envio.setEnvioId("EN000001");
        envio.setPedidoId("PE000001");
        envio.setTransportista("Chilexpress");
        envio.setDireccionDestino("Av. Argentina 123");
        envio.setCiudad("Valparaíso");
        envio.setRegion("Valparaíso");
        envio.setEstadoEnvio(Envio.EstadoEnvio.PREPARANDO);
        envio.setFechaEstimada(LocalDate.now().plusDays(3));

        envio2 = new Envio();
        envio2.setEnvioId("EN000002");
        envio2.setPedidoId("PE000002");
        envio2.setTransportista("Starken");
        envio2.setDireccionDestino("Calle Larga 456");
        envio2.setCiudad("Santiago");
        envio2.setRegion("Metropolitana");
        envio2.setEstadoEnvio(Envio.EstadoEnvio.EN_CAMINO);
        envio2.setFechaEstimada(LocalDate.now().plusDays(5));
    }

    @Test
    void obtenerTodos_debeRetornarListaDeEnvios() {
        when(envioRepository.findAll()).thenReturn(Arrays.asList(envio, envio2));
        List<EnvioDTO> resultado = envioService.obtenerTodos();
        assertEquals(2, resultado.size());
    }

    @Test
    void obtenerTodos_debeRetornarListaVacia_cuandoNoHayEnvios() {
        when(envioRepository.findAll()).thenReturn(Collections.emptyList());
        List<EnvioDTO> resultado = envioService.obtenerTodos();
        assertTrue(resultado.isEmpty());
    }

    @Test
    void obtenerPorId_debeRetornarEnvio_cuandoExiste() {
        when(envioRepository.findById("EN000001")).thenReturn(Optional.of(envio));
        Optional<EnvioDTO> resultado = envioService.obtenerPorId("EN000001");
        assertTrue(resultado.isPresent());
        assertEquals("Chilexpress", resultado.get().getTransportista());
    }

    @Test
    void obtenerPorId_debeRetornarVacio_cuandoNoExiste() {
        when(envioRepository.findById("EN999999")).thenReturn(Optional.empty());
        Optional<EnvioDTO> resultado = envioService.obtenerPorId("EN999999");
        assertFalse(resultado.isPresent());
    }

    @Test
    void crear_debeGuardarYRetornarEnvioDTO() {
        when(envioRepository.existsByPedidoId("PE000001")).thenReturn(false);
        when(envioRepository.existsById(anyString())).thenReturn(false);
        when(envioRepository.save(any(Envio.class))).thenReturn(envio);
        EnvioDTO resultado = envioService.crear(envio);
        assertNotNull(resultado);
        assertEquals("Chilexpress", resultado.getTransportista());
        verify(envioRepository, times(1)).save(any(Envio.class));
    }

    @Test
    void crear_debeRetornarEnvioConEstadoPreparando() {
        when(envioRepository.existsByPedidoId("PE000001")).thenReturn(false);
        when(envioRepository.existsById(anyString())).thenReturn(false);
        when(envioRepository.save(any(Envio.class))).thenReturn(envio);
        EnvioDTO resultado = envioService.crear(envio);
        assertEquals("PREPARANDO", resultado.getEstadoEnvio());
    }

    @Test
    void obtenerPorPedido_debeRetornarEnviosDelPedido() {
        when(envioRepository.findByPedidoId("PE000001")).thenReturn(Arrays.asList(envio));
        List<EnvioDTO> resultado = envioService.obtenerPorPedido("PE000001");
        assertEquals(1, resultado.size());
        assertEquals("PE000001", resultado.get(0).getPedidoId());
    }

    @Test
    void actualizar_debeModificarEnvio_cuandoExiste() {
        Envio actualizado = new Envio();
        actualizado.setTransportista("Starken");
        actualizado.setDireccionDestino("Av. Argentina 123");
        actualizado.setCiudad("Valparaíso");
        actualizado.setRegion("Valparaíso");
        actualizado.setEstadoEnvio(Envio.EstadoEnvio.EN_CAMINO);
        actualizado.setFechaEstimada(LocalDate.now().plusDays(5));

        when(envioRepository.findById("EN000001")).thenReturn(Optional.of(envio));
        when(envioRepository.save(any(Envio.class))).thenReturn(envio);

        Optional<EnvioDTO> resultado = envioService.actualizar("EN000001", actualizado);
        assertTrue(resultado.isPresent());
        verify(envioRepository, times(1)).save(any(Envio.class));
    }

    @Test
    void eliminar_debeRetornarTrue_cuandoExiste() {
        when(envioRepository.existsById("EN000001")).thenReturn(true);
        boolean resultado = envioService.eliminar("EN000001");
        assertTrue(resultado);
        verify(envioRepository, times(1)).deleteById("EN000001");
    }

    @Test
    void eliminar_debeRetornarFalse_cuandoNoExiste() {
        when(envioRepository.existsById("EN999999")).thenReturn(false);
        boolean resultado = envioService.eliminar("EN999999");
        assertFalse(resultado);
        verify(envioRepository, never()).deleteById("EN999999");
    }
}
