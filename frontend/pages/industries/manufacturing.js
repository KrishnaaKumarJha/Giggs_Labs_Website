import Head from 'next/head';
import PageShell from '../../components/pageshell';
import Button from '../../components/Button';

export default function Manufacturing() {
    return (
        <PageShell
            eyebrow="Industry"
            title="Industry 4.0 & Smart Manufacturing"
            description="Unlock operational excellence with IoT integrations, digital twins, and AI-driven predictive maintenance for global supply chains."
            videoSrc="/hero/solutions.mp4"
            videoOpacity={0.7}
        >
            <Head>
                <title>Manufacturing | Giggs Software Labs</title>
                <meta name="description" content="Smart factories and IoT-powered operational efficiency." />
            </Head>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Button href="/contact" variant="primary">Explore Industry 4.0</Button>
            </div>
        </PageShell>
    );
}
