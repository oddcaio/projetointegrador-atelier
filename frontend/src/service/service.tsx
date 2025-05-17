import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

class Service {
    async listarLembretes() {
        try {
            const response = await api.get(`/lembrete/listar`)
            return response.data;
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async deletarLembrete(id: number) {
        try {
            const response = await api.delete(`/lembrete/deletar/${id}`)
            return response.data;
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async novoLembrete(lembrete: string) {
        try {
            const response = await api.post(`/lembrete/novo-lembrete`, { lembrete })
            return response.data;
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async listarPedidos() {
        try {
            const response = await api.get(`/pedidos/listar`)
            return response.data;
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async deletarPedido(id: number) {
        try {
            const response = await api.delete(`/pedidos/deletar/${id}`)
            return response.data;
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async novoPedido(pedido: any) {
        try {
            const response = await api.post(`/pedidos/novo-pedido`, pedido)
            return response.data;
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async listarStatus() {
        try {
            const response = await api.get(`/status/listar`)
            return response.data;
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
}
export const service = new Service();