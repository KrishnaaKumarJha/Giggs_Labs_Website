// frontend/data/posts.js
const posts = [
  {
    slug: 'how-we-build-realtime-systems',
    title: 'How we build realtime systems',
    date: '2025-11-01',
    excerpt: 'Architecture patterns, tools, and lessons from production realtime systems.',
    content: `# Realtime systems: overview

We use event-driven architecture, streaming, and careful capacity planning.

## Key principles

- Event-driven architecture
- Backpressure and queues
- Observability and tracing

### Example code (Node)

\`\`\`js
import http from 'http';
console.log('hello realtime');
\`\`\`

More content here.
`,
  },
  // ...other posts
];

export default posts;
