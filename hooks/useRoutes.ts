import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function useRoutes() {
	const { navigate } =
		useNavigation<NativeStackNavigationProp<ParamListBase>>();
	const navigateTo = (page: string) => {
		navigate(page);
	};

	return {
		navigateTo,
	};
}
