'use client';

import React from 'react';
import { motion } from "framer-motion";
import { Code, Cpu, Database, Globe, Zap } from "lucide-react";

export const InteractiveTechDisplay = () => {
    const techIcons = [
        { Icon: Cpu, delay: 0 },
        { Icon: Database, delay: 0.5 },
        { Icon: Globe, delay: 1 },
        { Icon: Zap, delay: 1.5 }
    ];

    return (
        <div className="relative w-96 h-96">
            {/* メインの技術要素 */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center"
            >
                <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                    <Code className="w-24 h-24 text-white" />
                </motion.div>
            </motion.div>

            {/* 周囲の技術アイコン */}
            {techIcons.map(({ Icon, delay }, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay }}
                    className="absolute w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center"
                    style={{
                        top: `${25 + (index % 2) * 50}%`,
                        left: `${25 + Math.floor(index / 2) * 50}%`,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <Icon className="w-8 h-8 text-blue-600" />
                </motion.div>
            ))}
        </div>
    );
};
