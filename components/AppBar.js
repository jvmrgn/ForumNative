import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AppBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.button}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Ranking')}>
        <Text style={styles.button}>Ranking</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Posts')}>
        <Text style={styles.button}>Posts</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    height: 60,
  },
  button: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppBar;

