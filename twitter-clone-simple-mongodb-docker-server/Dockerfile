FROM node:19.4.0
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3020
CMD ["yarn","dev"]