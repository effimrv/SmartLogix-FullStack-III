package com.smartlogix.usuarios.dto;

public class UsuarioDTO {

    private String usuarioId;
    private String rut;
    private String nombre;
    private String email;
    private String rol;
    private String estado;

    public UsuarioDTO() {}

    public UsuarioDTO(String usuarioId, String rut, String nombre, String email, String rol, String estado) {
        this.usuarioId = usuarioId;
        this.rut = rut;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
        this.estado = estado;
    }

    public String getUsuarioId() { return usuarioId; }
    public void setUsuarioId(String usuarioId) { this.usuarioId = usuarioId; }

    public String getRut() { return rut; }
    public void setRut(String rut) { this.rut = rut; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}
