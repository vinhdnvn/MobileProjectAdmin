import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { PRIMARY_COLOR, SECONDARY_TEXT } from "../Styles/Styles";

// =========REDUX========
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/Actions/updateAction";
import HandleLogged from "../Handle/HandleLogged";
import axios from "axios";
import { base_URL } from "../Api/api";
import { useNavigation } from "@react-navigation/native";
// ======================

export default function HomeScreen() {
	const loginUserData = useSelector((state) => state.personalInfor);
	const [totalMovies, setTotalMovies] = useState(0);
	const navigation = useNavigation();
	useEffect(() => {
		// axios
		// 	.get(`${base_URL}/movies/total`)
		// 	.then((res) => {
		// 		setTotalMovies(res.data.total);
		// 		console.log(res.data.total);
		// 		alert("Success");
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		alert("Error");
		// 	});
		// axios
		// 	.get(`${base_URL}/movies/total`)
		// 	.then((res) => {
		// 		setTotalMovies(res.data.total);
		// 		console.log(res.data.total);
		// 		alert("Success");
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		alert("Error");
		// 	});
	}, []);
	return (
		<View style={{ width: "100%", height: "100%" }}>
			{loginUserData.token ? (
				<View style={{ flexDirection: "column", alignItems: "center" }}>
					{/* <Text style={{ marginLeft: -180, fontSize: 25, marginTop: 30 }}> Hello, Admin !</Text> */}

					<TouchableOpacity
						onPress={() => {
							navigation.navigate("Users");
						}}
						style={{
							flexDirection: "row",
							justifyContent: "space-around",
							alignItems: "center",
							marginTop: 50,
							padding: 30,
							backgroundColor: PRIMARY_COLOR,
							width: 300,
							height: 150,
							borderRadius: 20,
							borderColor: "white",
							borderWidth: 0.2,
						}}
					>
						<View style={{ flexDirection: "column", justifyContent: "space-between" }}>
							<Text style={{ fontSize: 20, fontWeight: "500", color: SECONDARY_TEXT }}>Member</Text>
						</View>
						<View>
							<AntDesign name="linechart" size={60} color="white" />
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							navigation.navigate("Movies");
						}}
						style={{
							flexDirection: "row",
							justifyContent: "space-around",
							alignItems: "center",
							marginTop: 50,
							padding: 30,
							backgroundColor: PRIMARY_COLOR,
							width: 300,
							height: 150,
							borderRadius: 20,
							borderColor: "white",
							borderWidth: 0.2,
						}}
					>
						<View
							style={{ flexDirection: "column", justifyContent: "space-between", marginLeft: -20 }}
						>
							<Text style={{ fontSize: 20, fontWeight: "500", color: SECONDARY_TEXT }}>Movies</Text>
						</View>
						<View style={{ marginRight: -20 }}>
							<AntDesign name="piechart" size={60} color="white" />
						</View>
					</TouchableOpacity>
				</View>
			) : (
				<HandleLogged />
			)}
		</View>
	);
}
