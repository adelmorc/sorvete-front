import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, Alert, ScrollView} from 'react-native';
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./style";
import ArrowBack from "@/app/components/ArrowBack";
import Select from "@/app/components/Select"
import { API_BASE_URL } from "@env";

interface Produtos {
    id: number;
    nome: string;
}

interface Fornecedores {
    id: number;
    nome: string;
}

export default function InputStock(){

    const router = useRouter();
    
    const [produtos, setProdutos] = useState<Produtos[]>([]);
    const [fornecedores, setFornecedores] = useState<Fornecedores[]>([]);

    const [produtoId, setProdutoId] = useState(null);
    const [fornecedorId, setFornecedorId] = useState(null);

    const [quantidade, setQuantidade] = useState("");
    const [valor_total, setValorTotal] = useState("");
    const [fabricacao, setFabricacao] = useState("");
    const [validade, setValidade] = useState("");

    async function fetchProdutos() {
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
          console.error("Erro ao buscar registros:", error);
        }
    }

    async function fetchFornecedores() {
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
          console.error("Erro ao buscar registros:", error);
        }
    }

    function formatDate(dateStr: string): string {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
    }

    async function NewInput() {
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${API_BASE_URL}/estoque/entrada/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",  
                },
                body: JSON.stringify({
                    produto: produtoId,
                    fornecedor: fornecedorId,
                    quantidade: parseInt(quantidade),
                    valor_total: parseFloat(valor_total),
                    fabricacao: formatDate(fabricacao),
                    validade: formatDate(validade)
                })
            });

            const result = await response.json();
            if (response.ok) {
                router.push("/screens/stock/ListStock");
                Alert.alert("Sucesso", "Registro cadastrado com sucesso!");
            } else {
                Alert.alert("Erro", result.details || "Erro ao cadastrar nova entrada.");
                console.log("Erro na requisição:", result);
            }
        } catch (error) {
            console.error("Erro ao cadastrar entrada: ", error);
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }

    const navegacao = (path: string) => {
        router.push(path as `/#${string}`);
    };

    return(
        <View style={styles.container}>
            <StatusBar />
            <View style={styles.header}>
                <ArrowBack onPress={() => navegacao('/screens/stock/ListStock')} />
                <Text style={styles.enterText}>NOVA ENTRADA</Text>
            </View>
            <ScrollView style={{width: '100%'}}>
                <View style={styles.contentImage}>
                    <Image 
                        source={require('@/app/assets/images/picole-novo-produto.png')} 
                        style={styles.imageRegister} 
                    />
                </View>

                <View style={styles.content}>
                    <View style={styles.contentInputs}>
                        <View style={styles.contentInput}>
                            <Text style={styles.label}>Produto:</Text>
                                <Select
                                    onOpen={fetchProdutos}
                                    options={produtos}
                                    text="Selecione um produto"
                                    onChangeSelect={(val) => setProdutoId(val)}
                                />                            
                        </View>
                        <View style={styles.contentInput}>
                            <Text style={styles.label}>Fornecedor:</Text>
                            <Select
                                onOpen={fetchFornecedores}
                                options={fornecedores}
                                text="Selecione um fornecedor"
                                onChangeSelect={(val) => setFornecedorId(val)}
                            />
                        </View>
                        <View style={styles.contentInput}>
                            <Text style={styles.label}>Quantidade:</Text>
                            <TextInput 
                                value={quantidade}
                                onChangeText={setQuantidade}
                                placeholderTextColor={'#8B4513'}
                                style={styles.input} 
                            />
                        </View>
                        <View style={styles.contentInput}>
                            <Text style={styles.label}>Valor total:</Text>
                            <TextInput 
                                value={valor_total}
                                onChangeText={setValorTotal}
                                placeholderTextColor={'#8B4513'}
                                keyboardType="numeric"
                                style={styles.input} 
                            />
                        </View>
                        <View style={styles.contentInput}>
                            <Text style={styles.label}>Fabricação:</Text>
                            <TextInput 
                                value={fabricacao}
                                onChangeText={setFabricacao}
                                placeholderTextColor={'#8B4513'}
                                style={styles.input} 
                            />
                        </View>
                        <View style={styles.contentInput}>
                            <Text style={styles.label}>Validade:</Text>
                            <TextInput 
                                value={validade}
                                onChangeText={setValidade}
                                placeholderTextColor={'#8B4513'}
                                style={styles.input} 
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={NewInput}>
                    <Text style={styles.buttonText}>CADASTRAR</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
