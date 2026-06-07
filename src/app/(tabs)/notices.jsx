import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const NOTICES = [
  {
    id: 1,
    title: "End-Sem Exam Schedule Released",
    preview:
      "The end-semester examination timetable for all departments has been published. Please check the attached PDF for detailed schedule.",
    priority: "URGENT",
    category: "All",
    postedBy: "Controller of Examinations",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "TCS Codevita Registration Open",
    preview:
      "Final round registrations close in 3 days. Eligible students: B.Tech 3rd & 4th year with CGPA ≥ 7.0.",
    priority: "HIGH",
    category: "CSE",
    postedBy: "Placement Cell",
    time: "5 hours ago",
  },
  {
    id: 3,
    title: "Library Hours Extended",
    preview:
      "Central library will remain open 24×7 during exam season starting from next Monday through the exam period.",
    priority: "NORMAL",
    category: "All",
    postedBy: "Library Admin",
    time: "1 day ago",
  },
  {
    id: 4,
    title: "Sports Day Registration",
    preview:
      "Annual sports day registrations are now open. Participate in 15+ sports categories. Last date: June 20.",
    priority: "NORMAL",
    category: "All",
    postedBy: "Sports Committee",
    time: "2 days ago",
  },
  {
    id: 5,
    title: "AI/ML Workshop - Registration",
    preview:
      "2-day intensive workshop on Machine Learning with Python. Certificate provided. Limited seats available.",
    priority: "HIGH",
    category: "AI/ML",
    postedBy: "Tech Club",
    time: "3 days ago",
  },
];

const PRIORITY = {
  URGENT: { bg: "#FEE2E2", text: "#EF4444" },
  HIGH: { bg: "#FEF3C7", text: "#F59E0B" },
  NORMAL: { bg: "#DBEAFE", text: "#3B82F6" },
};

const FILTERS = ["All", "CSE", "IT", "AI/ML", "ECE", "ME"];

export default function NoticesScreen() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("All");

  const filtered = NOTICES.filter((n) => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = active === "All" || n.category === active;
    return matchSearch && matchFilter;
  });

  return (
    <SafeAreaView style={s.safe} edges={["top"]}>
      {/* Header */}
      <View style={s.header}>
        <View>
          <Text style={s.title}>Notice Board</Text>
          <Text style={s.sub}>{NOTICES.length} updates</Text>
        </View>
        <TouchableOpacity style={s.filterBtn}>
          <MaterialCommunityIcons name="tune" size={22} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={s.searchBar}>
        <Feather name="search" size={17} color="#9CA3AF" />
        <TextInput
          style={s.searchInput}
          placeholder="Search notices..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Feather name="x" size={17} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 48 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 8,
          alignItems: "center",
        }}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setActive(f)}
            style={[s.chip, active === f && s.chipActive]}
          >
            <Text style={[s.chipTxt, active === f && s.chipTxtActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Notice list */}
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 12 }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={s.empty}>
            <MaterialCommunityIcons
              name="bell-off-outline"
              size={48}
              color="#D1D5DB"
            />
            <Text style={s.emptyTxt}>No notices found</Text>
          </View>
        ) : (
          filtered.map((n) => (
            <TouchableOpacity key={n.id} style={s.card} activeOpacity={0.8}>
              <View style={s.cardIcon}>
                <MaterialCommunityIcons
                  name="bullhorn"
                  size={22}
                  color="#4F46E5"
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", gap: 6, marginBottom: 6 }}>
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
                <Text style={s.cardTitle}>{n.title}</Text>
                <Text style={s.cardPreview} numberOfLines={2}>
                  {n.preview}
                </Text>
                <View style={s.cardFooter}>
                  <Text style={s.cardMeta}>
                    {n.postedBy} · {n.time}
                  </Text>
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="bookmark-outline"
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: 16 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F7FC" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
  },
  title: { fontSize: 24, fontWeight: "800", color: "#07112B" },
  sub: { fontSize: 14, color: "#6B7280", marginTop: 2 },
  filterBtn: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 15, color: "#07112B" },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
  },
  chipActive: { backgroundColor: "#4F46E5" },
  chipTxt: { fontSize: 13, fontWeight: "600", color: "#6B7280" },
  chipTxtActive: { color: "#fff" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  badgeTxt: { fontSize: 11, fontWeight: "700" },
  catBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  catTxt: { fontSize: 11, color: "#6B7280", fontWeight: "600" },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#07112B",
    marginBottom: 4,
  },
  cardPreview: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardMeta: { fontSize: 12, color: "#9CA3AF" },

  empty: { alignItems: "center", paddingTop: 60, gap: 12 },
  emptyTxt: { fontSize: 15, color: "#9CA3AF", fontWeight: "600" },
});
