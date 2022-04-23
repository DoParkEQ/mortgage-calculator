const ErrorBoundaryDefault = ({ error }: any) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export default ErrorBoundaryDefault
