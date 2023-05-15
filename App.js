import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from "@react-navigation/drawer";
import HomeScreen from "./src/Screens/HomeScreen";
import NotificationsScreen from "./src/Screens/NotificationsScreen";

import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AccountTab from "./src/Screens/AccountTab";
import MoviesTab from "./src/Screens/MoviesTab";
import { Feather } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import MoviesUpdate from "./src/UpdateScreens/MoviesUpdate";
import MoviesAdd from "./src/AddScreens/MoviesAdd";
import { Provider } from "react-redux";
import { store } from "./src/Redux/store";
import ChooseCinema from "./src/AddScreens/ChooseCinema";
// =========REDUX========

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<DrawerItem label="Logout" onPress={() => alert("Logout")} />
		</DrawerContentScrollView>
	);
}

const MovieStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen options={{ headerShown: false }} name="Movies" component={MoviesTab} />
			<Stack.Screen
				options={{ headerShown: true, headerTitle: "" }}
				name="MoviesAdd"
				component={MoviesAdd}
			/>
			<Stack.Screen
				options={{ headerShown: true, headerTitle: " " }}
				name="MoviesUpdate"
				component={MoviesUpdate}
			/>
			<Stack.Screen
				options={{
					headerTitle: " ",
				}}
				name="Cinema"
				component={ChooseCinema}
			/>
		</Stack.Navigator>
	);
};

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Drawer.Navigator
					drawerContent={(props) => <CustomDrawerContent {...props} />}
					initialRouteName="Home"
				>
					<Drawer.Screen
						options={{
							headerStyle: {
								height: 150,
								borderBottomRightRadius: 55,
								borderBottomLeftRadius: 55,
							},
							headerTitleStyle: {
								left: -90,
							},
							headerTitle: `Hello !`,
						}}
						name="Home"
						component={HomeScreen}
					/>
					<Drawer.Screen name="Notifications" component={NotificationsScreen} />
					<Drawer.Screen name="Users" component={AccountTab} />
					<Drawer.Screen
						options={{
							headerRight: () => {
								const navigation = useNavigation();
								return (
									<TouchableOpacity
										onPress={() => navigation.navigate("Cinema")}
										style={{ marginRight: 10 }}
									>
										<Feather name="plus-square" size={25} color="gray" />
									</TouchableOpacity>
								);
							},
						}}
						name="MoviesTab"
						component={MovieStack}
					/>
				</Drawer.Navigator>
			</NavigationContainer>
		</Provider>
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
