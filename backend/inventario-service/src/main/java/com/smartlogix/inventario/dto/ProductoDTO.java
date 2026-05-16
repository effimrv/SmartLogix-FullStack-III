package com.smartlogix.inventario.dto;

public class ProductoDTO {

    private Long productoId;
    private String nombre;
    private String descripcion;
    private String categoria;
    private Double precio;
    private Integer stock;

    public ProductoDTO() {}

    public ProductoDTO(Long productoId, String nombre, String descripcion, String categoria, Double precio, Integer stock) {
        this.productoId = productoId;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
    }

    public Long getProductoId() { return productoId; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
}
