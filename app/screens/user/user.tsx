import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, Alert} from 'react-native';
import styles from "./style";
import { User, LockKey, Check } from 'phosphor-react-native';
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowBack from "@/app/components/ArrowBack";
import { API_BASE_URL } from "@env";


export default function NewUser(){

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();
  
    async function handleNewUser() {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}/usuarios/list/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user,
                    password: password,
                    confirmPassword: confirmPassword,
                })
            });
            
            const data = await response.json();
            if (response.ok) {
                router.navigate('/screens/home/home')
                Alert.alert("Sucesso", "Usuário cadastrado com sucesso.")
            } else {
                Alert.alert("Erro", data.details || "Erro ao cadastrar novo usuário");
            }
        } catch (error) {
            console.error("Erro ao fazer login: ", error);
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
                <ArrowBack onPress={() => navegacao('/screens/home/home')} />
                <Text style={styles.enterText}>NOVO USUÁRIO</Text>
            </View>

            <View style={styles.contentImage}>
                <Image 
                    source={require('@/app/assets/images/picole-login.png')} 
                    style={styles.imageRegister} 
                />
            </View>

            <View style={styles.content}>
                <View style={styles.contentInput}>
                    <View style={styles.contentLabel}>
                        <User size={32} color="#8B4513" />
                        <Text style={styles.label}>Nome Usuário</Text>
                    </View>
                    <TextInput 
                        style={styles.input} 
                        value={user}
                        onChangeText={setUser}
                    />
                </View>
                <View style={styles.contentInput}>
                    <View style={styles.contentLabel}>
                        <LockKey size={32} color="#8B4513" />
                        <Text style={styles.label}>Senha</Text>
                    </View>
                    <TextInput 
                        secureTextEntry
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword} 
                    />
                </View>
                <View style={styles.contentInput}>
                    <View style={styles.contentLabel}>
                        <Check size={32} color="#8B4513" />
                        <Text style={styles.label}>Confimar Senha</Text>
                    </View>
                    <TextInput 
                        secureTextEntry
                        style={styles.input} 
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={handleNewUser} style={styles.button}>
                <Text style={styles.buttonText}>CONFIRMAR</Text>
            </TouchableOpacity>
        </View>
    );
}