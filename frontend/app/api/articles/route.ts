import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      thumbnail,
      author,
      articleImage,
      articleFile,
      description,
      content,
      published,
    } = await request.json();

    if (!title || !thumbnail || !author || !articleImage || !description || !content) {
      return NextResponse.json(
        {
          error:
            'Campos obrigatorios: title, thumbnail, author, articleImage, description e content',
        },
        { status: 400 }
      );
    }

    const authHeader = request.headers.get('authorization');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    const backendResponse = await fetch(`${BACKEND_URL}/api/articles`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title,
        thumbnail,
        author,
        articleImage,
        articleFile,
        description,
        content,
        published: published || false,
      }),
    });

    const responseData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: responseData.error || responseData.message || 'Erro ao criar artigo no backend' },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      data: responseData,
      message: published ? 'Artigo publicado com sucesso!' : 'Rascunho salvo com sucesso!',
    });
  } catch (error) {
    console.error('Erro na API de artigos:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const backendResponse = await fetch(`${BACKEND_URL}/api/articles`);

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || 'Erro ao buscar artigos do backend' },
        { status: backendResponse.status }
      );
    }

    const articles = await backendResponse.json();
    return NextResponse.json({ data: articles });
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    return NextResponse.json({ error: 'Erro ao buscar artigos' }, { status: 500 });
  }
}
