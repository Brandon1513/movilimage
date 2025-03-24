import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator, ImageBackground, Image } from "react-native";
import axios from "axios";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔹 Importar la imagen de fondo y el logo
import LoginBackground from "../../assets/images/background.png"; 
import Logo from "../../assets/images/LogoDasavena2023-01.png"; 

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.70.67:4000/api/auth/login", {
        email,
        password,
      });
  
      const { token, role, user } = response.data;
  
      if (!role) {
        console.error("⚠️ No se recibió el rol del usuario en la respuesta del backend.");
        return;
      }
  
      // Guardar token y rol en AsyncStorage
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("role", role);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("userId", String(user.id)); // ✅ Esta es la clave
  
      console.log("✅ Rol encontrado:", role);
  
      Alert.alert("Éxito", "Inicio de sesión exitoso");
  
      // 📌 Redirigir según el rol del usuario
      if (role === "admin") {
        router.replace("/screens/AdminScreen");
      } else {
        router.replace("/screens/HomeScreen");
      }
    } catch (error) {
      Alert.alert("Error", "Credenciales incorrectas o problema en el servidor.");
    }
  };
  
  

  return (
    <ImageBackground source={LoginBackground} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* 🔹 Agregar Logo Aquí */}
          <Image source={Logo} style={styles.logo} />
          
          <Text style={styles.title}>Iniciar Sesión</Text>

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Button title="Ingresar" onPress={handleLogin} />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Ajusta la imagen al tamaño de la pantalla
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Añade un efecto oscuro para mejorar la visibilidad
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Un fondo semi-transparente
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  logo: {
    width: 150, // Ancho del logo
    height: 150, // Alto del logo
    marginBottom: 10, // Espacio entre el logo y el título
    resizeMode: "contain", // Asegura que la imagen no se distorsione
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#FFF",
  },
});
