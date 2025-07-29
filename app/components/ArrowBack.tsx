import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ArrowLeft } from "phosphor-react-native";

interface ArrowBackProps {
    onPress: () => void;
}

const ArrowBack: React.FC<ArrowBackProps> = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.arrowButton}>
              <ArrowLeft size={32} color="#8B4513" weight="regular"/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    arrowButton: {
        alignSelf: 'flex-start',
        marginTop: 10,
      },
});

export default ArrowBack;
