import React, { useState } from "react";
import { View, Dimensions, StyleSheet, Text, Alert } from "react-native";
import Keyboard from "./Keyboard";
import Words from "./Words";

const { width } = Dimensions.get("screen");

const alphabet = {
  A: "default",
  B: "default",
  C: "default",
  D: "default",
  E: "default",
  F: "default",
  G: "default",
  H: "default",
  I: "default",
  J: "default",
  K: "default",
  L: "default",
  M: "default",
  N: "default",
  O: "default",
  P: "default",
  Q: "default",
  R: "default",
  S: "default",
  T: "default",
  U: "default",
  V: "default",
  W: "default",
  X: "default",
  Y: "default",
  Z: "default",
};

const Letter = ({
  letter = "a",
  backgroundColor = "gray",
  letterSize = width / 6,
}) => {
  return (
    <View
      style={{
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        width: letterSize,
        height: letterSize,
        borderWidth: 3,
        borderRadius: 10,
        margin: 5,
      }}
    >
      <Text style={{ fontSize: width / 10 }}>{letter.toUpperCase()}</Text>
    </View>
  );
};

const Word = ({ word = "tests", color = false, selected = "" }) => {
  const letters = word.length ? [...word] : [..."     "];
  // UI square filling
  for (let i = letters.length; i < 5; i++) {
    letters.push(" ");
  }

  const colorSquare = ({ selected, index, letter }) => {
    let c = "gray";

    if (selected[index] === letter) {
      c = "lightgreen";
    } else if (selected.includes(letter)) {
      c = "lightyellow";
    }

    return c;
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {[...letters].map((l, idx) => (
        <Letter
          letter={l}
          key={idx}
          backgroundColor={
            color
              ? colorSquare({
                  selected: selected.toUpperCase(),
                  index: idx,
                  letter: l,
                })
              : "gray"
          }
        />
      ))}
    </View>
  );
};

const Wordle = ({}) => {
  const words = Words;
  const [message, setMessage] = useState(""); // debugging
  const [won, setWon] = useState(false); // debugging
  const [selected, setSelected] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [guessList, setGuessList] = useState([""]);
  const [keyboardColors, setKeyboardColors] = useState(alphabet);

  const makeGrid = ({ rows, selected, guessList }) => {
    const children = [];
    for (let i = 0; i < rows; i++) {
      children.push(
        <Word
          word={guessList.length > i ? guessList[i] : ""}
          color={guessList.length > i + 1}
          key={i}
          selected={selected}
        />
      );
    }

    return children;
  };

  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <View style={{ flex: 2 }}>
        {makeGrid({ rows: 6, selected, guessList })}
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 28, color: "lightblue" }}>{message}</Text>
        {/* <Text style={{ fontSize: 28, color: "lightblue" }}>{selected}</Text> */}
      </View>
      <View style={{ width, flex: 1 }}>
        <Keyboard
          selected={selected}
          guessList={guessList}
          keyboardColors={keyboardColors}
          onPress={(m) => {
            if (won) {
              return;
            }
            if (m === "ENTER") {
              const found = Words.includes(
                guessList[guessList.length - 1].toLowerCase()
              );
              if (!found) {
                setMessage(`${guessList[guessList.length - 1]} not found`);
                return;
              } else {
                setMessage("");
              }
              if (guessList[guessList.length - 1].length < 5) {
                return;
              }

              if (guessList[guessList.length - 1] === selected.toUpperCase()) {
                Alert.alert("YOU WON!!!", "You won!!!", [
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel",
                  },
                  {
                    text: "Replay",
                    onPress: () => {
                      setSelected(
                        words[Math.floor(Math.random() * words.length)]
                      );
                      setGuessList([""]);
                      setWon(false);
                      setKeyboardColors(alphabet);
                    },
                  },
                ]);
                setWon(true);
              } else if (
                guessList[guessList.length - 1] !== selected.toUpperCase() &&
                guessList.length >= 6
              ) {
                // loses I think;
                Alert.alert(
                  "YOU LOST",
                  `You lost!!! The word was: ${selected}`,
                  [
                    {
                      text: "Cancel",
                      onPress: () => {},
                      style: "cancel",
                    },
                    {
                      text: "Replay",
                      onPress: () => {
                        setSelected(
                          words[Math.floor(Math.random() * words.length)]
                        );
                        setGuessList([""]);
                        setWon(false);
                        setKeyboardColors(alphabet);
                      },
                    },
                  ]
                );
              }

              setGuessList([...guessList, ""]);

              const newColors = { ...keyboardColors };
              [...guessList[guessList.length - 1].toLowerCase()].forEach(
                (ch, index) => {
                  const letter = ch.toUpperCase();
                  if (
                    keyboardColors[letter] === "correct" ||
                    keyboardColors[letter] === "absent"
                  ) {
                    return;
                  }

                  if (selected[index] == ch) {
                    newColors[letter] = "correct";
                  } else if (selected.includes(ch)) {
                    newColors[letter] = "found";
                  } else if (!selected.includes(ch)) {
                    newColors[letter] = "absent";
                  }
                }
              );
              setKeyboardColors(newColors);
            } else if (m === "DELETE") {
              let copy = [...guessList]; // list of words
              let last = copy[copy.length - 1]; // last word
              last = last.slice(0, -1);
              copy[copy.length - 1] = last;
              setGuessList(copy);
            } else if (guessList[guessList.length - 1].length < 5) {
              let copy = [...guessList]; // list of words
              let last = copy[copy.length - 1]; // last word
              copy[copy.length - 1] = last + m;
              setGuessList(copy);
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#696969",
  },
});

export default Wordle;
