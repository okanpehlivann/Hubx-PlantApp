import type { ReactNode } from 'react';

import EmptyState from './EmptyState';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  testID?: string;
}

export default EmptyState;
