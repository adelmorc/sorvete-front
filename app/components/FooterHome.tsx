import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { UsersThree, Package, Popsicle, } from "phosphor-react-native";

interface FooterHomeProps {
  onSupplierPress: () => void;
  onProductPress: () => void;
  onStockPress: () => void;
}

const FooterHome: React.FC<FooterHomeProps> = ({ onSupplierPress, onProductPress, onStockPress }) => {
    return (
        <View style={styles.navBar}>
            <View style={styles.navbarItem}>
              <TouchableOpacity style={styles.router} onPress={onSupplierPress}>
                  <UsersThree size={25} color="#8B4513" />
                  <Text style={styles.routerTitle}>Fornecedores</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.navbarItem}>
              <TouchableOpacity style={styles.router} onPress={onProductPress}>
                  <Popsicle size={25} color="#8B4513" />
                  <Text style={styles.routerTitle}>Produtos</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.navbarItem}>
              <TouchableOpacity style={styles.router} onPress={onStockPress}>
                  <Package size={25} color="#8B4513" />
                  <Text style={styles.routerTitle}>Estoque</Text>
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
    flex: 1,
  },
  routerTitle: {
    color: '#8B4513',
    fontSize: 12,
    fontWeight: "600",
  },
  verticalLine: {
    width: 1, 
    height: '60%', 
    backgroundColor: '#8B4513', 
  },
});

export default FooterHome;
