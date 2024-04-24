# Express-API

`Node.js`, `Express.js`, `TypeScript`, `MySQL` based RESTful API which supports Authentication endpoints

## Build Code

- Install Docker Desktop on your computer
- Rename .env.example to .env and configure data accordingly.
- `docker compose build`
- `docker exec -it app sh` to login to app container and then run `npm run dev`
- App should be running on `http://localhost:3000/api/auth/signup` and more. Will update the documentation as I add more endpoints.

## Run tests

- Open a new terminal window and enter `docker exec -it app sh` to enter the app container.
- On the app container run `npm run test`
