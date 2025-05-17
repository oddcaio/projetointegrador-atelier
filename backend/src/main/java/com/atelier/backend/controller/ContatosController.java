package com.atelier.backend.controller;

import com.atelier.backend.model.ContatosModel;
import com.atelier.backend.model.LembreteModel;
import com.atelier.backend.service.ContatosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/contatos")
public class ContatosController {
    @Autowired
    private ContatosService contatosService;

    @GetMapping("/listar")
    public ResponseEntity<List<ContatosModel>> listarContatos() {
        try {
            List<ContatosModel> list = contatosService.listarContatos();
            if (list.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
