import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const CommentList = ({ comments }) => {
  const highlightUser = (commentContent) => {
    // Suponhamos que o nome do usuário esteja entre colchetes [user]
    const regex = /\[(.*?)\]/g; // Expressão regular para encontrar texto entre colchetes
    return commentContent.split(regex).map((segment, index) => {
      if (index % 2 === 1) {
        // Se o índice for ímpar, é o nome do usuário, então destacamos
        return <Text key={index} style={styles.highlightedUser}>{segment}</Text>;
      } else {
        return segment; // Caso contrário, mantemos o texto normal
      }
    });
  };

  return (
    <View style={styles.commentList}>
      <Text style={styles.title}>Comentários:</Text>
      <View>
        {comments.map((comment, index) => (
          <Text key={index} style={styles.comment}>
            {highlightUser(comment.content)}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentList: {
    maxWidth: 800,
    margin: 40,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    fontSize: 24,
    color: '#3498db',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
    paddingBottom: 10,
  },
  comment: {
    fontSize: 16,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  highlightedUser: {
    color: 'red',
  },
});

export default CommentList;


