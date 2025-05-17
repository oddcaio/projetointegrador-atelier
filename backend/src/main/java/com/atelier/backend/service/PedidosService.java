package com.atelier.backend.service;

import com.atelier.backend.model.LembreteModel;
import com.atelier.backend.model.PedidosModel;
import com.atelier.backend.repository.PedidosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidosService {
    @Autowired
    private PedidosRepository pedidosRepository;

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
        novoPedido.setEntregue(pedido.getEntregue());
        novoPedido.setStatus(pedido.getStatus());
        return pedidosRepository.save(novoPedido);
    }
}
