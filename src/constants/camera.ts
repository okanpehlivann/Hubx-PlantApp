import { type CameraOptions } from 'react-native-image-picker';

export const CAMERA_OPTIONS: CameraOptions = {
  cameraType: 'back',
  mediaType: 'photo',
  saveToPhotos: false,
};

export const CAMERA_PERMISSION_TITLE = 'Camera Permission Required';
export const CAMERA_PERMISSION_MESSAGE =
  'PlantApp needs access to your camera. Please enable camera permission in your phone settings.';
