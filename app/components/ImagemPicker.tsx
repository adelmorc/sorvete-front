import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

interface ImageUploaderProps {
  onImagePicked: (uri: string | null) => void; 
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagePicked }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImagePick = () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: false },
      (response) => {
        
        if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri || null; 
          setImageUri(uri);
          onImagePicked(uri); 
        } else {
          setImageUri(null); 
          onImagePicked(null); 
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePick}>
        <Text style={styles.buttonText}>Selecionar Imagem</Text>
      </TouchableOpacity>
      
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#8B4513',
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: -90
  },
  imagePreview: {
    marginTop: 20,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default ImageUploader;
