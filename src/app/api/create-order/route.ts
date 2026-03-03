import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    
    console.log('📦 Datos de orden recibidos:', JSON.stringify(orderData, null, 2));
    
    // Validar datos requeridos
    if (!orderData.orderId || !orderData.userId || !orderData.items || !orderData.total) {
      console.error('❌ Datos de orden incompletos:', {
        orderId: !!orderData.orderId,
        userId: !!orderData.userId,
        items: !!orderData.items,
        total: !!orderData.total
      });
      return NextResponse.json(
        { error: "Datos de orden incompletos" },
        { status: 400 }
      );
    }

    console.log('🔄 Enviando orden a API externa...');
    
    // Preparar datos en el formato que espera tu API externa
    const simplifiedOrderData = {
      orderId: orderData.orderId, // REQUERIDO por tu API externa
      userId: orderData.userId,
      customerInfo: orderData.customerInfo,
      deliveryInfo: orderData.deliveryInfo,
      items: orderData.items,
      total: orderData.total,
      status: orderData.status,
      createdAt: orderData.createdAt
    };

    console.log('📤 Enviando datos simplificados:', JSON.stringify(simplifiedOrderData, null, 2));

    // Enviar a la API externa usando fetch directo
    const externalApiUrl = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_URL || 'https://maderascaballero.vercel.app';
    
    // Construir URL completa para la API externa
    const fullUrl = `${externalApiUrl.replace(/\/+$/, '')}/api/orders`;
    
    console.log('🌐 Enviando a API externa:', fullUrl);
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(simplifiedOrderData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API externa respondió con ${response.status}: ${errorText}`);
    }

    const responseData = await response.json();
    
    console.log('✅ Respuesta de API externa:', responseData);

    // Si tu API externa devuelve el orderId generado, usarlo; sino usar el local
    const finalOrderId = responseData?.orderId || responseData?.id || orderData.orderId;

    return NextResponse.json({
      success: true,
      message: "Orden creada correctamente",
      orderId: finalOrderId,
      data: responseData
    });

  } catch (error) {
    console.error('❌ Error al crear la orden:', error);
    console.error('❌ Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        error: "Error al crear la orden",
        details: error instanceof Error ? error.message : "Error desconocido",
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
