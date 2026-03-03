import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { externalReference: string } }
) {
  try {
    const externalReference = params.externalReference;
    
    if (!externalReference) {
      return NextResponse.json(
        { error: "External reference requerido" },
        { status: 400 }
      );
    }

    console.log('🔍 Buscando venta por external reference:', externalReference);

    // URL fija para la API externa - buscar ventas por external reference
    const fullUrl = `https://maderascaballero.vercel.app/api/ventas/buscar/${encodeURIComponent(externalReference)}`;
    
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
      if (response.status === 404) {
        // No se encontró la venta, esto es normal
        return NextResponse.json({
          success: false,
          message: "Venta no encontrada"
        });
      }
      
      const errorText = await response.text();
      console.error('❌ Error de API externa:', {
        status: response.status,
        statusText: response.statusText,
        errorText
      });
      throw new Error(`API externa respondió con ${response.status}: ${errorText}`);
    }

    const responseData = await response.json();
    
    console.log('✅ Venta encontrada:', responseData);

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('❌ Error al buscar venta:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: "Error al buscar venta",
        details: error instanceof Error ? error.message : "Error desconocido"
      },
      { status: 500 }
    );
  }
}
