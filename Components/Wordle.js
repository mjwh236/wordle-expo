import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, Text, Alert } from "react-native";
import Keyboard from "./Keyboard";
import Words from "./Words";
const { width } = Dimensions.get("screen");

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
        borderWidth: 5,
        margin: 5,
      }}
    >
      <Text>{letter.toUpperCase()}</Text>
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
        marginTop: 50,
      }}
    >
      {makeGrid({ rows: 5, selected, guessList })}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Selected Word: {selected}</Text>
        <Text>{message}</Text>
      </View>
      <Keyboard
        onPress={(m) => {
          if (won) {
            return;
          }
          if (m === "ENTER") {
            const found = Words.includes(guessList[guessList.length - 1].toLowerCase());
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
                  },
                },
              ]);
              setWon(true);
            }
            setGuessList([...guessList, ""]);
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Wordle;
