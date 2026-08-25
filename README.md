# Postline PRO — Landing

Landing page de **Postline PRO**, la extensión de Adobe Premiere Pro que automatiza el trabajo repetitivo antes, durante y después del montaje.

🔗 [postline.marquesdxp.com](https://postline.marquesdxp.com)

## Estructura

```
.
├── index.html        # Estructura de la página (sin CSS/JS inline)
├── css/style.css      # Todos los estilos, organizados por sección
├── js/main.js         # Interacción del mock de producto + reveal-on-scroll
├── favicon.svg         # Favicon (P sobre cuadrado gris redondeado)
└── CNAME               # Dominio custom para GitHub Pages
```

No hay build ni dependencias: es HTML/CSS/JS estático, pensado para servirse tal cual desde GitHub Pages.

## Desarrollo local

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Contenido

La página sigue el copy del método Postline: problema → método en 4 fases (Preparar, Editar, Medios, Finalizar) → funcionalidades → antes/después → qué incluye → precio → FAQ → autor → cierre.

Hay bloques marcados explícitamente como pendientes en el propio HTML (buscar `[a confirmar]` o `pendiente`):
- Testimonios (sección entre `#precio` y `#faq`) — placeholders a sustituir por citas reales de la Founders Beta.
- Licencia comercial y flujo de entrega tras la compra — en la sección `#faq` y `#precio`.
- Foto del autor — placeholder en la sección `.author`.
- Enlace de compra real en `#precio`.

## Diseño

Los tokens de color/tipografía en `css/style.css` (`:root`) están tomados del design system real de la app (`scss/tokens/_colors.scss`), para que el mock de producto del hero sea fiel al panel real dentro de Premiere.

Breakpoints principales: `980px` (hero pasa a una columna), `900/860/780/680px` (grids y secciones a 2 col / 1 col), `560px` y `400px` (ajustes de teléfono: banner, cabecera del mock y pestañas de fase en cuadrícula 2×2 en vez de apretarse en una fila).
