import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const SIZE = Math.min(width, height);
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: SIZE / 3,
          height: SIZE / 3,
          backgroundColor: "green",
          borderRadius: 35,
          borderWidth: 5,
        }}
      >
        <Text style={{ fontSize: SIZE / 5 }}>W</Text>
      </View>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: SIZE / 3,
          height: SIZE / 3,
          backgroundColor: "green",
          borderRadius: 35,
          borderWidth: 5,
        }}
        onPress={() => navigation.navigate("Wordlee")}
      >
        <Text style={{ fontSize: SIZE / 10 }}>PLAY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#696969",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default Home;
