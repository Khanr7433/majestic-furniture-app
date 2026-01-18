import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import * as Haptics from "expo-haptics";
import { MotiView } from "moti";
import React from "react";
import {
    GestureResponderEvent,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle
} from "react-native";

interface AnimatedCardProps {
  title: string;
  subtitle?: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  delay?: number;
}

export function AnimatedCard({
  title,
  subtitle,
  onPress,
  style,
  delay = 0,
}: AnimatedCardProps) {
  const colorScheme = "dark";
  const theme = Colors[colorScheme];

  const handlePress = (event: GestureResponderEvent) => {
    Haptics.selectionAsync();
    onPress?.(event);
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500, delay }}
      style={[
        styles.container,
        { backgroundColor: theme.card, shadowColor: theme.secondary },
        style,
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={styles.touchable}
      >
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: theme.icon }]}>
            {subtitle}
          </Text>
        )}
      </TouchableOpacity>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  touchable: {
    width: "100%",
  },
  title: {
    fontSize: Typography.size.m,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: Typography.size.s,
  },
});
