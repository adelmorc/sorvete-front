import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MagnifyingGlass } from "phosphor-react-native";


interface SearchGlassProps {
    title: string;
}

const SearchGlass: React.FC<SearchGlassProps> = ({ title }) => {
    return (
      <View style={styles.searchContainer}>
        <MagnifyingGlass size={30} color="#8B4513" />
        <TextInput 
          style={styles.search} 
          placeholder={title}
          placeholderTextColor='#8B4513'
        />
      </View>
    );

}

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    height: 40,
    backgroundColor: '#F3E5AB',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#8B4513'
  },
  search: {
    flex: 1,
    color: '#8B4513'
  },
});

export default SearchGlass;