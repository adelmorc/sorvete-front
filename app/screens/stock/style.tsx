import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 800
  },
  verticalLine: {
    width: 2, 
    height: '80%', 
    backgroundColor: '#8B4513', 
  },
  card: {
    width: '100%',
    height: 125,
    borderRadius: 12,
    backgroundColor: '#F3E5AB',
    paddingHorizontal: 25,
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    position: 'relative',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  cardPreco: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    position: 'absolute', 
    left: 0, 
    bottom: 10, 
  },
  cardQTd: {
    width: 50,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    position: 'absolute', 
    right: 0, 
    bottom: 10, 
  },
  cardInfo: {
    height: '100%',
    gap: 6,
  },
  cardInfoTitle: {
    color: '#8B4513',
    fontSize: 16,
    fontWeight: 800,
    marginTop: 10,
  },
  cardInfoSubTitle: {
    color: '#8B4513',
    fontSize: 12,
    fontWeight: '600',
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
      marginBottom: 5,
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
  },
  imageRegister: {
      width: 150,
      height: 150,
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
      marginBottom: 5,
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
      marginTop: 10,
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
