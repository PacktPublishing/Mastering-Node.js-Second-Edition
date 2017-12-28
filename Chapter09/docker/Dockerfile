# Dockerfile
FROM node:9

LABEL maintainer="your@email.com"
ENV NODE_ENV=development

WORKDIR /app

COPY ./app .

RUN npm i

EXPOSE 8087

CMD [ "npm", "start" ]
