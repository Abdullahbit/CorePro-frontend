import React from 'react';
import type { HeaderProps } from '../../types';

export const Header: React.FC<HeaderProps> = ({ appName, description }) => {
    return (
        <header className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left mb-6">
            <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">{appName}</h1>
            <p className="text-gray-500 font-medium text-lg">{description}</p>
        </header>
    );
};
