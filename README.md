# Donate Stream overlay service
#### This project build for create hook API that receive donation details then push it ot local array and broadcast this data to websocket using socket.io

##### Hook API
   ```
   POST http://localhost:3000/donations
   with payload
   {
     "name": "John Doe",
     "message": "Thank you!",
     "amount": 100
   }
   ```

##### API for get all donations
   ```
   GET http://localhost:3000/donations
   ```

#####  WebSocket host 
    ```
    http://localhost:3000
    ```

   📝 **Note**: WebSocket clients must attach an ```authorization``` header or a ```token``` queryKey  containing the correct WebSocket secret.
   Clients without a valid secret will be disconnected immediately during the handshake phase.




And extra Health API
   ```
   GET http://localhost:3000/health
   ```
---


# To start this project for DevMode
1. install dependencies
    ```
    npm install
    ```

2. create environment variable file  (```.env```) at root project directory
    ```
    cp .env.example .env
    ```
    fill your config value in ```.env```

2. Start project for dev mode 
    ```
    npm run start:dev
    ```

---
# To start project for Production Mode
1. install dependencies
    ```
    npm install
    ```

2. create environment variable file  (```.env```) at root project directory
    ```
    cp .env.example .env
    ```
    fill your config value in ```.env```

3. Build project from typescript to javascript

    ```
    npm run build
    ```

4. Start project
    ```
    npm run start:prod
    ```
    or
    ```
    node dist/main
    ```
