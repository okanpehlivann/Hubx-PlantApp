import { Alert, Linking, Platform } from 'react-native';
import { act, renderHook } from '@testing-library/react-native';
import {
  launchCamera,
  type ImagePickerResponse,
} from 'react-native-image-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import useCamera from './useCamera';

jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn(),
}));

const mockLaunchCamera = launchCamera as jest.MockedFunction<
  typeof launchCamera
>;
const mockCheck = check as jest.MockedFunction<typeof check>;
const mockRequest = request as jest.MockedFunction<typeof request>;

describe('useCamera', () => {
  const originalPlatform = Platform.OS;

  beforeEach(() => {
    mockLaunchCamera.mockReset();
    mockCheck.mockReset();
    mockRequest.mockReset();
    mockCheck.mockResolvedValue(RESULTS.GRANTED);
  });

  afterEach(() => {
    Object.defineProperty(Platform, 'OS', {
      configurable: true,
      value: originalPlatform,
    });
    jest.restoreAllMocks();
  });

  it('opens the camera and marks permission as granted after a successful capture', async () => {
    const response = {
      assets: [{ uri: 'file:///plant.jpg' }],
    };
    mockLaunchCamera.mockResolvedValue(response);

    const { result } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.openCamera();
    });

    expect(mockLaunchCamera).toHaveBeenCalledWith({
      cameraType: 'back',
      mediaType: 'photo',
      saveToPhotos: false,
    });
    expect(result.current.lastResponse).toEqual(response);
    expect(result.current.permissionStatus).toBe('granted');
    expect(result.current.isOpening).toBe(false);
  });

  it('shows the settings alert on the next attempt after permission is denied', async () => {
    mockCheck.mockResolvedValue(RESULTS.DENIED);
    mockRequest.mockResolvedValue(RESULTS.DENIED);
    const alertSpy = jest.spyOn(Alert, 'alert');
    const openSettingsSpy = jest
      .spyOn(Linking, 'openSettings')
      .mockResolvedValue(undefined);
    const { result } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.openCamera();
    });

    expect(result.current.permissionStatus).toBe('denied');

    await act(async () => {
      await result.current.openCamera();
    });

    expect(mockRequest).toHaveBeenCalledWith(PERMISSIONS.IOS.CAMERA);
    expect(mockLaunchCamera).not.toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith(
      'Camera Permission Required',
      'PlantApp needs access to your camera. Please enable camera permission in your phone settings.',
      expect.any(Array),
    );

    const buttons = alertSpy.mock.calls[0][2];
    const settingsButton = buttons?.find(
      button => button.text === 'Open Settings',
    );

    await act(async () => {
      settingsButton?.onPress?.();
    });

    expect(openSettingsSpy).toHaveBeenCalledTimes(1);
    expect(result.current.permissionStatus).toBe('unknown');
  });

  it('checks the current permission before opening the camera on Android', async () => {
    Object.defineProperty(Platform, 'OS', {
      configurable: true,
      value: 'android',
    });
    mockCheck.mockResolvedValue(RESULTS.GRANTED);
    mockLaunchCamera.mockResolvedValue({ assets: [] });

    const { result } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.openCamera();
    });

    expect(mockCheck).toHaveBeenCalledWith(PERMISSIONS.ANDROID.CAMERA);
    expect(mockRequest).not.toHaveBeenCalled();
    expect(mockLaunchCamera).toHaveBeenCalledTimes(1);
  });

  it('shows settings when Android permission was disabled after being granted', async () => {
    Object.defineProperty(Platform, 'OS', {
      configurable: true,
      value: 'android',
    });
    mockCheck
      .mockResolvedValueOnce(RESULTS.GRANTED)
      .mockResolvedValueOnce(RESULTS.DENIED);
    mockLaunchCamera.mockResolvedValue({ assets: [] });
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { result } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.openCamera();
    });
    await act(async () => {
      await result.current.openCamera();
    });

    expect(mockCheck).toHaveBeenNthCalledWith(2, PERMISSIONS.ANDROID.CAMERA);
    expect(mockLaunchCamera).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(result.current.permissionStatus).toBe('denied');
  });

  it('checks the current iOS permission after it was disabled in settings', async () => {
    mockCheck
      .mockResolvedValueOnce(RESULTS.GRANTED)
      .mockResolvedValueOnce(RESULTS.BLOCKED);
    mockLaunchCamera.mockResolvedValue({ assets: [] });
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { result } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.openCamera();
    });
    await act(async () => {
      await result.current.openCamera();
    });

    expect(mockCheck).toHaveBeenNthCalledWith(2, PERMISSIONS.IOS.CAMERA);
    expect(mockLaunchCamera).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledTimes(1);
  });

  it('ignores a second tap while the camera operation is in progress', async () => {
    let resolveCamera: (response: ImagePickerResponse) => void = () =>
      undefined;
    mockLaunchCamera.mockImplementation(
      () =>
        new Promise(resolve => {
          resolveCamera = resolve;
        }),
    );
    const { result } = renderHook(() => useCamera());

    let firstCall: Promise<ImagePickerResponse | null> = Promise.resolve(null);
    await act(async () => {
      firstCall = result.current.openCamera();
      await Promise.resolve();
    });

    await act(async () => {
      await expect(result.current.openCamera()).resolves.toBeNull();
    });

    resolveCamera({ assets: [] });
    await act(async () => {
      await firstCall;
    });

    expect(mockLaunchCamera).toHaveBeenCalledTimes(1);
  });

  it('opens settings immediately when the permission is blocked', async () => {
    mockCheck.mockResolvedValue(RESULTS.DENIED);
    mockRequest.mockResolvedValue(RESULTS.BLOCKED);
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { result } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.openCamera();
    });

    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(result.current.permissionStatus).toBe('denied');
  });

  it('shows settings if the camera reports a permission error after the check', async () => {
    mockLaunchCamera.mockResolvedValue({
      errorCode: 'permission',
      errorMessage: 'Camera permission was denied.',
    });
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { result } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.openCamera();
    });

    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(result.current.permissionStatus).toBe('denied');
  });

  it('exposes camera errors from the picker and rejected operations', async () => {
    mockLaunchCamera.mockResolvedValue({
      errorCode: 'others',
      errorMessage: 'Camera unavailable.',
    });
    const { result } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.openCamera();
    });

    expect(result.current.error).toBe('Camera unavailable.');

    mockLaunchCamera.mockRejectedValue(new Error('Native camera failure.'));

    await act(async () => {
      await result.current.openCamera();
    });

    expect(result.current.error).toBe('Native camera failure.');
  });
});
