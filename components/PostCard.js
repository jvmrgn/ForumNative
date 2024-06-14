import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PostCard = ({ post }) => {
  const navigation = useNavigation();

  if (!post) {
    return null;
  }

  const {
    id,
    title,
    description,
    publishedDate,
    creatorEmail,
    keywords,
    comments,
  } = post;

  const truncatedDescription =
    description && description.length > 100
      ? `${description.substring(0, 100)}...`
      : description;

  const handlePress = () => {
    console.log("PostCard handlePress called with postId:", id);
    navigation.navigate("PostPage", { postId: id });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Text style={styles.title}>{title}</Text>
      <Text>{truncatedDescription}</Text>
      <Text>Publicado em: {publishedDate}</Text>
      <Text>Criador: {creatorEmail}</Text>
      <Text>Palavras-chave: {keywords ? keywords.join(", ") : ""}</Text>
      <Text>Quantidade de comentários: {comments ? comments.length : 0}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PostCard;


