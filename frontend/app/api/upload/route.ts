import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Frontend API: Upload request received');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;

    console.log('Frontend API: File received:', file ? `${file.name} (${file.size} bytes)` : 'No file');

    if (!file) {
      console.log('Frontend API: No file provided');
      return NextResponse.json(
        { error: 'Nenhum arquivo fornecido' },
        { status: 400 }
      );
    }

    // Validações de arquivo
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      console.log('Frontend API: File too large:', file.size);
      return NextResponse.json(
        { error: 'Arquivo muito grande. Máximo 100MB permitido' },
        { status: 400 }
      );
    }

    // Preparar formData para o backend
    const backendFormData = new FormData();
    backendFormData.append('file', file);

    // Repassar o header de autorização (token JWT) para o backend
    const authHeader = request.headers.get('authorization');
    const headers: HeadersInit = {};
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    console.log('Frontend API: Sending to backend...');
    
    // Fazer upload para o backend
    const backendResponse = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001'}/api/upload`, {
      method: 'POST',
      headers,
      body: backendFormData
    });

    console.log('Frontend API: Backend response status:', backendResponse.status);

    if (!backendResponse.ok) {
      console.log('Frontend API: Backend error response');
      const errorData = await backendResponse.json();
      console.log('Frontend API: Error data:', errorData);
      return NextResponse.json(
        { error: errorData.message || errorData.error || 'Erro no upload' },
        { status: backendResponse.status }
      );
    }

    const uploadData = await backendResponse.json();
    console.log('Frontend API: Upload successful:', uploadData.url);
    
    return NextResponse.json({
      success: true,
      url: uploadData.url || uploadData.path,
      message: 'Upload realizado com sucesso'
    });

  } catch (error) {
    console.error('Frontend API: Erro na API de upload:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor no upload' },
      { status: 500 }
    );
  }
}