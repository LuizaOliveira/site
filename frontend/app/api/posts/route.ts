import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { title, thumbnail, file, published } = await request.json();

    // Validações básicas
    if (!title || !thumbnail || !file) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: title, thumbnail, file' },
        { status: 400 }
      );
    }

    // Repassar o header de autorização (token JWT) para o backend
    const authHeader = request.headers.get('authorization');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    // Fazer a requisição para o backend
    const backendResponse = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001'}/api/posts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title,
        thumbnail,
        file,
        published: published || false
      })
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(
        { error: errorData.message || 'Erro ao criar post no backend' },
        { status: backendResponse.status }
      );
    }

    const postData = await backendResponse.json();
    
    return NextResponse.json({
      success: true,
      data: postData,
      message: published ? 'Post publicado com sucesso!' : 'Rascunho salvo com sucesso!'
    });

  } catch (error) {
    console.error('Erro na API de posts:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const backendResponse = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001'}/api/posts`);
    
    if (!backendResponse.ok) {
      throw new Error('Erro ao buscar posts do backend');
    }

    const posts = await backendResponse.json();
    return NextResponse.json({ data: posts });

  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar posts' },
      { status: 500 }
    );
  }
}