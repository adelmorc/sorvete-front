import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  
  contentLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginBottom: 20,
  },
  enterText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#8B4513',
      flex: 1,
  },
  contentImage: {
      alignItems: 'center',
      marginBottom: 20,
  },
  imageRegister: {
      width: 250,
      height: 250,
      resizeMode: 'contain',
  },
  content: {
      width: '100%',
      alignItems: 'center',
  },
  contentInputs: {
      width: '100%',
  },
  contentInput: {
      width: '100%',
      marginBottom: 10,
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
  imageButtonContainer: {
      marginTop: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#F3E5AB',
      borderWidth: 1,
      borderColor: '#8B4513',
      borderRadius: 5,
  },
  imageButton: {
      color: '#8B4513',
      fontSize: 16,
      fontWeight: 'bold',
  },
  button: {
      marginTop: 20,
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
})

export default styles;
