import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Plus, House, Minus, } from "phosphor-react-native";

interface FooterStockProps {
    onInputPress: () => void;
    onHomePress: () => void;
    onOutputPress: () => void;
}

const FooterStock: React.FC<FooterStockProps> = ({  onInputPress, onHomePress, onOutputPress }) => {
    return (
        <View style={styles.navBar}>
          <View style={styles.navbarItem}>
            <TouchableOpacity style={styles.router} onPress={onInputPress}>
              <Plus size={25} color="#8B4513" />
              <Text style={styles.routerTitle}>Entrada</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.navbarItem}>
            <TouchableOpacity style={styles.router} onPress={onHomePress}>
              <House size={25} color="#8B4513" />
              <Text style={styles.routerTitle}>Início</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.navbarItem}>
            <TouchableOpacity style={styles.router} onPress={onOutputPress}>
              <Minus size={25} color="#8B4513" />
              <Text style={styles.routerTitle}>Saída</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#F3E5AB',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
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
    width: 1, 
    height: '80%', 
    backgroundColor: '#8B4513', 
  },
});

export default FooterStock;
