import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { useAudioPlayerStore } from '@/store/store';
import { PlayListItem } from '@/model/track';
import { Text } from '@/components/ui/text';
import { Divider } from '@/components/ui/divider';
import AudioLineAnimation from './AudioLinesAnimation';

interface PlayListProps {
  showAudioPlayerCallback: () => void;
}

/**
 * Component that renders a list of tracks and allows the selection of a track to play.
 */
const PlayList = (props: PlayListProps) => {
  const { showAudioPlayerCallback } = props;
  const playlist = useAudioPlayerStore((state) => state.playlist);
  const currentTrack = useAudioPlayerStore((state) => state.currentTrack);
  const play = useAudioPlayerStore((state) => state.play);
  const setTrack = useAudioPlayerStore((state) => state.setTrack);
  const flatListRef = useRef<FlatList<PlayListItem>>(null);

  /**
   * Automatically scroll to the current track when it changes.
   */
  useEffect(() => {
    if (currentTrack.item) {
      const index = playlist.items.findIndex((item) => item.id === currentTrack.item.id);
      if (index !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({ index, animated: true });
      }
    }
  }, [currentTrack, playlist.items]);

  /**
   * Play the selected track.
   */
  const onPlayListItemPress = async (item: PlayListItem) => {
    setTrack(item);
    await play();
    showAudioPlayerCallback();
  };

  const renderItem = ({ item }: { item: PlayListItem }) => (
    <TouchableOpacity onPress={async () => await onPlayListItemPress(item)}>
      <Box style={styles.card}>
        <Image source={{ uri: item.imageURI }} alt={`Track ${item.name}`} width={42} height={32} />
        <Box style={styles.titleBox}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.artist}>{item.artist}</Text>
        </Box>
        {currentTrack.item.id === item.id && currentTrack.isPlaying && <AudioLineAnimation />}
      </Box>
    </TouchableOpacity>
  );

  return (
    <FlatList
      contentContainerStyle={styles.listContent}
      data={playlist.items}
      ItemSeparatorComponent={Divider}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ref={flatListRef}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexGrow: 1,
    width: '100%',
  },
  listContent: {
    padding: 0,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    padding: 16,
  },
  titleBox: {
    flex: 1,
    flexDirection: 'column',
    gap: 0,
  },
  title: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  artist: {
    color: '#666',
    fontSize: 12,
  },
});

export default PlayList;
