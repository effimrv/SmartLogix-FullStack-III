package com.smartlogix.usuarios.controller;

import com.smartlogix.usuarios.dto.LoginRequest;
import com.smartlogix.usuarios.dto.UsuarioDTO;
import com.smartlogix.usuarios.model.Usuario;
import com.smartlogix.usuarios.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<UsuarioDTO> obtenerTodos() {
        return usuarioService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> obtenerPorId(@PathVariable String id) {
        return usuarioService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UsuarioDTO> obtenerPorEmail(@PathVariable String email) {
        return usuarioService.obtenerPorEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/rol/{rol}")
    public List<UsuarioDTO> obtenerPorRol(@PathVariable Usuario.Rol rol) {
        return usuarioService.obtenerPorRol(rol);
    }

    @PostMapping
    public UsuarioDTO crear(@Valid @RequestBody Usuario usuario) {
        return usuarioService.crear(usuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> actualizar(@PathVariable String id, @Valid @RequestBody Usuario usuario) {
        return usuarioService.actualizar(id, usuario)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioDTO> login(@RequestBody LoginRequest loginRequest) {
        return usuarioService.login(loginRequest.getEmail(), loginRequest.getPassword())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        if (usuarioService.eliminar(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
