'use client';

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface TechCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    delay: number;
}

export const TechCard: React.FC<TechCardProps> = ({
    icon: Icon,
    title,
    description,
    delay
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group cursor-pointer"
        >
            <motion.div
                animate={{
                    scale: isHovered ? 1.05 : 1,
                    rotateY: isHovered ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100/50"
            >
                <motion.div
                    animate={{
                        rotate: isHovered ? 360 : 0,
                        scale: isHovered ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto"
                >
                    <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-blue-700 mb-3 text-center">{title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{description}</p>

                {/* ホバー時の光効果 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent rounded-2xl pointer-events-none"
                />
            </motion.div>
        </motion.div>
    );
};
