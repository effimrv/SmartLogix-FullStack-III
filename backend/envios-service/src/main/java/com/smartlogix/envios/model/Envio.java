package com.smartlogix.envios.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(name = "envio")
public class Envio {

    @Id
    @Column(name = "envio_id", length = 8)
    private String envioId;

    @NotNull(message = "El pedido es obligatorio")
    @Column(name = "pedido_id", length = 8, nullable = false)
    private String pedidoId;

    @NotBlank(message = "El transportista es obligatorio")
    @Column(name = "transportista", length = 100)
    private String transportista;

    @NotBlank(message = "La dirección de destino es obligatoria")
    @Column(name = "direccion_destino", length = 255, nullable = false)
    private String direccionDestino;

    @Column(name = "ciudad", length = 100)
    private String ciudad;

    @Column(name = "region", length = 100)
    private String region;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_envio", nullable = false)
    private EstadoEnvio estadoEnvio = EstadoEnvio.PREPARANDO;

    @Future(message = "La fecha estimada debe ser en el futuro")
    @Column(name = "fecha_estimada")
    private LocalDate fechaEstimada;

    public enum EstadoEnvio {
        PREPARANDO, EN_CAMINO, ENTREGADO, FALLIDO
    }

    public String getEnvioId() { return envioId; }
    public void setEnvioId(String envioId) { this.envioId = envioId; }

    public String getPedidoId() { return pedidoId; }
    public void setPedidoId(String pedidoId) { this.pedidoId = pedidoId; }

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
