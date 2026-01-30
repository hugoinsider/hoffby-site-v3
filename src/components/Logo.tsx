import React from 'react';
import Image from 'next/image';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-24 h-24" }) => {
    return (
        <div className={`relative ${className}`}>
            <Image
                src="/logo.svg"
                alt="Hoffby Logo"
                fill
                className="object-contain"
                priority
            />
        </div>
    );
};
