# real-time-chat-spring-react-tailwind

## Run the app with docker images from dockerhub

From the project directory: `docker-compose -f .\docker-compose-dockerhub.yml up`

**_Three ports are required to be available. 8090 is used for backend, 5432 for postgresql and 3000 for frontend_**

### Building environment(If you want to build the app locally )

JDK20, gradle, npm, docker are required to build and run the app

### Build and run

- Build .jar from the backend folder: `.\gradle bootjar`

- Run the app with command : `docker-compose up --build`

Run from: `http://localhost:3000`

### Services in docker

3 Services:

- Backend with Spring boot, websocket,
- Fronted with React, Tailwind, daisy
- Postgresql

### Frameworks, Libs :

Spring boot with websocket, JPA for backend, React, Tailwind with daisy , StompJs, SockJs, uuid for user IDs

### TODO

- Unit Test, Integration tests
- fix warnings in react

### Demo

https://youtu.be/ayeV6obpiys
[![](https://youtu.be/ayeV6obpiys)](https://youtu.be/ayeV6obpiys)
