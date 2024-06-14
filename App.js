import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, Button } from 'react-native';
import AppBar from './components/AppBar';
import HomeScreen from './screens/HomeScreen';
import RankingScreen from './screens/RankingScreen';
import PostsListPage from './screens/PostListPage';
import AddPostPage from './screens/AddPost'; 
import Login from './screens/Login'; 
import PostPage from './screens/PostPage'
import Camera from './components/Camera'

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <AppBar />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Ranking" component={RankingScreen} />
          <Stack.Screen name="Posts" component={PostsListPage} />
          <Stack.Screen name="AddPost" component={AddPostPage} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="PostPage" component={PostPage} />
          <Stack.Screen name="Camera" component={Camera} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
