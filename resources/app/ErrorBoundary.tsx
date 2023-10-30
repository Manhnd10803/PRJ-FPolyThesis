import React from 'react';
import { ErrorBoundary as Error } from 'react-error-boundary';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return <Error fallback={<div>Something went wrong</div>}>{children}</Error>;
};
