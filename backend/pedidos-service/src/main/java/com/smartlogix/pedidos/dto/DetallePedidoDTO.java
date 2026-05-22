package com.smartlogix.pedidos.dto;

public class DetallePedidoDTO {

    private Long detalleId;
    private Long productoId;
    private Integer cantidad;
    private Double precioUnitario;

    public DetallePedidoDTO() {}

    public DetallePedidoDTO(Long detalleId, Long productoId, Integer cantidad, Double precioUnitario) {
        this.detalleId = detalleId;
        this.productoId = productoId;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    public Long getDetalleId() { return detalleId; }
    public void setDetalleId(Long detalleId) { this.detalleId = detalleId; }

    public Long getProductoId() { return productoId; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public Double getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(Double precioUnitario) { this.precioUnitario = precioUnitario; }
}
