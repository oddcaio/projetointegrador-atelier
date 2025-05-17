package com.atelier.backend.repository;

import com.atelier.backend.model.StatusModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository<StatusModel, Integer> {
}
