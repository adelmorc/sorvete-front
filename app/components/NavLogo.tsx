import React from "react";
import {View, Image, StyleSheet, TouchableOpacity, Alert, Text} from "react-native";
import {SignOut, UserPlus} from 'phosphor-react-native';
import {useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@env";

interface NavLogoProps {
    title: String;
    logo: boolean;
}

const NavLogo: React.FC<NavLogoProps> = ({title, logo}) => {

    const router = useRouter();

    async function logout() {
        try {
            const token = await AsyncStorage.getItem("token");
            const refresh_token = await AsyncStorage.getItem("refresh_token");

            if (!token || !refresh_token) {
                Alert.alert("Erro", "Nenhum token encontrado.");
                return;
            }

            const response = await fetch(`${API_BASE_URL}/usuarios/logout/`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({refresh: refresh_token}),
            });

            if (response.ok) {
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('refresh_token');
                Alert.alert('Sucesso', 'Realizado com sucesso!');
                router.navigate('/screens/login/login')
            } else {
                Alert.alert("Erro", "Erro ao fazer logout.");
            }
        } catch (error) {
            console.error("Erro ao fazer logout: ", error);
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }

    const navegacao = (path: string) => {
        router.push(path as `/#${string}`);
    };


    let homeButtons = null;
    if (logo) {
        homeButtons = (
            <View style={styles.title}>
                <Text style={styles.textTitle}>{title}</Text>
                <TouchableOpacity onPress={logout} style={styles.logout}>
                    <SignOut size={25} color="#8B4513"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userPlus} onPress={() => navegacao('/screens/user/user')}>
                    <UserPlus size={25} color="#8B4513"/>
                </TouchableOpacity>
            </View>
        );
    } else {
        homeButtons = (
            <View style={styles.title}>
                <Text style={styles.textTitle}>{title}</Text>
            </View>
        );
    }

    return (
        <View>
            <View style={styles.navBar}>
                <Image source={require('@/app/assets/images/JMATOS-AndroidApp.png')} style={styles.image}/>
            </View>
            {homeButtons}
        </View>
    );

}

export default NavLogo;

const styles = StyleSheet.create({
    navBar: {
        width: '100%',
        height: 55,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        width: '100%',
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3E5AB',
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 500,
        color: "#8B4513",
    },
    image: {
        width: 192,
        height: 192,
    },
    userPlus: {
        position: 'absolute',
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logout: {
        position: 'absolute',
        left: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

