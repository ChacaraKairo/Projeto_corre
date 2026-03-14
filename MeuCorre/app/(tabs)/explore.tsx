import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {
  Database,
  RefreshCw,
  Trash2,
} from 'lucide-react-native';
import db from '../../database/DatabaseInit';

export default function DatabaseViewerScreen() {
  const [tabelas, setTabelas] = useState<string[]>([]);
  const [tabelaSelecionada, setTabelaSelecionada] =
    useState<string | null>(null);
  const [dados, setDados] = useState<any[]>([]);
  const [colunas, setColunas] = useState<string[]>([]);

  // Carregar lista de tabelas ao abrir
  useEffect(() => {
    carregarTabelas();
  }, []);

  // Carregar dados quando uma tabela é selecionada
  useEffect(() => {
    if (tabelaSelecionada) {
      carregarDadosTabela(tabelaSelecionada);
    }
  }, [tabelaSelecionada]);

  const carregarTabelas = async () => {
    try {
      const resultado: any[] = await db.getAllAsync(
        "SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence' AND name != 'android_metadata'",
      );
      setTabelas(resultado.map((item) => item.name));
      if (resultado.length > 0 && !tabelaSelecionada) {
        setTabelaSelecionada(resultado[0].name);
      }
    } catch (error) {
      console.error('Erro ao listar tabelas:', error);
    }
  };

  const carregarDadosTabela = async (
    nomeTabela: string,
  ) => {
    try {
      const resultado: any[] = await db.getAllAsync(
        `SELECT * FROM ${nomeTabela}`,
      );
      setDados(resultado);

      if (resultado.length > 0) {
        setColunas(Object.keys(resultado[0]));
      } else {
        setColunas([]);
      }
    } catch (error) {
      console.error(
        `Erro ao ler tabela ${nomeTabela}:`,
        error,
      );
      setDados([]);
    }
  };

  const limparTabela = async () => {
    if (!tabelaSelecionada) return;

    Alert.alert(
      'Limpar Tabela',
      `Tem certeza que deseja apagar todos os dados de ${tabelaSelecionada}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar Tudo',
          style: 'destructive',
          onPress: async () => {
            await db.runAsync(
              `DELETE FROM ${tabelaSelecionada}`,
            );
            carregarDadosTabela(tabelaSelecionada);
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Database size={24} color="#00C853" />
        <Text style={styles.title}>Inspetor de Dados</Text>
        <TouchableOpacity
          onPress={() =>
            tabelaSelecionada &&
            carregarDadosTabela(tabelaSelecionada)
          }
        >
          <RefreshCw size={20} color="#00C853" />
        </TouchableOpacity>
      </View>

      {/* Lista Horizontal de Tabelas */}
      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {tabelas.map((tabela) => (
            <TouchableOpacity
              key={tabela}
              style={[
                styles.tabButton,
                tabelaSelecionada === tabela &&
                  styles.tabButtonActive,
              ]}
              onPress={() => setTabelaSelecionada(tabela)}
            >
              <Text
                style={[
                  styles.tabText,
                  tabelaSelecionada === tabela &&
                    styles.tabTextActive,
                ]}
              >
                {tabela}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Cabeçalho da Tabela e Ações */}
      <View style={styles.actionsBar}>
        <Text style={styles.infoText}>
          {dados.length} registros em {tabelaSelecionada}
        </Text>
        <TouchableOpacity
          onPress={limparTabela}
          style={styles.deleteButton}
        >
          <Trash2 size={16} color="#FF4444" />
          <Text style={styles.deleteText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Dados (JSON Viewer Simples) */}
      <FlatList
        data={dados}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhum registro encontrado.
          </Text>
        }
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.cardIndex}>
              #{index + 1}
            </Text>
            {Object.keys(item).map((key) => (
              <View key={key} style={styles.row}>
                <Text style={styles.key}>{key}:</Text>
                <Text style={styles.value}>
                  {String(item[key])}
                </Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  tabContainer: {
    height: 50,
    marginBottom: 10,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#202020',
    justifyContent: 'center',
    height: 40,
  },
  tabButtonActive: {
    backgroundColor: '#00C853',
  },
  tabText: {
    color: '#888',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#0A0A0A',
  },
  actionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  infoText: {
    color: '#666',
    fontSize: 12,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deleteText: {
    color: '#FF4444',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#161616',
    marginHorizontal: 20,
    marginTop: 10,
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#00C853',
  },
  cardIndex: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: '#333',
    fontWeight: 'bold',
    fontSize: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  key: {
    color: '#888',
    fontWeight: 'bold',
    marginRight: 6,
    fontSize: 12,
  },
  value: {
    color: '#EEE',
    fontSize: 12,
    flex: 1,
  },
  emptyText: {
    color: '#555',
    textAlign: 'center',
    marginTop: 50,
  },
});
