package com.smartlogix.usuarios.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @Column(name = "usuario_id", length = 8)
    private String usuarioId;

    @Column(name = "rut", length = 15)
    private String rut;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 2, max = 150, message = "El nombre debe tener entre 2 y 150 caracteres")
    @Column(name = "nombre", length = 150, nullable = false)
    private String nombre;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email no es válido")
    @Column(name = "email", length = 150, nullable = false, unique = true)
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 4, message = "La contraseña debe tener al menos 4 caracteres")
    @Column(name = "password", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "rol", nullable = false)
    private Rol rol = Rol.EMPLEADO;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private Estado estado = Estado.ACTIVO;

    public enum Rol {
        CLIENTE, EMPLEADO, ADMIN
    }

    public enum Estado {
        ACTIVO, INACTIVO
    }

    public String getUsuarioId() { return usuarioId; }
    public void setUsuarioId(String usuarioId) { this.usuarioId = usuarioId; }

    public String getRut() { return rut; }
    public void setRut(String rut) { this.rut = rut; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Rol getRol() { return rol; }
    public void setRol(Rol rol) { this.rol = rol; }

    public Estado getEstado() { return estado; }
    public void setEstado(Estado estado) { this.estado = estado; }
}
