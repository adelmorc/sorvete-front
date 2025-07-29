import { Alert } from "react-native";

export default async function BuscarCep(cep: string) {
    if (cep.length !== 8 || isNaN(Number(cep))) {
        Alert.alert("Atenção", "CEP inválido. Digite apenas números.");
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.cep) {
            return data;
        } else {
            Alert.alert("Atenção", "CEP não encontrado.");
        }
    } catch (error) {
        console.log("Erro ao buscar CEP.");
    }
}