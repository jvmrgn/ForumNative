import React, { useState, useEffect } from 'react';
import { firebase } from '../../../firebaseConfig';
import { View, TextInput, Button } from 'react-native';

const PostOptions = ({ postId, creatorEmail, publishedDate, keywords }) => {
  const currentUser = firebase.auth().currentUser;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedKeywords, setEditedKeywords] = useState([]);
  const [originalTitle, setOriginalTitle] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [originalKeywords, setOriginalKeywords] = useState([]);

  useEffect(() => {
    setOriginalTitle(editedTitle);
    setOriginalContent(editedContent);
    setOriginalKeywords(keywords);
  }, []);

  const handleDeletePost = async () => {
    try {
      await firebase.database().ref(`posts/${postId}`).remove();
      toast('Post deletado com sucesso!');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditPost = async () => {
    try {
      await firebase.database().ref(`posts/${postId}`).update({
        title: editedTitle,
        content: editedContent,
        keywords: editedKeywords,
      });
      toast('Post editado com sucesso!');
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
    setEditedTitle(originalTitle);
    setEditedContent(originalContent);
    setEditedKeywords([...originalKeywords]);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleAddKeyword = () => {
    setEditedKeywords([...editedKeywords, '']);
  };

  const handleRemoveKeyword = (index) => {
    const newKeywords = [...editedKeywords];
    newKeywords.splice(index, 1);
    setEditedKeywords(newKeywords);
  };

  const handleChangeKeyword = (index, value) => {
    const newKeywords = [...editedKeywords];
    newKeywords[index] = value;
    setEditedKeywords(newKeywords);
  };

  if (currentUser && currentUser.email === creatorEmail) {
    return (
      <View style={styles.postOptions}>
        <Button onPress={openEditModal} title="Editar Post" />
        <Button onPress={handleDeletePost} title="Excluir Post" />
        {isEditModalOpen && (
          <View style={styles.editModal}>
            <TextInput
              style={styles.input}
              placeholder="Novo título"
              value={editedTitle}
              onChangeText={(text) => setEditedTitle(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Novo conteúdo"
              value={editedContent}
              onChangeText={(text) => setEditedContent(text)}
              multiline
            />
            <View style={styles.keywordsContainer}>
              {editedKeywords.map((keyword, index) => (
                <View key={index} style={styles.keyword}>
                  <TextInput
                    style={styles.input}
                    value={keyword}
                    onChangeText={(text) => handleChangeKeyword(index, text)}
                  />
                  <Button
                    onPress={() => handleRemoveKeyword(index)}
                    title="X"
                  />
                </View>
              ))}
              <Button onPress={handleAddKeyword} title="Adicionar Palavra-chave" />
            </View>
            <Button onPress={handleEditPost} title="Salvar" />
            <Button onPress={handleCancelEdit} title="Cancelar" />
          </View>
        )}
      </View>
    );
  }

  return null;
};

export default PostOptions;
