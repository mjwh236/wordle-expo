import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";

const KeyboardButton = ({
  value = "?",
  onPress = () => {},
  width = 40,
  height = 50,
  fontSize = 14,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(value);
      }}
      style={{
        width,
        height,
        backgroundColor: "lightpink",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 5,
      }}
    >
      <Text style={{ fontSize }}>{value}</Text>
    </TouchableOpacity>
  );
};

const Keyboard = ({ onPress = () => {} }) => {
  const row1 = "qwertyuiop";
  const row2 = "asdfghjkl";
  const row3 = "zxcvbnm";
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: 5,
        }}
      >
        {[...row1.toUpperCase()].map((l, idx) => {
          return (
            <KeyboardButton
              onPress={() => {
                onPress(l);
              }}
              value={l}
              key={idx}
            />
          );
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: 5,
        }}
      >
        {[...row2.toUpperCase()].map((l, idx) => (
          <KeyboardButton
            onPress={() => {
              onPress(l);
            }}
            value={l}
            key={idx}
          />
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: 5,
        }}
      >
        <KeyboardButton
          value="DELETE"
          width={60}
          onPress={() => {
            onPress("DELETE");
          }}
        />
        {[...row3.toUpperCase()].map((l, idx) => (
          <KeyboardButton
            onPress={() => {
              onPress(l);
            }}
            value={l}
            key={idx}
          />
        ))}
        <KeyboardButton
          value="ENTER"
          width={60}
          onPress={() => {
            onPress("ENTER");
          }}
        />
      </View>
    </View>
  );
};

export default Keyboard;
