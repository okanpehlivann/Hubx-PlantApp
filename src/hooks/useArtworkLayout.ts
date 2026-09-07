import { useCallback, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import type { ArtworkLayoutOptions } from '.';

export function useArtworkLayout({
  width,
  frameHeight,
  imageHeight,
  imageTop = 0,
}: ArtworkLayoutOptions) {
  const window = useWindowDimensions();
  const [availableSize, setAvailableSize] = useState({ width: 0, height: 0 });

  const onLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    const { width: layoutWidth, height: layoutHeight } = nativeEvent.layout;
    setAvailableSize(previous =>
      previous.width === layoutWidth && previous.height === layoutHeight
        ? previous
        : { width: layoutWidth, height: layoutHeight },
    );
  }, []);

  const scale = Math.min(
    availableSize.width / width,
    availableSize.height / frameHeight,
  );

  return {
    window,
    onLayout,
    frameStyle: { width: width * scale, height: frameHeight * scale },
    imageStyle: {
      width: width * scale,
      height: imageHeight * scale,
      top: imageTop * scale,
    },
  };
}
