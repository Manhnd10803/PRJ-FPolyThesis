type FallbackProps = { error: Error; resetErrorBoundary: () => void };

export const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  console.log('error', error);

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
