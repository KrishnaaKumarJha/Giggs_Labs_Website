import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// A reusable Button component matching the Giggs Brand Design System
// - Primary: bg-brand-secondary (Electric Blue) + White text
// - Secondary: border-brand-secondary (Electric Blue) + Electric Blue text
const Button = ({
    variant = 'primary',
    href,
    onClick,
    children,
    className = '',
    external = false,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-[8px] px-[24px] py-[14px] font-medium transition-colors duration-200";

    const variants = {
        primary: "bg-brand-secondary text-white hover:bg-blue-600 shadow-[0_0_15px_rgba(30,123,255,0.4)] hover:shadow-[0_0_20px_rgba(30,123,255,0.6)]",
        secondary: "border border-brand-secondary text-brand-secondary bg-transparent hover:bg-brand-secondary/10",
        ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5 border border-transparent",
    };

    const classes = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

    if (href) {
        if (external) {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
                    {children}
                </a>
            );
        }
        return (
            <Link href={href} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={classes}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
