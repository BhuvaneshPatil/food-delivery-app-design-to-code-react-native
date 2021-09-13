import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import CustomDrawer from "./navigation/CustomDrawer";
import { Home, MainLayout } from "./screens";

const Stack = createStackNavigator();
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{ headerShown: false }}
				initialRouteName="Home"
			>
				<Stack.Screen name={"Home"} component={CustomDrawer} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
