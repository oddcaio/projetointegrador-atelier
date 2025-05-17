package com.atelier.backend.service;

import com.atelier.backend.model.LembreteModel;
import com.atelier.backend.repository.LembreteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LembreteService {
    @Autowired
    private LembreteRepository lembreteRepository;

    public List<LembreteModel> listarLembretes() {
        return lembreteRepository.findAll();
    }

    public void deletarLembrete(Integer id) {
        lembreteRepository.deleteById(id);
    }

    public LembreteModel novoLembrete(String lembrete) {
        LembreteModel novoLembrete = new LembreteModel();
        novoLembrete.setLembrete(lembrete);
        return lembreteRepository.save(novoLembrete);
    }
}
