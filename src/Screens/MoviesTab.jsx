import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
// add icon
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios, * as others from "axios";
import { base_URL } from "../Api/api";

const moviesData = [
	{
		id: 1,
		name: "The Shawshank Redemption",
		// give me the url of the image
		image:
			"https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
		rating: 9.3,
	},
	{
		id: 2,
		name: "The Godfather",
		image:
			"https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
		rating: 9.2,
	},

	{
		id: 3,
		name: "12 Angry Men",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/b/b5/12_Angry_Men_%281957_film_poster%29.jpg",
		rating: 8.9,
	},
];

export default function MoviesTab() {
	const navigation = useNavigation();
	const [selectedId, setSelectedId] = useState(null);
	const [numberMovies, setNumberMovies] = useState(0);

	const [movies, setMovies] = useState([]);

	useEffect(() => {
		axios
			.get(`${base_URL}/movies`)
			.then((res) => {
				setMovies(res.data.movies);
			})
			.catch((err) => {
				console.log(err);
				alert("error");
			});
	}, []);

	const MovieItem = ({ item }) => {
		return (
			<TouchableOpacity
				style={{
					backgroundColor: "white",
					flexDirection: "row",
					alignItems: "center",
					padding: 5,
					borderBottomWidth: 0.5,
					borderColor: "#E2E2E2",
				}}
				onPress={() => {
					navigation.navigate("MoviesUpdate");
				}}
			>
				{/* create text with style with 5% and have the numberMovies increment */}

				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						padding: 10,
						marginLeft: -10,
						width: "55%",
					}}
				>
					<Image
						source={{ uri: item.image }}
						style={{ width: 45, height: 45, marginRight: 10, borderRadius: 100 }}
					/>
					<Text numberOfLines={1} style={{ width: 150 }}>
						{item.nameMovie}
					</Text>
				</View>
				<View style={{ padding: 10, width: "30%", marginLeft: 40 }}>
					<Text style={{ width: 180 }} numberOfLines={1}>
						{item.rating}
					</Text>
				</View>
				<Text style={{ width: "15%", marginLeft: -25 }}>{item.year}</Text>
			</TouchableOpacity>
		);
	};
	return (
		<View style={{ flex: 1 }}>
			{/* <TouchableOpacity style={{ position: "absolute", top: 5, zIndex: 10 }}>
				<Feather name="plus-square" size={24} color="black" />
			</TouchableOpacity> */}
			<View
				style={{ flexDirection: "row", padding: 5, justifyContent: "center", alignItems: "center" }}
			>
				<Text style={{ flex: 5, marginLeft: 10 }}>Name</Text>
				<Text style={{ flex: 1, marginLeft: -200 }}>Rating</Text>
				<Text style={{ marginRight: 20 }}>Year</Text>
			</View>
			<FlatList
				data={movies}
				keyExtractor={(item) => item._id}
				renderItem={MovieItem}
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}
