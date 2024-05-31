import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet } from 'react-native';
import AppBar from './components/AppBar';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import RankingScreen from './screens/RankingScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <AppBar />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} /> 
          <Stack.Screen name="Posts" component={PostScreen} /> 
          <Stack.Screen name="Ranking" component={RankingScreen} /> 
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

