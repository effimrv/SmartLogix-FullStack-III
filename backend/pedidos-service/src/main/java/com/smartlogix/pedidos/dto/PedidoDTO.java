package com.smartlogix.pedidos.dto;

import java.time.LocalDate;
import java.util.List;

public class PedidoDTO {

    private String pedidoId;
    private String clienteId;
    private Double total;
    private String estadoPedido;
    private LocalDate fechaPedido;
    private List<DetallePedidoDTO> detalles;

    public PedidoDTO() {}

    public PedidoDTO(String pedidoId, String clienteId, Double total,
                     String estadoPedido, LocalDate fechaPedido, List<DetallePedidoDTO> detalles) {
        this.pedidoId = pedidoId;
        this.clienteId = clienteId;
        this.total = total;
        this.estadoPedido = estadoPedido;
        this.fechaPedido = fechaPedido;
        this.detalles = detalles;
    }

    public String getPedidoId() { return pedidoId; }
    public void setPedidoId(String pedidoId) { this.pedidoId = pedidoId; }

    public String getClienteId() { return clienteId; }
    public void setClienteId(String clienteId) { this.clienteId = clienteId; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public String getEstadoPedido() { return estadoPedido; }
    public void setEstadoPedido(String estadoPedido) { this.estadoPedido = estadoPedido; }

    public LocalDate getFechaPedido() { return fechaPedido; }
    public void setFechaPedido(LocalDate fechaPedido) { this.fechaPedido = fechaPedido; }

    public List<DetallePedidoDTO> getDetalles() { return detalles; }
    public void setDetalles(List<DetallePedidoDTO> detalles) { this.detalles = detalles; }
}
