import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import styles from "./style";
import { User, LockKey } from 'phosphor-react-native';
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from '@env';


export default function Login(){

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    async function handleLogin() {
        try {
            const response = await fetch(`${API_BASE_URL}/usuarios/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem("token", data.access);
                await AsyncStorage.setItem("refresh_token", data.refresh);
                router.navigate('/screens/home/home')
            } else {
                Alert.alert("Erro", data.details || "Credenciais inválidas");
            }
        } catch (error) {
            console.error("Erro ao fazer login: ", error);
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }

    return(
        <View style={styles.container}>
            <Image source={require('@/app/assets/images/JMATOS-AndroidApp.png')} style={styles.imagelogo} />
            <Image source={require('@/app/assets/images/picole-login.png')} style={styles.image} />
            <View style={styles.content}>
                <View style={styles.contentInput}>
                    <View style={styles.contentLabel}>
                        <User size={32} color="#8B4513" />
                        <Text style={styles.label}>Usuário</Text>
                    </View>
                    <TextInput 
                        placeholder="Digite seu usuário"
                        placeholderTextColor={'#8B4513'}
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
                        placeholder="Digite sua senha"
                        placeholderTextColor={'#8B4513'}
                        style={styles.input} 
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
            </View>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>ENTRAR</Text>
            </TouchableOpacity>
        </View>
    );
}