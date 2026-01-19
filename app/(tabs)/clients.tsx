import { AnimatedCard } from "@/components/AnimatedCard";
import { GlassView } from "@/components/GlassView";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Client {
  id: string;
  name: string;
  phone: string;
  address: string;
  notes: string;
}

export default function ClientsScreen() {
  const theme = Colors.dark;
  const insets = useSafeAreaInsets();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const addClient = async () => {
    if (!name.trim()) return;

    const newClient = {
      name,
      phone,
      address,
    };

    try {
      const { error } = await supabase.from("clients").insert([newClient]);
      if (error) throw error;

      setModalVisible(false);
      setName("");
      setPhone("");
      setAddress("");
      fetchClients(); // Refresh list
    } catch (error) {
      console.error("Error adding client:", error);
      alert("Failed to add client");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <LinearGradient
        colors={["#002B5B", "#1A1A1A"]}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles.title, { color: theme.text }]}>Clients</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Manage your customer directory
        </Text>
      </LinearGradient>

      <FlatList
        data={clients}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <AnimatedCard
            title={item.name}
            subtitle={`${item.phone || "No phone"} • ${item.address || "No address"}`}
            delay={index * 100}
            style={styles.card}
            onPress={() => {}}
          />
        )}
        ListEmptyComponent={
          !loading ? (
            <Text
              style={{ color: theme.icon, textAlign: "center", marginTop: 40 }}
            >
              No clients found. Add one!
            </Text>
          ) : null
        }
      />

      {/* FAB to Add Client */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.tint }]}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Add Client Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <GlassView intensity={90} style={styles.modalContent}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              New Client
            </Text>

            <TextInput
              placeholder="Name"
              placeholderTextColor={theme.icon}
              style={[
                styles.input,
                { color: theme.text, borderColor: theme.border },
              ]}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor={theme.icon}
              keyboardType="phone-pad"
              style={[
                styles.input,
                { color: theme.text, borderColor: theme.border },
              ]}
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              placeholder="Address"
              placeholderTextColor={theme.icon}
              style={[
                styles.input,
                { color: theme.text, borderColor: theme.border },
              ]}
              value={address}
              onChangeText={setAddress}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.buttonCancel}
              >
                <Text style={{ color: theme.text }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addClient}
                style={[styles.buttonSave, { backgroundColor: theme.tint }]}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </GlassView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
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
    paddingBottom: 100, // Space for FAB
  },
  card: {
    marginBottom: 12,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end", // Bottom sheet style
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalTitle: {
    fontSize: Typography.size.xl,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 12,
  },
  buttonCancel: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  buttonSave: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
});
