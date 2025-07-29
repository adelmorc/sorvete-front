import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./style";
import { useRouter } from "expo-router";
import ArrowBack from "@/app/components/ArrowBack";
import { API_BASE_URL } from "@env";

export default function NewProduct() {
    const router = useRouter();
    
    const [nome, setNome] = useState("");
    const [valorCompra, setValorCompra] = useState("");
    const [valorVenda, setValorVenda] = useState("");
    const [unidade, setUnidade] = useState("");
    const [imagem, setImagem] = useState<string | null>(null);
    const [imagemNome, setImagemNome] = useState<string | null>(null);

    useEffect(() => {
        const requestPermission = async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permissão necessária", "Precisamos de acesso à sua galeria.");
            }
        };

        requestPermission();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const filePath = result.assets[0].uri;
            setImagem(filePath);
            
            const fileName = filePath.split('/').pop() || ""; 
            setImagemNome(fileName);
        }
    };

    async function NewProduct() {
        const token = await AsyncStorage.getItem("token");

        let formData = new FormData();
        formData.append("nome", nome);
        formData.append("valor_compra", valorCompra);
        formData.append("valor_venda", valorVenda);
        formData.append("unidade", unidade);

        if (imagem) {
            formData.append("imagem", {
                uri: imagem,
                name: "produto.jpg",
                type: "image/jpeg"
            } as any);
        }

        try {
            const response = await fetch(`${API_BASE_URL}/produtos/list/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",  
                },
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
            } else {
                Alert.alert("Erro", result.details || "Erro ao cadastrar produto.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar produto: ", error);
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }

    const navegacao = (path: string) => {
        router.push(path as `/#${string}`);
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <View style={styles.header}>
                <ArrowBack onPress={() => navegacao('/screens/product/ListProducts')} />
                <Text style={styles.enterText}>CADASTRAR PRODUTO</Text>
            </View>

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
                            style={styles.input} 
                            value={nome}
                            onChangeText={setNome}
                        />
                    </View>
                    <View style={styles.contentInput}>
                        <Text style={styles.label}>Valor de compra:</Text>
                        <TextInput 
                            keyboardType="numeric"
                            style={styles.input} 
                            value={valorCompra}
                            onChangeText={setValorCompra}
                        />
                    </View>
                    <View style={styles.contentInput}>
                        <Text style={styles.label}>Valor de venda:</Text>
                        <TextInput 
                            keyboardType="numeric"
                            style={styles.input} 
                            value={valorVenda}
                            onChangeText={setValorVenda}
                        />
                    </View>
                    <View style={styles.contentInput}>
                        <Text style={styles.label}>Unidade (Medida):</Text>
                        <TextInput
                            style={styles.input} 
                            value={unidade}
                            onChangeText={setUnidade}
                        />
                    </View>
                </View>

                <TouchableOpacity onPress={pickImage} style={styles.imageButtonContainer}>
                    <Text style={styles.imageButton}>
                        {imagemNome ? "Imagem Selecionada: " + imagemNome : "Escolher Imagem"}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={NewProduct} style={styles.button}>
                <Text style={styles.buttonText}>CADASTRAR</Text>
            </TouchableOpacity>
        </View>
    );
}
