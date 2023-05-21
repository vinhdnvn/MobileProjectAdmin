import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { base_URL } from "../Api/api";

export default function UserUpdate() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const route = useRoute();
	const navigation = useNavigation();
	const deleteUser = () => {
		// show up modal to confirm delete
		Alert.alert("Delete", "Are you sure to delete this user?", [
			{
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{
				text: "OK",
				onPress: async () => {
					axios
						.delete(`${base_URL}/users/${route.params._id}`)
						.then((res) => {
							// console.log(res);
							navigation.dispatch(
								CommonActions.reset({
									index: 1,
									routes: [
										{
											name: "Users",
										},
									],
								})
							);
						})
						.catch((err) => {
							console.log(err);
						});
					// console.log(route.params._id);
				},
			},
		]);
	};
	return (
		<View style={{ width: "100%", height: "100%", padding: 10 }}>
			{/* create in textinput with name, email */}
			<Text style={styles.label}>Name:</Text>
			<TextInput style={styles.input} value={route.params.name} onChangeText={setName} />
			<Text style={styles.label}>Email:</Text>
			<TextInput style={styles.input} value={route.params.email} onChangeText={setEmail} />

			{/* create touchopacity to delete account */}
			<TouchableOpacity
				style={{
					backgroundColor: "red",
					justifyContent: "center",
					width: 150,
					height: 50,
					alignItems: "center",
					borderRadius: 10,
				}}
				onPress={deleteUser}
			>
				<Text style={styles.buttonText}>Delete Account</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#EEEEEE",
	},
	label: {
		fontSize: 15,
		fontWeight: "600",
		marginBottom: 5,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 4,
		padding: 10,
		marginBottom: 10,
	},
	button: {
		backgroundColor: "#007bff",
		padding: 10,
		borderRadius: 4,
		alignItems: "center",
		marginBottom: 20,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
	image: {
		width: 150,
		height: 150,
		resizeMode: "cover",
		marginBottom: 20,
	},
	submitButton: {
		backgroundColor: "#28a745",
		padding: 15,
		borderRadius: 4,
		alignItems: "center",
	},
	submitButtonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
});
