package com.smartlogix.pedidos.dto;

import java.time.LocalDate;

public class PedidoDTO {

    private Long pedidoId;
    private Long usuarioId;
    private Long productoId;
    private Integer cantidad;
    private Double total;
    private String estadoPedido;
    private LocalDate fechaPedido;

    public PedidoDTO() {}

    public PedidoDTO(Long pedidoId, Long usuarioId, Long productoId, Integer cantidad, Double total, String estadoPedido, LocalDate fechaPedido) {
        this.pedidoId = pedidoId;
        this.usuarioId = usuarioId;
        this.productoId = productoId;
        this.cantidad = cantidad;
        this.total = total;
        this.estadoPedido = estadoPedido;
        this.fechaPedido = fechaPedido;
    }

    public Long getPedidoId() { return pedidoId; }
    public void setPedidoId(Long pedidoId) { this.pedidoId = pedidoId; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public Long getProductoId() { return productoId; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public String getEstadoPedido() { return estadoPedido; }
    public void setEstadoPedido(String estadoPedido) { this.estadoPedido = estadoPedido; }

    public LocalDate getFechaPedido() { return fechaPedido; }
    public void setFechaPedido(LocalDate fechaPedido) { this.fechaPedido = fechaPedido; }
}
