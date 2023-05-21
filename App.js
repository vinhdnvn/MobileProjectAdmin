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
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import MoviesUpdate from "./src/UpdateScreens/MoviesUpdate";
import MoviesAdd from "./src/AddScreens/MoviesAdd";

import { store } from "./src/Redux/store";
import ChooseCinema from "./src/AddScreens/ChooseCinema";
import UserUpdate from "./src/UpdateScreens/UserUpdate";
// =========REDUX========

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import { useSelector, useDispatch, Provider } from "react-redux";
import { LOGOUT } from "./src/Redux/Reducers/inforReducer";
import LogOuTab from "./src/Screens/LogOuTab";

// function CustomDrawerContent(props) {
// 	return (
// 		<DrawerContentScrollView {...props}>
// 			<DrawerItemList {...props} />
// 			<DrawerItem
// 				label="Logout"
// 				onPress={() => {
// 					useDispatch(LOGOUT());
// 				}}
// 			/>
// 		</DrawerContentScrollView>
// 	);
// }

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

const UserStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen options={{ headerShown: false }} name="Users" component={AccountTab} />
			<Stack.Screen
				options={{ headerShown: true, headerTitle: "" }}
				name="UsersUpdate"
				component={UserUpdate}
			/>
		</Stack.Navigator>
	);
};

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Drawer.Navigator initialRouteName="Home">
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
					{/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
					<Drawer.Screen
						options={{
							headerRight: () => {
								const navigation = useNavigation();
								// return (
								// 	<TouchableOpacity
								// 		onPress={() => navigation.navigate("MoviesAdd")}
								// 		style={{ marginRight: 10 }}
								// 	>
								// 		<Ionicons name="trash-bin-outline" size={25} color="gray" />
								// 	</TouchableOpacity>
								// );
							},
						}}
						name="User"
						component={UserStack}
					/>
					<Drawer.Screen
						options={{
							headerRight: () => {
								const navigation = useNavigation();
								return (
									<TouchableOpacity
										onPress={() => navigation.navigate("MoviesAdd")}
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
					<Drawer.Screen name="LogOut" component={LogOuTab} />
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
