import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    
    if (!orderId) {
      return NextResponse.json(
        { error: "ID de orden requerido" },
        { status: 400 }
      );
    }

    console.log('🔄 Obteniendo orden:', orderId);

    // Enviar a la API externa para obtener la orden
    const externalApiUrl = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_URL || 'https://maderascaballero.vercel.app';
    const fullUrl = `${externalApiUrl.replace(/\/+$/, '')}/api/orders/${encodeURIComponent(orderId)}`;
    
    console.log('🌐 Llamando a API externa:', fullUrl);
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📡 Respuesta de API externa:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error de API externa:', {
        status: response.status,
        statusText: response.statusText,
        errorText
      });
      throw new Error(`API externa respondió con ${response.status}: ${errorText}`);
    }

    const responseData = await response.json();
    
    console.log('✅ Orden obtenida:', responseData);

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('❌ Error al obtener orden:', error);
    
    return NextResponse.json(
      { 
        error: "Error al obtener orden",
        details: error instanceof Error ? error.message : "Error desconocido"
      },
      { status: 500 }
    );
  }
}