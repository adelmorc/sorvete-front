import { Alert, FlatList, Pressable, StatusBar } from "react-native";
import { Text, View,} from "react-native";
import styles from "./style";
import { At, Phone, Building, PencilLine, Trash } from 'phosphor-react-native';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "@/app/components/Footer";
import NavLogo from "@/app/components/NavLogo";
import SearchGlass from "@/app/components/SearchGlass";
import { API_BASE_URL } from "@env";


interface Fornecedores {
  id: number;
  nome: String;
  cnpj: string;
  telefone: string;
  email_pessoal: string;
}

export default function ListSupplier() {

  const [fornecedores, setFornecedores] = useState<Fornecedores[]>([]);;
  const router = useRouter();

  useEffect(() => {
    async function fetchFornecedor() {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/fornecedores/list/`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
          },
        }); 
        const data: Fornecedores[] = await response.json();
        setFornecedores(data);
      } catch (error) {
        console.error("Erro ao buscar lista de fornecedores:", error);
      }
    }

    fetchFornecedor();
  }, []);

  async function deleteItem(id: number) {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/fornecedores/${id}/`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        setFornecedores(prev => prev.filter(fornecedor => fornecedor.id !== id));
      } else {
        Alert.alert('Atenção', 'Erro ao tentar deletar item.')
      }
    } catch (error) {
      console.error("Erro ao deletar fornecedor: ", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  }

  const navegacao = (path: string) => {
    router.push(path as `/#${string}`);
  };

  return (
    <View style={{ flex: 1 }}>
        <NavLogo title={'FORNECEDORES'} logo={false}/>
        <View style={styles.container}>
          <StatusBar />

          <SearchGlass title="Buscar fornecedor" />
          
          <FlatList
          data={fornecedores}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardInfoTitle}>{item.nome}</Text>
                <Text style={styles.cardInfoSubTitle}><Building size={18} color="#8B4513" /> {item.cnpj}</Text>
                <Text style={styles.cardInfoSubTitle}><At size={18} color="#8B4513"  /> {item.email_pessoal}</Text>
                <Text style={styles.cardInfoSubTitle}><Phone size={18} color="#8B4513"  /> {item.telefone}</Text>
              </View>
              
              <View style={styles.cardEdit}>
                <Pressable onPress={() => router.push({pathname:`/screens/supplier/EditSupplier`, params: {id: item.id}})}>
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
      <Footer onHomePress={() => navegacao('/screens/home/home')} onAddPress={() => navegacao('/screens/supplier/NewSupplier')} />
    </View>

  );
}