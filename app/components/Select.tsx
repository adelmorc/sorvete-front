import React, { useState } from "react";
import { View, TouchableOpacity, Text, Modal, FlatList, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { CaretDown, CaretLeft, Check } from "phosphor-react-native";



interface Option {
    nome: string;
    id: any;
  }
  
interface SelectProps {
    options: Option[];
    onChangeSelect: (value: any) => void;
    text: string;
    onOpen?: () => void;
}

const {width} = Dimensions.get('window');

const Select: React.FC<SelectProps> = ({ options, onChangeSelect, text, onOpen }) => {
    const [txt, setTxt] = useState(text);
    const [selected, setSelected] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    function renderOption(item: any) {
        return (
            <TouchableOpacity style={[styles.optionContainer, {backgroundColor: item.id === selected ? '#eee' : '#fff'}]} 
            onPress={() => {
                onChangeSelect(item.id);
                setTxt(item.nome);
                setModalVisible(false);
                setSelected(item.id);
                }}>
                <Text style={[styles.optionTxt, {fontWeight: item.id === selected ? 'bold' : 'normal'}]}>{item.nome}</Text>
                {item.id === selected && (
                    <Check size={26} color="green" />
                )}
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={() => {
                onOpen?.();
                setModalVisible(true);
            }}>
                <Text style={styles.txt} numberOfLines={1}>{txt}</Text>
                <CaretDown size={26} color="#8B4513" />
            </TouchableOpacity>
            <Modal 
                animationType="slide" 
                visible={modalVisible} 
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView>
                    <View style={styles.headerModal}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            < CaretLeft size={30} color="#8B4513" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>{text}</Text>
                        <TouchableOpacity  onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCancel}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={options ?? []} 
                        keyExtractor={item => String(item.id)}
                        renderItem={({item}) => renderOption(item)}
                        
                    />
                </SafeAreaView>
            </Modal>
        </View>


    );
};


const styles = StyleSheet.create({
    container: {
        height: 50,
        borderWidth: 1,
        borderColor: '#8B4513',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        width: '100%',
        backgroundColor: '#FFF5EE',
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    txt: {
        color: '#8B4513',
        fontSize: 16,
        width: width - 90,
    },
    headerModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingBottom: 12,
    },
    modalTitle: {
        fontSize: 18,
        color: '#555',
    },
    modalCancel: {
        fontSize: 18,
        color: 'blue',
        fontWeight: '600',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        padding: 10,
    },
    optionTxt: {
        fontSize: 16,
        color: '#555',
    }

})

export default Select;