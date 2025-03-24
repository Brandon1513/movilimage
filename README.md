# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

- # App de Descarga de Imagen con Registro de Usuario - Dasavena

Aplicación móvil desarrollada con **React Native + Expo** que permite:

- Iniciar sesión según el rol de usuario (Administrador o Usuario).
- Descargar una imagen de perfil desde el backend y guardarla en la galería.
- Registrar en la base de datos cada vez que un usuario descarga una imagen.
- Generar código QR con una imagen subida.
- Visualizar enlaces web directamente desde la app.

## 🔗 Backend

Repositorio del backend (Node.js + Express):  
➡️ https://github.com/Brandon1513/backappimage

## 📱 Tecnologías usadas

- React Native con Expo
- TypeScript (opcional)
- AsyncStorage
- MediaLibrary (Expo)
- FileSystem (Expo)
- QRCode
- WebView

## 🧪 Funcionalidades

- 📤 Subir imagen desde galería.
- 🖼️ Ver última imagen subida.
- ⬇️ Descargar imagen y registrar la descarga en MySQL.
- 🌐 Acceso a enlaces externos mediante WebView.
- 🔐 Inicio de sesión con token y almacenamiento local.

## 📦 Instalación

```bash
git clone https://github.com/TU_USUARIO/nombre-del-repo.git
cd nombre-del-repo
npm install
npx expo start

screens/
├── LoginScreen.tsx
├── HomeScreen.tsx
├── DownloadImageScreen.tsx
├── GenerateQRScreen.tsx
├── WebViewScreen.tsx
└── WebViewRecursosDasa.tsx

