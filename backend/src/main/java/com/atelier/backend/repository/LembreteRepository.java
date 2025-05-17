package com.atelier.backend.repository;

import com.atelier.backend.model.LembreteModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LembreteRepository extends JpaRepository<LembreteModel, Integer> {
}
