# Background Opportunity Monitor

## Objetivo

Criar uma nova fase do KORRE em que o app consiga ajudar o motorista a avaliar oportunidades de corridas em tempo quase real e responder se a corrida vale a pena ou nao.

Esta fase sera implementada com um modulo Android/Kotlin, integrado ao app React Native/Expo apenas quando a arquitetura nativa estiver definida e validada.

## Escopo desta branch

Esta branch cria apenas a estrutura inicial. Ela nao implementa codigo Kotlin, nao registra permissoes Android e nao ativa monitoramento em segundo plano.

## Premissas de plataforma

Android nao permite que um app "veja a tela do usuario" silenciosamente em segundo plano. Para qualquer captura, leitura ou interpretacao de conteudo exibido por outros apps, sera necessario escolher uma abordagem com consentimento explicito do usuario.

Possiveis abordagens:

- Accessibility Service: pode observar informacoes de acessibilidade de telas de outros apps quando o usuario ativa manualmente o servico nas configuracoes do Android.
- MediaProjection + Foreground Service: pode capturar a tela apos consentimento explicito, exibindo indicador persistente do sistema.
- Entrada manual/overlay: o usuario informa dados da corrida ou usa um fluxo assistido sem captura automatica.

Qualquer caminho precisa respeitar privacidade, politicas da Play Store e termos das plataformas de corrida.

## Fronteiras do modulo Kotlin

O modulo nativo devera ser responsavel por:

- iniciar/parar uma sessao de monitoramento autorizada;
- emitir eventos estruturados para o app;
- nunca armazenar imagens de tela por padrao;
- expor estado de permissao e disponibilidade;
- tratar erros de plataforma de forma previsivel.

O app React Native devera ser responsavel por:

- pedir confirmacao clara do usuario;
- mostrar status do monitoramento;
- chamar o motor de calculo financeiro existente;
- apresentar "vale a pena" com confiabilidade e dados faltantes;
- permitir desligar o recurso facilmente.

## Estrutura planejada

```text
native/
  android-opportunity-monitor/
    README.md
    src/main/kotlin/
      .gitkeep
    src/main/res/
      .gitkeep
plugins/
  opportunity-monitor/
    README.md
docs/
  background-opportunity-monitor.md
```

## Decisoes pendentes

- Definir se a primeira versao usa Accessibility Service, MediaProjection ou fluxo manual assistido.
- Definir modelo de permissao e textos de consentimento.
- Definir formato dos eventos enviados do Kotlin para o app.
- Definir como detectar origem, destino, distancia, valor e tempo sem coletar dados pessoais desnecessarios.
- Definir politica de logs: nenhum screenshot, nenhum texto sensivel em logs.
- Definir criterios de confiabilidade do calculo.

## Nao objetivos desta branch

- Nao implementar captura de tela.
- Nao implementar Accessibility Service.
- Nao implementar Foreground Service.
- Nao alterar manifest nativo.
- Nao publicar novo recurso para usuarios.
