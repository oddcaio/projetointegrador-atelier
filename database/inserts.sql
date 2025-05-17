INSERT INTO tb_lembretes(lembrete) VALUES
('Atender pedido da jaqueline até quinta.'),
('Falar com fornecedor do guará até sexta.'), 
('Cancelar pedido 722 e ligar pro cliente.');

INSERT INTO tb_lembretes(lembrete) VALUES
('Enviar relatório financeiro até sexta-feira.'),
('Agendar reunião com equipe de marketing para segunda.'),
('Verificar estoque de materiais para produção até quarta.');

INSERT INTO tb_status (nome) VALUES
('Recebido'),
('Atrasado'),
('Urgente'),
('Em andamento'),
('Concluído'),
('Cancelar')

INSERT INTO public.tb_pedidos (descricao, recebido, prazo, entregue, status) VALUES
('Pedido de material A', '2025-05-01', '2025-05-10', NULL, 1),
('Pedido de material B', '2025-04-20', '2025-04-30', '2025-04-29', 5),
('Pedido cliente X', '2025-05-05', '2025-05-06', NULL, 3),
('Pedido pprojeto Y', '2025-04-28', '2025-05-15', NULL, 4),
('Pedido de Material tipo C', '2025-04-25', '2025-05-05', NULL, 6);
