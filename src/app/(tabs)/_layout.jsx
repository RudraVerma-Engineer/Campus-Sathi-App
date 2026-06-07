import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

function TabIcon({ name, focused }) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <MaterialCommunityIcons
        name={name}
        size={24}
        color={focused ? "#4F46E5" : "#9CA3AF"}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#9CA3AF",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "home" : "home-outline"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notices"
        options={{
          title: "Notices",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "bell" : "bell-outline"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "calender-month" : "calendar-month-outline"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="placements"
        options={{
          title: "Placements",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "briefcase" : "briefcase-outline"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "account" : "account-outline"}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    height: 64,
    paddingBottom: 8,
    paddingTop: 6,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 10,
  },
  tabLabel: {
    fontSize:10,
    fontWeight:"600",
    marginTop:-2,
  },
  iconWrap:{
    width:44,
    height:32,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
  },

  iconWrapActive:{
    backgroundColor:"#EEF2FF"
  }
});
