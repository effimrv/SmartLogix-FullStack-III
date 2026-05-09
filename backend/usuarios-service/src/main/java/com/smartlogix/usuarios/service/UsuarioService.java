package com.smartlogix.usuarios.service;

import com.smartlogix.usuarios.dto.UsuarioDTO;
import com.smartlogix.usuarios.model.Usuario;
import com.smartlogix.usuarios.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private UsuarioDTO convertirADTO(Usuario usuario) {
        return new UsuarioDTO(
            usuario.getUsuarioId(),
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

    public Optional<UsuarioDTO> obtenerPorId(Long id) {
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
        return convertirADTO(usuarioRepository.save(usuario));
    }

    public Optional<UsuarioDTO> actualizar(Long id, Usuario usuarioActualizado) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNombre(usuarioActualizado.getNombre());
            usuario.setEmail(usuarioActualizado.getEmail());
            usuario.setRol(usuarioActualizado.getRol());
            usuario.setEstado(usuarioActualizado.getEstado());
            return convertirADTO(usuarioRepository.save(usuario));
        });
    }

    public boolean eliminar(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
