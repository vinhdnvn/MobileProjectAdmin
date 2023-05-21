import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Image,
	ScrollView,
	Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { base_URL } from "../Api/api";
import { useDispatch, useSelector } from "react-redux";
import { setCinema } from "../Redux/Actions/cinemaAction";
import { MaterialIcons } from "@expo/vector-icons";
// import { firebase } from "../Api/firebase";
import { ref, getStorage, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import config from "../Api/firebase";
import { initializeApp } from "firebase/app";
import { CommonActions, useNavigation } from "@react-navigation/native";

initializeApp(config.firebase);
const storage = getStorage();

const giveCurrentDateTime = () => {
	const today = new Date();
	const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
	const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	const dateTime = date + " " + time;
	return dateTime;
};

export default function MoviesAdd() {
	const navigation = useNavigation();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);
	const [time, setTime] = useState("");
	const [video, setVideo] = useState(null);
	const [gerne, setGerne] = useState("");
	const [year, setYear] = useState("");
	const [selected, setSelected] = useState("");
	const [rating, setRating] = useState("");
	const [listCinemas, setListCinemas] = useState([]);
	const cinemaData = useSelector((state) => state.cinemaInfor);
	const [uploading, setUploading] = useState(false);

	const pickImage = async () => {
		// no permssions request its neccessary for lauching the image llibrary
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			// base64: true,
		});
		const source = result.assets[0].uri;
		console.log(source);
		setImage(source);
	};

	const image1 =
		"https://www.indiewire.com/wp-content/uploads/2022/11/Decision-to-Leave.jpg?w=1280";
	const video1 =
		"https://firebasestorage.googleapis.com/v0/b/ticketbox2-39535.appspot.com/o/videos%2FMeg2.mp4?alt=media&token=8c7e8e71-a31d-4c1e-a073-f2b227118f2a";

	const uploadImage = async () => {};

	const pickFile = async () => {
		let result = await DocumentPicker.getDocumentAsync({
			type: "video/*",
		});
		try {
			console.log(result);
			const source = result.uri;
			setVideo(source);
		} catch (error) {
			console.log(error);
		}
	};
	const uploadFile = async () => {
		setUploading(true);
		const response = await fetch(video);
		const blob = await response.blob();
		const filename = video.substring(video.lastIndexOf("/") + 1);
		const ref = firebase.storage().ref().child(`videos/${filename}`).put(blob);
		// get download URL after uploading
		const downloadURL = await ref.snapshot.ref.getDownloadURL();

		try {
			await ref;
		} catch (error) {
			console.log(error);
		}
		setUploading(false);
		Alert.alert("Video uploaded");
		setVideo(downloadURL);
	};

	const [selectedImage, setSelectedImage] = useState(false);
	const [selectedVideo, setSelectedVideo] = useState(false);

	const handdleSelectedVideo = () => {
		setSelectedVideo(!selectedVideo);
	};

	const data = [
		{ key: "1", value: "Mobiles", disabled: true },
		{ key: "2", value: "Appliances" },
		{ key: "3", value: "Cameras" },
		{ key: "4", value: "Computers", disabled: true },
		{ key: "5", value: "Vegetables" },
		{ key: "6", value: "Diary Products" },
		{ key: "7", value: "Drinks" },
	];

	const dispatch = useDispatch();
	const giveCurrentDateTime = () => {
		const today = new Date();
		const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
		const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		const dateTime = date + " " + time;
		return dateTime;
	};

	const handleSubmit = () => {
		// console.log("nameMovie", name);
		// console.log("description", description);
		// console.log("image", image);
		// console.log("video", video);
		// console.log("time", time);
		// console.log("gerne", gerne);
		// console.log("rating", rating);
		// uploadFile();
		// uploadImage();
		axios
			.post(`${base_URL}/movies`, {
				nameMovie: name,
				description: description,
				image: image1,
				video: video1,
				gerne: gerne,
				time: time,
				rating: rating,
			})
			.then((res) => {
				console.log(res.data);
				navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Movies" }] }));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const cinemaState = useSelector((state) => state.cinemaInfor);
	return (
		<ScrollView style={styles.container}>
			<Text style={styles.label}>Name:</Text>
			<TextInput style={styles.input} value={name} onChangeText={setName} />

			<Text style={styles.label}>Gerne:</Text>
			<TextInput style={styles.input} value={gerne} onChangeText={setGerne} />

			<Text style={styles.label}>Raing: (5)</Text>
			<TextInput style={styles.input} value={rating} onChangeText={setRating} />

			<Text style={styles.label}>Description:</Text>
			<TextInput style={styles.input} value={description} onChangeText={setDescription} />
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					marginBottom: 20,
					marginTop: 10,
				}}
			>
				<TouchableOpacity
					style={{
						backgroundColor: "blue",
						justifyContent: "center",
						width: 150,
						height: 50,
						alignItems: "center",
						borderRadius: 10,
					}}
					onPress={pickImage}
				>
					<Text style={styles.buttonText}>Choose Image</Text>
				</TouchableOpacity>
				{/* create touchopacity confirm to confirm image selected  */}

				<TouchableOpacity
					style={{
						backgroundColor: selectedImage ? "red" : "white",
						justifyContent: "center",
						width: 150,
						height: 50,
						alignItems: "center",
						borderRadius: 10,
						flexDirection: "row",
					}}
					onPress={uploadImage}
				>
					<Text style={{ color: selectedImage ? "white" : "black", marginRight: 5 }}>Confirm</Text>
					<MaterialIcons
						name={selectedImage ? "radio-button-checked" : "radio-button-unchecked"}
						size={24}
						color={selectedImage ? "white" : "black"}
					/>
				</TouchableOpacity>
			</View>
			<View style={{ justifyContent: "center", alignItems: "center" }}>
				{image && <Image source={{ uri: image }} style={styles.image} />}
			</View>

			<Text style={styles.label}>Time:</Text>
			<TextInput style={styles.input} value={time} onChangeText={setTime} />

			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					marginBottom: 20,
					marginTop: 10,
				}}
			>
				<TouchableOpacity
					style={{
						backgroundColor: "blue",
						justifyContent: "center",
						width: 150,
						height: 50,
						alignItems: "center",
						borderRadius: 10,
						flexDirection: "row",
					}}
					onPress={pickFile}
				>
					<Text style={styles.buttonText}>Choose Video</Text>
				</TouchableOpacity>
				{/* create touchopacity confirm to confirm video selected  */}
				<TouchableOpacity
					style={{
						backgroundColor: selectedVideo ? "red" : "white",
						justifyContent: "center",
						width: 150,
						height: 50,
						alignItems: "center",
						borderRadius: 10,
						flexDirection: "row",
					}}
					onPress={uploadFile}
				>
					<Text style={{ color: selectedVideo ? "white" : "black", marginRight: 5 }}>Confirm</Text>
					<MaterialIcons
						name={selectedVideo ? "radio-button-checked" : "radio-button-unchecked"}
						size={24}
						color={selectedVideo ? "white" : "black"}
					/>
				</TouchableOpacity>
			</View>
			{video && <Text style={styles.label}>Video {name} already choosen!</Text>}

			<TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
				<Text style={styles.submitButtonText}>Submit</Text>
			</TouchableOpacity>
		</ScrollView>
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
