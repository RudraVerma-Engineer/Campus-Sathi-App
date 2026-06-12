import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext.jsx";

// ─── Mock user (replace with AsyncStorage/context in production) ──────────────
const USER = { firstname: "Raj", department: "CSE", semester: 6, cgpa: 8.6 };

const NOTICES_PREVIEW = [
  {
    id: 1,
    title: "End-Sem Exam Schedule Released",
    priority: "URGENT",
    category: "All",
    postedBy: "Controller of Examinations",
    time: "2 hours ago",
    preview:
      "The end-semester examination timetable for all departments has been published...",
  },
  {
    id: 2,
    title: "TCS Codevita Registration Open",
    priority: "HIGH",
    category: "CSE",
    postedBy: "Placement Cell",
    time: "5 hours ago",
    preview:
      "Final round registrations close in 3 days. Eligible students: B.Tech 3rd & 4th year...",
  },
];

const PRIORITY = {
  URGENT: { bg: "#FEE2E2", text: "#EF4444" },
  HIGH: { bg: "#FEF3C7", text: "#F59E0B" },
  NORMAL: { bg: "#DBEAFE", text: "#3B82F6" },
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "GOOD MORNING";
  if (h < 17) return "GOOD AFTERNOON";
  return "GOOD EVENING";
};

// Circular profile completion ring
const ProfileRing = ({ pct }) => (
  <View style={ring.wrap}>
    <LinearGradient colors={["#10B981", "#4F46E5"]} style={ring.outer}>
      <View style={ring.inner}>
        <Text style={ring.pct}>{pct}%</Text>
        <Text style={ring.lbl}>Profile</Text>
      </View>
    </LinearGradient>
  </View>
);
const ring = StyleSheet.create({
  wrap: {
    width: 88,
    height: 88,
    justifyContent: "center",
    alignItems: "center",
  },
  outer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  pct: { fontSize: 17, fontWeight: "800", color: "#07112B" },
  lbl: { fontSize: 10, color: "#6B7280" },
});

