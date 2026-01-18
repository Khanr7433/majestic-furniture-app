import { AnimatedCard } from "@/components/AnimatedCard";
import { GlassView } from "@/components/GlassView";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const colorScheme = "dark";
  const theme = Colors.dark;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <LinearGradient
        colors={
          colorScheme === "dark"
            ? ["#002B5B", "#1A1A1A"] // Deep Navy to Black
            : ["#E6F0FF", "#FFFFFF"] // Very Light Blue to White
        }
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles.greeting, { color: theme.text }]}>
          Welcome Back,
        </Text>
        <Text style={[styles.title, { color: theme.text }]}>
          Majestic Furniture
        </Text>
      </LinearGradient>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 80,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    gap: 12, // Only works on newer RN, fallback via card margins if needed
  },
  actionCard: {
    flex: 1,
  },
});
