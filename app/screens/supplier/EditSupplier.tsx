import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, Alert, ScrollView} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowBack from "@/app/components/ArrowBack";
import styles from "./style";
import { API_BASE_URL } from "@env";


interface Fornecedor {
    nome: string;
    cnpj: string;
    telefone: string;
    email_pessoal:string;
    cep: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
}

export default function EditSupplier(){

    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);

    useEffect(() => {
        async function getSupplier() {
          try {
            const token = await AsyncStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}/fornecedores/${id}/`, {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
              },
            }); 
            const data: Fornecedor = await response.json();
            setFornecedor(data);
          } catch (error) {
            console.error("Erro ao buscar fornecedor:", error);
          }
        }
    
        getSupplier();
      }, []);

    const handleChange = (field: keyof Fornecedor, value: string) => {
        if (!fornecedor) return;

        setFornecedor({
            ...fornecedor,
            [field]: value,
        });
    };

    async function UpdateSupplier() {

        try {

            const token = await AsyncStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}/fornecedores/${id}/`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",  
                },
                body: JSON.stringify(fornecedor)
            });

            const result = await response.json();
            if (response.ok) {
                Alert.alert("Sucesso", "Registro alterado com sucesso!");
                navegacao('/screens/supplier/ListSupplier')
            } else {
                Alert.alert("Erro", result.details || "Erro ao alterar dados do fornecedor.");
            }
        } catch (error) {
            console.error("Erro ao alterar fornecedor: ", error);
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
                <ArrowBack onPress={() => navegacao('/screens/supplier/ListSupplier')} />
                <Text style={styles.enterText}>EDITAR FORNECEDOR</Text>
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
                                value={fornecedor?.nome ?? ''} 
                                placeholderTextColor={'#8B4513'}
                                style={styles.input} 
                                onChangeText={(text) => handleChange("nome", text)}
                            />
                        </View>
                        <View style={styles.contentInput}>
                            <Text style={styles.label}>CNPJ:</Text>
                            <TextInput 
                                value={fornecedor?.cnpj ?? ''} 
                                placeholderTextColor={'#8B4513'}
                                style={styles.input} 
                                onChangeText={(text) => handleChange("cnpj", text)}
                            />
                        </View>
                        <View style={styles.contentInput}>
                            <Text style={styles.label}>Telefone:</Text>
                            <TextInput 
                                value={fornecedor?.telefone ?? ''} 
                                placeholderTextColor={'#8B4513'}
                                style={styles.input} 
                                onChangeText={(text) => handleChange("telefone", text)}
                            />
                        </View>
                        <View style={styles.contentInput}>
                            <Text style={styles.label}>E-mail:</Text>
                            <TextInput 
                                value={fornecedor?.email_pessoal ?? ''} 
                                placeholderTextColor={'#8B4513'}
                                style={styles.input} 
                                onChangeText={(text) => handleChange("email_pessoal", text)}
                            />
                        </View>
                        <View style={styles.contentInput}>
                            <Text style={styles.label}>CEP:</Text>
                            <TextInput 
                                value={fornecedor?.cep ?? ''} 
                                placeholderTextColor={'#8B4513'}
                                style={styles.input} 
                                onChangeText={(text) => handleChange("cep", text)}
                            />
                        </View>
                        <View style={styles.contentInput}>
                            <Text style={styles.label}>Endereço:</Text>
                            <TextInput 
                                value={fornecedor?.endereco ?? ''} 
                                placeholderTextColor={'#8B4513'}
                                style={styles.input} 
                                onChangeText={(text) => handleChange("endereco", text)}
                            />
                        </View>
                        <View style={styles.contentInput}>
                            <Text style={styles.label}>Número:</Text>
                            <TextInput 
                                value={fornecedor?.numero ?? ''} 
                                placeholderTextColor={'#8B4513'}
                                style={styles.input} 
                                onChangeText={(text) => handleChange("numero", text)}
                            />
                        </View>
                        <View style={styles.contentInput}>
                            <Text style={styles.label}>Complemento:</Text>
                            <TextInput 
                               value={fornecedor?.complemento ?? ''} 
                               placeholderTextColor={'#8B4513'}
                               style={styles.input} 
                               onChangeText={(text) => handleChange("complemento", text)}
                            />
                        </View>
                        <View style={styles.contentInput}>
                            <Text style={styles.label}>Cidade:</Text>
                            <TextInput 
                                value={fornecedor?.cidade ?? ''} 
                                placeholderTextColor={'#8B4513'}
                                style={styles.input} 
                                onChangeText={(text) => handleChange("cidade", text)}
                            />
                        </View>
                        <View style={styles.contentInput}>
                            <Text style={styles.label}>Bairro:</Text>
                            <TextInput 
                                value={fornecedor?.bairro ?? ''} 
                                placeholderTextColor={'#8B4513'}
                                style={styles.input} 
                                onChangeText={(text) => handleChange("bairro", text)}
                            />
                        </View>
                        <View style={styles.contentInput}>
                            <Text style={styles.label}>UF:</Text>
                            <TextInput 
                                value={fornecedor?.uf ?? ''} 
                                placeholderTextColor={'#8B4513'}
                                style={styles.input} 
                                onChangeText={(text) => handleChange("uf", text)}
                            />
                        </View>
                    </View>
                    
                
                    <TouchableOpacity onPress={UpdateSupplier} style={styles.button}>
                        <Text style={styles.buttonText}>CONFIRMAR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}