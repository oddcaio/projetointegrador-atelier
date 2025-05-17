package com.atelier.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;
@Entity
@Table(schema = "public", name = "tb_pedidos")
public class PedidosModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String descricao;
    private LocalDate recebido;
    private LocalDate prazo;
    private LocalDate entregue;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "status")
    private StatusModel status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDate getRecebido() {
        return recebido;
    }

    public void setRecebido(LocalDate recebido) {
        this.recebido = recebido;
    }

    public LocalDate getPrazo() {
        return prazo;
    }

    public void setPrazo(LocalDate prazo) {
        this.prazo = prazo;
    }

    public LocalDate getEntregue() {
        return entregue;
    }

    public void setEntregue(LocalDate entregue) {
        this.entregue = entregue;
    }

    public StatusModel getStatus() {
        return status;
    }

    public void setStatus(StatusModel status) {
        this.status = status;
    }

    public PedidosModel() {
    }

    public PedidosModel(Integer id, String descricao, LocalDate recebido, LocalDate prazo, LocalDate entregue, StatusModel status) {
        this.id = id;
        this.descricao = descricao;
        this.recebido = recebido;
        this.prazo = prazo;
        this.entregue = entregue;
        this.status = status;
    }
}
