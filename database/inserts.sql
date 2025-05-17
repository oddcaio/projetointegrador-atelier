INSERT INTO tb_lembretes(lembrete) VALUES
('Atender pedido da jaqueline até quinta.'),
('Falar com fornecedor do guará até sexta.'), 
('Cancelar pedido 722 e ligar pro cliente.');
-------------------------------------------------------------------------------------
INSERT INTO tb_lembretes(lembrete) VALUES
('Enviar relatório financeiro até sexta-feira.'),
('Agendar reunião com equipe de marketing para segunda.'),
('Verificar estoque de materiais para produção até quarta.');
-------------------------------------------------------------------------------------
INSERT INTO tb_status (nome) VALUES
('Recebido'),
('Atrasado'),
('Urgente'),
('Em andamento'),
('Concluído'),
('Cancelar')
-------------------------------------------------------------------------------------
INSERT INTO public.tb_pedidos (descricao, recebido, prazo, status) VALUES
('Pedido de material A', '2025-05-01', '2025-05-10', 1),
('Pedido de material B', '2025-04-20', '2025-04-30', 5),
('Pedido cliente X', '2025-05-05', '2025-05-06', 3),
('Pedido pprojeto Y', '2025-04-28', '2025-05-15', 4),
('Pedido de Material tipo C', '2025-04-25', '2025-05-05', 6);
-------------------------------------------------------------------------------------
INSERT INTO public.tb_contatos (nome, telefone, tipo) VALUES
('bordado', '5511999999991', 'costureira'),
('Clotilde', '5511999999992', 'costureira'),
('Maria', '5511999999993', 'costureira');
-------------------------------------------------------------------------------------
INSERT INTO public.tb_contatos (nome, telefone, tipo) VALUES
('Tecidos Finos', '5511999999994', 'fornecedor'),
('João Tecidos', '5511999999995', 'fornecedor'),
('Malha fina', '5511999999996', 'fornecedor');
