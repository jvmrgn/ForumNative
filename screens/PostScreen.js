import { View, Text } from 'react-native';
import PostListPage from "./PostListPage"

const PostScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PostListPage />
    </View>
  );
}

export default PostScreen;
