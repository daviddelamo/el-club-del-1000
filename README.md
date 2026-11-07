# 🐾 El Club del 1000 - Aventura ABN Mascotas

Aplicación web educativa progresiva (PWA) diseñada para aprender y practicar matemáticas con el **método ABN** (especialmente **«Los amigos del 1000»**) en tablets para niños de 7 años (2º de Primaria).

---

## 🚀 Cómo abrirlo en la tablet ahora mismo

1. Asegúrate de que la tablet y tu ordenador están conectados a la **misma red Wi-Fi**.
2. Abre el navegador de la tablet (Safari en iPad o Chrome en Android).
3. Entra en la dirección:
   ```text
   http://192.168.1.161:5173/
   ```
4. **Instalarlo como App nativa en la tablet:**
   - **En iPad (Safari):** Pulsa el botón de *Compartir* (cuadrado con flecha hacia arriba) y selecciona **«Añadir a pantalla de inicio»**.
   - **En Android (Chrome):** Pulsa los 3 puntos arriba a la derecha y selecciona **«Instalar aplicación»** o **«Añadir a pantalla de inicio»**.
   - ¡Listo! Tendrá su propio icono de perrito y se abrirá a pantalla completa sin barras de navegación y con soporte offline.

---

## 🎯 Pedagogía ABN: Niveles Progresivos

1. **🟢 Nivel 1: Cachorros (Centenas exactas)**
   - Ej: $300 + 700 = 1000$. Traslado directo de los amigos del 10 a las centenas.
2. **🟡 Nivel 2: Exploradores (Decenas exactas)**
   - Ej: $340 + 660 = 1000$. Descomposición: $300 + 600 = 900$, $40 + 60 = 100$.
3. **🔴 Nivel 3: Campeones (Cualquier número de 3 cifras)**
   - Ej: $348 + 652 = 1000$.
   - **La regla de oro ABN 9-9-10:**
     - Centenas que sumen 9: $3 + 6 = 9$ ($300 + 600 = 900$)
     - Decenas que sumen 9: $4 + 5 = 9$ ($40 + 50 = 90$)
     - Unidades que sumen 10: $8 + 2 = 10$ ($8 + 2 = 10$)
     - Total: $900 + 90 + 10 = 1000$.

---

## 🐶 Características del Juego

* **Mascotas interactivas:** Toby (Perrito), Misi (Gatita), Pompón (Conejito), Bao (Pandita), Chispa (Zorrita) y Kiko (Koala).
* **Botón «¡Pista ABN mágica!»:** Abre un visualizador explicativo con colores ABN (Azul: centenas, Rosa: decenas, Verde: unidades) y barra gráfica de 1000 puntos.
* **Dos modos de juego adaptados a tablet:**
  * *Modo Platos:* 4 opciones grandes y coloridas para pulsar.
  * *Modo Teclado:* Teclado numérico táctil de teclas grandes para escribir la cifra.
* **Refugio y Armario:** Desbloqueo de nuevas mascotas y accesorios (gorritos, gafas de genio, corona, medalla de oro, capa de superheroína) con las estrellas conseguidas.
* **Sonidos sintetizados con Web Audio API:** Sin descargas externas pesadas; funciona 100% offline.
* **Centro de aprendizaje modular:** Preparado para añadir nuevos temas (Amigos del 100, Amigos del 10, Rejilla ABN, Lengua, etc.).

---

## 🐳 Despliegue en Coolify con Docker Compose

Este proyecto está optimizado con un **Dockerfile multi-stage** (Node 22 para build + Nginx Alpine para servir con compresión Gzip y headers PWA) y un `docker-compose.yml`.

### Pasos en Coolify:
1. En tu panel de Coolify, crea un nuevo **Recurso -> Aplicación desde Repositorio Git** (GitHub).
2. Selecciona este repositorio y la rama `main`.
3. Coolify detectará automáticamente `Docker Compose` o `Dockerfile`.
4. Define el dominio para tu hija (ej. `https://abn.tudominio.com`). Coolify gestionará automáticamente el certificado SSL (Let's Encrypt).
5. Pulsa **Deploy** y ¡a jugar desde cualquier tablet o lugar del mundo!

