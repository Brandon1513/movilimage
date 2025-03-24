import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const role = await AsyncStorage.getItem("role");
  
        console.log("🔹 Token encontrado:", token);
        console.log("🔹 Rol encontrado:", role);
  
        if (!token) {
          console.log("❌ No hay token, redirigiendo a LoginScreen");
          router.replace("/screens/LoginScreen");
        } else {
          if (role === "admin") {
            console.log("✅ Usuario Administrador, redirigiendo a AdminScreen");
            router.push("/screens/AdminScreen");
          } else {
            console.log("✅ Usuario Normal, redirigiendo a HomeScreen");
            router.push("/screens/HomeScreen");
          }
        }
      } catch (error) {
        console.error("⚠️ Error al obtener datos del almacenamiento:", error);
      } finally {
        setLoading(false);
      }
    };
  
    checkAuth();
  }, []);
  

  useEffect(() => {
    if (authenticated) {
      const fetchImage = async () => {
        try {
          const response = await fetch("http://192.168.1.89:4000/api/images/latest-image");
          const data = await response.json();
          if (data.imageUrl) {
            setImageUrl(data.imageUrl);
          } else {
            console.error("No se encontró imagen.");
          }
        } catch (error) {
          console.error("Error obteniendo la imagen:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchImage();
    }
  }, [authenticated]);

  if (authenticated === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la App</Text>

      {loading ? <ActivityIndicator size="large" /> : null}

      <Button title="Generar QR" onPress={() => router.push("/screens/GenerateQRScreen")} />

      <Button
        title="Descargar Imagen"
        onPress={() =>
          imageUrl
            ? router.push({ pathname: "/screens/DownloadImageScreen", params: { imageUrl } })
            : alert("No hay imagen disponible")
        }
        disabled={!imageUrl}
      />

      <Button title="Cerrar Sesión" onPress={async () => {
        await AsyncStorage.removeItem("token");
        router.replace("/screens/LoginScreen");
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
