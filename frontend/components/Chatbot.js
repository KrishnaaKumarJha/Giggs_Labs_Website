import React, { useEffect, useRef } from 'react';

export default function Chatbot() {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        /**
         * ════════════════════════════════════════════════════════════
         *  SMART CHATBOT WIDGET — Standalone JavaScript Module
         *  100% Client-Side • No API Required • Easy Integration
         * ════════════════════════════════════════════════════════════
         */

        const ChatbotLogic = (function () {
            'use strict';

            const DEFAULT_CONFIG = {
                name: "Giggs Assistant",
                greeting: "Hey! 👋 I'm your virtual assistant. Ask me about our services, projects, or anything else. How can I help you today?",
                colors: {
                    primary: "#22d3ee",
                    primaryDark: "#0891b2",
                    accent: "#3b82f6",
                    success: "#10b981",
                },
                routes: {
                    services: { url: "/services", label: "Our Services", icon: "🛠️" },
                    cybersecurity: { url: "/services/cybersecurity", label: "Cybersecurity", icon: "🛡️" },
                    projects: { url: "/products", label: "View Products", icon: "🚀" },
                    contact: { url: "/contact", label: "Contact Us", icon: "📞" },
                    careers: { url: "/careers", label: "Careers", icon: "💼" },
                    about: { url: "/about", label: "About Us", icon: "ℹ️" },
                },
                quickReplies: [
                    "👋 Hi there!",
                    "🛡️ Cybersecurity",
                    "🚀 Products",
                    "📞 Contact"
                ],
                knowledge: [
                    {
                        keywords: ["hello", "hi", "hey", "how are you", "greetings", "good morning", "good afternoon", "good evening", "yo", "sup", "hola", "namaste"],
                        responses: [
                            "Hello! 👋 How can I assist you today?",
                            "Hi there! What can I help you with?",
                            "Hey! I'm here to help. What do you need?",
                            "Welcome to Giggs Software Labs! How can I help you today?",
                            "I'm Giggs Assistant, your virtual AI assistant. How can I help you today?",
                            "Greetings! Ready to talk tech? How can I assist?"
                        ]
                    },
                    {
                        keywords: ["what is giggs", "about giggs", "who are you", "what is this company", "tell me about giggs", "who is giggs", "what is giggs software labs", "company info", "history", "mission", "vision", "values", "philosophy", "giggs labs"],
                        responses: [
                            "Giggs Software Labs is an elite engineering firm specializing in AI, Cybersecurity, and High-Performance Software. We build the future for global clients.",
                            "We are a team of expert engineers and designers dedicated to pushing the boundaries of technology. From Mihawk to custom AI, we deliver excellence.",
                            "Our mission is to solve complex engineering challenges with elegant, secure, and scalable solutions for forward-thinking enterprises.",
                        ],
                        action: "about"
                    },
                    {
                        keywords: ["mihawk", "security", "cyber", "protection", "threat", "soc", "hacking", "firewall", "antivirus", "cybersecurity", "vulnerability", "pentest", "penetration testing", "encryption", "iso", "compliance", "malware", "ransomware", "ddos"],
                        responses: [
                            "Mihawk is our elite, AI-driven cybersecurity platform providing 24/7 autonomous protection. It's designed to stop threats before they happen. Our security stack is world-class.",
                            "We take security seriously. From architectural audits to Mihawk's real-time monitoring, we protect your digital assets with military-grade precision.",
                        ],
                        action: "cybersecurity"
                    },
                    {
                        keywords: ["service", "services", "offer", "what do you do", "expertise", "what do you offer", "capabilities", "solutions", "what can you do for me", "specialty", "tech stack", "technologies", "what do you have", "what you have"],
                        responses: [
                            "We offer high-end solutions in: \n1. AI & Data Science \n2. Elite Cybersecurity (Mihawk) \n3. High-Performance Web/App Engineering \n4. Automation & DevOps. \n\nCheck out our full catalog to see how we can accelerate your business.",
                        ],
                        action: "services"
                    },
                    {
                        keywords: ["project", "projects", "work", "portfolio", "clients", "case studies", "what have you built", "examples", "track record", "past work", "experience", "product", "products"],
                        responses: [
                            "We've delivered high-impact solutions globally, from fintech platforms to AI-driven security systems. Take a look at our featured products to see our engineering in action!",
                        ],
                        action: "projects"
                    },
                    {
                        keywords: ["job", "jobs", "careers", "hiring", "apply", "work at giggs", "internship", "position", "opening", "vacancy", "culture", "benefits", "salary", "remote", "developer job"],
                        responses: [
                            "We are always looking for elite talent! If you are a top-tier engineer or designer who loves solving hard problems, we want to hear from you. Check our current openings.",
                        ],
                        action: "careers"
                    },
                    {
                        keywords: ["price", "pricing", "cost", "how much", "quote", "estimation", "rate", "budget", "billing", "expensive", "cheap", "financials"],
                        responses: [
                            "Our pricing is tailored to the complexity and scale of your engineering needs. We focus on ROI and high-impact delivery. Let's discuss your project setup to give you an accurate quote!",
                        ],
                        action: "contact"
                    },
                    {
                        keywords: ["contact", "reach", "email", "phone", "talk", "address", "location", "office", "support", "help desk", "sales", "inquiry", "meeting", "call"],
                        responses: [
                            "I'd be happy to connect you with our team! You can reach us via our contact page, drop an email, or even schedule a strategy call. How would you like to proceed?",
                        ],
                        action: "contact"
                    },
                    {
                        keywords: ["ai", "artificial intelligence", "ml", "machine learning", "data science", "llm", "automation", "gpt", "gemini", "neural network", "deep learning", "nlp", "chatbot", "genai", "generative ai"],
                        responses: [
                            "AI is at the heart of everything we do. We build custom LLM integrations, predictive analytics, and automated workflows to accelerate businesses and provide a competitive edge.",
                            "Our AI expertise ranges from large-scale data processing to fine-tuning generative models for specific enterprise use-cases.",
                        ]
                    },
                    {
                        keywords: ["web", "website", "app", "application", "development", "react", "nextjs", "backend", "frontend", "mobile", "ios", "android", "deployment", "cloud", "aws", "azure", "google cloud", "scalability", "vultr"],
                        responses: [
                            "We build lightning-fast, secure, and scalable web and mobile applications using modern stacks like Next.js, Python, and cloud-native architectures. Performance is our top priority.",
                        ]
                    },
                    {
                        keywords: ["performance", "fast", "speed", "optimization", "efficiency", "legacy", "migration", "slow", "loading", "latency"],
                        responses: [
                            "Elite performance is a Giggs core pillar. We optimize everything from database queries to frontend bundle sizes to ensure a frictionless user experience.",
                        ]
                    },
                    {
                        keywords: ["automating", "workflow", "cycle", "ci/cd", "pipeline", "devops", "kubernetes", "docker", "infrastructure", "terraforming"],
                        responses: [
                            "We automate the mundane to focus on the monumental. Our DevOps and CI/CD strategies reduce time-to-market while increasing deployment reliability.",
                        ]
                    },
                    {
                        keywords: ["quality", "qa", "testing", "bug", "issue", "error", "reliable", "trust", "guarantee"],
                        responses: [
                            "Quality is non-negotiable at Giggs. We use automated testing, rigorous code reviews, and elite architectural patterns to ensure every delivery is bulletproof.",
                        ]
                    },
                    {
                        keywords: ["thanks", "thank you", "appreciate", "helpful", "thx", "cool", "awesome", "great", "perfect", "good bot", "nice"],
                        responses: [
                            "You're very welcome! Happy to help! 😊",
                            "Anytime! Let me know if you need anything else.",
                            "Glad I could help. Is there anything else you'd like to know about Giggs?",
                            "My pleasure! I'm here 24/7 if you have more questions.",
                        ]
                    },
                    {
                        keywords: ["bye", "goodbye", "see you", "ciao", "later", "stop", "exit", "quit", "leave"],
                        responses: [
                            "Goodbye! Come back anytime you need help. 👋",
                            "See you later! Have a great day! ✨",
                            "Adios! Wishing you a productive day ahead.",
                        ]
                    },
                ],
                fallbacks: [
                    "Hmm, I'm not quite sure about that. Can you rephrase? I can help with services, cybersecurity (Mihawk), and products.",
                    "I'm still learning! Try asking about our Mihawk platform or our core engineering services.",
                ]
            };

            let config = {};
            let conversation = [];
            let isTyping = false;
            let elements = {};

            function injectStyles() {
                const style = document.createElement('style');
                style.id = 'chatbot-styles';
                style.textContent = `
          :root {
            --chatbot-primary: ${config.colors.primary};
            --chatbot-primary-dk: ${config.colors.primaryDark};
            --chatbot-accent: ${config.colors.accent};
            --chatbot-success: ${config.colors.success};
            --chatbot-dark: #020617;
            --chatbot-surface: #0f172a;
            --chatbot-surface-lt: #1e293b;
            --chatbot-border: rgba(255,255,255,0.1);
            --chatbot-text: #f1f5f9;
            --chatbot-text-dim: #94a3b8;
            --chatbot-radius: 24px;
            --chatbot-shadow: 0 25px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05);
          }
          #chatbot-launcher {
            position: fixed; bottom: 24px; right: 24px; z-index: 99998;
            width: 60px; height: 60px; border-radius: 50%; border: none; cursor: pointer;
            background: linear-gradient(135deg, var(--chatbot-primary), var(--chatbot-accent));
            box-shadow: 0 8px 32px rgba(34,211,238,0.3);
            display: flex; align-items: center; justify-content: center;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            animation: chatbot-launcher-pulse 2s infinite;
          }
          @keyframes chatbot-launcher-pulse {
            0% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(34, 211, 238, 0); }
            100% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0); }
          }
          #chatbot-launcher:hover { transform: scale(1.1); }
          #chatbot-launcher.chatbot-open .chatbot-icon-chat { display: none; }
          #chatbot-launcher .chatbot-icon-close { display: none; }
          #chatbot-launcher.chatbot-open .chatbot-icon-close { display: flex; }
          #chatbot-launcher svg { width: 28px; height: 28px; fill: black; }
          
          #chatbot-notification {
            position: absolute; top: -2px; right: -2px; width: 18px; height: 18px;
            background: #ef4444; border-radius: 50%; display: flex; align-items: center;
            justify-content: center; font-size: 10px; color: white; border: 2px solid var(--chatbot-dark);
          }
          .chatbot-hide { display: none !important; }

          #chatbot-panel {
            position: fixed; bottom: 96px; right: 24px; z-index: 99997;
            width: 380px; height: 600px; max-height: calc(100vh - 120px);
            background: var(--chatbot-surface); border-radius: var(--chatbot-radius);
            box-shadow: var(--chatbot-shadow); display: flex; flex-direction: column;
            overflow: hidden; opacity: 0; pointer-events: none; transform: translateY(20px) scale(0.95);
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            font-family: ui-sans-serif, system-ui, sans-serif;
            border: 1px solid var(--chatbot-border);
          }
          #chatbot-panel.chatbot-open { opacity: 1; pointer-events: all; transform: translateY(0) scale(1); }

          #chatbot-header {
            background: linear-gradient(135deg, #0f172a, #1e293b);
            padding: 24px; border-bottom: 1px solid var(--chatbot-border);
          }
          .chatbot-header-content { display: flex; align-items: center; gap: 12px; }
          .chatbot-avatar { width: 44px; height: 44px; border-radius: 50%; background: var(--chatbot-surface-lt); border: 1px solid var(--chatbot-border); display: flex; align-items: center; justify-content: center; font-size: 22px; }
          .chatbot-info h3 { color: white; font-size: 1rem; margin: 0; }
          .chatbot-status { display: flex; align-items: center; gap: 6px; margin-top: 4px; }
          .chatbot-status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--chatbot-success); }
          .chatbot-status-text { font-size: 0.75rem; color: var(--chatbot-text-dim); }

          #chatbot-messages { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 16px; scrollbar-width: none; }
          #chatbot-messages::-webkit-scrollbar { display: none; }

          .chatbot-msg { display: flex; gap: 10px; max-width: 85%; }
          .chatbot-msg.chatbot-user { align-self: flex-end; flex-direction: row-reverse; }
          .chatbot-bubble { padding: 12px 16px; font-size: 0.9rem; line-height: 1.5; border-radius: 18px; }
          .chatbot-msg.chatbot-bot .chatbot-bubble { background: var(--chatbot-surface-lt); color: var(--chatbot-text); border-bottom-left-radius: 4px; }
          .chatbot-msg.chatbot-user .chatbot-bubble { background: var(--chatbot-primary); color: #000; font-weight: 500; border-bottom-right-radius: 4px; }

          .chatbot-action { display: inline-flex; align-items: center; gap: 8px; margin-top: 8px; padding: 10px 16px; background: rgba(34,211,238,0.1); color: var(--chatbot-primary); border: 1px solid rgba(34,211,238,0.2); border-radius: 12px; text-decoration: none; font-size: 0.85rem; font-weight: 600; transition: all 0.2s; }
          .chatbot-action:hover { background: rgba(34,211,238,0.2); transform: translateY(-1px); }

          #chatbot-quick-replies { padding: 0 20px 12px; display: flex; flex-wrap: wrap; gap: 8px; }
          .chatbot-quick-btn { font-size: 0.8rem; padding: 8px 14px; background: var(--chatbot-surface-lt); color: var(--chatbot-text); border: 1px solid var(--chatbot-border); border-radius: 20px; cursor: pointer; transition: all 0.2s; }
          .chatbot-quick-btn:hover { background: var(--chatbot-primary); color: black; }

          #chatbot-input-area { padding: 16px; background: #020617; border-top: 1px solid var(--chatbot-border); display: flex; gap: 10px; }
          #chatbot-input { flex: 1; background: var(--chatbot-surface-lt); border: 1px solid var(--chatbot-border); color: var(--chatbot-text); border-radius: 14px; padding: 12px; font-size: 0.9rem; resize: none; outline: none; }
          #chatbot-send { width: 44px; height: 44px; border-radius: 12px; border: none; cursor: pointer; background: var(--chatbot-primary); color: black; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
          #chatbot-send:hover { opacity: 0.9; transform: scale(1.05); }

          .chatbot-typing { display: flex; gap: 4px; padding: 10px; }
          .chatbot-typing span { width: 6px; height: 6px; border-radius: 50%; background: var(--chatbot-text-dim); animation: bounce 1.4s infinite ease-in-out; }
          .chatbot-typing span:nth-child(2) { animation-delay: 0.2s; }
          .chatbot-typing span:nth-child(3) { animation-delay: 0.4s; }
          @keyframes bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }
        `;
                document.head.appendChild(style);
            }

            function createHTML() {
                const div = document.createElement('div');
                div.id = 'chatbot-container';
                div.innerHTML = `
          <button id="chatbot-launcher">
            <div id="chatbot-notification">1</div>
            <svg class="chatbot-icon-chat" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <svg class="chatbot-icon-close" viewBox="0 0 24 24" style="fill:none;stroke:black;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div id="chatbot-panel">
            <div id="chatbot-header">
              <div class="chatbot-header-content">
                <div class="chatbot-avatar">🤖</div>
                <div class="chatbot-info">
                  <h3>${config.name}</h3>
                  <div class="chatbot-status">
                    <div class="chatbot-status-dot"></div>
                    <span class="chatbot-status-text">Ready to help</span>
                  </div>
                </div>
              </div>
            </div>
            <div id="chatbot-messages"></div>
            <div id="chatbot-quick-replies"></div>
            <div id="chatbot-input-area">
              <textarea id="chatbot-input" rows="1" placeholder="Ask anything..."></textarea>
              <button id="chatbot-send">➤</button>
            </div>
          </div>
        `;
                document.body.appendChild(div);
                elements = {
                    launcher: document.getElementById('chatbot-launcher'),
                    panel: document.getElementById('chatbot-panel'),
                    messages: document.getElementById('chatbot-messages'),
                    input: document.getElementById('chatbot-input'),
                    send: document.getElementById('chatbot-send'),
                    quickReplies: document.getElementById('chatbot-quick-replies'),
                    notification: document.getElementById('chatbot-notification'),
                };
            }

            function attachEvents() {
                elements.launcher.onclick = togglePanel;
                elements.send.onclick = handleSend;
                elements.input.onkeydown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };
                renderQuickReplies();
            }

            function togglePanel() {
                const isOpen = elements.panel.classList.toggle('chatbot-open');
                elements.launcher.classList.toggle('chatbot-open', isOpen);
                if (isOpen) {
                    elements.notification.classList.add('chatbot-hide');
                    elements.input.focus();
                }
            }

            function renderQuickReplies() {
                elements.quickReplies.innerHTML = '';
                config.quickReplies.forEach(text => {
                    const btn = document.createElement('button');
                    btn.className = 'chatbot-quick-btn';
                    btn.textContent = text;
                    btn.onclick = () => { elements.input.value = text.replace(/^[^\w\s]+\s*/, ''); handleSend(); };
                    elements.quickReplies.appendChild(btn);
                });
            }

            function handleSend() {
                const text = elements.input.value.trim();
                if (!text || isTyping) return;
                elements.input.value = '';
                addMessage('user', text);
                showTyping();
                setTimeout(() => {
                    hideTyping();
                    const response = getResponse(text);
                    addMessage('bot', response.message, response.action);
                    if (!elements.panel.classList.contains('chatbot-open')) {
                        elements.notification.classList.remove('chatbot-hide');
                    }
                }, 1000);
            }

            function getResponse(text) {
                const normalized = text.toLowerCase().trim();

                // Prioritize specific matches by checking knowledge entries
                for (const entry of config.knowledge) {
                    if (entry.keywords.some(k => {
                        // Create a regex to match the keyword as a whole word/phrase
                        // This prevents "yo" matching "you", "hi" matching "high", etc.
                        const escapedK = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        const regex = new RegExp(`\\b${escapedK}\\b`, 'i');
                        return regex.test(normalized);
                    })) {
                        return {
                            message: entry.responses[Math.floor(Math.random() * entry.responses.length)],
                            action: entry.action
                        };
                    }
                }
                return { message: config.fallbacks[Math.floor(Math.random() * config.fallbacks.length)] };
            }

            function addMessage(role, text, actionKey) {
                const msg = document.createElement('div');
                msg.className = `chatbot-msg chatbot-${role}`;
                const bubble = document.createElement('div');
                bubble.className = 'chatbot-bubble';
                bubble.textContent = text;
                msg.appendChild(bubble);

                if (actionKey && config.routes[actionKey]) {
                    const route = config.routes[actionKey];
                    const action = document.createElement('a');
                    action.className = 'chatbot-action';
                    action.href = route.url;
                    action.textContent = `${route.icon} ${route.label}`;
                    msg.appendChild(action);
                }

                elements.messages.appendChild(msg);
                elements.messages.scrollTop = elements.messages.scrollHeight;
            }

            function showTyping() {
                isTyping = true;
                const typing = document.createElement('div');
                typing.id = 'chatbot-typing-elt';
                typing.className = 'chatbot-msg chatbot-bot';
                typing.innerHTML = '<div class="chatbot-bubble"><div class="chatbot-typing"><span></span><span></span><span></span></div></div>';
                elements.messages.appendChild(typing);
                elements.messages.scrollTop = elements.messages.scrollHeight;
            }

            function hideTyping() {
                isTyping = false;
                const typing = document.getElementById('chatbot-typing-elt');
                if (typing) typing.remove();
            }

            return {
                init: (c) => {
                    config = { ...DEFAULT_CONFIG, ...c };
                    injectStyles();
                    createHTML();
                    attachEvents();
                    addMessage('bot', config.greeting);
                }
            };
        })();

        ChatbotLogic.init();

        return () => {
            // Cleanup
            document.getElementById('chatbot-container')?.remove();
            document.getElementById('chatbot-styles')?.remove();
        };
    }, []);

    return null;
}
