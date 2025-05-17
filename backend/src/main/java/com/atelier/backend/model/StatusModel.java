package com.atelier.backend.model;

import jakarta.persistence.*;

@Entity
@Table(schema = "public", name = "tb_status")
public class StatusModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public StatusModel() {
    }

    public StatusModel(String nome) {
        this.nome = nome;
    }
}
