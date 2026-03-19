import Head from 'next/head';
import PageShell from '../../components/pageshell';
import Button from '../../components/Button';

export default function Healthcare() {
    return (
        <PageShell
            eyebrow="Industry"
            title="Digital Healthcare Innovation"
            description="Build HIPAA-compliant data lakes, predictive diagnostic models, and unified patient-centric digital experiences that improve health outcomes."
            videoSrc="/hero/solutions.mp4"
            videoOpacity={0.7}
        >
            <Head>
                <title>Healthcare | Giggs Software Labs</title>
                <meta name="description" content="Predictive diagnostics and patient-centric platforms." />
            </Head>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Button href="/contact" variant="primary">Explore HealthTech</Button>
            </div>
        </PageShell>
    );
}
