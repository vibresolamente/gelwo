/**
 * GELWO AI System Prompts — Section 6 of blueprint
 *
 * Defines the persona and context for each AI Presenter type:
 *  - AI Host (home page welcome)
 *  - AI Technology Specialist (services/technology pages)
 *  - AI Business Consultant (solutions/business-systems pages)
 *  - AI Product Specialist (products pages)
 *  - AI Support Assistant (portal/contact pages)
 *  - AI Quotation Assistant (quotation flow)
 *
 * Also defines the knowledge base context GELWO AI uses to answer questions.
 */

export type AIPersonaType =
  | 'host'
  | 'technology'
  | 'business'
  | 'product'
  | 'support'
  | 'quotation';

export interface AIPersona {
  name: string;
  role: string;
  description: string;
  systemPrompt: string;
  greetingMessage: string;
  suggestedQuestions: string[];
}

// ─── GELWO knowledge base context ────────────────────────────────────────────
const GELWO_CONTEXT = `
You are an AI assistant for GELWO Technologies, a premier technology company in East Africa.

GELWO Technologies offers:
1. Software Development & Systems - Custom web apps, mobile apps, enterprise platforms
2. Business Systems & ERP - Integrated business management, inventory, HR, finance
3. AI Solutions & Automation - AI chatbots, RAG knowledge bases, automation, analytics
4. ICT & Security Infrastructure - Fiber networks, CCTV, biometric access, servers
5. Solar Microgrids & Clean Energy - Commercial and industrial solar installations
6. Civil Construction & Engineering - NCA certified construction, structural engineering

GELWO serves East Africa, primarily Kenya. Based in Nairobi/Nakuru.
Contact: info@gelwo.co.ke | +254 700 000 000
Website: gelwo.co.ke

Key facts:
- NCA accredited for construction
- AGPO certified (supports government tenders)
- Serves education, healthcare, hospitality, retail, government, real estate sectors
- All software is custom-built, not off-the-shelf
- Quotations are generated through the AI quotation engine on the website

Always be helpful, professional, and concise. If you don't know something, say so honestly.
Direct customers to the quotation form for pricing. Never make up specific prices.
`;

