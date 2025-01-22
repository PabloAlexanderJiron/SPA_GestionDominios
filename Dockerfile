FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json .
RUN npm i

COPY . .
RUN npm run build


FROM nginx:1.27-alpine AS prod
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

CMD [ "nginx", "-g", "daemon off;" ]