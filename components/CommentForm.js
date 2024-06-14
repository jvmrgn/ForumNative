import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CommentForm = ({ postId }) => {
  const navigation = useNavigation();

  const [comment, setComment] = useState('');

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmit = () => {
    console.log('Comentário enviado:', comment);
    setComment('');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleBack = () => {
    navigation.goBack(); 
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu comentário"
          onChangeText={handleCommentChange}
          value={comment}
          multiline={true}
          numberOfLines={4}
        />
        <Button title="Enviar" onPress={handleSubmit} />
        {Platform.OS === 'ios' && (
          <Button title="Fechar" onPress={handleBack} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    ...Platform.select({
      ios: {
        backgroundColor: '#f9f9f9',
      },
    }),
  },
});

export default CommentForm;



