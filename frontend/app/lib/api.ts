// Tipos baseados no schema Prisma
export interface Post {
  id: number;
  published: boolean;
  thumbnail: string;
  title: string;
  file: string;
  newsImage: string;
  description: string;
  pageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostData {
  title: string;
  thumbnail: string;
  file: string;
  newsImage: string;
  description: string;
  published: boolean;
}

function getApiBaseUrl() {
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  if (typeof window === 'undefined') return rawBaseUrl;

  try {
    const url = new URL(rawBaseUrl);
    const isLocalhostTarget = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
    const isLocalhostOrigin =
      window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    // Quando o frontend roda via IP da rede, "localhost" aponta para o dispositivo cliente.
    if (isLocalhostTarget && !isLocalhostOrigin) {
      url.hostname = window.location.hostname;
    }

    return url.toString().replace(/\/$/, '');
  } catch {
    return rawBaseUrl;
  }
}

const API_BASE_URL = getApiBaseUrl();

// Função para criar um novo post
export async function createPost(data: CreatePostData): Promise<{ success: boolean; data?: Post; error?: string }> {
  try {
    const token = localStorage.getItem('authToken');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || 'Erro ao criar post' };
    }

    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: 'Erro de rede' };
  }
}

// Função para fazer upload de arquivo
export async function uploadFile(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('authToken');
    const headers: HeadersInit = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || 'Erro no upload' };
    }

    return { success: true, url: result.url };
  } catch (error) {
    return { success: false, error: 'Erro de rede no upload' };
  }
}

// Função para buscar todos os posts
export async function getPosts(): Promise<{ success: boolean; data?: Post[]; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || 'Erro ao buscar posts' };
    }

    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: 'Erro de rede' };
  }
}

// Função para deletar um post
export async function deletePost(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    const token = localStorage.getItem('authToken');
    const headers: HeadersInit = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const result = await response.json();
      return { success: false, error: result.error || 'Erro ao deletar post' };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro de rede' };
  }
}

// Função para buscar o post mais recente publicado
export async function getLatestPost(): Promise<{ success: boolean; data?: Post; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/published`);
    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || 'Erro ao buscar post mais recente' };
    }

    // Pega o primeiro post publicado (mais recente)
    const latestPost = result.data?.[0];
    
    if (!latestPost) {
      return { success: false, error: 'Nenhum post publicado encontrado' };
    }

    return { success: true, data: latestPost };
  } catch (error) {
    return { success: false, error: 'Erro de rede' };
  }
}