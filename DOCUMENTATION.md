# Documentación Técnica del Proyecto Nativa Ecommerce

Este documento detalla la arquitectura, flujos de datos y estado actual del proyecto para facilitar la transición a nuevos desarrolladores (Fullstack y Backend).

---

## 1. Visión General
El proyecto es un ecommerce construido con **Next.js 14 (App Router)**, utilizando **TypeScript** y **Tailwind CSS**.
- **Frontend**: Next.js, React, Redux Toolkit (estado global), SWR (fetching), Tailwind + Shadcn UI.
- **Backend (BFF)**: API Routes de Next.js (`src/app/api`) que actúan como proxy y orquestador hacia servicios externos.
- **Base de Datos / CMS**: El proyecto consume una API externa para productos y precios.
- **Autenticación**: Firebase Auth (Google Sign-In).
- **Pagos**: Integración parcial con Mercado Pago.

---

## 2. Estructura del Proyecto
Las carpetas clave que debes conocer:

- `src/app`: Rutas de la aplicación (App Router).
  - `api/`: Endpoints del backend (Next.js API Routes).
  - `checkout/`: Flujo de compra (Pasos 1, 2, 3).
  - `shop/`: Catálogo y detalle de productos.
  - `(auth)/` & `login/`: Páginas de autenticación.
- `src/components`: Componentes UI reutilizables.
  - `common/`: Elementos compartidos (ProductCard, Buttons).
  - `homepage/`: Secciones de la página de inicio.
- `src/lib`: Utilidades y configuraciones.
  - `api.ts`: Cliente HTTP base (axios/fetch wrapper) con manejo de URLs base.
  - `firebase.ts`: Inicialización de Firebase.
- `src/services`: Lógica de negocio encapsulada (productService, emailService).
- `src/context`: Contextos de React (Auth, Filter, Toast).

---

## 3. API y Consumo de Datos
El frontend **NO** accede directamente a la base de datos. Consume endpoints internos de Next.js que a su vez consultan una API externa.

### Configuración Base (`src/lib/api.ts`)
- `NEXT_PUBLIC_API_BASE`: URL base de la API externa.
- `resolveUrl`: Función crítica que redirige `/products` y `/orders` a rutas internas `/api/...` para evitar problemas de CORS o agregar lógica intermedia.

### Productos (`src/app/api/products/route.ts`)
- **Endpoint Interno**: `GET /api/products`
- **Fuente**: Consulta `/precios` en la API externa.
- **Lógica**:
  - Filtra productos por `estadoTienda === 'Activo'`.
  - Mapea la respuesta cruda al tipo `Product` usado en el frontend.
  - Calcula precios finales, descuentos y badges (`specialOffer`, `newArrival`).

### Precios y Stock
- Los precios se calculan dinámicamente en el mapeo (`mapPrecioToProduct`).
- El stock se lee de `stockDisponible` o `stock`.

---

## 4. Autenticación (`src/context/AuthContext.tsx`)
- **Proveedor**: Firebase Auth.
- **Método**: Únicamente **Google Sign-In** (`signInWithPopup`).
- **Estado**: Se gestiona en el cliente.
- **Persistencia**: No hay base de datos de usuarios propia conectada en el flujo actual (se eliminó Firestore).
- **Faltante**: Si se necesita guardar historial de pedidos por usuario, se debe vincular el `uid` de Firebase con el sistema de backend externo al crear la orden.

---

## 5. Flujo de Pago y Checkout (Estado Actual)
El flujo de checkout está **incompleto**. La UI existe, pero falta la conexión con Mercado Pago y la creación real de la orden.

### Frontend (`src/app/checkout/page.tsx`)
- Tiene 3 pasos: Información, Envío, Pago.
- Usa `react-hook-form` y `zod` para validaciones.
- **Paso 3 (Confirmación)**: Actualmente solo muestra un `alert("Checkout finalizado")` y limpia el carrito local. **NO** llama a la API de pagos.

### Backend (`src/app/api/create-checkout/route.ts`)
- Existe un endpoint para crear la preferencia de pago en Mercado Pago.
- **Importante**: Hay un Access Token harcodeado en el código que debe moverse a variables de entorno (`MERCADOPAGO_ACCESS_TOKEN`) por seguridad.
- Define `notification_url` apuntando a `/api/mercadopago/webhook`.

### Webhook (`src/app/api/mercadopago/webhook/route.ts`)
- Recibe notificaciones de Mercado Pago.
- Intenta actualizar el estado de la orden llamando a `api.post('/orders/.../payment-webhook')`.
- **Problema**: Esa ruta interna `/orders/...` no existe en el proyecto Next.js, por lo que el webhook fallará.

---

## 6. Tareas Pendientes para Backend / Fullstack

### A. Completar el Checkout
1.  En `src/app/checkout/page.tsx` (función `onConfirm`):
    - Recopilar datos del carrito y usuario.
    - Llamar a `POST /api/create-checkout`.
    - Recibir el `init_point` (URL de Mercado Pago) y redirigir al usuario.
2.  Antes de redirigir a Mercado Pago, se debe **crear la orden en el sistema externo** con estado "Pendiente", para tener un ID de orden real (`orderId`) que pasar a Mercado Pago como `external_reference`.

### B. Implementar Webhooks
1.  Corregir `src/app/api/mercadopago/webhook/route.ts`:
    - En lugar de llamar a una ruta interna inexistente, debe ejecutar la lógica de negocio directamente o llamar a la API externa real para actualizar el estado del pedido (`approved`, `rejected`).
2.  Desde el webhook, disparar el envío de correo de confirmación.

### C. Emails de Confirmación
1.  El servicio existe en `src/services/emailService.ts` (usa SendGrid).
2.  Configurar API Key de SendGrid en `.env.local`.
3.  Llamar a `sendOrderConfirmationEmail` dentro del webhook cuando el pago sea exitoso.

### D. Seguridad
1.  Mover `MERCADOPAGO_ACCESS_TOKEN` a `.env.local`.
2.  Verificar que la API externa esté protegida si requiere autenticación.

---

## 7. Variables de Entorno Necesarias
Crear archivo `.env.local` con:

```env
# API Externa
NEXT_PUBLIC_API_BASE=https://tu-api-externa.com
NEXT_PUBLIC_API_USE_PROXY=true

# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxxx
MERCADOPAGO_CURRENCY=ARS
MERCADOPAGO_STATEMENT_DESCRIPTOR=NATIVA

# SendGrid (Emails)
SENDGRID_API_KEY=SG.xxxxxx
SENDGRID_FROM_EMAIL=ventas@nativa.com

# Firebase (Cliente)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
```
