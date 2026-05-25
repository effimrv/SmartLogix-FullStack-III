package com.smartlogix.usuarios.service;

import com.smartlogix.usuarios.dto.UsuarioDTO;
import com.smartlogix.usuarios.model.Usuario;
import com.smartlogix.usuarios.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private String generarId() {
        String id;
        do {
            int num = (int) (Math.random() * 1_000_000);
            id = "US" + String.format("%06d", num);
        } while (usuarioRepository.existsById(id));
        return id;
    }

    private UsuarioDTO convertirADTO(Usuario usuario) {
        return new UsuarioDTO(
            usuario.getUsuarioId(),
            usuario.getRut(),
            usuario.getNombre(),
            usuario.getEmail(),
            usuario.getRol().name(),
            usuario.getEstado().name()
        );
    }

    public List<UsuarioDTO> obtenerTodos() {
        return usuarioRepository.findAll()
            .stream()
            .map(this::convertirADTO)
            .collect(Collectors.toList());
    }

    public Optional<UsuarioDTO> obtenerPorId(String id) {
        return usuarioRepository.findById(id).map(this::convertirADTO);
    }

    public Optional<UsuarioDTO> obtenerPorEmail(String email) {
        return usuarioRepository.findByEmail(email).map(this::convertirADTO);
    }

    public List<UsuarioDTO> obtenerPorRol(Usuario.Rol rol) {
        return usuarioRepository.findByRol(rol)
            .stream()
            .map(this::convertirADTO)
            .collect(Collectors.toList());
    }

    public UsuarioDTO crear(Usuario usuario) {
        usuario.setUsuarioId(generarId());
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return convertirADTO(usuarioRepository.save(usuario));
    }

    public Optional<UsuarioDTO> actualizar(String id, Usuario usuarioActualizado) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNombre(usuarioActualizado.getNombre());
            usuario.setEmail(usuarioActualizado.getEmail());
            usuario.setRol(usuarioActualizado.getRol());
            usuario.setEstado(usuarioActualizado.getEstado());
            if (usuarioActualizado.getPassword() != null && !usuarioActualizado.getPassword().isBlank()) {
                usuario.setPassword(passwordEncoder.encode(usuarioActualizado.getPassword()));
            }
            return convertirADTO(usuarioRepository.save(usuario));
        });
    }

    public Optional<UsuarioDTO> login(String email, String password) {
        return usuarioRepository.findByEmail(email)
                .filter(u -> passwordEncoder.matches(password, u.getPassword())
                             && u.getEstado() == Usuario.Estado.ACTIVO)
                .map(this::convertirADTO);
    }

    public boolean eliminar(String id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
