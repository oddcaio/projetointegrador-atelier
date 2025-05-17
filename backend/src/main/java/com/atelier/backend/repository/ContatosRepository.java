package com.atelier.backend.repository;

import com.atelier.backend.model.ContatosModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContatosRepository extends JpaRepository<ContatosModel, Integer> {
}
