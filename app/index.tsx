import PlayList from '@/components/PlayList';
import { useAudioPlayerStore } from '@/store/store';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const currentPlaylist = useAudioPlayerStore((state) => state.playlist);

  return (
    <>
      <Stack.Screen options={{ title: currentPlaylist.name }} />
      <View style={styles.container}>
        <PlayList />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
