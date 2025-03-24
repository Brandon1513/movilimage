import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{
      headerShown: false, // 🔹 Oculta la barra de navegación en toda la app
    }}>
      <Stack.Screen name="screens/LoginScreen" options={{ title: "Login" }} />
      <Stack.Screen name="screens/HomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="tabs/index" options={{ title: "Inicio" }} />
      <Stack.Screen name="screens/AdminScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/GenerateQRScreen" options={{ title: "Generar QR" }} />
      <Stack.Screen name="screens/DownloadImageScreen" options={{ title: "Descargar Imagen" }} />
    </Stack>
  );
}
