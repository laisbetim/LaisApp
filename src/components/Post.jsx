import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { db } from "../config/firebase";
import { collection, deleteDoc, doc, getDocs, increment, updateDoc } from "firebase/firestore";
import { View } from "react-native-web";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const Post = ({ navigation }) => {
  const [post, setPost] = React.useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const querySnapshot = await getDocs(collection(db, "Post"));
      const postList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        Title: doc.data().Title,
        Content: doc.data().Content,
        Image: doc.data().Image,
      }));
      setPost(postList);
    };

    fetchPost();
  }, []);

  const deletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, "Post", postId));
      setPost((prevPost) => prevPost.filter((post) => post.id !== postId));
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };

  const likePost = async (postId) => {
    try {
      await updateDoc(doc(db, "Post", postId), {
        likes: increment(1),
      });
    } catch (error) {
      console.log("Error updating post:", error);
    }
  }



  return (
    <ScrollView>
      <View>
        {post.map((post) => (
          <Card key={post.id} style={{ backgroundColor: "gray", margin: 10 }}>
            {post.Image && <Card.Cover source={{ uri: post.Image }} />}
            <Card.Content>
              <Text style={{ color: "#fff" }} variant="titleLarge">
                {post.Title}
              </Text>
              <Text style={{ color: "#fff" }} variant="bodyMedium">
                {post.Content}
              </Text>
            </Card.Content>
            <Card.Actions>
              {/* ... (Edit Button) */}
              <Button
                style={{
                  alignItems: "center",
                  width: 50,
                  height: 50,
                  borderRadius: 2 * 70,
                  paddingTop: 3,
                }}
                mode="text"
                textColor="#fff"
                onPress={() => deletePost(post.id)}
              >
                <MaterialCommunityIcons name="close" size={35} />

                
              </Button>
              <Button
                style={{
                  alignItems: "center",
                  width: 50,
                  height: 50,
                  borderRadius: 2 * 70,
                  paddingTop: 3,
                  }}
                  mode="text"
                  textColor="#fff"
                  onPress={() => likePost(post.id)}
                >
                <MaterialCommunityIcons name="heart" size={30} color="white" />
                </Button>
                
            </Card.Actions>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

export default Post;