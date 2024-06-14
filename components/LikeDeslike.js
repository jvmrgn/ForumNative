import React, { useState, useEffect } from 'react';
import { firebase } from '../firebaseConfig';
import { View, Button, StyleSheet } from 'react-native';

const LikeDislikeButton = ({ postId, userEmail }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null);

  useEffect(() => {
    const postRef = firebase.database().ref(`posts/${postId}`);
    postRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);
        setUserReaction(data.userReaction || null);
      }
    });

    return () => {
      postRef.off();
    };
  }, [postId]);

  const handleLikeClick = () => {
    if (userReaction === 'like') {
      firebase.database().ref(`posts/${postId}`).update({
        likes: likes - 1,
        userReaction: null,
      });
    } else {
      let likeDelta = 1;
      let dislikeDelta = 0;
      if (userReaction === 'dislike') {
        dislikeDelta = -1;
      }
      firebase.database().ref(`posts/${postId}`).update({
        likes: likes + likeDelta,
        dislikes: dislikes + dislikeDelta,
        userReaction: 'like',
      });
    }
  };

  const handleDislikeClick = () => {
    if (userReaction === 'dislike') {
      firebase.database().ref(`posts/${postId}`).update({
        dislikes: dislikes - 1,
        userReaction: null,
      });
    } else {
      let dislikeDelta = 1;
      let likeDelta = 0;
      if (userReaction === 'like') {
        likeDelta = -1;
      }
      firebase.database().ref(`posts/${postId}`).update({
        dislikes: dislikes + dislikeDelta,
        likes: likes + likeDelta,
        userReaction: 'dislike',
      });
    }
  };

  return (
    <View style={styles.likeDislikeButton}>
      <Button
        onPress={handleLikeClick}
        title={`Like (${likes})`}
        color={userReaction === 'like' ? 'green' : 'gray'}
      />
      <Button
        onPress={handleDislikeClick}
        title={`Dislike (${dislikes})`}
        color={userReaction === 'dislike' ? 'red' : 'gray'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  likeDislikeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default LikeDislikeButton;

