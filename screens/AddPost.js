import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { firebase } from "../firebaseConfig.js";

const AddPostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState("");
  const [keywordsArray, setKeywordsArray] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserEmail = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserEmail(user.email);
          setIsLoading(false);
        } else {
          setErrorMessage("Você não está logado, logue para poder criar postagens.");
          setIsLoading(false);
        }
      });
    };

    fetchUserEmail();
  }, []);

  const handleSubmit = async () => {
    if (!title || !content || keywordsArray.length === 0) {
      setErrorMessage("Todos os campos são obrigatórios");
      return;
    }

    if (isLoading) {
      setErrorMessage("Aguarde enquanto o email do usuário está sendo carregado.");
      return;
    }

    if (!userEmail) {
      setErrorMessage("Você não está logado, logue para poder criar postagens.");
      return;
    }

    try {
      const newPost = {
        title,
        content,
        publishedDate: new Date().toISOString(),
        creatorEmail: userEmail,
        keywords: keywordsArray,
        likes: 0,
        dislikes: 0,
      };

      await firebase.database().ref("posts").push(newPost);

      setTitle("");
      setContent("");
      setKeywords("");
      setKeywordsArray([]);
      setErrorMessage("");

      console.log("Post criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar o post:", error);
      setErrorMessage("Erro ao criar o post. Por favor, tente novamente.");
    }
  };

  const handleAddKeyword = () => {
    if (keywords) {
      setKeywordsArray([...keywordsArray, keywords]);
      setKeywords("");
    }
  };

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <>
          <Text style={styles.label}>Título:</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <Text style={styles.label}>Conteúdo:</Text>
          <TextInput
            style={styles.input}
            value={content}
            onChangeText={setContent}
            multiline
          />
          <Text style={styles.label}>Palavras-chave:</Text>
          <TextInput
            style={styles.input}
            value={keywords}
            onChangeText={setKeywords}
          />
          <Button title="Adicionar Palavra-chave" onPress={handleAddKeyword} />
          <View style={styles.keywordsContainer}>
            {keywordsArray.map((keyword, index) => (
              <Text key={index} style={styles.keyword}>
                {keyword}
              </Text>
            ))}
          </View>
          <Button title="Criar Post" onPress={handleSubmit} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  keywordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  keyword: {
    backgroundColor: "#ddd",
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});

export default AddPostPage;

