# 🚀 Sistema de Rate Limiting Inteligente

## 📋 **¿Cómo funciona?**

### **🎯 Rate Limiting por IP (no global)**
- Cada dirección IP tiene sus propios límites
- Un usuario no puede bloquear a otros usuarios
- Escalable para múltiples usuarios simultáneos

### **📊 Configuración Base (por IP)**
```typescript
{
  short: 10 req/segundo    // Límite inmediato
  medium: 50 req/10seg     // Límite a corto plazo  
  long: 200 req/minuto     // Límite a largo plazo
}
```

## 🎭 **Decoradores Personalizados**

### **🔐 @AuthThrottle() - Endpoints de Autenticación**
```typescript
// Más restrictivo para prevenir ataques de fuerza bruta
{
  short: 5 req/segundo     // Máximo 5 intentos de login por segundo
  medium: 10 req/10seg     // Máximo 10 intentos por 10 segundos
  long: 20 req/minuto      // Máximo 20 intentos por minuto
}
```
**Uso:** Login, Register, Password Reset

### **🔍 @QueryThrottle() - Endpoints de Consulta**
```typescript
// Más permisivo para consultas frecuentes
{
  short: 20 req/segundo    // Navegación fluida
  medium: 100 req/10seg    // Consultas intensivas
  long: 500 req/minuto     // Uso normal de la app
}
```
**Uso:** GET endpoints, búsquedas, listados

### **✏️ @WriteThrottle() - Endpoints de Escritura**
```typescript
// Intermedio para operaciones de modificación
{
  short: 10 req/segundo    // Modificaciones rápidas
  medium: 30 req/10seg     // Ediciones normales
  long: 100 req/minuto     // Uso moderado
}
```
**Uso:** POST, PUT, PATCH (crear/modificar)

### **⚠️ @CriticalThrottle() - Operaciones Críticas**
```typescript
// Muy restrictivo para operaciones sensibles
{
  short: 2 req/segundo     // Máxima seguridad
  medium: 5 req/10seg      // Operaciones críticas
  long: 10 req/minuto      // Uso muy controlado
}
```
**Uso:** DELETE, operaciones administrativas, pagos

### **📁 @UploadThrottle() - Subida de Archivos**
```typescript
// Restrictivo por el peso de las operaciones
{
  short: 3 req/segundo     // Uploads rápidos
  medium: 10 req/10seg     // Subidas múltiples
  long: 50 req/minuto      // Uso normal de uploads
}
```
**Uso:** Upload de imágenes, documentos, archivos

## 🛡️ **Características de Seguridad**

### **📍 Tracking por IP**
- Cada IP tiene sus propios contadores
- No hay bloqueo global entre usuarios
- Identificación precisa de atacantes

### **⏱️ Mensajes Informativos**
```typescript
"Demasiadas peticiones. Límite: 5 por 10s. Intentos: 7. Espera 3 segundos."
```

### **🚫 Endpoints Excluidos**
```typescript
const skipRoutes = [
  '/health',      // Health checks
  '/api-docs',    // Documentación
  '/api/docs',    // Swagger UI
];
```

## 🧪 **Ejemplos de Uso**

### **Usuario Normal (navegando)**
```
✅ 08:00:00 - GET /products (1/20 por segundo)
✅ 08:00:01 - GET /users/profile (2/20 por segundo)  
✅ 08:00:02 - POST /products (1/10 por segundo)
✅ 08:00:03 - GET /sales (3/20 por segundo)
```

### **Atacante (fuerza bruta)**
```
✅ 08:00:00 - POST /auth/login (1/5 por segundo)
✅ 08:00:00 - POST /auth/login (2/5 por segundo)
✅ 08:00:00 - POST /auth/login (3/5 por segundo)
✅ 08:00:00 - POST /auth/login (4/5 por segundo)
✅ 08:00:00 - POST /auth/login (5/5 por segundo)
❌ 08:00:00 - POST /auth/login (6/5 - BLOQUEADO!)
```

## ⚡ **Beneficios del Sistema**

### **👥 Para Usuarios Normales**
- ✅ **200 requests por minuto** = 3.3 req/segundo promedio
- ✅ **Navegación fluida** sin restricciones molestas
- ✅ **Sin bloqueos** por otros usuarios
- ✅ **Límites generosos** para uso real

### **🛡️ Para Seguridad**
- ✅ **Bloquea ataques de fuerza bruta** (solo 5 intentos/seg en login)
- ✅ **Previene DDoS** por IP individual
- ✅ **Protege endpoints críticos** con límites específicos
- ✅ **Monitoreo detallado** de intentos maliciosos

### **🚀 Para Escalabilidad**
- ✅ **No hay límite global** que afecte el rendimiento
- ✅ **Cada IP independiente** permite múltiples usuarios
- ✅ **Configuración flexible** por tipo de endpoint
- ✅ **Optimizado para producción** con miles de usuarios

## 📈 **Comparación: Antes vs Ahora**

### **❌ Configuración Anterior (Problemática)**
```
- 3 requests/segundo GLOBALES
- Un usuario bloquea a todos
- No escalable
- Muy restrictivo para uso real
```

### **✅ Configuración Nueva (Optimizada)**
```
- 10-20 requests/segundo POR IP
- Cada usuario independiente  
- Totalmente escalable
- Límites realistas y usables
```

---

## 🎯 **Conclusión**

El nuevo sistema de rate limiting es:
- **🏠 Justo**: Cada usuario tiene sus propios límites
- **🛡️ Seguro**: Bloquea ataques manteniendo usabilidad
- **⚡ Rápido**: No hay bloqueos globales
- **🎛️ Flexible**: Límites específicos por tipo de operación
- **📊 Inteligente**: Mensajes informativos y tracking por IP

**¡Ahora tu API puede manejar miles de usuarios simultáneamente sin comprometer la seguridad!** 🚀
