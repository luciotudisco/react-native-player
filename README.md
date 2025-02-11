# Welcome to the Awesome React Navite Player 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

This library provides a React Native audio player, leveraging [Expo AV](https://docs.expo.dev/versions/latest/sdk/av) for audio playback, [Zustand](https://zustand-demo.pmnd.rs/) for state management, and [Gluestack.io](https://gluestack.io) for the UI framework.

The player features track selection, playback controls, and an auto-scrolling track list that highlights the currently playing track.

The interface includes a **bottom sheet modal** with a single snap point. 

**[TODO]** Planned improvements include two additional snap points: a minimalist player view at ~**20%** (offering basic play/stop controls) and a **full-screen view** for advanced features like waveform visualization and extended controls.

For a better user experience, the track list automatically scrolls to the current track. 

**[TODO]** A planned enhancement is a **long-press feature** for the fast forward and rewind buttons, enabling users to seek through tracks more quickly when holding these controls.

The library's modular architecture centralizes **most of the business logic in Zustand** for efficient state management. 

**[TODO]** Other planned improvements include enhanced background playback capabilities, with features such as background audio, notifications, and lock-screen controls.

## Web Preview

A web preview of the player is available at [https://react-native-player--01nhp0p5xe.expo.app](https://react-native-player--01nhp0p5xe.expo.app).

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

# Screenshots

Bottom sheet modal         |  List
:-------------------------:|:-------------------------:
![Screenshot_2025-02-11_at_01 08 27-removebg-preview](https://github.com/user-attachments/assets/f8f6ab03-c855-477e-910d-08dfef121497)  |  ![Screenshot_2025-02-11_at_01 08 41-removebg-preview](https://github.com/user-attachments/assets/e6043d23-ef39-4816-bcd2-5b4c5d281bf2)