export default function HomeScreen() {
  const { user, logout } = useAuth();
  return (
    <SafeAreaView style={s.safe} edges={["top"]}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Gradient Header ── */}
        <LinearGradient colors={["#4F46E5", "#0EA5E9"]} style={s.header}>
          <View style={s.headerRow}>
            <View>
              <Text style={s.greeting}>{getGreeting()}</Text>
              <Text style={s.heroName}>Hey {user?.fullname?.firstname} 👋</Text>
            </View>
            <TouchableOpacity style={s.bell}>
              <Feather name="bell" size={22} color="#fff" />
              <View style={s.bellDot} />
            </TouchableOpacity>
          </View>

          {/* Info chips */}
          <View style={s.chipRow}>
            {[
              `🎓 ${user?.department === undefined ? "" : user?.department}`,
              `📚 Sem ${user?.semester === undefined ? "" : user?.semester}`,
              `⭐ CGPA ${user?.cgpa === undefined ? "" : user?.cgpa}`,
            ].map((c) => (
              <View key={c} style={s.chip}>
                <Text style={s.chipTxt}>{c}</Text>
              </View>
            ))}
          </View>

          {/* Search */}
          <View style={s.search}>
            <Feather name="search" size={17} color="rgba(255,255,255,0.7)" />
            <TextInput
              style={s.searchTxt}
              placeholder="Search notices, events, companies..."
              placeholderTextColor={"rgba(255,255,255,0.7)"}
            />
          </View>
        </LinearGradient>

        {/* ── Horizontal stat cards ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: -14 }}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 12,
            paddingBottom: 4,
          }}
        >
          {[
            {
              icon: "bullhorn",
              count: 3,
              label: "New notices",
              sub: "+2 today",
              subC: "#10B981",
              bg: "#F3F0FF",
            },
            {
              icon: "calendar-month",
              count: 5,
              label: "Upcoming events",
              sub: "This week",
              subC: "#6B7280",
              bg: "#F0FDF4",
            },
            {
              icon: "briefcase-outline",
              count: 7,
              label: "Open drives",
              sub: "2 new",
              subC: "#10B981",
              bg: "#EFF6FF",
            },
            {
              icon: "trophy-outline",
              count: 12,
              label: "Internships",
              sub: "Active",
              subC: "#F59E0B",
              bg: "#FFFBEB",
            },
          ].map((item) => (
            <View
              key={item.label}
              style={[s.statCard, { backgroundColor: item.bg }]}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={24}
                color="#4F46E5"
              />
              <Text style={s.statCount}>{item.count}</Text>
              <Text style={s.statLabel}>{item.label}</Text>
              <Text style={[s.statSub, { color: item.subC }]}>{item.sub}</Text>
            </View>
          ))}
        </ScrollView>

        {/* ── Placement Journey ── */}
        <View style={s.section}>
          <View style={s.row}>
            <Text style={s.secTitle}>Your placement journey</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/placements")}>
              <Text style={s.viewAll}>View all ›</Text>
            </TouchableOpacity>
          </View>
          <View style={s.placementCard}>
            <ProfileRing pct={68} />
            <View style={s.pgGrid}>
              {[
                { n: 12, l: "Applied", c: "#07112B" },
                { n: 5, l: "Shortlisted", c: "#10B981" },
                { n: 2, l: "Interview", c: "#F59E0B" },
                { n: 1, l: "Offers", c: "#4F46E5" },
              ].map((i) => (
                <View key={i.l} style={s.pgItem}>
                  <Text style={[s.pgCount, { color: i.c }]}>{i.n}</Text>
                  <Text style={s.pgLabel}>{i.l}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── Quick Actions ── */}
        <View style={s.section}>
          <Text style={s.secTitle}>Quick actions</Text>
          <View style={s.qaRow}>
            {[
              {
                icon: "bullhorn",
                label: "Notices",
                bg: "#EEF2FF",
                route: "/(tabs)/notices",
              },
              {
                icon: "calendar-month",
                label: "Events",
                bg: "#F0FDF4",
                route: "/(tabs)/events",
              },
              {
                icon: "file-document-outline",
                label: "Resume",
                bg: "#FFFBEB",
                route: null,
              },
              {
                icon: "star-four-points-outline",
                label: "AI",
                bg: "#F3E8FF",
                route: null,
              },
            ].map((q) => (
              <TouchableOpacity
                key={q.label}
                style={[s.qaBtn, { backgroundColor: q.bg }]}
                onPress={() => q.route && router.push(q.route)}
              >
                <MaterialCommunityIcons
                  name={q.icon}
                  size={28}
                  color="#4F46E5"
                />
                <Text style={s.qaLabel}>{q.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Latest Notices ── */}
        <View style={s.section}>
          <View style={s.row}>
            <Text style={s.secTitle}>Latest notices</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/notices")}>
              <Text style={s.viewAll}>See all ›</Text>
            </TouchableOpacity>
          </View>
          {NOTICES_PREVIEW.map((n) => (
            <View key={n.id} style={s.noticeCard}>
              <View style={s.noticeIcon}>
                <MaterialCommunityIcons
                  name="bullhorn"
                  size={22}
                  color="#4F46E5"
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", gap: 6, marginBottom: 4 }}>
                  <View
                    style={[
                      s.badge,
                      { backgroundColor: PRIORITY[n.priority].bg },
                    ]}
                  >
                    <Text
                      style={[s.badgeTxt, { color: PRIORITY[n.priority].text }]}
                    >
                      {n.priority}
                    </Text>
                  </View>
                  <View style={s.catBadge}>
                    <Text style={s.catTxt}>{n.category}</Text>
                  </View>
                </View>
                <Text style={s.noticeTitle} numberOfLines={1}>
                  {n.title}
                </Text>
                <Text style={s.noticePreview} numberOfLines={2}>
                  {n.preview}
                </Text>
                <Text style={s.noticeMeta}>
                  {n.postedBy} · {n.time}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* ── AI Banner ── */}
        <LinearGradient colors={["#4F46E5", "#0EA5E9"]} style={s.aiBanner}>
          <View style={{ flex: 1 }}>
            <Text style={s.aiLabel}>AI CAREER ASSISTANT</Text>
            <Text style={s.aiTitle}>Ace your next interview</Text>
            <Text style={s.aiSub}>
              Get personalized prep, resume reviews, and ATS scores.
            </Text>
          </View>
          <MaterialCommunityIcons
            name="star-four-points-outline"
            size={40}
            color="rgba(255,255,255,0.7)"
          />
        </LinearGradient>

        <View style={{ height: 28 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F7FC" },

  // header
  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  greeting: {
    fontSize: 11,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: 2,
    fontWeight: "600",
  },
  heroName: { fontSize: 28, fontWeight: "800", color: "#fff", marginTop: 4 },
  bell: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  bellDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F59E0B",
  },
  chipRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  chip: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipTxt: { color: "#fff", fontSize: 13, fontWeight: "600" },
  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    gap: 10,
  },
  searchTxt: { color: "rgba(255,255,255,0.7)", fontSize: 14 },

  // stat cards
  statCard: {
    width: 144,
    borderRadius: 20,
    padding: 16,
    gap: 4,
    marginTop: 6,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statCount: {
    fontSize: 28,
    fontWeight: "800",
    color: "#07112B",
    marginTop: 6,
  },
  statLabel: { fontSize: 13, color: "#374151" },
  statSub: { fontSize: 12, fontWeight: "600" },

  // section
  section: { paddingHorizontal: 16, marginTop: 22 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  secTitle: { fontSize: 18, fontWeight: "800", color: "#07112B" },
  viewAll: { color: "#4F46E5", fontWeight: "600", fontSize: 14 },

  // placement card
  placementCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  pgGrid: { flex: 1, flexDirection: "row", flexWrap: "wrap", gap: 14 },
  pgItem: { width: "44%" },
  pgCount: { fontSize: 22, fontWeight: "800" },
  pgLabel: { fontSize: 13, color: "#6B7280" },

  // quick actions
  qaRow: { flexDirection: "row", gap: 10 },
  qaBtn: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  qaLabel: { fontSize: 12, fontWeight: "600", color: "#374151" },

  // notice card
  noticeCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    gap: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  noticeIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#07112B",
    marginBottom: 4,
  },
  noticePreview: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
    marginBottom: 6,
  },
  noticeMeta: { fontSize: 12, color: "#9CA3AF" },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  badgeTxt: { fontSize: 11, fontWeight: "700" },
  catBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  catTxt: { fontSize: 11, color: "#6B7280", fontWeight: "600" },

  // AI banner
  aiBanner: {
    marginHorizontal: 16,
    marginTop: 22,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  aiLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 2,
    fontWeight: "600",
    marginBottom: 4,
  },
  aiTitle: { fontSize: 20, fontWeight: "800", color: "#fff", marginBottom: 4 },
  aiSub: { fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 18 },
});
