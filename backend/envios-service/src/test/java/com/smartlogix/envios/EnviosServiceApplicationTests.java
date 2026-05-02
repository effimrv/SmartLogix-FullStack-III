package com.smartlogix.envios;

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
        envio.setEnvioId(1L);
        envio.setPedidoId(1L);
        envio.setTransportista("Chilexpress");
        envio.setDireccionDestino("Av. Argentina 123");
        envio.setCiudad("Valparaíso");
        envio.setRegion("Valparaíso");
        envio.setEstadoEnvio(Envio.EstadoEnvio.PREPARANDO);
        envio.setFechaEstimada(LocalDate.now().plusDays(3));

        envio2 = new Envio();
        envio2.setEnvioId(2L);
        envio2.setPedidoId(2L);
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
        List<Envio> resultado = envioService.obtenerTodos();
        assertEquals(2, resultado.size());
    }

    @Test
    void obtenerTodos_debeRetornarListaVacia_cuandoNoHayEnvios() {
        when(envioRepository.findAll()).thenReturn(Collections.emptyList());
        List<Envio> resultado = envioService.obtenerTodos();
        assertTrue(resultado.isEmpty());
    }

    @Test
    void obtenerPorId_debeRetornarEnvio_cuandoExiste() {
        when(envioRepository.findById(1L)).thenReturn(Optional.of(envio));
        Optional<Envio> resultado = envioService.obtenerPorId(1L);
        assertTrue(resultado.isPresent());
        assertEquals("Chilexpress", resultado.get().getTransportista());
    }

    @Test
    void obtenerPorId_debeRetornarVacio_cuandoNoExiste() {
        when(envioRepository.findById(99L)).thenReturn(Optional.empty());
        Optional<Envio> resultado = envioService.obtenerPorId(99L);
        assertFalse(resultado.isPresent());
    }

    @Test
    void crear_debeGuardarYRetornarEnvio() {
        when(envioRepository.save(envio)).thenReturn(envio);
        Envio resultado = envioService.crear(envio);
        assertNotNull(resultado);
        assertEquals("Chilexpress", resultado.getTransportista());
        verify(envioRepository, times(1)).save(envio);
    }

    @Test
    void crear_debeRetornarEnvioConEstadoPreparando() {
        when(envioRepository.save(envio)).thenReturn(envio);
        Envio resultado = envioService.crear(envio);
        assertEquals(Envio.EstadoEnvio.PREPARANDO, resultado.getEstadoEnvio());
    }

    @Test
    void obtenerPorPedido_debeRetornarEnviosDelPedido() {
        when(envioRepository.findByPedidoId(1L)).thenReturn(Arrays.asList(envio));
        List<Envio> resultado = envioService.obtenerPorPedido(1L);
        assertEquals(1, resultado.size());
        assertEquals(1L, resultado.get(0).getPedidoId());
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

        when(envioRepository.findById(1L)).thenReturn(Optional.of(envio));
        when(envioRepository.save(any(Envio.class))).thenReturn(envio);

        Optional<Envio> resultado = envioService.actualizar(1L, actualizado);
        assertTrue(resultado.isPresent());
        verify(envioRepository, times(1)).save(any(Envio.class));
    }

    @Test
    void eliminar_debeRetornarTrue_cuandoExiste() {
        when(envioRepository.existsById(1L)).thenReturn(true);
        boolean resultado = envioService.eliminar(1L);
        assertTrue(resultado);
        verify(envioRepository, times(1)).deleteById(1L);
    }

    @Test
    void eliminar_debeRetornarFalse_cuandoNoExiste() {
        when(envioRepository.existsById(99L)).thenReturn(false);
        boolean resultado = envioService.eliminar(99L);
        assertFalse(resultado);
        verify(envioRepository, never()).deleteById(99L);
    }
}