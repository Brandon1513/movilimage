// screens/WebViewScreen.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function WebViewScreen() {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: "https://dasavenasite.domcloud.dev/" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
