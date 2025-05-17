package com.atelier.backend.repository;

import com.atelier.backend.model.PedidosModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidosRepository extends JpaRepository<PedidosModel, Integer> {
}
