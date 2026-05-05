# KORRE App

KORRE e um app mobile para motoristas e entregadores acompanharem custo real por km, lucro, despesas, manutencao, metas e viabilidade de corridas. O app foi desenhado como offline-first: os dados principais ficam no SQLite local do aparelho.

## Status do produto

MVP avancado / beta tecnico. Indicado para testes controlados com usuarios conhecidos antes de qualquer venda publica.

## Stack

- Expo SDK `~54.0.33`
- React Native `0.81.5`
- React `19.1.0`
- TypeScript `~5.9.2` com `strict`
- Expo Router
- SQLite com `expo-sqlite`
- Expo Notifications
- Biometria com `expo-local-authentication`
- Testes com `node:test` via `tsx`

## Requisitos

- Node.js 22
- npm
- Expo CLI via `npx`
- EAS CLI via `npx eas`
- Android Studio ou dispositivo fisico para testes Android

## Configuracao

Crie o arquivo local de ambiente:

```bash
cp .env.example .env
```

Variaveis conhecidas:

- `EXPO_PUBLIC_KORRE_API_BASE_URL`: URL base opcional para registro de push token e comunicacao remota.
- `EXPO_PUBLIC_KORRE_ENABLE_REMOTE_COMMANDS`: habilita comandos remotos recebidos por push quando definido como `true`. O padrao seguro e desligado.
- `EXPO_PUBLIC_KORRE_SUPPORT_YOUTUBE_URL`: canal oficial de tutoriais. Se vazio, o app informa que o canal ainda nao foi configurado.
- `EXPO_PUBLIC_KORRE_SUPPORT_WHATSAPP`: telefone do WhatsApp em formato internacional, apenas numeros. Se vazio, o app informa que o suporte ainda nao foi configurado.

## Instalar e rodar

```bash
npm ci
npm start
```

Outros comandos uteis:

```bash
npm run android
npm run ios
npm run web
```

## Validacao

```bash
npm test
npm run typecheck
npm run lint
npm run validate
```

`npm run validate` executa testes, typecheck e lint na mesma ordem usada pelo CI.

## Build Android

```bash
npx eas build --profile preview --platform android
npx eas build --profile production --platform android
```

Use `preview` para beta interno e `production` para gerar o bundle de publicacao.

## Arquitetura

- `app/`: rotas e telas do Expo Router.
- `components/`: componentes visuais reutilizaveis.
- `hooks/`: estado de tela e orquestracao de fluxos.
- `database/`: inicializacao SQLite e repositories.
- `services/`: servicos de dominio, como backup e restauracao.
- `notifications/`: push, notificacoes locais e comandos remotos.
- `utils/`: calculos, validacoes, autenticacao e helpers.
- `tests/`: testes unitarios.
- `styles/`: estilos manuais e estilos gerados.

## Banco local

O banco principal e `korre.db`. A inicializacao usa `PRAGMA user_version`, `WAL`, `foreign_keys = ON` e migracoes incrementais em `database/DatabaseInit.ts`.

Tabelas principais:

- `perfil_usuario`
- `veiculos`
- `parametros_financeiros`
- `categorias_financeiras`
- `transacoes_financeiras`
- `itens_manutencao`
- `historico_manutencao`
- `notificacoes`
- `remote_command_logs`

## Seguranca e privacidade

- O app funciona localmente sem backend obrigatorio.
- Senhas sao armazenadas em formato derivado com salt.
- Backups nao restauram senha de arquivos antigos ou manipulados.
- Comandos remotos ficam desligados por padrao ate existir canal autenticado adequado para producao.

Antes de lancamento publico, revise hash de senha, bloqueio por tentativas, criptografia de backup, termos, politica de privacidade e adequacao LGPD/Play Store.

## CI

O workflow em `../.github/workflows/ci.yml` executa:

- `npm ci`
- `npm test`
- `npm run typecheck`
- `npm run lint`

## Checklist antes de beta interno

- Configurar canais reais de suporte.
- Rodar `npm run validate`.
- Gerar build Android `preview`.
- Testar cadastro, login, dashboard, financeiro, calculadora, oficina, backup e restore em aparelho real.
- Validar textos de termos e politica de privacidade.
