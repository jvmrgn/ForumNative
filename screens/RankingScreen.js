import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { firebase } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const RankingPage = () => {
  const [ranking, setRanking] = useState([]);
  const [log, setLog] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const rankingRef = firebase.database().ref("users").orderByChild("points");
        rankingRef.on("value", (snapshot) => {
          const rankingData = snapshot.val();
          if (rankingData) {
            const rankingArray = Object.values(rankingData).sort((a, b) => b.points - a.points);
            setRanking(rankingArray);
          } else {
            setLog((prevLog) => `${prevLog}\nNenhum usuário encontrado no ranking`);
          }
        });
      } catch (error) {
        setLog((prevLog) => `${prevLog}\nErro ao buscar o ranking: ${error.message}`);
      }
    };

    fetchRanking();

    return () => {
      firebase.database().ref("users").off();
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={ranking}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.userContainer}>
            <Text>{index + 1}</Text>
            <Text>{item.email}</Text>
            <Text>{item.points}</Text>
          </View>
        )}
      />
      <Text style={styles.logText}>{log}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  logText: {
    marginTop: 20,
    fontSize: 12,
    color: "gray",
  },
});

export default RankingPage;

