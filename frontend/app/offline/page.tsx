"use client";



export default function OfflinePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <h1 className="text-4xl font-bold mb-4">You are offline</h1>
            <p className="text-lg mb-8">
                Please check your internet connection to access the full application.
            </p>
            <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-foreground text-background rounded hover:opacity-90 transition-opacity"
            >
                Try Again
            </button>
        </div>
    );
}
