function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-14 w-14 animate-spin rounded-full border-b-2 border-pop">
        <span className="ml-3 text-pop">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
