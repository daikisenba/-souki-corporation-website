'use client';

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

// パーティクルコンポーネント
export const ParticleBackground = () => {
    const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number, speed: number }>>([]);

    useEffect(() => {
        const generateParticles = () => {
            const newParticles = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 1,
                speed: Math.random() * 0.5 + 0.1
            }));
            setParticles(newParticles);
        };

        generateParticles();
        const interval = setInterval(() => {
            setParticles(prev => prev.map(particle => ({
                ...particle,
                y: particle.y - particle.speed,
                x: particle.x + (Math.random() - 0.5) * 0.5
            })).filter(particle => particle.y > -10));
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map(particle => (
                <motion.div
                    key={particle.id}
                    className="absolute bg-blue-200/30 rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: particle.id * 0.1,
                    }}
                />
            ))}
        </div>
    );
};

// 動的背景パターン
export const DynamicBackground = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 25% 25%, #3B82F6 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, #1D4ED8 0%, transparent 50%),
                        linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.1) 50%, transparent 60%)
                    `,
                    backgroundSize: '100% 100%, 100% 100%, 200px 200px',
                    animation: 'backgroundShift 20s ease-in-out infinite',
                }}
            />
        </div>
    );
};
