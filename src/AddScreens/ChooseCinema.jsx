import {
	View,
	StyleSheet,
	Text,
	Pressable,
	TouchableOpacity,
	Image,
	FlatList,
	Dimensions,
} from "react-native";
// import { Modal } from "react-native";
import { useState } from "react";
// import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
// import CarouselSlider from "../../components/CarouselSlider";

import { useEffect } from "react";
import axios from "axios";

import { base_URL } from "../Api/api";

import { useDispatch, useSelector } from "react-redux";
import { setCinema } from "../Redux/Actions/cinemaAction";
const ChooseCinema = () => {
	const route = useRoute();
	const [selectedDate, setSelectedDate] = useState("");
	const [mall, setMall] = useState([]);
	const [seatsData, setSeatsData] = useState([]);
	// const cinemasData = cinema;
	const navigation = useNavigation();

	const [cinemaData, setCinemaData] = useState([]);

	const stateCinema = useSelector((state) => state.cinemaInfor);

	// new
	const [scrolX, setScrolX] = useState(0);

	const SRC_WIDTH = Dimensions.get("window").width;
	const CARD_LENGTH = SRC_WIDTH * 0.6;
	const SPACING = SRC_WIDTH * 0.05; //0.02
	const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;

	useEffect(() => {
		axios
			.get(`${base_URL}/cinemas`)
			.then((res) => {
				setCinemaData(res.data.cinemas);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const dispatch = useDispatch();

	const handleCinema = (item) => {
		dispatch(setCinema(item._id));
		// console.log(stateCinema._id);
		navigation.navigate("MoviesAdd");
		// console.log(item._id);
	};

	return (
		<View
			style={{
				width: "100%",
				height: "100%",
				flexDirection: "column",
				backgroundColor: "white",
			}}
		>
			<FlatList
				contentContainerStyle={{ marginTop: "35%", justifyContent: "center" }}
				data={cinemaData}
				horizontal
				keyExtractor={(item) => item._id}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<View style={{ alignItems: "center" }}>
						<TouchableOpacity
							onPress={() => {
								handleCinema(item);
							}}
							style={{ justifyContent: "center", alignItems: "center" }}
						>
							<View
								scrolX={scrolX}
								style={{
									width: 200,
									height: 300,
									overflow: "hidden",
									marginLeft: Number == 0 ? SIDECARD_LENGTH : SPACING,
									marginRight: Number == 2 ? SIDECARD_LENGTH : SPACING,
									borderRadius: 20,
								}}
							>
								<View style={{ alignItems: "center" }}>
									<Image
										style={{
											width: "100%",
											height: "100%",
											resizeMode: "contain",
											backgroundColor: "black",
										}}
										source={{ uri: item.cinemaImage }}
									/>
								</View>
							</View>
							<Text style={{ fontSize: 18, fontWeight: "500", marginTop: 20, color: "black" }}>
								{item.name}
							</Text>
						</TouchableOpacity>
					</View>
				)}
			></FlatList>
		</View>
	);
};

const styles = StyleSheet.create({});

export default ChooseCinema;
