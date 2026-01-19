import { AnimatedCard } from "@/components/AnimatedCard";
import { GlassView } from "@/components/GlassView";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function HomeScreen() {
  const colorScheme = "dark";
  const theme = Colors.dark;
  const insets = useSafeAreaInsets();

  const scrollY = useRef(new Animated.Value(0)).current;

  const HEADER_MAX_HEIGHT = insets.top + 160;
  const HEADER_MIN_HEIGHT = insets.top + 60;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerBorderRadius = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [32, 0],
    extrapolate: "clamp",
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  const welcomeOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const welcomeHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [24, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <AnimatedLinearGradient
        colors={["#002B5B", "#1A1A1A"]}
        style={[
          styles.header,
          {
            paddingTop: insets.top + 20,
            height: headerHeight,
            borderBottomLeftRadius: headerBorderRadius,
            borderBottomRightRadius: headerBorderRadius,
          },
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.Text
          style={[
            styles.subtitle,
            {
              color: theme.text,
              opacity: welcomeOpacity,
              height: welcomeHeight,
            },
          ]}
        >
          Welcome Back
        </Animated.Text>
        <Animated.Text
          style={[
            styles.title,
            {
              color: theme.text,
              transform: [{ scale: titleScale }],
            },
          ]}
        >
          Majestic Furniture
        </Animated.Text>
      </AnimatedLinearGradient>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingTop: HEADER_MAX_HEIGHT + 20,
          paddingBottom: 20,
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <GlassView intensity={30} style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: theme.text }]}>24</Text>
              <Text style={[styles.statLabel, { color: theme.text }]}>
                Active Orders
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: theme.text }]}>
                $12,450
              </Text>
              <Text style={[styles.statLabel, { color: theme.text }]}>
                Monthly Revenue
              </Text>
            </View>
          </GlassView>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Recent Orders
          </Text>
          <AnimatedCard
            title="Order #1023"
            subtitle="Sofa Set - In Progress"
            delay={0}
          />
          <AnimatedCard
            title="Order #1022"
            subtitle="Dining Table - Pending"
            delay={100}
          />
          <AnimatedCard
            title="Order #1021"
            subtitle="Office Chair - Completed"
            delay={200}
          />

          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Quick Actions
          </Text>
          <View style={styles.actionRow}>
            <AnimatedCard
              title="New Order"
              subtitle="Create"
              delay={300}
              style={styles.actionCard}
            />
            <AnimatedCard
              title="Inventory"
              subtitle="Check Stock"
              delay={400}
              style={styles.actionCard}
            />
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    overflow: "hidden",
  },
  title: {
    fontSize: Typography.size.xxl,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: Typography.size.s,
    marginBottom: 4,
    opacity: 0.7,
  },
  content: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  statValue: {
    fontSize: Typography.size.xl,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: Typography.size.s,
    opacity: 0.7,
  },
  sectionTitle: {
    fontSize: Typography.size.l,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 8,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionCard: {
    flex: 1,
  },
});
