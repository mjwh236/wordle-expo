import { StyleSheet, View } from "react-native";

import Wordle from "./Components/Wordle";

export default function App() {
  return (
    <View style={styles.container}>
      <Wordle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
