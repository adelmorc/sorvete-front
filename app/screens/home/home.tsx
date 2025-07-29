import { TouchableOpacity, StatusBar, Alert } from "react-native";
import { View } from "react-native";
import styles from "./style";
import { UserPlus } from 'phosphor-react-native';
import { useRouter } from "expo-router";
import FooterHome from "@/app/components/FooterHome";
import NavLogo from "@/app/components/NavLogo";

export default function Home() {

  const router = useRouter();
  
  const navegacao = (path: string) => {
    router.push(path as `/#${string}`);
  };

  return (
    <View style={{flex: 1}}>
      <NavLogo title={''} logo={true}/>
      <View style={styles.container}>
        <StatusBar />
      </View>

      <FooterHome onSupplierPress={() => navegacao('/screens/supplier/ListSupplier')} onProductPress={() => navegacao('/screens/product/ListProducts')} onStockPress={() => navegacao('/screens/stock/ListStock')}/>
    </View>

);
}