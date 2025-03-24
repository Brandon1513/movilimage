import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

// Fondo personalizado
import BackgroundImage from "../../assets/images/background.png";

export default function HomeScreen() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageId, setImageId] = useState<number | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      const role = await AsyncStorage.getItem("role");

      if (!token || !role) {
        router.replace("/screens/LoginScreen");
      } else if (role === "admin") {
        router.replace("/screens/AdminScreen");
      } else {
        setAuthenticated(true);
        fetchImage();
      }
    };

    checkAuth();
  }, []);

  const fetchImage = async () => {
    try {
      const response = await fetch("http://192.168.70.67:4000/api/images/latest-image");
      const data = await response.json();

      if (data.imageUrl && data.imageId) {
        setImageUrl(data.imageUrl);
        setImageId(data.imageId);
      } else {
        console.error("No se encontró imagen o ID.");
      }
    } catch (error) {
      console.error("Error obteniendo la imagen:", error);
    } finally {
      setLoadingImage(false);
    }
  };

  if (authenticated === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: "#fff", marginBottom: 10 }}>Redirigiendo...</Text>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ImageBackground source={BackgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Panel de Usuario</Text>

        <View style={styles.row}>
          {imageUrl && imageId && (
            <TouchableOpacity
              style={styles.cardSmall}
              onPress={() =>
                router.push({
                  pathname: "/screens/DownloadImageScreen",
                  params: { imageUrl, imageId },
                })
              }
            >
              <MaterialIcons name="download" size={26} color="#333" />
              <Text style={styles.cardText}>Descargar Imagen</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.cardSmall}
            onPress={() => router.push("/screens/WebViewScreen")}
          >
            <FontAwesome5 name="globe" size={22} color="#333" />
            <Text style={styles.cardText}>Dasavena RH</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.cardSmall}
            onPress={() => router.push("/screens/WebViewRecursosDasa")}
          >
            <FontAwesome5 name="globe" size={22} color="#333" />
            <Text style={styles.cardText}>Recursos Dasa</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            await AsyncStorage.clear();
            router.replace("/screens/LoginScreen");
          }}
        >
          <MaterialIcons name="logout" size={26} color="#333" />
          <Text style={styles.cardText}>Cerrar Sesión</Text>
        </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 15,
    marginBottom: 15,
  },
  cardSmall: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  logoutButton: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginTop: 5,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
