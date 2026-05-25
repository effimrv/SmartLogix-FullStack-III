package com.smartlogix.usuarios;

import com.smartlogix.usuarios.dto.UsuarioDTO;
import com.smartlogix.usuarios.model.Usuario;
import com.smartlogix.usuarios.repository.UsuarioRepository;
import com.smartlogix.usuarios.service.UsuarioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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

    @Spy
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @InjectMocks
    private UsuarioService usuarioService;

    private Usuario usuario;
    private Usuario usuario2;

    @BeforeEach
    void setUp() {
        usuario = new Usuario();
        usuario.setUsuarioId("US000001");
        usuario.setNombre("Aracely Escobar");
        usuario.setEmail("aracely@gmail.com");
        usuario.setPassword(new BCryptPasswordEncoder().encode("1234"));
        usuario.setRol(Usuario.Rol.ADMIN);
        usuario.setEstado(Usuario.Estado.ACTIVO);

        usuario2 = new Usuario();
        usuario2.setUsuarioId("US000002");
        usuario2.setNombre("Yannella Castilla");
        usuario2.setEmail("yannella@gmail.com");
        usuario2.setPassword(new BCryptPasswordEncoder().encode("1234"));
        usuario2.setRol(Usuario.Rol.ADMIN);
        usuario2.setEstado(Usuario.Estado.ACTIVO);
    }

    @Test
    void obtenerTodos_debeRetornarListaDeUsuarios() {
        when(usuarioRepository.findAll()).thenReturn(Arrays.asList(usuario, usuario2));
        List<UsuarioDTO> resultado = usuarioService.obtenerTodos();
        assertEquals(2, resultado.size());
    }

    @Test
    void obtenerTodos_debeRetornarListaVacia_cuandoNoHayUsuarios() {
        when(usuarioRepository.findAll()).thenReturn(Collections.emptyList());
        List<UsuarioDTO> resultado = usuarioService.obtenerTodos();
        assertTrue(resultado.isEmpty());
    }

    @Test
    void obtenerPorId_debeRetornarUsuario_cuandoExiste() {
        when(usuarioRepository.findById("US000001")).thenReturn(Optional.of(usuario));
        Optional<UsuarioDTO> resultado = usuarioService.obtenerPorId("US000001");
        assertTrue(resultado.isPresent());
        assertEquals("Aracely Escobar", resultado.get().getNombre());
    }

    @Test
    void obtenerPorId_debeRetornarVacio_cuandoNoExiste() {
        when(usuarioRepository.findById("US999999")).thenReturn(Optional.empty());
        Optional<UsuarioDTO> resultado = usuarioService.obtenerPorId("US999999");
        assertFalse(resultado.isPresent());
    }

    @Test
    void crear_debeGuardarYRetornarUsuarioDTO() {
        when(usuarioRepository.existsById(anyString())).thenReturn(false);
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);
        UsuarioDTO resultado = usuarioService.crear(usuario);
        assertNotNull(resultado);
        assertEquals("Aracely Escobar", resultado.getNombre());
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }

    @Test
    void crear_debeRetornarUsuarioConRolAdmin() {
        when(usuarioRepository.existsById(anyString())).thenReturn(false);
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);
        UsuarioDTO resultado = usuarioService.crear(usuario);
        assertEquals("ADMIN", resultado.getRol());
    }

    @Test
    void obtenerPorEmail_debeRetornarUsuario_cuandoExiste() {
        when(usuarioRepository.findByEmail("aracely@gmail.com")).thenReturn(Optional.of(usuario));
        Optional<UsuarioDTO> resultado = usuarioService.obtenerPorEmail("aracely@gmail.com");
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

        when(usuarioRepository.findById("US000001")).thenReturn(Optional.of(usuario));
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);

        Optional<UsuarioDTO> resultado = usuarioService.actualizar("US000001", actualizado);
        assertTrue(resultado.isPresent());
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }

    @Test
    void eliminar_debeRetornarTrue_cuandoExiste() {
        when(usuarioRepository.existsById("US000001")).thenReturn(true);
        boolean resultado = usuarioService.eliminar("US000001");
        assertTrue(resultado);
        verify(usuarioRepository, times(1)).deleteById("US000001");
    }

    @Test
    void eliminar_debeRetornarFalse_cuandoNoExiste() {
        when(usuarioRepository.existsById("US999999")).thenReturn(false);
        boolean resultado = usuarioService.eliminar("US999999");
        assertFalse(resultado);
        verify(usuarioRepository, never()).deleteById("US999999");
    }
}
