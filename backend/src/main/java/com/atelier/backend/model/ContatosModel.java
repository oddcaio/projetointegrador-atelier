package com.atelier.backend.model;

import jakarta.persistence.*;

@Entity
@Table(schema = "public", name = "tb_contatos")
public class ContatosModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String telefone;
    private String tipo;

    public ContatosModel() {
    }

    public ContatosModel(Integer id, String nome, String telefone, String tipo) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.tipo = tipo;
    }

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

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
