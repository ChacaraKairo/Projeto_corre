import { StyleSheet } from 'react-native';

export const headerStyles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 80, // Reduzi um pouco a margem superior para compensar a logo maior
    marginBottom: 15,
  },
  imageCropContainer: {
    width: 160, // Largura total visível
    height: 110, // Altura visível (menor que a imagem para cortar)
    overflow: 'hidden', // REGRA MÁGICA: Esconde o que passar do tamanho da View
    justifyContent: 'center', // Centraliza a imagem verticalmente
    alignItems: 'center', // Centraliza a imagem horizontalmente
    marginBottom: 16,
    // Garante que não há fundos ou bordas aparecendo
  },
  logoAumentada: {
    width: 90, // Tamanho real renderizado (bem maior)
    height: 110, // Tamanho real renderizado (bem maior)
    // Como a View tem height 110, 50px (25px em cima, 25px embaixo) serão cortados
  },
  subtitulo: {
    fontSize: 15,
    color: '#888',
    marginTop: 4,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
