'use client';

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

interface TypewriterTextProps {
    text: string;
    className?: string;
    speed?: number;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    className = "",
    speed = 100
}) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed]);

    return (
        <span className={className}>
            {displayText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-6 bg-blue-600 ml-1"
            />
        </span>
    );
};
