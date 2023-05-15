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
import { firebase } from "../Api/firebase";
import { set } from "react-native-reanimated";

export default function MoviesAdd() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);
	const [time, setTime] = useState("");
	const [video, setVideo] = useState(null);
	const [selected, setSelected] = useState("");
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
		const source = { uri: result.assets[0].uri };
		console.log(source);
		setImage(source);
	};

	const uploadImage = async () => {
		setUploading(true);
		const response = await fetch(image.uri);
		const blob = await response.blob();
		const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
		const ref = firebase.storage().ref().child(`images/${filename}`).put(blob);
		try {
			await ref;
		} catch (error) {
			console.log(error);
		}
		setUploading(false);
		Alert.alert("Photo uploaded");
		setImage(null);
	};

	const pickFile = async () => {
		let result = await DocumentPicker.getDocumentAsync({
			type: "video/*",
		});
		try {
			console.log(result);
			const source = { uri: result.uri };
			setVideo(source);
		} catch (error) {
			console.log(error);
		}
	};
	const uploadFile = async () => {
		setUploading(true);
		const response = await fetch(video.uri);
		const blob = await response.blob();
		const filename = video.uri.substring(video.uri.lastIndexOf("/") + 1);
		const ref = firebase.storage().ref().child(`videos/${filename}`).put(blob);
		try {
			await ref;
		} catch (error) {
			console.log(error);
		}
		setUploading(false);
		Alert.alert("Video uploaded");
		setVideo(null);
	};

	const [imageURL, setImageURL] = useState("");
	const [videoURL, setVideoURL] = useState("");

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
		// Handle submitting the new movie to your backend server
	};
	return (
		<ScrollView style={styles.container}>
			<Text style={styles.label}>Name:</Text>
			<TextInput style={styles.input} value={name} onChangeText={setName} />

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
				{image && <Image source={{ uri: image.uri }} style={styles.image} />}
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
