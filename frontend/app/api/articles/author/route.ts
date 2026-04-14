import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function POST(request: NextRequest) {
  try {
    const { author } = await request.json();

    if (!author) {
      return NextResponse.json({ error: 'Parametro author e obrigatorio' }, { status: 400 });
    }

    const backendResponse = await fetch(`${BACKEND_URL}/api/articles/author`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ author }),
    });

    const responseData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: responseData.error || 'Erro ao buscar artigos por autor' },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json({ data: responseData });
  } catch (error) {
    console.error('Erro na API de artigos por autor:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
