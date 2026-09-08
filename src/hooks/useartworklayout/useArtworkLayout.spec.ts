import { act, renderHook } from '@testing-library/react-native';
import type { LayoutChangeEvent } from 'react-native';
import { useArtworkLayout } from '.';

describe('useArtworkLayout', () => {
  it('scales the frame and artwork to fit the available area', () => {
    const { result } = renderHook(() =>
      useArtworkLayout({
        width: 375,
        frameHeight: 500,
        imageHeight: 600,
        imageTop: -10,
      }),
    );

    act(() => {
      result.current.onLayout({
        nativeEvent: {
          layout: { width: 300, height: 400, x: 0, y: 0 },
        },
      } as LayoutChangeEvent);
    });

    expect(result.current.frameStyle).toEqual({
      width: 300,
      height: 400,
    });
    expect(result.current.imageStyle).toEqual({
      width: 300,
      height: 480,
      top: -8,
    });
  });

  it('uses the limiting dimension instead of overflowing the frame', () => {
    const { result } = renderHook(() =>
      useArtworkLayout({
        width: 400,
        frameHeight: 500,
        imageHeight: 550,
      }),
    );

    act(() => {
      result.current.onLayout({
        nativeEvent: {
          layout: { width: 400, height: 250, x: 0, y: 0 },
        },
      } as LayoutChangeEvent);
    });

    expect(result.current.frameStyle).toEqual({
      width: 200,
      height: 250,
    });
    expect(result.current.imageStyle).toEqual({
      width: 200,
      height: 275,
      top: 0,
    });
  });
});
