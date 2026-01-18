import { AnimatedCard } from "@/components/AnimatedCard";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, StyleSheet, Text, View } from "react-native";

const MOCK_BILLS = [
  {
    id: "1",
    client: "John Doe",
    amount: "$1,200",
    status: "Pending",
    date: "Jan 15, 2025",
  },
  {
    id: "2",
    client: "Alice Smith",
    amount: "$850",
    status: "Paid",
    date: "Jan 12, 2025",
  },
  {
    id: "3",
    client: "Bob Johnson",
    amount: "$3,400",
    status: "Pending",
    date: "Jan 10, 2025",
  },
  {
    id: "4",
    client: "Emma Brown",
    amount: "$150",
    status: "Paid",
    date: "Jan 05, 2025",
  },
];

export default function BillingScreen() {
  const colorScheme = "dark";
  const theme = Colors.dark;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
        <Text style={[styles.title, { color: theme.text }]}>Invoices</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Manage your transactions
        </Text>
      </LinearGradient>

      <FlatList
        data={MOCK_BILLS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <AnimatedCard
            title={item.client}
            subtitle={`${item.amount} • ${item.status} • ${item.date}`}
            delay={index * 100}
            style={styles.card}
            onPress={() => {}}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: Typography.size.xxl,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: Typography.size.s,
    marginTop: 4,
    opacity: 0.7,
  },
  listContent: {
    padding: 20,
  },
  card: {
    marginBottom: 12,
  },
});
