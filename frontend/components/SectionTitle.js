import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({
    eyebrow,
    title,
    subtitle,
    align = 'left',
    underline = 'short',
    className = '',
}) => {
    const alignText = align === 'center' ? 'text-center' : 'text-left';
    const subtitleWidth = align === 'center' ? 'mx-auto' : '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
            className={`${alignText} space-y-2 ${className}`}
        >
            {eyebrow && (
                <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-400/80">
                    {eyebrow}
                </div>
            )}

            {title && (
                <h2 className="inline-block bg-gradient-to-r from-[#00E0FF] via-[#4C8DFF] to-[#0066FF] bg-clip-text text-2xl md:text-3xl font-extrabold tracking-tight text-transparent">
                    {title}
                </h2>
            )}

            {subtitle && (
                <p className={`text-sm text-slate-300 ${subtitleWidth} max-w-2xl`}>
                    {subtitle}
                </p>
            )}

            {title && underline !== 'none' && (
                <>
                    {underline === 'short' && (
                        <div
                            className={`flex ${align === 'center' ? 'justify-center' : 'justify-start'
                                }`}
                        >
                            <div className="mt-1 h-[2px] w-16 rounded-full bg-gradient-to-r from-[#00E0FF] via-[#4C8DFF] to-[#0066FF] blur-[0.5px]" />
                        </div>
                    )}

                    {underline === 'full' && (
                        <div className="mt-4 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-[#00E0FF]/50 to-transparent opacity-70 mx-auto" />
                    )}
                </>
            )}
        </motion.div>
    );
};

export default SectionTitle;
