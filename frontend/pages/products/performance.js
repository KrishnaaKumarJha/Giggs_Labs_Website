// frontend/pages/products/performance.js
import { motion } from 'framer-motion';
import Link from 'next/link';
import PageShell from '../../components/pageshell';
import { Gauge, ArrowLeft } from 'lucide-react';

export default function PerformanceProductPage() {
    return (
        <PageShell
            eyebrow="Performance Product"
            title="Coming Soon."
            description="Our Performance Engineering suite is currently under development. We are building tools to deliver reliability, speed, and scale at your fingertips."
            videoSrc="/hero/performance.mp4"
            videoOpacity={0.4}
            align="center"
        >
            <div className="flex justify-center mt-10 mb-20">
                <Link href="/products" className="inline-flex items-center justify-center bg-transparent border border-[#1E7BFF] text-[#1E7BFF] hover:bg-[#1E7BFF]/10 font-inter font-bold rounded-[8px] px-[24px] py-[14px] transition-all">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Products
                </Link>
            </div>
        </PageShell>
    );
}
