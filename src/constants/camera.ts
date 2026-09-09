import { type CameraOptions } from 'react-native-image-picker';

export const CAMERA_OPTIONS: CameraOptions = {
  cameraType: 'back',
  mediaType: 'photo',
  saveToPhotos: false,
};

export const CAMERA_PERMISSION_TITLE = 'Kamera İzni Gerekli';
export const CAMERA_PERMISSION_MESSAGE =
  'PlantApp’in kamerayı kullanabilmesi için telefon ayarlarından kamera iznini vermen gerekiyor.';
