import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from "react-native"; 
import { firebase } from "../firebaseConfig.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("User logged in successfully");
      ToastAndroid.show("Login bem-sucedido!", ToastAndroid.SHORT);
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message);
      console.error("Error logging in user:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      console.log("User logged out successfully");
      ToastAndroid.show("Deslogado com sucesso!", ToastAndroid.SHORT);
      setIsLoggedIn(false); 
    } catch (err) {
      setError(err.message);
      console.error("Error logging out user:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLoggedIn ? "Deslogar" : ""}</Text>
      {isLoggedIn ? null : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
          {error && <Text style={styles.error}>{error}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </>
      )}
      {isLoggedIn && (
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Deslogar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Login;


