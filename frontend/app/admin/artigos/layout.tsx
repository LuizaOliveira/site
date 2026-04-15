'use client';

import React from 'react';
import ProtectedRoute from '../../components/auth/ProtectedRoute';

interface ArtigosLayoutProps {
  children: React.ReactNode;
}

export default function ArtigosLayout({ children }: ArtigosLayoutProps) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
