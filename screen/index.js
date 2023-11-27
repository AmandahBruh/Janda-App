import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MapaJanda from "./mapa";
import HomeJanda from "./HomeJanda";

const Stack = createMaterialBottomTabNavigator();

export default function RootNavigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MapaJanda" component={MapaJanda} />
          <Stack.Screen name="HomeJanda" component={HomeJanda} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}