import React, { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Icon list for the menu bar in the navigation container
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import HomePage from "../pages/HomePage";
import useRestaurants from "../hooks/useRestaurants";
import ProfilePage from "../pages/ProfilePage";
import ChoosePhoto from "../pages/ChoosePhoto";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const SignedInRoutes = () => {
	const { isDone } = useRestaurants();
	// logged in users should have access to the routes
	switch (isDone) {
		case true:
			return (
				<>
					<NavigationContainer independent={true}>
						<Stack.Navigator
							// Removes the header from the navigation stack to replace it with a custom header button
							screenOptions={{
								headerShown: false,
							}}
						>
							{/* Home -> main tab / default where it contains only orders and home  */}
							<Stack.Screen name="HomePage" component={Home} />
							<Stack.Screen
								name="Profile"
								component={ProfilePage}
							/>
							<Stack.Screen name="ChooseProfile" component={ChoosePhoto} />
						</Stack.Navigator>
					</NavigationContainer>
				</>
			);
			break;
		case false:
			return null;
			break;
	}
};

function Home() {
	//Screen names to easily find in the route
	const homeName = "Home";
	const profileName = "Profile";
	const testProfile = "ChooseProfile";
	// set up bottom bar navigation style settings and icons
	return (
		<Tab.Navigator
			initialRouteName={homeName}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName:
						| keyof typeof MaterialCommunityIcons.glyphMap
						| keyof typeof Ionicons.glyphMap;
					let rn: string = route.name;
					switch (rn == "home") {
						case rn !== homeName:
							iconName = focused ? "home" : "home-outline";
							return (
								<MaterialCommunityIcons
									name={iconName}
									size={size}
									color={color}
								/>
							);
						case rn !== profileName:
							iconName = focused
								? "person-circle"
								: "person-circle-outline";
							return (
								<Ionicons
									name={iconName}
									size={size}
									color={color}
								/>
							);
						case rn !== testProfile:
							iconName = focused
								? "person-circle"
								: "person-circle-outline";
							return (
								<Ionicons
									name={iconName}
									size={size}
									color={color}
								/>
							);
					}
				},
				headerShown: false,
				// using tabBar instead of screenOptions because this is not deprecated like screenOptions is
				tabBarActiveTintColor: "#f03a2e",
				tabBarInactiveTintColor: "grey",
				tabBarShowLabel: true,
				tabBarStyle: { padding: 10, height: "10%" },
			})}
		>
			{/* Tabs we want to use  */}
			<Tab.Screen name={homeName} component={HomePage} />
			<Tab.Screen name={profileName} component={ProfilePage} />
			<Tab.Screen name={testProfile} component={ChoosePhoto} />
		</Tab.Navigator>
	);
}
export default SignedInRoutes;
