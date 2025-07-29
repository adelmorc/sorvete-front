import { FlatList, StatusBar } from "react-native";
import { Text, View, ScrollView, Image } from "react-native";
import styles from "./style";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FooterStock from "@/app/components/FooterStock";
import NavLogo from "@/app/components/NavLogo";
import SearchGlass from "@/app/components/SearchGlass";
import { API_BASE_URL } from "@env";


interface Produto {
  id: number;
  nome: string;
  categoria: number;
  valor_compra: number;
  valor_venda: number;
  unidade: number;
  imagem: string;
}

interface Fornecedor {
  id: number;
  nome: string;
}

interface Entrada {
  id: number;
  produto: Produto;
  fornecedor: Fornecedor;
  quantidade: string;
  valor_total: number;
  fabricacao: string;
  validade: string;
  tipo: 'E'
}

interface Saida {
  id: number;
  produto: Produto;
  quantidade: string;
  valor_total: number;
  destino: string;
  tipo: 'S';
}

type Resgistro = Entrada | Saida;

export default function ListStock() {

  const [registros, setRegistros] = useState<Resgistro[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchEstoque() {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/estoque/list/`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
          },
        }); 

        const data: Resgistro[] = await response.json();
        setRegistros(data);
      } catch (error) {
        console.error("Erro ao buscar registros:", error);
      }
    }

    fetchEstoque();
  }, []);

  const navegacao = (path: string) => {
    router.push(path as `/#${string}`);
  };

  return (
    <View style={{ flex: 1 }}>
      <NavLogo title={'ENTRADA/SAÍDA'} logo={false}/>
        <View style={styles.container}>
          <StatusBar />
          
          <SearchGlass title="Buscar entrada/saída" />

          <FlatList
          data={registros}
          keyExtractor={(item) => `${item.tipo}-${item.id}`} 
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image style={styles.cardImage} source={{ uri: `${API_BASE_URL}${item.produto.imagem}` }} resizeMode="contain" />
              <View style={styles.verticalLine} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardInfoTitle}>{item.produto.nome}</Text>
                <Text style={styles.cardInfoSubTitle}>{item.tipo === 'E' ? `FORN: ${item.fornecedor.nome}` : `DEST: ${item.destino}`}</Text>
                {item.tipo === 'E' && (
                  <>
                    <Text style={styles.cardInfoSubTitle}>F: {item.fabricacao}</Text>
                    <Text style={styles.cardInfoSubTitle}>V: {item.validade}</Text>
                  </>
                )}

                <Text style={{color: item.tipo === 'E' ? '#18a689' : '#ff0000',fontSize: 12, fontWeight: 800,}}>{item.tipo === 'E' ? 'ENTRADA' : 'SAÍDA'}</Text>

              </View>
              <View style={styles.cardPreco}>
                <Text style={{color: '#8B4513',fontSize: 18, fontWeight: 800,}}>R${item.valor_total}</Text>
              </View>
              <View style={styles.cardQTd}>
                  <Text style={{color: '#8B4513',fontSize: 18, fontWeight: 800,}}>{parseFloat(item.quantidade)}cx</Text>
              </View>
            </View>
          )}
          />
        </View>

      <FooterStock onInputPress={() => navegacao('/screens/stock/InputStock')} onHomePress={() =>  navegacao('/screens/home/home')} onOutputPress={() => navegacao('/screens/stock/OutputStock')} />
    </View>
  );
}