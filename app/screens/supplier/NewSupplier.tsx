import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, Alert, ScrollView} from 'react-native';
import styles from "./style";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowBack from "@/app/components/ArrowBack";
import  BuscarCep  from "@/app/components/Apis";
import { API_BASE_URL } from "@env";

interface FormData {
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

export default function NewSupplier(){

    const [formData, setFormData] = useState<FormData>({
        nome: "",
        cnpj: "",
        telefone: "",
        email_pessoal:"",
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
    });
    const [erro, setErro] = useState("");

    const handleChange = async (name: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "cep" && value.length === 8) {
            try {
                const dados = await BuscarCep(value);
                setFormData((prev) => ({
                ...prev,
                endereco: dados.logradouro,
                bairro: dados.bairro,
                cidade: dados.localidade,
                uf: dados.uf,
                }));
                setErro("");
            } catch (error) {
                const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido ao buscar o CEP";
                setErro(mensagemErro);
                Alert.alert("Erro", mensagemErro);
            }
        }
    }

    const router = useRouter();
  
    async function fetchNewSupplier() {
        try {
            const token = await AsyncStorage.getItem("token");

            const response = await fetch(`${API_BASE_URL}/fornecedores/list/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();
            if (response.status === 201) {
                router.navigate("/screens/supplier/ListSupplier")
                Alert.alert("Sucesso", "Registro cadastrado com sucesso.")
            } else {
                Alert.alert("Erro", data.details || "Erro ao cadastrar novo fornecedor");
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }

    function handleSupplier() {
        router.navigate('/screens/supplier/ListSupplier');
    }

    return(
        <View style={styles.container}>
            <StatusBar />
            <View style={styles.header}>
                <ArrowBack onPress={handleSupplier} />
                <Text style={styles.enterText}>NOVO FORNECEDOR</Text>
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
                            value={formData.nome}
                            onChangeText={(text) => handleChange("nome", text)}
                            style={styles.input} 
                        />
                    </View>
                    <View style={styles.contentInput}>
                        <Text style={styles.label}>CNPJ:</Text>
                        <TextInput 
                            value={formData.cnpj}
                            onChangeText={(text) => handleChange("cnpj", text)}
                            style={styles.input} 
                        />
                    </View>
                    <View style={styles.contentInput}>
                        <Text style={styles.label}>Telefone:</Text>
                        <TextInput 
                            value={formData.telefone}
                            onChangeText={(text) => handleChange("telefone", text)}
                            style={styles.input} 
                        />
                    </View>
                    <View style={styles.contentInput}>
                        <Text style={styles.label}>E-mail:</Text>
                        <TextInput 
                            value={formData.email_pessoal}
                            onChangeText={(text) => handleChange("email_pessoal", text)}
                            style={styles.input} 
                        />
                    </View>
                    <View style={styles.contentInput}>
                        <Text style={styles.label}>CEP:</Text>
                        <TextInput 
                            value={formData.cep}
                            onChangeText={(text) => handleChange("cep", text)}
                            keyboardType="numeric"
                            style={styles.input} 
                        />
                    </View>
                    <View style={styles.contentInput}>
                        <Text style={styles.label}>Endereço:</Text>
                        <TextInput 
                            value={formData.endereco}
                            editable={false}
                            style={styles.input} 
                        />
                    </View>
                    <View style={styles.contentInput}>
                        <Text style={styles.label}>Número:</Text>
                        <TextInput 
                            value={formData.numero}
                            onChangeText={(text) => handleChange("numero", text)}
                            style={styles.input} 
                        />
                    </View>
                    <View style={styles.contentInput}>
                        <Text style={styles.label}>Complemento:</Text>
                        <TextInput 
                            value={formData.complemento}
                            onChangeText={(text) => handleChange("complemento", text)}
                            style={styles.input} 
                        />
                    </View>
                    <View style={styles.contentInput}>
                        <Text style={styles.label}>Cidade:</Text>
                        <TextInput 
                            value={formData.cidade}
                            editable={false}
                            style={styles.input} 
                        />
                    </View>
                    <View style={styles.contentInput}>
                        <Text style={styles.label}>Bairro:</Text>
                        <TextInput 
                        value={formData.bairro}
                        editable={false}
                        style={styles.input} 
                    />
                    </View>
                    <View style={styles.contentInput}>
                        <Text style={styles.label}>UF:</Text>
                        <TextInput 
                            value={formData.uf}
                            editable={false}
                            style={styles.input} 
                        />
                    </View>
                </View>

                <TouchableOpacity onPress={fetchNewSupplier} style={styles.button}>
                    <Text style={styles.buttonText}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    );
}