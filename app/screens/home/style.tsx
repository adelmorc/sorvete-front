import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  userPlus: {
    position: 'absolute',
    right: 20, 
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 20,
    backgroundColor: '#F3E5AB',
  },
  inputContainer: {
    width: '100%',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: '#18a689'
  },
  content: {
    width: '100%',
    gap: 20,
  },
  card: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    backgroundColor: '#18a689',
    paddingHorizontal: 10,
    paddingTop: 8,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  cardButton: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  cardInfo: {
    height: '100%',
    gap: 6,
  },
  cardInfoTitle: {
    color: '#f4f4f4',
    fontSize: 18,
    fontWeight: 800,
  },
  cardInfoSubTitle: {
    color: '#f4f4f4',
    fontSize: 14,
    fontWeight: '600',
  },
  cardInfoPriceText: {
    color: '#f4f4f4',
    fontSize: 16,
    fontWeight: '900',
  },
})

export default styles;