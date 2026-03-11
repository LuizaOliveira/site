'use client';

import React from 'react';
import ProtectedRoute from '../../components/auth/ProtectedRoute';

interface ArquivoLayoutProps {
  children: React.ReactNode;
}

export default function ArquivoLayout({ children }: ArquivoLayoutProps) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}
