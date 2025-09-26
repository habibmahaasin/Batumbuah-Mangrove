import AdminLayouts from '@/components/layouts/admin';

import { ReactNode } from 'react';

export default function AdminModules({ children }: { children: ReactNode }) {
  return <AdminLayouts>{children}</AdminLayouts>;
}
