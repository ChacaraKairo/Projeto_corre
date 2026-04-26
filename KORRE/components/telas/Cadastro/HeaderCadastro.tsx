// MeuCorre/components/telas/Cadastro/HeaderCadastro.tsx
import React from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';

import { headerStyles } from '../../../styles/generated/components/telas/Cadastro/HeaderCadastroStyles';
interface HeaderProps {
  tipoVeiculo?: any;
}

export const HeaderCadastro: React.FC<HeaderProps> = () => {
  return (
    <View style={headerStyles.header}>
      {/* Container que faz o corte (Crop) */}
      <View style={headerStyles.imageCropContainer}>
        <Image
          source={require('../../../assets/images/android-icon-monochrome.png')}
          style={headerStyles.logoAumentada}
          resizeMode="cover" // Mudado para cover para preencher a área antes do corte
        />
      </View>
      <Text style={headerStyles.subtitulo}>
        Configure seu perfil e assuma o controle do seu
        corre.
      </Text>
    </View>
  );
};


