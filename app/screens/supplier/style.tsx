import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 800
  },

  card: {
    width: '100%',
    height: 125,
    borderRadius: 12,
    backgroundColor: '#F3E5AB',
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    position: 'relative',
  },
  cardEdit: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#F8AC59',
    position: 'absolute', 
    right: 0,
    bottom: 30,
  },
  cardDelete: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#ea071d',
    position: 'absolute', 
    right: 0, 
    bottom: 0, 
  },
  cardInfo: {
    height: '100%',
    gap: 6,
  },
  cardInfoTitle: {
    color: '#8B4513',
    fontSize: 24,
    fontWeight: 800,
  },
  cardInfoSubTitle: {
    color: '#8B4513',
    fontSize: 14,
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
    marginBottom: 20,
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
