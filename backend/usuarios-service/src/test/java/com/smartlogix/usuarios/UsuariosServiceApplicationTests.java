package com.smartlogix.usuarios;

import com.smartlogix.usuarios.model.Usuario;
import com.smartlogix.usuarios.repository.UsuarioRepository;
import com.smartlogix.usuarios.service.UsuarioService;
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
class UsuariosServiceApplicationTests {

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioService usuarioService;

    private Usuario usuario;
    private Usuario usuario2;

    @BeforeEach
    void setUp() {
        usuario = new Usuario();
        usuario.setUsuarioId(1L);
        usuario.setNombre("Aracely Escobar");
        usuario.setEmail("aracely@gmail.com");
        usuario.setPassword("1234");
        usuario.setRol(Usuario.Rol.ADMIN);
        usuario.setEstado(Usuario.Estado.ACTIVO);

        usuario2 = new Usuario();
        usuario2.setUsuarioId(2L);
        usuario2.setNombre("Yannella Castilla");
        usuario2.setEmail("yannella@gmail.com");
        usuario2.setPassword("1234");
        usuario2.setRol(Usuario.Rol.ADMIN);
        usuario2.setEstado(Usuario.Estado.ACTIVO);
    }

    @Test
    void obtenerTodos_debeRetornarListaDeUsuarios() {
        when(usuarioRepository.findAll()).thenReturn(Arrays.asList(usuario, usuario2));
        List<Usuario> resultado = usuarioService.obtenerTodos();
        assertEquals(2, resultado.size());
    }

    @Test
    void obtenerTodos_debeRetornarListaVacia_cuandoNoHayUsuarios() {
        when(usuarioRepository.findAll()).thenReturn(Collections.emptyList());
        List<Usuario> resultado = usuarioService.obtenerTodos();
        assertTrue(resultado.isEmpty());
    }

    @Test
    void obtenerPorId_debeRetornarUsuario_cuandoExiste() {
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        Optional<Usuario> resultado = usuarioService.obtenerPorId(1L);
        assertTrue(resultado.isPresent());
        assertEquals("Aracely Escobar", resultado.get().getNombre());
    }

    @Test
    void obtenerPorId_debeRetornarVacio_cuandoNoExiste() {
        when(usuarioRepository.findById(99L)).thenReturn(Optional.empty());
        Optional<Usuario> resultado = usuarioService.obtenerPorId(99L);
        assertFalse(resultado.isPresent());
    }

    @Test
    void crear_debeGuardarYRetornarUsuario() {
        when(usuarioRepository.save(usuario)).thenReturn(usuario);
        Usuario resultado = usuarioService.crear(usuario);
        assertNotNull(resultado);
        assertEquals("Aracely Escobar", resultado.getNombre());
        verify(usuarioRepository, times(1)).save(usuario);
    }

    @Test
    void crear_debeRetornarUsuarioConRolAdmin() {
        when(usuarioRepository.save(usuario)).thenReturn(usuario);
        Usuario resultado = usuarioService.crear(usuario);
        assertEquals(Usuario.Rol.ADMIN, resultado.getRol());
    }

    @Test
    void obtenerPorEmail_debeRetornarUsuario_cuandoExiste() {
        when(usuarioRepository.findByEmail("aracely@gmail.com")).thenReturn(Optional.of(usuario));
        Optional<Usuario> resultado = usuarioService.obtenerPorEmail("aracely@gmail.com");
        assertTrue(resultado.isPresent());
        assertEquals("aracely@gmail.com", resultado.get().getEmail());
    }

    @Test
    void actualizar_debeModificarUsuario_cuandoExiste() {
        Usuario actualizado = new Usuario();
        actualizado.setNombre("Aracely E.");
        actualizado.setEmail("aracely@gmail.com");
        actualizado.setRol(Usuario.Rol.ADMIN);
        actualizado.setEstado(Usuario.Estado.ACTIVO);

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);

        Optional<Usuario> resultado = usuarioService.actualizar(1L, actualizado);
        assertTrue(resultado.isPresent());
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }

    @Test
    void eliminar_debeRetornarTrue_cuandoExiste() {
        when(usuarioRepository.existsById(1L)).thenReturn(true);
        boolean resultado = usuarioService.eliminar(1L);
        assertTrue(resultado);
        verify(usuarioRepository, times(1)).deleteById(1L);
    }

    @Test
    void eliminar_debeRetornarFalse_cuandoNoExiste() {
        when(usuarioRepository.existsById(99L)).thenReturn(false);
        boolean resultado = usuarioService.eliminar(99L);
        assertFalse(resultado);
        verify(usuarioRepository, never()).deleteById(99L);
    }
}