FROM node:11-alpine

WORKDIR /serverapp

copy . .
RUN npm install
EXPOSE 6060
EXPOSE 6000

CMD ["npm", "run", "dev"]

