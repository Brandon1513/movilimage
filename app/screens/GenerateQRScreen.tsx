import React, { useState } from "react";
import { View, Text, Image, ActivityIndicator, Alert, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import * as ImagePicker from "expo-image-picker";
import QRCode from "react-native-qrcode-svg";

// 📸 Imágenes locales
import BackgroundImage from "../../assets/images/background.png";

export default function GenerateQRScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      uploadImage(uri);
    }
  };

  const uploadImage = async (imageUri: string) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      name: "profile.jpg",
      type: "image/jpeg",
    } as any);

    try {
      const response = await fetch("http://192.168.70.67:4000/api/images/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();
      console.log("Imagen subida:", data.imageUrl);
      setUploadedUrl(data.imageUrl);
    } catch (error) {
      console.error("Error al subir imagen:", error);
      Alert.alert("Error", "No se pudo subir la imagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Subir Imagen y Generar QR</Text>

          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Seleccionar Imagen</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 10 }} />}

          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.imagePreview}
              resizeMode="cover"
            />
          )}

          {uploadedUrl && (
            <>
              <Text style={styles.qrText}>Escanea este código QR para descargar:</Text>
              <QRCode value={uploadedUrl} size={200} />
            </>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFF",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    width: "85%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  qrText: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "500",
    color: "#444",
  },
});
