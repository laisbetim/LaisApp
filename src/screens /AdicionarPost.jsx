import { Platform, View, Image, Button } from "react-native";
import { TextInput } from "react-native-paper";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase";
import * as ImagePicker from "expo-image-picker";

export default function AddPostScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // Moved outside of inserirPost

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function inserirPost() {
    try {
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const base64Image = await convertBlobToBase64(blob);

        const payload = {
          Title: title,
          Content: content,
          Image: base64Image,
        };
        const post = await addDoc(postRef, payload);
        console.log(post);
      } else {
        const payload = {
          Title: title,
          Content: content,
        };
        const post = await addDoc(postRef, payload);
        console.log(post);
      }
    } catch (error) {
      console.log(error);
      console.error("Error uploading image: ", error);
    }
  }

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const postRef = collection(db, "Post");

  const ImageComponent = () => {
    if (Platform.OS === "web") {
      return <img src={image} style={{ width: 200, height: 200 }} />;
    } else {
      return (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      );
    }
  };

  return (
    <View>
      <View>
        <View>
          <TextInput label="Titulo" value={title} onChangeText={setTitle} />
          <TextInput
            label="Descrição"
            value={content}
            onChangeText={setContent}
          />
          {image && <ImageComponent />}
          <Button title="Pick an image" onPress={pickImage} />
          <Button
            title="Criar um Post"
            onPress={inserirPost}
            disabled={!title || !content}
          />
        </View>
      </View>
    </View>
  );
}