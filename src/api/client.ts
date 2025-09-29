import type { ChatRequest, ChatResponse } from './types';

export const API_URL = import.meta.env.VITE_API_URL!;

const DEBUG = import.meta.env.DEV;

export async function askData(req: ChatRequest): Promise<ChatResponse> {
  if (DEBUG) {
    console.log('🚀 API Request:', req);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(req),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    let payload: any = null;
    try {
      payload = await response.json();
    } catch (jsonError) {
      if (DEBUG) {
        console.error('❌ JSON Parse Error:', jsonError);
      }
    }

    if (DEBUG) {
      console.log('📥 API Response:', { status: response.status, payload });
    }

    if (!response.ok) {
      // Si el backend devolvió JSON de error, úsalo; si no, crea uno genérico
      const errorResponse: ChatResponse = (payload && payload.error) 
        ? payload 
        : {
            error: true,
            status: response.status,
            msg: response.status >= 500 
              ? 'Error interno del servidor'
              : 'Error inesperado del servidor'
          };
      
      if (DEBUG) {
        console.error('❌ API Error:', errorResponse);
      }
      
      return errorResponse;
    }

    return payload as ChatResponse;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
      const timeoutError: ChatResponse = {
        error: true,
        status: 408,
        msg: 'Tiempo de espera agotado. Intenta de nuevo.'
      };
      
      if (DEBUG) {
        console.error('⏰ Request Timeout:', timeoutError);
      }
      
      return timeoutError;
    }

    const networkError: ChatResponse = {
      error: true,
      status: 0,
      msg: 'Error de red. Verifica tu conexión.'
    };
    
    if (DEBUG) {
      console.error('🌐 Network Error:', error, networkError);
    }
    
    return networkError;
  }
}