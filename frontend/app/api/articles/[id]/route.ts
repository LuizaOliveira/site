import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Parametro id e obrigatorio' }, { status: 400 });
    }

    const backendResponse = await fetch(`${BACKEND_URL}/api/articles/${id}`);
    const responseData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: responseData.error || 'Erro ao buscar artigo no backend' },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json({ data: responseData });
  } catch (error) {
    console.error('Erro na API de artigo por ID:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
