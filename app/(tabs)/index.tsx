import { AnimatedCard } from "@/components/AnimatedCard";
import { GlassView } from "@/components/GlassView";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function HomeScreen() {
  const colorScheme = "dark";
  const theme = Colors.dark;
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const HEADER_MAX_HEIGHT = insets.top + 160;
  const HEADER_MIN_HEIGHT = insets.top + 60;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolation.CLAMP,
    );

    const borderRadius = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [30, 0],
      Extrapolation.CLAMP,
    );

    return {
      height,
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [1, 0.7],
      Extrapolation.CLAMP,
    );

    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, -4],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ scale }, { translateY }],
    };
  });

  const welcomeAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE / 2],
      [1, 0],
      Extrapolation.CLAMP,
    );

    const height = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [24, 0],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      height,
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <AnimatedLinearGradient
        colors={
          colorScheme === "dark"
            ? ["#002B5B", "#1A1A1A"]
            : ["#E6F0FF", "#FFFFFF"]
        }
        style={[
          styles.header,
          {
            paddingTop: insets.top,
            justifyContent: "center",
            alignItems: "center",
          },
          headerAnimatedStyle,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.Text
          style={[styles.greeting, { color: theme.text }, welcomeAnimatedStyle]}
        >
          Welcome Back,
        </Animated.Text>
        <Animated.Text
          style={[styles.title, { color: theme.text }, titleAnimatedStyle]}
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
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.statsGrid}>
            <GlassView intensity={80} style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons
                  name="card-outline"
                  size={24}
                  color={Colors.dark.primary}
                />
              </View>
              <Text style={[styles.statValue, { color: theme.text }]}>
                $12,450
              </Text>
              <Text style={[styles.statLabel, { color: theme.icon }]}>
                Total Sales
              </Text>
            </GlassView>

            <GlassView intensity={80} style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons
                  name="time-outline"
                  size={24}
                  color={Colors.dark.primary}
                />
              </View>
              <Text style={[styles.statValue, { color: theme.text }]}>
                $3,200
              </Text>
              <Text style={[styles.statLabel, { color: theme.icon }]}>
                Pending
              </Text>
            </GlassView>
          </View>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Quick Actions
          </Text>
          <View style={styles.actionRow}>
            <AnimatedCard
              title="New Bill"
              subtitle="Create Invoice"
              style={styles.actionCard}
              onPress={() => {}}
              delay={100}
            />
            <AnimatedCard
              title="Add Client"
              subtitle="New Customer"
              style={styles.actionCard}
              onPress={() => {}}
              delay={200}
            />
          </View>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Recent Activity
          </Text>
          <AnimatedCard
            title="Order #1023"
            subtitle="Living Room Set - Delivered"
            delay={300}
          />
          <AnimatedCard
            title="Order #1022"
            subtitle="Dining Table - Pending"
            delay={400}
          />
          <AnimatedCard
            title="Order #1021"
            subtitle="Office Chair - Cancelled"
            delay={500}
          />
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
    overflow: "hidden",
  },
  greeting: {
    fontSize: Typography.size.m,
    opacity: 0.8,
  },
  title: {
    fontSize: Typography.size.xxl,
    fontWeight: "bold",
    marginTop: 8,
  },
  content: {
    padding: 20,
    marginTop: -30,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    overflow: "hidden",
    alignItems: "flex-start",
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
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
    justifyContent: "space-between",
    gap: 12,
  },
  actionCard: {
    flex: 1,
  },
});
