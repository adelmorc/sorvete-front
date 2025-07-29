import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { House, Plus } from "phosphor-react-native";

interface FooterProps {
    onHomePress: () => void;
    onAddPress: () => void;
}

const Footer: React.FC<FooterProps> = ({ onHomePress, onAddPress }) => {
    return (
        <View style={styles.navBar}>
          <View style={styles.navbarItem}>
            <TouchableOpacity style={styles.router} onPress={onHomePress}>
              <House size={25} color="#8B4513" />
              <Text style={styles.routerTitle}>Início</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.navbarItem}>
            <TouchableOpacity style={styles.router} onPress={onAddPress}>
              <Plus size={25} color="#8B4513" />
              <Text style={styles.routerTitle}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute', // Fixa no rodapé
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#F3E5AB',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  navbarItem: {
    width: 100,
    height: 40,
  },
  router: {
    flexDirection: 'column', 
    alignItems: 'center',
  },
  routerTitle: {
    color: '#8B4513',
    fontSize: 14,
    fontWeight: 600,
  },
  verticalLine: {
    width: 2, 
    height: '70%', 
    backgroundColor: '#8B4513', 
  },
});

export default Footer;
