import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";

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

	const renderItem = ({ item }) => (
		<TouchableOpacity
			onPress={() => setSelectedId(item.id)}
			style={{
				backgroundColor: selectedId === item.id ? "grey" : "white",
				flexDirection: "row",
				alignItems: "center",
				padding: 5,
				borderBottomWidth: 0.5,
				borderColor: "#E2E2E2",
			}}
		>
			<Text style={{ width: "5%" }}>{item.id}</Text>
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
		</TouchableOpacity>
	);

	return (
		<View style={{ flex: 1 }}>
			<View style={{ flexDirection: "row", padding: 5 }}>
				<Text style={{ flex: 1 }}>#</Text>
				<Text style={{ flex: 2 }}>Name</Text>
				<Text style={{ flex: 2 }}>Email</Text>
			</View>
			<FlatList
				data={data}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderItem}
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

export default AccountTab;
