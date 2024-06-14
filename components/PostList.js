import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PostCard from "./PostCard";

const PostsList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <Text>Nenhum post encontrado</Text>;
  }

  return (
    <View>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </View>
  );
};

export default PostsList;
