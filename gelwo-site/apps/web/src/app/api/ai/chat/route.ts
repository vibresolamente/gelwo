/**
 * POST /api/ai/chat
 *
 * Blueprint Section 6 & 42: GELWO AI Backend Integration.
 * Accepts persona type and user message history.
 * Uses intelligent rule-based engine (no external API key required).
 * Supports upgrade to OpenAI / Gemini LLM API when configured.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  AIPersonaType,
  AI_PERSONAS,
  generateRuleBasedResponse,
} from '@/lib/ai-prompts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      message,
      persona = 'host',
      history = [],
    }: {
      message: string;
      persona: AIPersonaType;
      history: { role: string; content: string }[];
    } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message string is required' },
        { status: 400 }
      );
    }

    const personaConfig = AI_PERSONAS[persona] || AI_PERSONAS.host;

    // Check if an external LLM API key (OpenAI/Gemini) is available in environment
    const openAiApiKey = process.env.OPENAI_API_KEY;

    if (openAiApiKey) {
      try {
        // Optional LLM execution if key exists
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiApiKey}`,
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
            messages: [
              { role: 'system', content: personaConfig.systemPrompt },
              ...history.slice(-6),
              { role: 'user', content: message },
            ],
            temperature: 0.7,
            max_tokens: 350,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const aiReply =
            data.choices?.[0]?.message?.content ||
            generateRuleBasedResponse(message, persona, history);
          return NextResponse.json({
            reply: aiReply,
            persona: personaConfig.name,
            role: personaConfig.role,
            provider: 'llm',
          });
        }
      } catch (err) {
        console.warn('LLM API call failed, falling back to rule-based engine:', err);
      }
    }

    // Fallback: Intelligent rule-based engine (no key needed, blueprint Section 6)
    const reply = generateRuleBasedResponse(message, persona, history);

    return NextResponse.json({
      reply,
      persona: personaConfig.name,
      role: personaConfig.role,
      provider: 'rule-engine',
      suggestedQuestions: personaConfig.suggestedQuestions,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Internal AI Error' },
      { status: 500 }
    );
  }
}
