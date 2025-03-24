import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 📸 Imagen de fondo
import BackgroundImage from "../../assets/images/background.png";

export default function DownloadImageScreen() {
  const params = useLocalSearchParams();
  const imageUrl = params.imageUrl as string;
  const imageId = parseInt(params.imageId as string);

  const [localUri, setLocalUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    if (!permissionResponse || permissionResponse.status !== "granted") {
      requestPermission();
    }
  }, []);

  const downloadImage = async () => {
    setLoading(true);
    try {
      if (!imageUrl || !imageId) {
        throw new Error("No se encontró imagen o ID.");
      }
  
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
  
      if (!userId) {
        throw new Error("No se encontró el ID del usuario.");
      }
  
      const fileExtension = imageUrl.split(".").pop().split("?")[0];
      const fileUri = `${FileSystem.documentDirectory}profile-image.${fileExtension}`;
  
      const { uri } = await FileSystem.downloadAsync(imageUrl as string, fileUri);
      setLocalUri(uri);
  
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.size === 0) throw new Error("La imagen descargada está vacía.");
  
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
  
      await fetch("http://192.168.70.67:4000/api/images/register-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          imageId: parseInt(imageId),
        }),
      });
  
      Alert.alert("Éxito", "Imagen guardada en tu galería 📂");
  
      await MediaLibrary.getAssetsAsync({ mediaType: "photo" });
    } catch (error) {
      console.error("Error al descargar la imagen", error);
      Alert.alert("Error", error.message || "No se pudo guardar la imagen.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <ImageBackground source={BackgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Imagen de perfil</Text>

          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <Text style={styles.warningText}>No hay imagen para descargar.</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={downloadImage}>
            <Text style={styles.buttonText}>Descargar Imagen</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" color="#2196F3" style={{ marginTop: 10 }} />}
          {localUri && <Text style={styles.successText}>✅ Imagen guardada con éxito</Text>}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
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
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  successText: {
    marginTop: 10,
    color: "green",
    fontWeight: "600",
  },
  warningText: {
    marginBottom: 15,
    color: "#555",
  },
});
