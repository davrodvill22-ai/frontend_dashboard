# 🛡️ Informe de Seguridad con Nuclei - Frontend Dashboard

Este informe recopila los resultados de la auditoría de seguridad automatizada ejecutada con **ProjectDiscovery Nuclei** sobre el contenedor del **Frontend Dashboard** (`http://frontend-burger-dashboard:80`).

---

## 📋 Resumen del Escaneo
- **Objetivo analizado:** `http://frontend-burger-dashboard:80`
- **Herramienta:** ProjectDiscovery Nuclei v3.11.1
- **Plantillas ejecutadas:** 11,144 plantillas de seguridad
- **Archivo de resultados raw:** [`reports/nuclei-results.jsonl`](./nuclei-results.jsonl)
- **Total de hallazgos:** 13

---

## 🔍 Hallazgos Principales

### 1. Detección de Tecnología y Versión
- **Servidor Web:** Nginx `1.31.6` detectado a través de las cabeceras HTTP de respuesta.
- **Riesgo:** La exposición explícita de la versión del servidor facilita a un atacante identificar vulnerabilidades específicas de dicha versión.
- **Recomendación:** Configurar en `nginx.conf`:
  ```nginx
  server_tokens off;
  ```

### 2. Cabeceras de Seguridad Faltantes
Nuclei identificó la ausencia de cabeceras HTTP de seguridad fundamentales para la protección de una Single Page Application (SPA):

| Cabecera Faltante | Riesgo Asociado | Recomendación |
|---|---|---|
| `X-Frame-Options` | Ataques de Clickjacking | Agregar `X-Frame-Options: SAMEORIGIN` o `DENY` |
| `X-Content-Type-Options` | Sniffing de tipo MIME | Agregar `X-Content-Type-Options: nosniff` |
| `Content-Security-Policy (CSP)` | Cross-Site Scripting (XSS) e inyección de datos | Definir directivas estrictas de carga de scripts y estilos |
| `Strict-Transport-Security (HSTS)` | Ataques Man-In-The-Middle (MITM) | Forzar HTTPS en producción |
| `Referrer-Policy` | Fuga de URLs y parámetros sensibles en cabeceras referer | Configurar `Referrer-Policy: strict-origin-when-cross-origin` |
| `Permissions-Policy` | Acceso no autorizado a APIs del navegador (cámara, micro, etc.) | Definir políticas restrictivas |
| `Cross-Origin-Opener-Policy (COOP)` | Ataques de aislamiento de origen y Spectre | Configurar `same-origin` |
| `Cross-Origin-Embedder-Policy (COEP)` | Control de recursos embebidos | Configurar `require-corp` |
| `Cross-Origin-Resource-Policy (CORP)` | Inclusión no autorizada de recursos | Configurar `same-origin` |

---

## 🔒 Conclusión
No se detectaron vulnerabilidades críticas ni de ejecución remota de código (RCE) en el frontend. Las principales áreas de mejora se centran en el fortalecimiento (*hardening*) de las cabeceras de respuesta HTTP en la configuración del servidor web Nginx.
