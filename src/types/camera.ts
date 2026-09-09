import { type ImagePickerResponse } from 'react-native-image-picker';

export type CameraPermissionStatus = 'unknown' | 'granted' | 'denied';

export interface UseCameraResult {
  error: string | null;
  isOpening: boolean;
  lastResponse: ImagePickerResponse | null;
  permissionStatus: CameraPermissionStatus;
  openCamera: () => Promise<ImagePickerResponse | null>;
}
