package com.smartlogix.pedidos.dto;

public class DetallePedidoDTO {

    private Long detalleId;
    private String productoId;
    private Integer cantidad;
    private Double precioUnitario;

    public DetallePedidoDTO() {}

    public DetallePedidoDTO(Long detalleId, String productoId, Integer cantidad, Double precioUnitario) {
        this.detalleId = detalleId;
        this.productoId = productoId;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    public Long getDetalleId() { return detalleId; }
    public void setDetalleId(Long detalleId) { this.detalleId = detalleId; }

    public String getProductoId() { return productoId; }
    public void setProductoId(String productoId) { this.productoId = productoId; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public Double getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(Double precioUnitario) { this.precioUnitario = precioUnitario; }
}
