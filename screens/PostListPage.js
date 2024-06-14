import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import PostsList from "../components/PostList";
import { useNavigation } from '@react-navigation/native';

const databaseURL = "https://projetobloco-f1e10-default-rtdb.firebaseio.com";

const PostsListPage = () => {
  const [posts, setPosts] = useState([]);
  const [log, setLog] = useState("");
  const [postId, setPostId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${databaseURL}/posts.json`);
        if (!response.ok) {
          throw new Error("Erro ao buscar dados");
        }
        const postsData = await response.json();
        setLog((prevLog) => `${prevLog}\nPosts fetched: ${JSON.stringify(postsData)}`);
        if (postsData) {
          const postsArray = Object.keys(postsData).map((key) => ({
            id: key,
            ...postsData[key],
          }));
          setPosts(postsArray);
        } else {
          setLog((prevLog) => `${prevLog}\nNenhum post encontrado`);
        }
      } catch (error) {
        setLog((prevLog) => `${prevLog}\nErro ao buscar os posts: ${error.message}`);
      }
    };

    fetchPosts();
  }, []);


  return (
    <ScrollView style={styles.postlist}>
      <PostsList posts={posts} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postlist: {
    flex: 1,
    padding: 20,
  },
  logText: {
    marginTop: 20,
    fontSize: 12,
    color: 'gray',
  },
});

export default PostsListPage;


