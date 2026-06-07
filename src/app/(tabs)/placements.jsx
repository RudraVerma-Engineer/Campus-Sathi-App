import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MY_STATS = [
  { count: 12, label: "APPLIED", color: "#07112B" },
  { count: 5, label: "SHORTLIST", color: "#10B981" },
  { count: 2, label: "INTERVIEW", color: "#F59E0B" },
  { count: 1, label: "OFFERS", color: "#4F46E5" },
];

const METRICS = [
  {
    icon: "trending-up",
    value: "87%",
    label: "Placement rate",
    sub: "+4% YoY",
    subC: "#10B981",
    bg: ["#F0FDF4", "#DCFCE7"],
  },
  {
    icon: "currency-inr",
    value: "₹12.4L",
    label: "Avg package",
    sub: "Per annum",
    subC: "#4F46E5",
    bg: ["#F3F0FF", "#EDE9FE"],
  },
  {
    icon: "trophy-outline",
    value: "₹45L",
    label: "Highest pkg",
    sub: "Google",
    subC: "#F59E0B",
    bg: ["#FFFBEB", "#FEF3C7"],
  },
];

const COMPANIES = [
  {
    id: 1,
    name: "Google",
    role: "SWE I",
    pkg: "₹45 LPA",
    cgpa: "8.0",
    deadline: "Jun 15",
    status: "Shortlisted",
    statusC: "#10B981",
    statusBg: "#D1FAE5",
    initial: "G",
    color: "#4285F4",
  },
  {
    id: 2,
    name: "Microsoft",
    role: "Software Eng.",
    pkg: "₹42 LPA",
    cgpa: "7.5",
    deadline: "Jun 18",
    status: "Apply",
    statusC: "#4F46E5",
    statusBg: "#EEF2FF",
    initial: "M",
    color: "#00A4EF",
  },
  {
    id: 3,
    name: "Amazon",
    role: "SDE-1",
    pkg: "₹38 LPA",
    cgpa: "7.0",
    deadline: "Jun 20",
    status: "Interview",
    statusC: "#F59E0B",
    statusBg: "#FEF3C7",
    initial: "A",
    color: "#FF9900",
  },
  {
    id: 4,
    name: "Flipkart",
    role: "SDE-1",
    pkg: "₹28 LPA",
    cgpa: "6.5",
    deadline: "Jun 22",
    status: "Apply",
    statusC: "#4F46E5",
    statusBg: "#EEF2FF",
    initial: "F",
    color: "#F9A825",
  },
  {
    id: 5,
    name: "Infosys",
    role: "Systems Engineer",
    pkg: "₹8 LPA",
    cgpa: "6.0",
    deadline: "Jun 25",
    status: "Apply",
    statusC: "#4F46E5",
    statusBg: "#EEF2FF",
    initial: "I",
    color: "#007CC3",
  },
];

// Bar chart for department placement
const BAR_DATA = [
  { label: "CSE", v: 92, prev: 88 },
  { label: "IT", v: 88, prev: 85 },
  { label: "AI/ML", v: 90, prev: 82 },
  { label: "ECE", v: 76, prev: 70 },
  { label: "ME", v: 70, prev: 68 },
];
const BAR_MAX = 100;

function MiniBar({ value, prevValue, label }) {
  return (
    <View style={{ alignItems: "center", gap: 4, width: 44 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 3,
          height: 80,
        }}
      >
        <View
          style={[
            bar.barBase,
            { height: `${prevValue}%`, backgroundColor: "#4F46E5" },
          ]}
        />
        <View
          style={[
            bar.barBase,
            { height: `${value}%`, backgroundColor: "#10B981" },
          ]}
        />
      </View>
      <Text style={bar.lbl}>{label}</Text>
    </View>
  );
}
const bar = StyleSheet.create({
  barBase: { width: 14, borderRadius: 4, minHeight: 8 },
  lbl: { fontSize: 10, color: "#6B7280", fontWeight: "600" },
});

