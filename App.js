import { StyleSheet } from "react-native";
import Home from "./Components/Home";
import { createStackNavigator } from "@react-navigation/stack";

import Wordle from "./Components/Wordle";
import Settings from "./Components/Settings";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Wordlee"
          component={Wordle}
          options={{
            headerStyle: {
              backgroundColor: "silver",
            },
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#696969",
    alignItems: "center",
    justifyContent: "center",
  },
});
