# Opportunity Monitor Config Plugin

Espaco reservado para um futuro config plugin local do Expo.

Nesta branch, nenhum plugin foi implementado e o `app.json` nao foi alterado.

## Quando usar

Este plugin devera ser criado apenas quando houver decisao sobre a estrategia nativa:

- Accessibility Service;
- MediaProjection + Foreground Service;
- outra integracao Android autorizada pelo usuario.

## Responsabilidades futuras

- Declarar permissoes Android estritamente necessarias.
- Declarar services/receivers apenas quando houver implementacao.
- Inserir strings de consentimento e configuracoes nativas.
- Manter o prebuild reproduzivel no EAS.
