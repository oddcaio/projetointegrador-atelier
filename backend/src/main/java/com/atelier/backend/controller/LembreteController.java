package com.atelier.backend.controller;

import com.atelier.backend.LembreteDTO;
import com.atelier.backend.model.LembreteModel;
import com.atelier.backend.service.LembreteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lembrete")
public class LembreteController {
    @Autowired
    private LembreteService lembreteService;


    @GetMapping("/listar")
    public ResponseEntity<List<LembreteModel>> listarLembretes() {
        try {
            List<LembreteModel> list = lembreteService.listarLembretes();
            if (list.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletarLembrete(@PathVariable Integer id) {
        try {
            lembreteService.deletarLembrete(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao deletar lembrete: " + e.getMessage());
        }
    }

    @PostMapping("/novo-lembrete")
    public ResponseEntity<LembreteModel> novoLembrete(@RequestBody LembreteDTO dto) {
        try {
            LembreteModel salvo = lembreteService.novoLembrete(dto.getLembrete().trim());
            return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
