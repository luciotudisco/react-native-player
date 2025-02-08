import React from 'react';
import { FlatList, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { useAudioPlayerStore } from '@/store/store';
import { PlayListItem } from '@/model/track';

const PlayList = () => {
  const currentPlaylist = useAudioPlayerStore((state) => state.playlist);
  const setTrack = useAudioPlayerStore((state) => state.setTrack);

  const renderItem = ({ item }: { item: PlayListItem }) => (
    <TouchableOpacity onPress={() => setTrack(currentPlaylist.items.findIndex((i) => i.name === item.name))}>
      <Box style={styles.card}>
        <Image source={{ uri: item.imageURI }} alt={`Track ${item.name}`} style={styles.image} />
        <Box style={styles.titleBox}>
          <Text style={styles.title}>{item.name}</Text>
          {item.artist && <Text style={styles.artist}>{item.artist}</Text>}
        </Box>
      </Box>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={currentPlaylist.items}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.name}_${index}`}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: '100%',
  },
  listContent: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    flex: 1,
    gap: 16,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  image: {
    width: 64,
    height: 64 * 0.75, // 4:3 aspect ratio
    borderRadius: 8,
    marginBottom: 12,
  },
  titleBox: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  artist: {
    fontSize: 14,
    color: '#666',
  },
});

export default PlayList;
