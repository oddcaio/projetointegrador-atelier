package com.atelier.backend.service;

import com.atelier.backend.model.LembreteModel;
import com.atelier.backend.model.PedidosModel;
import com.atelier.backend.model.StatusModel;
import com.atelier.backend.repository.PedidosRepository;
import com.atelier.backend.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidosService {
    @Autowired
    private PedidosRepository pedidosRepository;
    @Autowired
    private StatusRepository statusRepository;

    public List<PedidosModel> listarPedidos() {
        return pedidosRepository.findAll();
    }

    public void deletarPedido(Integer id) {
        pedidosRepository.deleteById(id);
    }

    public PedidosModel novoPedido(PedidosModel pedido) {
        PedidosModel novoPedido = new PedidosModel();
        novoPedido.setDescricao(pedido.getDescricao());
        novoPedido.setRecebido(pedido.getRecebido());
        novoPedido.setPrazo(pedido.getPrazo());
        novoPedido.setStatus(pedido.getStatus());
        return pedidosRepository.save(novoPedido);
    }

    public PedidosModel atualizarStatusPedido(Integer pedidoId, Integer statusId) {
        PedidosModel pedido = pedidosRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        StatusModel novoStatus = statusRepository.findById(statusId)
                .orElseThrow(() -> new RuntimeException("Status não encontrado"));

        pedido.setStatus(novoStatus);
        return pedidosRepository.save(pedido);
    }
}
