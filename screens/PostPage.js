import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import LikeDislikeButton from "../components/LikeDeslike";
import CommentModal from "../components/CommentModal";
import CommentList from "../components/CommentList";
import { firebase } from "../firebaseConfig";

const PostPage = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = firebase.database().ref(`posts/${postId}`);
        postRef.on("value", async (snapshot) => {
          const postData = snapshot.val();
          console.log("Fetched post data:", postData);

          const commentsSnapshot = await firebase
            .database()
            .ref(`posts/${postId}/comments`)
            .once("value");
          const commentsData = commentsSnapshot.val() || {};

          setPost({ ...postData, comments: Object.values(commentsData) });
        });
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleLike = async (postId) => {
    const postRef = firebase.database().ref(`posts/${postId}`);
    const snapshot = await postRef.get();
    const post = snapshot.val();
    postRef.update({ likes: (post.likes || 0) + 1 });
  };

  const handleDislike = async (postId) => {
    const postRef = firebase.database().ref(`posts/${postId}`);
    const snapshot = await postRef.get();
    const post = snapshot.val();
    postRef.update({ dislikes: (post.dislikes || 0) + 1 });
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  if (!post) {
    return <Text>Carregando...</Text>;
  }

  const {
    title,
    content,
    publishedDate,
    creatorEmail,
    keywords,
    comments,
    likes,
    dislikes,
  } = post;

  return (
    <View style={styles.container}>
      <View style={styles.postpage}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
        <Text>Publicado em: {publishedDate}</Text>
        <Text>Criador: {creatorEmail}</Text>
        <View style={styles.keywords}>
          {keywords &&
            keywords.map((keyword, index) => (
              <Text key={index} style={styles.keyword}>
                {keyword}
              </Text>
            ))}
        </View>
        <View>
          <Text>Post ID: {postId}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.comments}>
            Quantidade de comentários: {comments ? comments.length : 0}
          </Text>

          <LikeDislikeButton
            postId={postId}
            likes={likes || 0}
            dislikes={dislikes || 0}
            onLike={handleLike}
            onDislike={handleDislike}
          />
          <CommentModal
            isOpen={isCommentModalOpen}
            onClose={handleCloseCommentModal}
            postId={postId}
          />
        </View>
        <Button onPress={() => setIsCommentModalOpen(true)} title="Comentar" />
      </View>
      <CommentList comments={comments} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 20,
  },
  postpage: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3498db",
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  keywords: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  keyword: {
    backgroundColor: "#2ecc71",
    color: "white",
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  comments: {
    fontSize: 16,
  },
});

export default PostPage;