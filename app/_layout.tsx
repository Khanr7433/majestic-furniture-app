import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";

export default function RootLayout() {
  const backgroundColor = Colors.dark.background;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <Slot />
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent={true}
      />
    </SafeAreaView>
  );
}
