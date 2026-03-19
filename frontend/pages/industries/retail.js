import Head from 'next/head';
import PageShell from '../../components/pageshell';
import Button from '../../components/Button';

export default function Retail() {
    return (
        <PageShell
            eyebrow="Industry"
            title="Next-Generation Retail & Commerce"
            description="Drive hyper-personalization, intelligent inventory forecasting, and frictionless omnichannel experiences powered by advanced data science."
            videoSrc="/hero/solutions.mp4"
            videoOpacity={0.7}
        >
            <Head>
                <title>Retail & E-commerce | Giggs Software Labs</title>
                <meta name="description" content="Omnichannel analytics and intelligent supply chains." />
            </Head>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Button href="/contact" variant="primary">Explore Retail Tech</Button>
            </div>
        </PageShell>
    );
}
