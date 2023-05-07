import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
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
						gestureEnabled: false
					}}
				>
					
					<Stack.Screen name="Login" component={LogInPage} />
					<Stack.Screen name="Register" component={SignUpPage} />
					
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
