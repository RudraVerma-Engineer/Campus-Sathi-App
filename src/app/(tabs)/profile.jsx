import React from "react";
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
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext.jsx";

const USER = {
  firstname: "Raj",
  lastname: "Verma",
  email: "raj.verma@university.edu",
  department: "CSE",
  semester: 6,
  cgpa: 8.6,
  skills: 12,
  rollNumber: "21CSE045",
  initial: "R",
};

const MENU = [
  { icon: "account-cog-outline", label: "Account settings", color: "#374151" },
  {
    icon: "shield-check-outline",
    label: "Privacy & Security",
    color: "#374151",
  },
  { icon: "bell-outline", label: "Notifications", color: "#374151" },
  { icon: "help-circle-outline", label: "Help & Support", color: "#374151" },
  {
    icon: "information-outline",
    label: "About Campus Sathi",
    color: "#374151",
  },
];

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/signin");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={s.safe} edges={["top"]}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.title}>Profile</Text>
        <TouchableOpacity style={s.settingsBtn}>
          <MaterialCommunityIcons
            name="cog-outline"
            size={22}
            color="#6B7280"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 14 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar + info */}
        <View style={s.profileCard}>
          <LinearGradient colors={["#4F46E5", "#0EA5E9"]} style={s.avatar}>
            <Text style={s.avatarTxt}>{USER.initial}</Text>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={s.name}>
              {user?.fullname?.firstname} {user?.fullname?.lastname}
            </Text>
            <Text style={s.role}>
              {user?.course} · {user?.department} · Sem {user?.semester}
            </Text>
            <Text style={s.email}>{user?.email}</Text>
            <View style={s.rollBadge}>
              <Text style={s.rollTxt}>{user?.rollNumber}</Text>
            </View>
          </View>
        </View>

        {/* Stat boxes */}
        <View style={{ flexDirection: "row", gap: 10 }}>
          {[
            { icon: "medal-outline", value: user?.cgpa, label: "CGPA" },
            {
              icon: "book-open-outline",
              value: user?.semester,
              label: "SEMESTER",
            },
            { icon: "code-tags", value: user?.skills===undefined?"":user?.skills, label: "SKILLS" },
          ].map((i) => (
            <View key={i.label} style={s.statBox}>
              <MaterialCommunityIcons name={i.icon} size={22} color="#4F46E5" />
              <Text style={s.statVal}>{i.value}</Text>
              <Text style={s.statLbl}>{i.label}</Text>
            </View>
          ))}
        </View>

        {/* AI Suite */}
        <View style={s.aiCard}>
          <LinearGradient colors={["#4F46E5", "#0EA5E9"]} style={s.aiIcon}>
            <MaterialCommunityIcons
              name="star-four-points-outline"
              size={22}
              color="#fff"
            />
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={s.aiTitle}>AI Suite</Text>
            <Text style={s.aiSub}>Resume, interview, predictor & more</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity style={s.aiBtn}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={18}
              color="#4F46E5"
            />
            <Text style={s.aiBtnTxt}>Resume Builder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.aiBtn}>
            <MaterialCommunityIcons
              name="star-four-points-outline"
              size={18}
              color="#4F46E5"
            />
            <Text style={s.aiBtnTxt}>AI Assistant</Text>
          </TouchableOpacity>
        </View>

        {/* Profile completion */}
        <View style={s.completionCard}>
          <View style={s.completionTop}>
            <Text style={s.completionTitle}>Profile Completion</Text>
            <Text style={s.completionPct}>68%</Text>
          </View>
          <View style={s.progressBg}>
            <LinearGradient
              colors={["#4F46E5", "#0EA5E9"]}
              style={[s.progressFill, { width: "68%" }]}
            />
          </View>
          <Text style={s.completionHint}>
            Add your skills and projects to reach 100%
          </Text>
        </View>

        {/* Menu */}
        <View style={s.menuCard}>
          {MENU.map((item, idx) => (
            <TouchableOpacity
              key={item.label}
              style={[s.menuItem, idx < MENU.length - 1 && s.menuItemBorder]}
            >
              <View style={s.menuLeft}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={22}
                  color="#4F46E5"
                />
                <Text style={s.menuTxt}>{item.label}</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign out */}
        <TouchableOpacity style={s.signOut} onPress={handleSignOut}>
          <MaterialCommunityIcons name="logout" size={20} color="#EF4444" />
          <Text style={s.signOutTxt}>Sign out</Text>
        </TouchableOpacity>

        {/* App version */}
        <Text style={s.version}>Campus Sathi v1.0.0</Text>

        <View style={{ height: 12 }} />
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
  settingsBtn: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarTxt: { fontSize: 30, fontWeight: "800", color: "#fff" },
  name: { fontSize: 18, fontWeight: "800", color: "#07112B" },
  role: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  email: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
  rollBadge: {
    marginTop: 6,
    alignSelf: "flex-start",
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  rollTxt: { fontSize: 11, color: "#4F46E5", fontWeight: "700" },

  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    gap: 4,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statVal: { fontSize: 20, fontWeight: "800", color: "#07112B" },
  statLbl: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "700",
    letterSpacing: 0.8,
  },

  aiCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  aiIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  aiTitle: { fontSize: 16, fontWeight: "800", color: "#07112B" },
  aiSub: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  aiBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#EEF2FF",
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 14,
  },
  aiBtnTxt: { fontSize: 13, fontWeight: "700", color: "#4F46E5" },

  completionCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  completionTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  completionTitle: { fontSize: 15, fontWeight: "700", color: "#07112B" },
  completionPct: { fontSize: 15, fontWeight: "800", color: "#4F46E5" },
  progressBg: {
    height: 8,
    backgroundColor: "#EEF2FF",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: { height: 8, borderRadius: 4 },
  completionHint: { fontSize: 12, color: "#9CA3AF", marginTop: 8 },

  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
  menuLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  menuTxt: { fontSize: 15, fontWeight: "600", color: "#374151" },

  signOut: {
    backgroundColor: "#FEF2F2",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "center",
  },
  signOutTxt: { fontSize: 16, fontWeight: "700", color: "#EF4444" },

  version: { textAlign: "center", fontSize: 12, color: "#D1D5DB" },
});
