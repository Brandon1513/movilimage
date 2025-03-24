import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function WebViewRecursosDasa() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://recursosdasa.domcloud.dev" }}
        style={{ flex: 1 }}
        startInLoadingState
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
