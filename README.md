## How to build and run

1. Make a copy of the file `backend/.env.example` and rename it to `backend/.env`;
2. Fill in this file with your preferences and your TMBD API KEY.
3. To start the server, run the commands below:
```sh
cd backend && npm install && npm run dev
```

4. To start the frontend, run the following commands:
```sh
cd client && yarn && yarn start
```
5. To run the tests:
```sh
cd backend
npm run test
npm run test:coverage
```

## Tools Backend
- express: Most used Node.js Framework with a Huge community and a lot of modules.
- axios: HTTP client, easy to use and very powerful. The main reason to use it is the ability to create different instances with a specific configuration.
- dotenv: Use sensitive or common configuration variables through .env files.
- memory-cache: Cache for our endpoints
- jest: Test runner, easy to mock and it has various built-in features.

## Tools Frontend
- create-react-app: to speed up the things and focus on the development.
- axios: HTTP client to call the backend endpoints. It plays very well with React.
- styled-components: CSS inside JS. All components have its own styles inside its scope, no need to create external files or classes for styling.

## General Description
To handle the heavy load I did some research and ended up with an approach about clustering. Since Node.js is single-threaded, the objective is to share the CPU cores to handle better all the requests.

To cache the response was used the memory-cache. Very simple to use and it seems very powerful. The ttl was set to 1h but could be more since the API doesn't update so often.

The file structure is following the MVP pattern, very known and easy to use and maintain.

The project uses the https://standardjs.com/ for coding standards.
