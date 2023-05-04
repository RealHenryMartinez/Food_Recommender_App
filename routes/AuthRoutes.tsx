import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import LogInPage from "../pages/LogInPage";
import SignUpPage from "../pages/SignUpPage";

const Stack = createNativeStackNavigator();
export default function AuthRoutes() {
	// logged in users should have access to the routes
	return (
		<>
			<NavigationContainer independent={true}>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="Register" component={SignUpPage} />
					<Stack.Screen name="Login" component={LogInPage} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
