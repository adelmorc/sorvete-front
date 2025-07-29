import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    image: {
      width: 230,
      height: 230,
      marginBottom: 30,
    },
    imagelogo: {
      width: 192,
      height: 192,
    },
    content: {
      width: '100%',
      alignItems: 'center',
    },
    contentInput: {
      width: '100%',
      marginBottom: 10,
    },
    contentLabel: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 10
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#8B4513',
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#8B4513',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      width: '100%',
      backgroundColor: '#FFF5EE',
    },
    button: {
      marginTop: 20,
      marginBottom: 80,
      backgroundColor: '#8B4513',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      width: '100%',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
    },

});

export default styles;