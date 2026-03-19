import Head from 'next/head';
import PageShell from '../../components/pageshell';
import Button from '../../components/Button';

export default function Banking() {
    return (
        <PageShell
            eyebrow="Industry"
            title="Banking, Financial Services & Insurance (BFSI)"
            description="Modernize core banking architectures, deploy AI-driven fraud detection, and deliver personalized omnichannel fintech experiences at global scale."
            videoSrc="/hero/solutions.mp4"
            videoOpacity={0.7}
        >
            <Head>
                <title>Banking & Financial | Giggs Software Labs</title>
                <meta name="description" content="Secure, compliant, and data-driven fintech solutions." />
            </Head>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Button href="/contact" variant="primary">Explore BFSI Solutions</Button>
            </div>
        </PageShell>
    );
}
