import React from 'react';

export function CircularProgress() {
    return (
        <div className="flex items-center justify-center justify-items-center">
            <div className="w-12 h-12 border-4 border-green-400 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
    );
}