export default function PlacementsScreen() {
  return (
    <SafeAreaView style={s.safe} edges={["top"]}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.title}>Placement Hub</Text>
        <Text style={s.sub}>87% placed this batch</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* My stats */}
        <View style={{ flexDirection: "row", gap: 10 }}>
          {MY_STATS.map((i) => (
            <View key={i.label} style={s.statBox}>
              <Text style={[s.statCount, { color: i.color }]}>{i.count}</Text>
              <Text style={s.statLabel}>{i.label}</Text>
            </View>
          ))}
        </View>

        {/* Metrics scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
        >
          {METRICS.map((m) => (
            <LinearGradient key={m.label} colors={m.bg} style={s.metricCard}>
              <MaterialCommunityIcons name={m.icon} size={24} color={m.subC} />
              <Text style={s.metricVal}>{m.value}</Text>
              <Text style={s.metricLabel}>{m.label}</Text>
              <Text style={[s.metricSub, { color: m.subC }]}>{m.sub}</Text>
            </LinearGradient>
          ))}
        </ScrollView>

        {/* Bar chart */}
        <View style={s.chartCard}>
          <View style={s.chartHeader}>
            <Text style={s.chartTitle}>Department placement %</Text>
            <Text style={s.chartYear}>2025–26</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-end",
              paddingTop: 10,
            }}
          >
            {BAR_DATA.map((d) => (
              <MiniBar
                key={d.label}
                value={d.v}
                prevValue={d.prev}
                label={d.label}
              />
            ))}
          </View>
          {/* Legend */}
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  backgroundColor: "#4F46E5",
                }}
              />
              <Text style={{ fontSize: 11, color: "#6B7280" }}>2024–25</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  backgroundColor: "#10B981",
                }}
              />
              <Text style={{ fontSize: 11, color: "#6B7280" }}>2025–26</Text>
            </View>
          </View>
        </View>

        {/* Company list */}
        <Text style={s.secTitle}>Open Drives</Text>
        {COMPANIES.map((c) => (
          <View key={c.id} style={s.companyCard}>
            <View style={[s.initial, { backgroundColor: c.color }]}>
              <Text style={s.initialTxt}>{c.initial}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={s.companyName}>{c.name}</Text>
                <TouchableOpacity
                  style={[s.statusBtn, { backgroundColor: c.statusBg }]}
                >
                  <Text style={[s.statusTxt, { color: c.statusC }]}>
                    {c.status}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={s.companyRole}>{c.role}</Text>
              <View style={s.companyMeta}>
                <View style={s.metaCol}>
                  <Text style={s.metaLbl}>₹ Package</Text>
                  <Text style={s.metaVal}>{c.pkg}</Text>
                </View>
                <View style={s.metaCol}>
                  <Text style={s.metaLbl}>⬛ CGPA</Text>
                  <Text style={s.metaVal}>≥{c.cgpa}</Text>
                </View>
                <View style={s.metaCol}>
                  <Text style={s.metaLbl}>⏰ Deadline</Text>
                  <Text style={s.metaVal}>{c.deadline}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 12 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F7FC" },

  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 14 },
  title: { fontSize: 24, fontWeight: "800", color: "#07112B" },
  sub: { fontSize: 14, color: "#6B7280", marginTop: 2 },

  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statCount: { fontSize: 22, fontWeight: "800" },
  statLabel: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "700",
    letterSpacing: 0.8,
    marginTop: 3,
  },

  metricCard: { width: 134, borderRadius: 18, padding: 16, gap: 4 },
  metricVal: {
    fontSize: 20,
    fontWeight: "800",
    color: "#07112B",
    marginTop: 6,
  },
  metricLabel: { fontSize: 12, color: "#374151" },
  metricSub: { fontSize: 11, fontWeight: "600" },

  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  chartHeader: { flexDirection: "row", justifyContent: "space-between" },
  chartTitle: { fontSize: 15, fontWeight: "700", color: "#07112B" },
  chartYear: { fontSize: 13, color: "#9CA3AF" },

  secTitle: { fontSize: 18, fontWeight: "800", color: "#07112B" },

  companyCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    gap: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  initial: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  initialTxt: { color: "#fff", fontSize: 20, fontWeight: "800" },
  companyName: { fontSize: 16, fontWeight: "800", color: "#07112B" },
  companyRole: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
    marginBottom: 10,
  },
  companyMeta: { flexDirection: "row", gap: 14 },
  metaCol: {},
  metaLbl: { fontSize: 10, color: "#9CA3AF", marginBottom: 2 },
  metaVal: { fontSize: 13, fontWeight: "700", color: "#07112B" },
  statusBtn: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  statusTxt: { fontSize: 12, fontWeight: "700" },
});
