import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const EVENTS = [
  {
    id: 1,
    title: "TechFest 2026",
    subtitle: "Annual tech symposium · 30+ events",
    date: "JUN",
    day: "12",
    time: "9:00 AM",
    venue: "Main Auditorium",
    category: "Tech",
    colors: ["#6D28D9", "#EC4899"],
    registered: true,
  },
  {
    id: 2,
    title: "Hackathon 2026",
    subtitle: "24-hour hackathon challenge",
    date: "JUN",
    day: "18",
    time: "10:00 AM",
    venue: "Innovation Lab",
    category: "Hack",
    colors: ["#059669", "#0EA5E9"],
    registered: false,
  },
  {
    id: 3,
    title: "Alumni Connect Meet",
    subtitle: "Network with 200+ alumni across batches",
    date: "JUN",
    day: "25",
    time: "11:00 AM",
    venue: "Conference Hall",
    category: "Network",
    colors: ["#D97706", "#EF4444"],
    registered: false,
  },
  {
    id: 4,
    title: "AI/ML Summit",
    subtitle: "Industry leaders & research showcase",
    date: "JUL",
    day: "03",
    time: "9:30 AM",
    venue: "Seminar Hall B",
    category: "Tech",
    colors: ["#4F46E5", "#0EA5E9"],
    registered: false,
  },
];

export default function EventsScreen() {
  const [events, setEvents] = useState(EVENTS);

  const toggleRegister = (id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, registered: !e.registered } : e)),
    );
  };

  return (
    <SafeAreaView style={s.safe} edges={["top"]}>
      {/* Header */}
      <View style={s.header}>
        <View>
          <Text style={s.title}>Events</Text>
          <Text style={s.sub}>Workshops, fests & talks</Text>
        </View>
        <TouchableOpacity style={s.calBtn}>
          <Text style={s.calTxt}>Calendar ›</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top banner */}
        <LinearGradient colors={["#4F46E5", "#0EA5E9"]} style={s.banner}>
          <Text style={s.bannerSub}>THIS WEEK</Text>
          <Text style={s.bannerTitle}>3 events you can join</Text>
          <Text style={s.bannerDesc}>
            Don't miss TechFest 2026 — registrations close Wednesday.
          </Text>
        </LinearGradient>

        {/* Event cards */}
        {events.map((ev) => (
          <View key={ev.id} style={s.card}>
            {/* Gradient banner */}
            <LinearGradient colors={ev.colors} style={s.cardBanner}>
              <View style={s.dateBubble}>
                <Text style={s.dateMonth}>{ev.date}</Text>
                <Text style={s.dateDay}>{ev.day}</Text>
              </View>
              <View style={s.catBadge}>
                <Text style={s.catTxt}>{ev.category}</Text>
              </View>
            </LinearGradient>

            {/* Body */}
            <View style={s.cardBody}>
              <Text style={s.evTitle}>{ev.title}</Text>
              <Text style={s.evSubtitle}>{ev.subtitle}</Text>

              <View style={s.metaRow}>
                <View style={s.metaItem}>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={14}
                    color="#6B7280"
                  />
                  <Text style={s.metaTxt}>{ev.time}</Text>
                </View>
                <View style={s.metaItem}>
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    size={14}
                    color="#6B7280"
                  />
                  <Text style={s.metaTxt}>{ev.venue}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[s.regBtn, ev.registered && s.regBtnDone]}
                onPress={() => toggleRegister(ev.id)}
              >
                <Text style={[s.regTxt, ev.registered && s.regTxtDone]}>
                  {ev.registered ? "✓ Registered" : "Register Now"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={{ height: 10 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F7FC" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
  },
  title: { fontSize: 24, fontWeight: "800", color: "#07112B" },
  sub: { fontSize: 14, color: "#6B7280", marginTop: 2 },
  calBtn: {},
  calTxt: { color: "#4F46E5", fontWeight: "700", fontSize: 14 },

  banner: { borderRadius: 20, padding: 22 },
  bannerSub: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 2,
    fontWeight: "600",
    marginBottom: 6,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 6,
  },
  bannerDesc: { fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 20 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },
  cardBanner: {
    height: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 14,
  },
  dateBubble: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: "700",
    color: "#4F46E5",
    letterSpacing: 1,
  },
  dateDay: { fontSize: 22, fontWeight: "800", color: "#07112B" },
  catBadge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  catTxt: { fontSize: 12, color: "#fff", fontWeight: "700" },

  cardBody: { padding: 16 },
  evTitle: { fontSize: 18, fontWeight: "800", color: "#07112B" },
  evSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 3,
    marginBottom: 10,
  },
  metaRow: { flexDirection: "row", gap: 18 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaTxt: { fontSize: 13, color: "#6B7280" },

  regBtn: {
    marginTop: 14,
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
  },
  regTxt: { color: "#fff", fontWeight: "700", fontSize: 15 },
  regBtnDone: { backgroundColor: "#DCFCE7" },
  regTxtDone: { color: "#10B981" },
});
