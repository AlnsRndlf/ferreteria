## 📋 Requisitos Previos

- **Git**
- **Node.js**: Versión 22
- **Cuenta de AWS Academy**: Habilitada para acceder e iniciar un laboratorio de aprendizaje (AWS Academy Learner Lab)

---

## 🚀 Instalación y Ejecución Local

1. **Instalar las dependencias:**

   ```bash
   npm install
   ```

2. **Levantar el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

---

## 🧪 Pruebas y Calidad de Código

- **Ejecutar Pruebas Unitarias (Modo Watch):** `npm run test`
- **Generar Reporte de Cobertura (Coverage):** `npm run coverage`
- **Ejecutar el Linter (Análisis de código estático):** `npm run lint`

---

## ☁️ Despliegue en Producción (AWS EC2 + Nginx)

### 1. Lanzar la instancia EC2 en AWS Academy

Inicia tu Learner Lab y lanza una nueva instancia con las siguientes características:

- **Sistema Operativo (AMI):** Ubuntu Server LTS.
- **Tipo de instancia:** `t3.micro`.
- **Par de claves (Key pair):** RSA en formato `.pem`. **Importante:** Guarda este archivo en un lugar seguro en tu computador local, ya que es necesario para la conexión por SSH.
- **Configuraciones de red (Seguridad):**
  - Permitir tráfico **SSH** (puerto 22) estrictamente desde **"Mi IP"**.
  - Permitir tráfico **HTTP** (puerto 80) desde **Internet** (Anywhere - 0.0.0.0/0).
- *Mantén las demás configuraciones por defecto.*

### 2. Construcción de producción

En tu terminal local, dentro del proyecto, genera la carpeta `dist`:

```bash
npm run build
```

### 3. Preparar la llave y conectar por SSH (Windows PowerShell)

Abre PowerShell en la carpeta donde guardaste tu llave `.pem` y ejecuta:

```powershell
icacls ".\tu-llave.pem" /inheritance:r
icacls ".\tu-llave.pem" /grant:r "$($env:USERNAME):(R)"
icacls ".\tu-llave.pem" /remove:g "*S-1-5-32-545" "*S-1-5-11" "*S-1-1-0"

ssh -i ".\tu-llave.pem" ubuntu@<IP_PUBLICA_EC2>
```

### 4. Instalar y comprobar Nginx

Dentro de la terminal SSH en EC2:

```bash
sudo apt update
sudo apt install -y nginx
sudo systemctl enable --now nginx
sudo systemctl is-active nginx
sudo nginx -t
```

### 5. Preparar el destino y copiar el build

en PowerShell local en la raíz del proyecto y ejecuta:

```powershell
ssh -i "RUTA\tu-llave.pem" ubuntu@<IP_PUBLICA_EC2> "mkdir -p /tmp/ferreteria"
scp -i "RUTA\tu-llave.pem" -r ".\dist\*" ubuntu@<IP_PUBLICA_EC2>:/tmp/ferreteria/
```

Vuelve a la terminal conectada por **SSH** en EC2 y ejecuta:

```bash
sudo mkdir -p /var/www/ferreteria
sudo cp -a /tmp/ferreteria/. /var/www/ferreteria/
sudo chown -R www-data:www-data /var/www/ferreteria
sudo find /var/www/ferreteria -type d -exec chmod 755 {} \;
sudo find /var/www/ferreteria -type f -exec chmod 644 {} \;
ls -la /var/www/ferreteria
```

### 6. Configurar Nginx para una SPA

Dentro de la conexión SSH en EC2, crea el archivo de configuración:

```bash
sudo nano /etc/nginx/sites-available/ferreteria
```

Pega el siguiente contenido:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name _;
    root /var/www/ferreteria;
    index index.html;

    location / {
        try_files $uri$uri/ /index.html;
    }
}
```

Guarda y habilita el sitio:

```bash
sudo ln -sfn /etc/nginx/sites-available/ferreteria /etc/nginx/sites-enabled/ferreteria
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🖼️ Referencias y Fuentes Multimedia
cuek :/