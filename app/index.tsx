import AudioPlayer from '@/components/AudioPlayer';
import PlayList from '@/components/PlayList';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { useAudioPlayerStore } from '@/store/store';

export default function HomeScreen() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const pause = useAudioPlayerStore((state) => state.pause);
  const showAudioPlayer = useCallback(() => bottomSheetModalRef.current?.present(), []);

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <PlayList showAudioPlayerCallback={showAudioPlayer} />
          <BottomSheetModal
            enableDynamicSizing={false}
            onDismiss={() => pause()}
            ref={bottomSheetModalRef}
            snapPoints={['60%']}>
            <BottomSheetView className="flex-grow">
              <AudioPlayer />
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
});
