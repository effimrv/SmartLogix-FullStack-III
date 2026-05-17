package com.smartlogix.pedidos.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pedidoId;

    @NotNull(message = "El cliente es obligatorio")
    @Column(name = "cliente_id", nullable = false)
    private Long clienteId;

    @NotNull(message = "El producto es obligatorio")
    @Column(name = "producto_id", nullable = false)
    private Long productoId;

    @NotNull(message = "La cantidad es obligatoria")
    @Positive(message = "La cantidad debe ser mayor a 0")
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @NotNull(message = "El total es obligatorio")
    @Positive(message = "El total debe ser mayor a 0")
    @Column(name = "total", nullable = false)
    private Double total;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_pedido", nullable = false)
    private EstadoPedido estadoPedido = EstadoPedido.PENDIENTE;

    @NotNull(message = "La fecha del pedido es obligatoria")
    @Column(name = "fecha_pedido", nullable = false)
    private LocalDate fechaPedido;

    public enum EstadoPedido {
        PENDIENTE, EN_PROCESO, ENVIADO, ENTREGADO, CANCELADO
    }

    // Getters y Setters
    public Long getPedidoId() { return pedidoId; }
    public void setPedidoId(Long pedidoId) { this.pedidoId = pedidoId; }

    public Long getClienteId() { return clienteId; }
    public void setClienteId(Long clienteId) { this.clienteId = clienteId; }

    public Long getProductoId() { return productoId; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public EstadoPedido getEstadoPedido() { return estadoPedido; }
    public void setEstadoPedido(EstadoPedido estadoPedido) { this.estadoPedido = estadoPedido; }

    public LocalDate getFechaPedido() { return fechaPedido; }
    public void setFechaPedido(LocalDate fechaPedido) { this.fechaPedido = fechaPedido; }
}