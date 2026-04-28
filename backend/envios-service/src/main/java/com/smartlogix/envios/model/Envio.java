package com.smartlogix.envios.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "envio")
public class Envio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long envioId;

    // Referencia lógica cross-service (no FK real)
    @Column(name = "pedido_id", nullable = false)
    private Long pedidoId;

    @Column(name = "transportista", length = 100)
    private String transportista;

    @Column(name = "direccion_destino", length = 255, nullable = false)
    private String direccionDestino;

    @Column(name = "ciudad", length = 100)
    private String ciudad;

    @Column(name = "region", length = 100)
    private String region;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_envio", nullable = false)
    private EstadoEnvio estadoEnvio = EstadoEnvio.PREPARANDO;

    @Column(name = "fecha_estimada")
    private LocalDate fechaEstimada;

    public enum EstadoEnvio {
        PREPARANDO, EN_CAMINO, ENTREGADO, FALLIDO
    }

    // Getters y Setters
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

    public EstadoEnvio getEstadoEnvio() { return estadoEnvio; }
    public void setEstadoEnvio(EstadoEnvio estadoEnvio) { this.estadoEnvio = estadoEnvio; }

    public LocalDate getFechaEstimada() { return fechaEstimada; }
    public void setFechaEstimada(LocalDate fechaEstimada) { this.fechaEstimada = fechaEstimada; }
}