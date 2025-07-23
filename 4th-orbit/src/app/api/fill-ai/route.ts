import OpenAI from 'openai'
import { NextResponse } from 'next/server'

// ✅ Initialize OpenRouter OpenAI client
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.OPENROUTER_REFERER || '', // your site URL
    'X-Title': process.env.OPENROUTER_TITLE || '', // your site name
  },
})

// ✅ POST handler
export async function POST(req: Request) {
  const { prompt } = await req.json()

  try {
    const completion = await openai.chat.completions.create({
      model: 'qwen/qwen3-235b-a22b-07-25:free', // or any supported model like gpt-4o
      messages: [
        {
          role: 'system',
          content: 'You are a helpful job description assistant.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const message = completion.choices[0].message.content
    return NextResponse.json({ result: message })
  } catch (err: any) {
    console.error('OpenRouter error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}