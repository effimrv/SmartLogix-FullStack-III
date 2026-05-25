package com.smartlogix.inventario.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "producto")
public class Producto {

    @Id
    @Column(name = "producto_id", length = 8)
    private String productoId;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 2, max = 150, message = "El nombre debe tener entre 2 y 150 caracteres")
    @Column(name = "nombre", length = 150, nullable = false)
    private String nombre;

    @Size(max = 255, message = "La descripción no puede superar 255 caracteres")
    @Column(name = "descripcion", length = 255)
    private String descripcion;

    @NotBlank(message = "La categoría es obligatoria")
    @Column(name = "categoria", length = 100)
    private String categoria;

    @NotNull(message = "El precio es obligatorio")
    @Positive(message = "El precio debe ser mayor a 0")
    @Column(name = "precio", nullable = false)
    private Double precio;

    @NotNull(message = "El stock es obligatorio")
    @PositiveOrZero(message = "El stock no puede ser negativo")
    @Column(name = "stock", nullable = false)
    private Integer stock;

    public String getProductoId() { return productoId; }
    public void setProductoId(String productoId) { this.productoId = productoId; }

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
