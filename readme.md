1. Cargamos la aplicación PWA de la lista de compra

2. instalamos el web push global y generamos las vapid key
   npm i -g web-push
   web-push generate-vapid-keys [--json]

3. Guardamos las keys en ServiceWorkerRegistration

4. Modificamos register() en el ServiceWorkerRegistration

5. Probamos que se puedan habilitar los permisos -> los habilitamos

6. Crearemos una notificacion push automatica, cada vez que haya una version disponible
   self.registration.showNotification(title, { body })

---

7. Creamos el servidor en express
   npm i express cors
