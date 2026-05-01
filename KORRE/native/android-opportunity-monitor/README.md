# Android Opportunity Monitor

Estrutura reservada para o futuro modulo Android/Kotlin do monitor de oportunidades.

Nesta branch, esta pasta e apenas um ponto de ancoragem arquitetural. Nenhum codigo nativo foi implementado ainda.

## Responsabilidades futuras

- Gerenciar ciclo de vida do monitoramento nativo.
- Expor status de permissao e disponibilidade.
- Enviar eventos normalizados para a camada React Native.
- Operar apenas com consentimento explicito do usuario.

## Possiveis submodulos futuros

```text
src/main/kotlin/
  permissions/
  service/
  events/
  bridge/
  parser/
src/main/res/
  values/
  xml/
```

## Observacoes

Como o projeto usa Expo/EAS, a integracao nativa deve ser feita de forma compativel com prebuild, provavelmente via config plugin local ou Expo Module.
