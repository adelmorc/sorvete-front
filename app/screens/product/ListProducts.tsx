import { Alert, FlatList, Pressable, StatusBar } from "react-native";
import { Text, View, Image } from "react-native";
import styles from "./style";
import { PencilLine, Trash } from 'phosphor-react-native';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "@/app/components/Footer";
import NavLogo from "@/app/components/NavLogo";
import SearchGlass from "@/app/components/SearchGlass";
import { API_BASE_URL } from "@env";


interface Produtos {
  id: number;
  nome: string;
  categoria: number;
  valor_compra: number;
  valor_venda: number;
  unidade: number;
  imagem: string;
}

export default function ListProducts() {

  const [produtos, setProdutos] = useState<Produtos[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduto() {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/produtos/list/`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
          },
        }); 
        const data: Produtos[] = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProduto();
  }, []);

  async function deleteItem(id: number) {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/produtos/${id}/`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        setProdutos(prev => prev.filter(produto => produto.id !== id));
      } else {
        Alert.alert('Atenção', 'Erro ao tentar deletar item.')
      }
    } catch (error) {
      console.error("Erro ao deletar produto: ", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  }

  const navegacao = (path: string) => {
    router.push(path as `/#${string}`);
  };

  return (
    <View style={{ flex: 1 }}>
      <NavLogo title={'PRODUTOS'} logo={false}/>
        <View style={styles.container}>
          <StatusBar />
          
          <SearchGlass title="Buscar produto" />

          <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => (
            <View id={`produto-${item.id}`} style={styles.card}>
              <Image style={styles.cardImage} source={{ uri: `${API_BASE_URL}${item.imagem}` }} resizeMode="contain" />
              <View style={styles.verticalLine} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardInfoTitle}>{ item.nome }</Text>
                <Text style={styles.cardInfoSubTitle}>COMPRA: R${ item.valor_compra}</Text>
                <Text style={styles.cardInfoSubTitle}>VENDA: R${ item.valor_venda}</Text>
              </View>
              <View style={styles.cardPeso}>
                <Text style={{color: '#8B4513',fontSize: 20, fontWeight: 800,}}>55g</Text>
              </View>

              <View style={styles.cardEdit}>
                <Pressable onPress={() => router.push({pathname: '/screens/product/EditProduct', params: {id: item.id}})}>
                  <PencilLine size={20}/>
                </Pressable>
              </View>
              <View style={styles.cardDelete}>
                <Pressable onPress={() => deleteItem(item.id)}>
                  <Trash size={20}/>
                </Pressable>
              </View>
              
            </View>
          )}
          />
        </View>

      <Footer onHomePress={() => navegacao('/screens/home/home')} onAddPress={() => navegacao('/screens/product/NewProduct')} />
    </View>
  );
}
