import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Redux/Actions/updateAction";
import { CommonActions, useNavigation } from "@react-navigation/native";
import HandleLogged from "../Handle/HandleLogged";

export default function LogOuTab() {
	const dispatch = useDispatch();
	const loginUserData = useSelector((state) => state.personalInfor);
	const navigation = useNavigation();

	return (
		<View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
			{/* create Alert "DO you want to logout" and 2 touchapbale opacity yes or no  */}
			{/* if yes => dispatch logout action and navigate to login screen */}
			{/* if no => navigate to home screen */}
			{loginUserData.token ? (
				<View style={{ marginTop: -50, justifyContent: "center", alignItems: "center" }}>
					<Text style={{ fontSize: 20 }}>Do you want to logout ?</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							marginTop: 20,
						}}
					>
						<TouchableOpacity
							onPress={() => {
								dispatch(logoutUser());
								navigation.dispatch(
									CommonActions.reset({
										index: 0,
										routes: [{ name: "Home" }],
									})
								);
							}}
							style={{
								backgroundColor: "red",
								padding: 20,
								marginHorizontal: 20,
								borderRadius: 20,
								width: 100,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text>Yes</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								backgroundColor: "gray",
								padding: 20,
								marginHorizontal: 20,
								borderRadius: 20,
								width: 100,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text>No</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : (
				<HandleLogged />
			)}
		</View>
	);
}
