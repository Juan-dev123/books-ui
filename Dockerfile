FROM node:18-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
ENV BASE_URL=https://books-back-juans.azurewebsites.net
RUN npm install
COPY . /app
RUN npm run build --prod
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/books-ui /usr/share/nginx/html