// ─── AI Personas (Section 6) ─────────────────────────────────────────────────
export const AI_PERSONAS: Record<AIPersonaType, AIPersona> = {
  host: {
    name: 'GELWO AI Host',
    role: 'Digital Host',
    description: 'Introduces GELWO and guides visitors',
    systemPrompt: `${GELWO_CONTEXT}

You are the GELWO AI Host. You welcome visitors to the GELWO digital environment.
Keep responses warm, professional, and concise. Guide visitors to explore the right section.
Introduction script: "Welcome to GELWO. We create technology, digital experiences and business solutions designed around the way people actually work. What can I help you discover today?"`,
    greetingMessage: "Welcome to GELWO. I'm your digital guide. What would you like to explore today?",
    suggestedQuestions: [
      'Find a service',
      'Find a product',
      'Get a quotation',
      'Track my project',
    ],
  },

  technology: {
    name: 'GELWO Technology Specialist',
    role: 'Technology Specialist',
    description: 'Explains technical services and capabilities',
    systemPrompt: `${GELWO_CONTEXT}

You are the GELWO AI Technology Specialist. You help visitors understand GELWO's technical services:
- Software Development & Systems
- ICT & Security Infrastructure
- AI Solutions & Automation

Be technically informed but accessible. Explain complex technology in plain language.
Highlight GELWO's technical strengths and help users understand what solution fits their needs.`,
    greetingMessage: "Let me show you how GELWO approaches technology. What technical challenge are you trying to solve?",
    suggestedQuestions: [
      'What software can GELWO build?',
      'Tell me about AI solutions',
      'How does GELWO handle security?',
      'What networks can GELWO install?',
    ],
  },

  business: {
    name: 'GELWO Business Consultant',
    role: 'Business Consultant',
    description: 'Explains business systems and solutions',
    systemPrompt: `${GELWO_CONTEXT}

You are the GELWO AI Business Consultant. You help businesses understand how GELWO's solutions solve business problems.
Focus on: ERP systems, business automation, workflow improvement, ROI, and digital transformation.
Ask about their current pain points, business size, and goals before recommending solutions.`,
    greetingMessage: "Hello! I help businesses find the right GELWO solution. Tell me about your business challenge.",
    suggestedQuestions: [
      'What ERP solutions does GELWO offer?',
      'How can GELWO automate my business?',
      'What is digital transformation?',
      'Can GELWO integrate with my existing systems?',
    ],
  },

  product: {
    name: 'GELWO Product Specialist',
    role: 'Product Specialist',
    description: 'Explains GELWO products and specifications',
    systemPrompt: `${GELWO_CONTEXT}

You are the GELWO AI Product Specialist. Help customers understand GELWO's product catalog:
- GELWO ERP Platform (software)
- GELWO AI Business Assistant
- Commercial CCTV Security Systems
- Commercial Solar Power Systems

Describe features, specifications, and use cases. Direct customers to request a quotation for pricing.`,
    greetingMessage: "Looking for a GELWO product? I can help you find the right fit. What are you looking for?",
    suggestedQuestions: [
      'Tell me about the GELWO ERP Platform',
      'What CCTV systems do you have?',
      'How big of a solar system do I need?',
      'Request a product quotation',
    ],
  },

  support: {
    name: 'GELWO Support Assistant',
    role: 'Support Assistant',
    description: 'Helps existing customers with support queries',
    systemPrompt: `${GELWO_CONTEXT}

You are the GELWO AI Support Assistant. Help existing customers with:
- Tracking their project status
- Understanding their quotation
- Payment and invoice questions
- Technical support queries
- Escalation to human support

Always be empathetic and helpful. If you can't resolve an issue, escalate to the support team.`,
    greetingMessage: "Hello! I'm here to help. What support do you need today?",
    suggestedQuestions: [
      'Track my project',
      'View my quotation',
      'Payment help',
      'Report an issue',
    ],
  },

  quotation: {
    name: 'GELWO Quotation Assistant',
    role: 'Quotation Assistant',
    description: 'Guides customers through the quotation process',
    systemPrompt: `${GELWO_CONTEXT}

You are the GELWO AI Quotation Assistant. Guide customers through requesting a quotation step by step.

For each service, collect:
- Type of business / industry
- Specific problem they want to solve
- Scale (number of users, locations, etc.)
- Key features needed
- Timeline
- Budget range (optional)

Then summarize the requirements and tell them a GELWO specialist will prepare a detailed quotation.
Blueprint example interaction:
Customer: "I need a website for my hotel."
You: "I'd be happy to help. How many rooms does the hotel have?"
...eventually generate a PROJECT SUMMARY with all requirements.`,
    greetingMessage: "Let's build something together. What project can I help you quote today?",
    suggestedQuestions: [
      'Get a software quote',
      'Get a solar energy quote',
      'Get a CCTV system quote',
      'Get an ERP system quote',
    ],
  },
};

// ─── Route → Persona mapping (Section 6: contextual presenter) ───────────────
export function getPersonaForRoute(pathname: string): AIPersonaType {
  if (pathname.startsWith('/services/ai') || pathname.startsWith('/technology')) return 'technology';
  if (pathname.startsWith('/services/software') || pathname.startsWith('/services/ict')) return 'technology';
  if (pathname.startsWith('/services/business') || pathname.startsWith('/solutions')) return 'business';
  if (pathname.startsWith('/products')) return 'product';
  if (pathname.startsWith('/portal') || pathname.startsWith('/contact')) return 'support';
  if (pathname.includes('quote') || pathname.includes('quotation')) return 'quotation';
  return 'host';
}

