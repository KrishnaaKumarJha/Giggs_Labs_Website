import Head from 'next/head';
import PageShell from '../../components/pageshell';
import Button from '../../components/Button';

export default function Martech() {
    return (
        <PageShell
            eyebrow="Industry"
            title="Next-Generation Marketing Technology"
            description="Empower your marketing workflows with intelligent AI-driven campaigns, deep customer insights, and automated hyper-personalization at scale."
            videoSrc="/hero/solutions.mp4"
            videoOpacity={0.7}
        >
            <Head>
                <title>Martech | Giggs Software Labs</title>
                <meta name="description" content="AI-driven campaigns, hyper-personalization, and marketing automation." />
            </Head>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Button href="/contact" variant="primary">Explore Martech Solutions</Button>
            </div>
        </PageShell>
    );
}
