import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Image,
  ImageBackground
} from "react-native";
import axios from "axios";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";


// ✅ Rutas de tus imágenes
import BackgroundImage from "../../assets/images/background.png";
import LogoImage from "../../assets/images/LogoDasavena2023-01.png";

const RegisterUserScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !role) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://192.168.70.67:4000/api/auth/register", {
        name,
        email,
        password,
        role,
      });

      Alert.alert("Éxito", "Usuario registrado correctamente");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al registrar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* ✅ Logo */}
          <Image source={LogoImage} style={styles.logo} />

          <Text style={styles.title}>Registrar Usuario</Text>

          <TextInput
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={role}
              onValueChange={(itemValue) => setRole(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Usuario" value="user" />
              <Picker.Item label="Administrador" value="admin" />
            </Picker>
          </View>

          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Button title="Registrar" onPress={handleRegister} />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default RegisterUserScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#FFF",
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  
});
