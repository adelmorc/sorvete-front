import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, Alert , ScrollView} from 'react-native';
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowBack from "@/app/components/ArrowBack";
import styles from "./style";
import { API_BASE_URL } from "@env";


interface Produto {
    id: number;
    nome: string;
    valor_compra: number;
    valor_venda: number;
    unidade: number;
    imagem: string;
}

export default function EditProduct(){

    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [produto, setProduto] = useState<Produto | null>(null);

    useEffect(() => {
        async function getProduct() {
          try {
            const token = await AsyncStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}/produtos/${id}/`, {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
              },
            }); 
            const data: Produto = await response.json();
            setProduto(data);
          } catch (error) {
            console.error("Erro ao buscar produtos:", error);
          }
        }
    
        getProduct();
      }, []);

    const handleChange = (field: keyof Produto, value: string) => {
        if (!produto) return;

        setProduto({
            ...produto,
            [field]: value,
        });
    };

    async function UpdateProduct() {

        if (!produto) {
            Alert.alert("Erro", "Produto não carregado.");
            return;
        }

        try {

            const formData = new FormData();
                formData.append("nome", produto.nome);
                formData.append("valor_compra", String(produto.valor_compra));
                formData.append("valor_venda", String(produto.valor_venda));
                formData.append("unidade", String(produto.unidade));

                if (produto.imagem && produto.imagem.startsWith("file://")) {
                formData.append("imagem", {
                    uri: produto.imagem,
                    name: "foto.jpg",
                    type: "image/jpeg"
                } as any);
            }

            const token = await AsyncStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}/produtos/${id}/`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",  
                },
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                Alert.alert("Sucesso", "Registro alterado com sucesso!");
                navegacao('/screens/product/ListProducts')
            } else {
                Alert.alert("Erro", result.details || "Erro ao alterar dados do produto.");
            }
        } catch (error) {
            console.error("Erro ao alterar produto: ", error);
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
                <ArrowBack onPress={() => navegacao('/screens/product/ListProducts')} />
                <Text style={styles.enterText}>EDITAR PRODUTO</Text>
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
                                <Text style={styles.label}>Nome:</Text>
                                <TextInput 
                                    value={produto?.nome ?? ''} 
                                    placeholderTextColor={'#8B4513'}
                                    style={styles.input} 
                                    onChangeText={(text) => handleChange("nome", text)}
                                />
                            </View>
                            <View style={styles.contentInput}>
                                <Text style={styles.label}>Valor de compra:</Text>
                                <TextInput 
                                    value={produto?.valor_compra ? String(produto.valor_compra) : ''} 
                                    keyboardType="numeric"
                                    placeholderTextColor={'#8B4513'}
                                    style={styles.input} 
                                    onChangeText={(text) => handleChange("valor_compra", text)}
                                />
                            </View>
                            <View style={styles.contentInput}>
                                <Text style={styles.label}>Valor de venda:</Text>
                                <TextInput 
                                    value={produto?.valor_venda ? String(produto.valor_venda) : ''} 
                                    placeholderTextColor={'#8B4513'}
                                    keyboardType="numeric"
                                    style={styles.input} 
                                    onChangeText={(text) => handleChange("valor_venda", text)}
                                />
                            </View>
                            <View style={styles.contentInput}>
                                <Text style={styles.label}>Unidade (Medida):</Text>
                                <TextInput 
                                    value={produto?.unidade ? String(produto.unidade) : ''}
                                    placeholderTextColor={'#8B4513'}
                                    style={styles.input} 
                                    onChangeText={(text) => handleChange("unidade", text)}
                                />
                            </View>
                        </View>

                        {/* <TouchableOpacity style={styles.imageButtonContainer}>
                            <Text style={styles.imageButton}>Escolher Imagem</Text>
                        </TouchableOpacity> */}
                    </View>

                    <TouchableOpacity onPress={UpdateProduct}  style={styles.button}>
                        <Text style={styles.buttonText}>CONFIRMAR</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

        );
    
}
