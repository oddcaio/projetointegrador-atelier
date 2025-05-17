package com.atelier.backend.controller;

import com.atelier.backend.model.PedidosModel;
import com.atelier.backend.service.PedidosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
public class PedidosController {
    @Autowired
    private PedidosService pedidosService;

    @GetMapping("/listar")
    public ResponseEntity<List<PedidosModel>> listarPedidos() {
        try {
            List<PedidosModel> lista = pedidosService.listarPedidos();
            if (lista.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletarPedido(@PathVariable Integer id) {
        try {
            pedidosService.deletarPedido(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao deletar pedido: " + e.getMessage());
        }
    }

    @PostMapping("/novo-pedido")
    public ResponseEntity<PedidosModel> novoPedido(@RequestBody PedidosModel pedido) {
        try {
            PedidosModel novoPedido = pedidosService.novoPedido(pedido);
            return new ResponseEntity<>(novoPedido, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}/status/{statusId}")
    public ResponseEntity<PedidosModel> atualizarStatus(@PathVariable Integer id, @PathVariable Integer statusId) {
        try {
            PedidosModel pedidoAtualizado = pedidosService.atualizarStatusPedido(id, statusId);
            return ResponseEntity.ok(pedidoAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
