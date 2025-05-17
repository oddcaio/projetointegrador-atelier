package com.atelier.backend.service;

import com.atelier.backend.model.ContatosModel;
import com.atelier.backend.repository.ContatosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContatosService {
    @Autowired
    private ContatosRepository contatosRepository;

    public List<ContatosModel> listarContatos() {
        return contatosRepository.findAll();
    }
}
