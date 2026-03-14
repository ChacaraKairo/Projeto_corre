import React from 'react';
import { View, Text } from 'react-native';
import {
  Clock,
  TrendingUp,
  TrendingDown,
} from 'lucide-react-native';
import { dashboardStyles as styles } from '../../../styles/telas/Dashboard/dashboardStyles';

interface Movimentacao {
  id: number;
  tipo: 'ganho' | 'despesa';
  valor: number;
  categoria: string;
  hora: string;
}

export const UltimasMovimentacoes = ({
  dados,
}: {
  dados: Movimentacao[];
}) => (
  <View style={{ marginTop: 24, paddingBottom: 100 }}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Clock size={16} color="#00C853" />
        <Text style={styles.labelSecaoNegrito}>
          ÚLTIMOS REGISTOS
        </Text>
      </View>
      <Text style={styles.btnVerTudo}>Ver Tudo</Text>
    </View>

    <View style={styles.containerLista}>
      {dados.length === 0 ? (
        <Text style={styles.textoVazio}>
          Nenhum registo hoje.
        </Text>
      ) : (
        dados.map((item) => (
          <View
            key={item.id}
            style={styles.itemMovimentacao}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <View
                style={[
                  styles.miniBadgeIcone,
                  item.tipo === 'ganho'
                    ? styles.bgVerdeTrans
                    : styles.bgVermelhoTrans,
                ]}
              >
                {item.tipo === 'ganho' ? (
                  <TrendingUp size={16} color="#00C853" />
                ) : (
                  <TrendingDown size={16} color="#F44336" />
                )}
              </View>
              <View>
                <Text style={styles.txtCategoria}>
                  {item.categoria}
                </Text>
                <Text style={styles.txtHora}>
                  {item.hora}
                </Text>
              </View>
            </View>
            <Text
              style={[
                styles.txtValorItem,
                item.tipo === 'ganho'
                  ? styles.colorVerde
                  : styles.colorVermelho,
              ]}
            >
              {item.tipo === 'ganho' ? '+' : '-'} R${' '}
              {item.valor.toFixed(2)}
            </Text>
          </View>
        ))
      )}
    </View>
  </View>
);
