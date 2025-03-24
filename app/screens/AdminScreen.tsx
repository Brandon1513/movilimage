import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

const options = [
  {
    title: "Registrar Usuario",
    icon: "user-plus",
    route: "/screens/RegisterUserScreen",
  },
  {
    title: "Generar QR",
    icon: "qrcode",
    route: "/screens/GenerateQRScreen",
  },
  {
    title: "Cerrar Sesión",
    icon: "sign-out-alt",
    route: "/screens/LoginScreen",
    action: "logout",
  },
];

import backgroundImage from "../../assets/images/background.png"; // Ajusta la ruta
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminScreen = () => {
  const router = useRouter();

  const handlePress = async (item: any) => {
    if (item.action === "logout") {
      await AsyncStorage.clear();
      router.replace(item.route);
    } else {
      router.push(item.route);
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <FontAwesome5 name={item.icon} size={28} color="#3D3D3D" />
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Panel de Administrador</Text>

        <FlatList
          data={options}
          keyExtractor={(item) => item.title}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.grid}
        />
      </View>
    </ImageBackground>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 30,
    textAlign: "center",
  },
  grid: {
    justifyContent: "center",
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    padding: 20,
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