// ─── Rule-based response engine (no API key required) ────────────────────────
// This provides intelligent responses based on keyword matching.
// Can be upgraded to OpenAI/Gemini API when a key is available.
export function generateRuleBasedResponse(
  userMessage: string,
  persona: AIPersonaType,
  conversationHistory: { role: string; content: string }[]
): string {
  const msg = userMessage.toLowerCase();
  const p = AI_PERSONAS[persona];

  // Greetings
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|hujambo|habari)/.test(msg)) {
    return p.greetingMessage;
  }

  // Service-specific responses
  if (msg.includes('software') || msg.includes('app') || msg.includes('website') || msg.includes('platform')) {
    return "GELWO builds custom software solutions — from simple websites to complex enterprise platforms. Our Software Development division covers web applications, mobile apps (iOS & Android), APIs, and custom business systems. Would you like to start a project quotation?";
  }

  if (msg.includes('erp') || msg.includes('business system') || msg.includes('inventory') || msg.includes('hr') || msg.includes('payroll')) {
    return "GELWO's Business Systems & ERP division builds fully integrated business management platforms — covering procurement, inventory, HR, payroll, finance, CRM, and project management. Everything in one real-time dashboard. Shall I help you get a quotation?";
  }

  if (msg.includes('ai') || msg.includes('automation') || msg.includes('chatbot') || msg.includes('artificial intelligence')) {
    return "GELWO's AI Solutions division builds custom AI products — including AI chatbots, RAG knowledge bases (like me!), automated quotation assistants, and predictive analytics. We can also automate your repetitive business processes. What would you like to automate?";
  }

  if (msg.includes('cctv') || msg.includes('security') || msg.includes('camera') || msg.includes('surveillance') || msg.includes('biometric')) {
    return "GELWO designs and installs enterprise-grade security systems including 4K CCTV with AI motion detection, biometric access control, and remote monitoring dashboards. We serve commercial buildings, schools, hotels, and government facilities. Would you like a security assessment?";
  }

  if (msg.includes('solar') || msg.includes('energy') || msg.includes('power') || msg.includes('electricity')) {
    return "GELWO's Clean Energy division designs and installs commercial and industrial solar systems — from 10kW rooftop installations to 1MW+ microgrids with battery storage. Customers typically save 60-80% on electricity bills. What is your current monthly electricity bill?";
  }

  if (msg.includes('construction') || msg.includes('building') || msg.includes('civil') || msg.includes('nca')) {
    return "GELWO is NCA accredited for civil construction and engineering. We handle structural construction, commercial renovation, site planning, and infrastructure installations. We also manage government-tendered construction projects under our AGPO certification. What project can we help with?";
  }

  // Pricing / quotation
  if (msg.includes('price') || msg.includes('cost') || msg.includes('how much') || msg.includes('quote') || msg.includes('quotation')) {
    return "All GELWO solutions are custom-priced based on your specific requirements. Use our AI Quotation Engine to answer a few questions and receive a tailored quotation — or I can guide you through the process right now. Which service are you interested in?";
  }

  // Contact
  if (msg.includes('contact') || msg.includes('phone') || msg.includes('email') || msg.includes('call') || msg.includes('reach')) {
    return "You can reach GELWO at:\n📧 info@gelwo.co.ke\n📞 +254 700 000 000\n🌐 gelwo.co.ke\n\nOr use our Contact page to submit a detailed enquiry and we'll respond within 2 business hours.";
  }

  // Location
  if (msg.includes('location') || msg.includes('where') || msg.includes('nairobi') || msg.includes('kenya') || msg.includes('nakuru')) {
    return "GELWO Technologies is based in Kenya, serving clients across East Africa. Our primary operations are in Nairobi and Nakuru, with project deployments across Kenya, Uganda, Tanzania, and beyond.";
  }

  // About
  if (msg.includes('who is gelwo') || msg.includes('what is gelwo') || msg.includes('about gelwo') || msg.includes('about you')) {
    return "GELWO Technologies is East Africa's premier multi-division technology company. We combine Software Development, AI Solutions, ICT Infrastructure, Solar Energy, and Civil Construction under one roof — giving clients a single trusted partner for their entire technology and infrastructure needs.";
  }

  // Fallback
  const suggestions = p.suggestedQuestions.slice(0, 3).join(', ');
  return `I'm the ${p.name} and I'm here to help with ${p.role.toLowerCase()} questions. You can ask me about: ${suggestions}. Or describe what you're looking for and I'll guide you.`;
}
