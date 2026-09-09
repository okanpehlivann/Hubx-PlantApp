import { BottomSheet } from './BottomSheet';

export interface BottomSheetProps {
  visible: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

export default BottomSheet;
