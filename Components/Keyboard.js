import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const KeyboardButton = ({
  value = "?",
  onPress = () => {},
  width = 40,
  height = 50,
  fontSize = 28,
  selected = "test",
  index,
  guessList = [],
  keyboardColors,
}) => {
  const colorSquare = ({ selected = "", letter, index }) => {
    let c = "lightpink";

    if (keyboardColors[value] === "correct") {
      c = "lightgreen";
    } else if (keyboardColors[value] === "found") {
      c = "lightyellow";
    } else if (keyboardColors[value] === "absent") {
      c = "gray";
    }

    return c;
  };

  const backgroundColor = colorSquare({ selected, value });

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(value);
      }}
      style={{
        width,
        height,
        // backgroundColor: "lightpink",
        backgroundColor,
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

const Keyboard = ({
  onPress = () => {},
  selected = "tests",
  guessList = ["test"],
  keyboardColors,
}) => {
  const row1 = "qwertyuiop";
  const row2 = "asdfghjkl";
  const row3 = "zxcvbnm";
  return (
    <View
      style={{
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
              selected={selected}
              onPress={() => {
                onPress(l);
              }}
              value={l}
              key={idx}
              guessList={guessList}
              keyboardColors={keyboardColors}
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
            selected={selected}
            guessList={guessList}
            keyboardColors={keyboardColors}
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
          selected={selected}
          guessList={guessList}
          keyboardColors={keyboardColors}
          value="DELETE"
          width={60}
          fontSize={14}
          onPress={() => {
            onPress("DELETE");
          }}
        />
        {[...row3.toUpperCase()].map((l, idx) => (
          <KeyboardButton
            selected={selected}
            guessList={guessList}
            keyboardColors={keyboardColors}
            onPress={() => {
              onPress(l);
            }}
            value={l}
            key={idx}
          />
        ))}
        <KeyboardButton
          selected={selected}
          guessList={guessList}
          keyboardColors={keyboardColors}
          value="ENTER"
          width={60}
          onPress={() => {
            onPress("ENTER");
          }}
          fontSize={14}
        />
      </View>
    </View>
  );
};

export default Keyboard;
