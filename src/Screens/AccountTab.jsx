import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { base_URL } from "../Api/api";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import HandleLogged from "../Handle/HandleLogged";
import { set } from "react-native-reanimated";

const data = [
	{ id: 1, name: "John Doe", email: "john.doe@example.com", image: "https://picsum.photos/50" },
	{ id: 2, name: "Jane Smith", email: "jane.smith@example.com", image: "https://picsum.photos/50" },
	{
		id: 3,
		name: "Bob Johnson",
		email: "bob.johnson@example.com",
		image: "https://picsum.photos/50",
	},
	{ id: 4, name: "Alice Lee", email: "alice.lee@example.com", image: "https://picsum.photos/50" },
	{ id: 5, name: "Tom Wilson", email: "tom.wilson@example.com", image: "https://picsum.photos/50" },
	{ id: 6, name: "Lucy Chen", email: "lucy.chen@example.com", image: "https://picsum.photos/50" },
	{
		id: 7,
		name: "David Brownnnnnn",
		email: "david.basdasdsrown@example.com",
		image: "https://picsum.photos/50",
	},
];

const AccountTab = () => {
	const [selectedId, setSelectedId] = useState(null);
	const [userList, setUserList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`${base_URL}/users`)
			.then((res) => {
				setUserList(res.data.users);
				// alert("success");
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				alert("error");
				setIsLoading(false);
			});
	}, []);
	const navigation = useNavigation();
	const loginUserData = useSelector((state) => state.personalInfor);

	const renderItem = ({ item }) => (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate("UsersUpdate", {
					_id: item._id,
					name: item.name,
					email: item.email,
					// password with decode
					password: item.password,
				});
			}}
			style={{
				backgroundColor: "white",
				flexDirection: "row",
				alignItems: "center",
				padding: 5,
				borderBottomWidth: 0.5,
				borderColor: "#E2E2E2",
			}}
		>
			<View style={{ flexDirection: "row", alignItems: "center", padding: 10, width: "30%" }}>
				<Image
					source={{ uri: item.image }}
					style={{ width: 45, height: 45, marginRight: 10, borderRadius: 100 }}
				/>
				<Text numberOfLines={1} style={{ width: 95 }}>
					{item.name}
				</Text>
			</View>
			<View style={{ padding: 10, width: "70%", marginLeft: 40 }}>
				<Text style={{ width: 180 }} numberOfLines={1}>
					{item.email}
				</Text>
			</View>
			<Text style={{ width: "5%" }}>{item.isAdmin}</Text>
		</TouchableOpacity>
	);
	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#00ff00" />
			</View>
		);
	}

	return (
		<View style={{ flex: 1, width: "100%", height: "100%" }}>
			{loginUserData.token ? (
				<View>
					<View style={{ flexDirection: "row", padding: 5 }}>
						<Text style={{ flex: 2, marginLeft: 70 }}>Name</Text>
						<Text style={{ flex: 2 }}>Email</Text>
					</View>
					<FlatList
						data={userList}
						keyExtractor={(item) => item._id}
						renderItem={renderItem}
						contentContainerStyle={{ flexGrow: 1 }}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			) : (
				<HandleLogged />
			)}
		</View>
	);
};

export default AccountTab;
