import React from 'react';

export function LoadingSpinner({ text = "Loading...", fullScreen = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-secondary border-b-transparent animate-spin opacity-80" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
      </div>
      {text && <p className="text-sm font-medium text-gray-600 animate-pulse">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-neutralBg/90 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}

export default LoadingSpinner;
