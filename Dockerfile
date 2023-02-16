FROM node:18

WORKDIR /app

COPY ./package.json .

RUN npm i

COPY . .

# USER appuser
EXPOSE 4000
CMD npm start