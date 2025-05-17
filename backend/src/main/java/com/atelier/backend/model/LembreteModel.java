package com.atelier.backend.model;

import jakarta.persistence.*;

@Entity
@Table(schema = "public", name = "tb_lembretes")
public class LembreteModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String lembrete;

    public LembreteModel() {
    }

    public LembreteModel(Integer id, String lembrete) {
        this.id = id;
        this.lembrete = lembrete;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLembrete() {
        return lembrete;
    }

    public void setLembrete(String lembrete) {
        this.lembrete = lembrete;
    }
}
