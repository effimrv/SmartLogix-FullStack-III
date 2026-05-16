package com.smartlogix.envios.dto;

import java.time.LocalDate;

public class EnvioDTO {

    private Long envioId;
    private Long pedidoId;
    private String transportista;
    private String direccionDestino;
    private String ciudad;
    private String region;
    private String estadoEnvio;
    private LocalDate fechaEstimada;

    public EnvioDTO() {}

    public EnvioDTO(Long envioId, Long pedidoId, String transportista, String direccionDestino, String ciudad, String region, String estadoEnvio, LocalDate fechaEstimada) {
        this.envioId = envioId;
        this.pedidoId = pedidoId;
        this.transportista = transportista;
        this.direccionDestino = direccionDestino;
        this.ciudad = ciudad;
        this.region = region;
        this.estadoEnvio = estadoEnvio;
        this.fechaEstimada = fechaEstimada;
    }

    public Long getEnvioId() { return envioId; }
    public void setEnvioId(Long envioId) { this.envioId = envioId; }

    public Long getPedidoId() { return pedidoId; }
    public void setPedidoId(Long pedidoId) { this.pedidoId = pedidoId; }

    public String getTransportista() { return transportista; }
    public void setTransportista(String transportista) { this.transportista = transportista; }

    public String getDireccionDestino() { return direccionDestino; }
    public void setDireccionDestino(String direccionDestino) { this.direccionDestino = direccionDestino; }

    public String getCiudad() { return ciudad; }
    public void setCiudad(String ciudad) { this.ciudad = ciudad; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public String getEstadoEnvio() { return estadoEnvio; }
    public void setEstadoEnvio(String estadoEnvio) { this.estadoEnvio = estadoEnvio; }

    public LocalDate getFechaEstimada() { return fechaEstimada; }
    public void setFechaEstimada(LocalDate fechaEstimada) { this.fechaEstimada = fechaEstimada; }
}
