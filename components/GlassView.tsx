import { BlurView, BlurViewProps } from "expo-blur";
import { Platform, StyleSheet, View, ViewStyle } from "react-native";

interface GlassViewProps extends BlurViewProps {
  style?: ViewStyle;
}

export function GlassView({
  style,
  intensity = 50,
  tint = "default",
  children,
  ...props
}: GlassViewProps) {
  const colorScheme = "dark";

  // Adaptive tint based on theme if 'default' is passed
  const adaptiveTint =
    tint === "default" ? (colorScheme === "dark" ? "dark" : "light") : tint;

  if (Platform.OS === "android") {
    // Android sometimes struggles with heavy blurs in listed items,
    // but Expo Blur works reasonably well.
    // Adding a fallback background color for safety/readability using alpha.
    return (
      <View
        style={[
          styles.androidContainer,
          {
            backgroundColor:
              colorScheme === "dark"
                ? "rgba(30,30,30,0.8)"
                : "rgba(255,255,255,0.8)",
          },
          style,
        ]}
      >
        <BlurView
          intensity={intensity}
          tint={adaptiveTint}
          style={StyleSheet.absoluteFill}
          {...props}
        />
        {children}
      </View>
    );
  }

  return (
    <BlurView
      intensity={intensity}
      tint={adaptiveTint}
      style={[styles.container, style]}
      {...props}
    >
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  androidContainer: {
    overflow: "hidden",
  },
});
