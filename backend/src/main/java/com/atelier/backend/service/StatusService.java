package com.atelier.backend.service;


import com.atelier.backend.model.StatusModel;
import com.atelier.backend.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusService {
    @Autowired
    private StatusRepository statusRepository;

    public List<StatusModel> listarStatus() {
        return statusRepository.findAll();
    }
}
