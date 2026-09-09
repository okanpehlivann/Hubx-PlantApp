import {
  CAMERA_OPTIONS,
  CAMERA_PERMISSION_MESSAGE,
  CAMERA_PERMISSION_TITLE,
} from '@constants';
import { CameraPermissionStatus, UseCameraResult } from '@types';
import { useCallback, useRef, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import {
  launchCamera,
  type ImagePickerResponse,
} from 'react-native-image-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export const useCamera = (): UseCameraResult => {
  const [error, setError] = useState<string | null>(null);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [lastResponse, setLastResponse] = useState<ImagePickerResponse | null>(
    null,
  );
  const [permissionStatus, setPermissionStatus] =
    useState<CameraPermissionStatus>('unknown');

  const isOpeningRef = useRef<boolean>(false);
  const permissionStatusRef = useRef<CameraPermissionStatus>('unknown');
  const hasRequestedPermissionRef = useRef<boolean>(false);

  const updatePermissionStatus = useCallback(
    (status: CameraPermissionStatus) => {
      permissionStatusRef.current = status;
      setPermissionStatus(status);
    },
    [],
  );

  const showSettingsAlert = useCallback(() => {
    Alert.alert(CAMERA_PERMISSION_TITLE, CAMERA_PERMISSION_MESSAGE, [
      {
        text: 'Vazgeç',
        style: 'cancel',
      },
      {
        text: 'Ayarlara Git',
        onPress: () => {
          updatePermissionStatus('unknown');
          Linking.openSettings().catch(() => undefined);
        },
      },
    ]);
  }, [updatePermissionStatus]);

  const getCameraPermission = useCallback(() => {
    return Platform.OS === 'ios'
      ? PERMISSIONS.IOS.CAMERA
      : PERMISSIONS.ANDROID.CAMERA;
  }, []);

  const openCamera = useCallback(async () => {
    if (isOpeningRef.current) {
      return null;
    }

    isOpeningRef.current = true;
    setIsOpening(true);
    setError(null);

    try {
      const cameraPermission = getCameraPermission();
      const currentPermission = await check(cameraPermission);

      if (currentPermission !== RESULTS.GRANTED) {
        const shouldOpenSettings =
          currentPermission === RESULTS.BLOCKED ||
          hasRequestedPermissionRef.current ||
          permissionStatusRef.current === 'granted' ||
          permissionStatusRef.current === 'denied';

        if (shouldOpenSettings) {
          updatePermissionStatus('denied');
          showSettingsAlert();
          return null;
        }

        hasRequestedPermissionRef.current = true;
        const requestedPermission = await request(cameraPermission);

        if (requestedPermission !== RESULTS.GRANTED) {
          updatePermissionStatus('denied');

          if (requestedPermission === RESULTS.BLOCKED) {
            showSettingsAlert();
          }

          return null;
        }
      }

      updatePermissionStatus('granted');
      const response = await launchCamera(CAMERA_OPTIONS);
      setLastResponse(response);

      if (response.errorCode === 'permission') {
        updatePermissionStatus('denied');
        showSettingsAlert();
      } else if (!response.errorCode) {
        updatePermissionStatus('granted');
      }

      if (response.errorCode && response.errorCode !== 'permission') {
        setError(response.errorMessage ?? 'Kamera açılamadı.');
      }

      return response;
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : 'Kamera açılamadı.';
      setError(message);
      return null;
    } finally {
      isOpeningRef.current = false;
      setIsOpening(false);
    }
  }, [getCameraPermission, showSettingsAlert, updatePermissionStatus]);

  return {
    error,
    isOpening,
    lastResponse,
    openCamera,
    permissionStatus,
  };
};

export default useCamera;
