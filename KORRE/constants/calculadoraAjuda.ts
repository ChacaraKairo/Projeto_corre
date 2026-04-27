export const AJUDA_CALCULADORA = {
  custosMovimento:
    'Aqui entram os custos que aumentam quando você roda. Eles formam o IKM, que é o custo por quilômetro. Não é o preço mínimo da corrida: ele cobre deslocamento e desgaste do veículo.',
  precoEnergia:
    'Informe quanto custa uma unidade de energia do veículo.\n\nGasolina, etanol ou diesel: coloque o preço de 1 litro no posto onde você costuma abastecer.\n\nCarro elétrico: coloque o preço de 1 kWh. Se carrega em casa, use o valor aproximado da sua conta de energia dividido pelos kWh consumidos. Se carrega em eletroposto, use o preço cobrado por kWh.\n\nExemplo: gasolina a R$ 6,00, preencha 6.',
  rendimento:
    'Informe quantos quilômetros o veículo faz com 1 litro ou 1 kWh.\n\nComo descobrir: zere o hodômetro parcial ao abastecer, rode normalmente, abasteça de novo e divida os km rodados pelos litros abastecidos.\n\nExemplo: rodou 400 km e abasteceu 10 L: 400 / 10 = 40 km/L.\n\nPara carro elétrico, use km por kWh. Se o app do carro mostra kWh/100 km, faça 100 dividido por esse número. Exemplo: 15 kWh/100 km vira 6,67 km/kWh.\n\nSe deixar vazio, o KORRE não inventa média: o custo de energia fica zerado e o resultado pode ficar baixo.',
  valorPneus:
    'Informe o custo do jogo completo de pneus que você troca de uma vez.\n\nComo descobrir: use orçamento de loja, nota fiscal ou preço médio online do modelo correto. Inclua montagem se ela normalmente entra junto.\n\nExemplo: 4 pneus por R$ 1.600, preencha 1600. Moto com dianteiro + traseiro por R$ 500, preencha 500.',
  durabilidadePneus:
    'Informe por quantos quilômetros esse jogo de pneus costuma durar.\n\nComo descobrir: use seu histórico de troca, recomendação do fabricante ou uma estimativa conservadora. Quem roda em aplicativo costuma gastar pneus antes do uso comum.\n\nExemplo: se o jogo custa R$ 1.600 e dura 40.000 km, o custo é 1600 / 40000 = R$ 0,04 por km.',
  oleoFiltros:
    'Informe o valor total da troca de óleo e filtros.\n\nInclua óleo, filtro de óleo, filtro de ar, filtro de combustível e mão de obra se você paga tudo junto.\n\nExemplo: óleo + filtros custam R$ 240, preencha 240.',
  intervaloOleo:
    'Informe a cada quantos quilômetros você troca óleo e filtros.\n\nComo descobrir: veja o manual, etiqueta da última troca ou recomendação da oficina. Para uso severo, trânsito e aplicativo, use um intervalo mais conservador.\n\nExemplo: se custa R$ 240 e troca a cada 10.000 km, o custo é 240 / 10000 = R$ 0,024 por km.',
  freios:
    'Informe o valor médio de manutenção dos freios.\n\nInclua pastilhas, sapatas, discos ou fluido quando fizer parte do serviço que você troca junto.\n\nSe não sabe, use uma média dos últimos serviços ou peça um orçamento de revisão de freio.',
  intervaloFreios:
    'Informe a cada quantos quilômetros você costuma revisar ou trocar os freios.\n\nComo descobrir: use histórico da oficina, nota anterior ou a quilometragem média entre trocas.\n\nExemplo: serviço de R$ 300 a cada 20.000 km vira R$ 0,015 por km.',
  transmissao:
    'Informe o custo do item de transmissão que desgasta com o uso.\n\nMoto: relação, corrente, coroa e pinhão. Carro: correia, embreagem ou item equivalente que você queira diluir por km.\n\nUse o valor do kit + mão de obra se normalmente paga junto.',
  durabilidadeTransmissao:
    'Informe por quantos quilômetros esse item de transmissão dura.\n\nComo descobrir: histórico de troca, manual ou estimativa da oficina.\n\nExemplo: kit de R$ 250 que dura 18.000 km vira R$ 0,0139 por km.',
  kmEstimadoMes:
    'Informe quantos quilômetros você roda em um mês de trabalho.\n\nComo descobrir: veja a média no odômetro, app de corridas, abastecimentos ou histórico semanal. Some os km de uma semana típica e multiplique por 4,33.\n\nSe deixar vazio, o KORRE tenta calcular usando KM por dia x dias por semana x 4,33. Esse campo é importante para transformar custos mensais, como depreciação e limpeza, em custo por km.',
  depreciacaoMensal:
    'Informe quanto o veículo perde de valor por mês por causa do uso.\n\nComo descobrir de forma simples: veja o valor FIPE atual, estime o valor daqui a 12 meses e divida a diferença por 12.\n\nExemplo: hoje vale R$ 50.000 e você espera vender por R$ 44.000 em 1 ano. Perda de R$ 6.000 / 12 = R$ 500 por mês.\n\nO KORRE divide esse valor pelo KM mensal para chegar na depreciação por km.',
  depreciacaoKm:
    'Use este campo somente se você já sabe exatamente quanto perde por km.\n\nComo calcular: depreciação mensal dividida pelo KM mensal.\n\nExemplo: R$ 300 por mês e 1.500 km por mês: 300 / 1500 = R$ 0,20 por km.\n\nSe preencher este campo, ele tem prioridade sobre a depreciação mensal.',
  manutencaoImprevistaMensal:
    'Informe uma reserva mensal para problemas que não têm data certa: sensor, guincho, pneu furado, elétrica, pequenas quebras, franquia ou revisão inesperada.\n\nComo estimar: pegue o quanto você gastou com imprevistos nos últimos meses e faça uma média. Se gastou R$ 900 em 6 meses, use R$ 150 por mês.\n\nO KORRE divide esse valor pelo KM mensal.',
  manutencaoImprevistaKm:
    'Use se preferir informar direto quanto reservar por km para imprevistos.\n\nComo calcular: reserva mensal dividida pelo KM mensal.\n\nExemplo: R$ 150 por mês e 1.500 km por mês: 150 / 1500 = R$ 0,10 por km.\n\nSe preencher este campo, ele tem prioridade sobre a reserva mensal.',
  maoObraPreventivaKm:
    'Informe a mão de obra preventiva diluída por km.\n\nUse este campo quando as peças já estão em outros campos, mas a oficina cobra mão de obra separada.\n\nComo calcular: some a mão de obra esperada do período e divida pelo KM do período. Exemplo: R$ 180 de mão de obra a cada 6.000 km: 180 / 6000 = R$ 0,03 por km.',
  limpezaMensal:
    'Informe quanto você gasta por mês com lavagem, higienização, lubrificação ou limpeza necessária para trabalhar.\n\nComo descobrir: conte quantas lavagens faz por mês e multiplique pelo preço.\n\nExemplo: 4 lavagens de R$ 25 = R$ 100 por mês. O KORRE divide pelo KM mensal.',
  limpezaKm:
    'Use se quiser informar diretamente o custo de limpeza por km.\n\nComo calcular: gasto mensal de limpeza dividido pelo KM mensal.\n\nExemplo: R$ 60 por mês e 1.500 km por mês: 60 / 1500 = R$ 0,04 por km.\n\nSe preencher este campo, ele tem prioridade sobre a limpeza mensal.',
  patrimonio:
    'Aqui entram valores ligados ao capital preso no veículo. O KORRE usa isso para entender custo de oportunidade e parte dos custos por tempo.',
  valorFipe:
    'Informe o valor atual de mercado do veículo.\n\nComo descobrir: consulte a Tabela FIPE, anúncios parecidos ou avaliação da loja. Use um valor realista, não o preço que você gostaria de receber.\n\nEsse valor ajuda a calcular custo de oportunidade: o dinheiro parado no veículo poderia estar rendendo em outro lugar.',
  depreciacaoAnual:
    'Informe a perda percentual anual estimada do veículo.\n\nComo descobrir: compare o valor FIPE atual com o mesmo modelo um ano mais velho, ou use uma estimativa conservadora.\n\nExemplo: se um veículo de R$ 50.000 tende a perder R$ 5.000 no ano, isso é 10%.\n\nAtenção: na seção de desgaste real existe a depreciação mensal em R$. Use aquela quando quiser que a perda entre diretamente no custo por km.',
  selic:
    'Informe a taxa anual que o dinheiro poderia render se não estivesse parado no veículo.\n\nComo descobrir: pesquise “taxa Selic hoje” ou use a taxa de um investimento seguro que você realmente teria.\n\nExemplo: se a Selic anual está em 10,75%, preencha 10,75.',
  custosExistencia:
    'Custos de existência são gastos que continuam existindo mesmo quando o veículo está parado. Eles alimentam o IMIN, o custo por minuto.',
  ipva:
    'Informe o valor anual do IPVA.\n\nComo descobrir: use o documento do veículo, site do Detran/Secretaria da Fazenda do seu estado ou toque em CALCULAR para o KORRE estimar com base na UF e valor FIPE.\n\nSe o veículo for isento, preencha 0.',
  licenciamento:
    'Informe o total anual de licenciamento, taxa do Detran e cobranças obrigatórias equivalentes.\n\nComo descobrir: consulte o Detran do seu estado ou o boleto/documento anual. Se uma taxa não existe no seu caso, deixe 0.',
  seguro:
    'Informe o valor anual de seguro, proteção veicular ou cobertura APP usada para trabalhar.\n\nComo descobrir: use a apólice, mensalidade multiplicada por 12 ou orçamento anual.\n\nExemplo: R$ 180 por mês vira R$ 2.160 por ano.',
  planoDados:
    'Informe quanto você paga por mês de internet usada para trabalhar.\n\nSe o plano é pessoal e trabalho juntos, coloque só a parte que considera trabalho.\n\nExemplo: plano de R$ 60, mas metade é uso do app: preencha 30.',
  smartphone:
    'Informe o valor do celular usado no trabalho.\n\nO KORRE dilui esse custo pela vida útil, porque o celular também desgasta trabalhando com app aberto, GPS e carregamento constante.',
  vidaSmartphone:
    'Informe por quantos meses você pretende usar o celular antes de trocar.\n\nComo estimar: 18 a 36 meses costuma ser uma faixa comum. Se trabalha muito com o aparelho, use uma vida útil menor.',
  fatorHumano:
    'Aqui entram custos e metas ligados a você. A calculadora não deve pagar só o veículo: precisa mostrar quanto sobra para a pessoa que trabalha.',
  alimentacao:
    'Informe quanto você gasta por dia de trabalho com refeição principal.\n\nUse uma média realista. Se leva marmita, coloque o custo aproximado da marmita. Se come na rua, use o valor médio pago.',
  apoioDiario:
    'Informe gastos pequenos do dia: água, café, lanche, banheiro, estacionamento rápido ou outro apoio para conseguir trabalhar.\n\nSe não sabe, observe uma semana e divida pelo número de dias trabalhados.',
  planoSaude:
    'Informe plano de saúde, reserva médica ou proteção pessoal mensal.\n\nSe não tem esse gasto, pode deixar vazio ou 0. O objetivo é lembrar que o trabalhador também tem custo e risco.',
  salarioDesejado:
    'Informe quanto você quer que sobre limpo por mês depois de pagar os custos do veículo e do trabalho.\n\nNão coloque faturamento bruto. Coloque o dinheiro que você quer levar para casa.\n\nExemplo: se quer sobrar R$ 3.500 no mês, preencha 3500.',
  diasTrabalho:
    'Informe quantos dias por semana você costuma trabalhar.\n\nEsse campo ajuda a diluir custos mensais e calcular tempo disponível.\n\nExemplo: trabalha de segunda a sábado, preencha 6.',
  horasDia:
    'Informe quantas horas por dia você fica disponível para trabalhar.\n\nUse a jornada real, incluindo tempo esperando corrida, deslocamentos sem passageiro e pausas curtas.\n\nExemplo: se sai 8h e volta 17h, mas para 1h, preencha 8.',
} as const;
