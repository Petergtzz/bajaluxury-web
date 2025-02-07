"use client";

export default function LoadingComponent() {
  return (
    <div className="flex items-center justify-center h-full space-x-2">
      <div className="w-6 h-6 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
      <span className="tracking-tight text-sm font-medium">Loading...</span>
    </div>
  );
}
