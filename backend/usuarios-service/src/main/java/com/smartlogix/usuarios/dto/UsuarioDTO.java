package com.smartlogix.usuarios.dto;

public class UsuarioDTO {

    private Long usuarioId;
    private String nombre;
    private String email;
    private String rol;
    private String estado;

    public UsuarioDTO() {}

    public UsuarioDTO(Long usuarioId, String nombre, String email, String rol, String estado) {
        this.usuarioId = usuarioId;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
        this.estado = estado;
    }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}