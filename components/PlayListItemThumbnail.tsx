import React from 'react';
import { StyleSheet } from 'react-native';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { PlayListItem } from '@/model/track';
import { Text } from '@/components/ui/text';

/**
 * Component that renders the thumbnail of a playlist item.
 */
const PlayListItemThumbnail = ({ item, size }: { item: PlayListItem; size: number }) => {
  return (
    <Box style={styles.thumbnail}>
      <Image source={{ uri: item.imageURI }} alt={`Track ${item.name}`} width={size} height={size} />
      <Box style={styles.titleBox}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.artist}>{item.artist}</Text>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    gap: 5,
    justifyContent: 'center',
    padding: 0,
    width: '100%',
  },
  titleBox: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 0,
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  artist: {
    fontSize: 14,
    color: 'white',
  },
});

export default PlayListItemThumbnail;
