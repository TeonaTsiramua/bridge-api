FROM node:21.1.0
WORKDIR /home/bridge

RUN mkdir -p assets/images && chmod -R 777 assets/images

COPY package*.json .
RUN npm ci --omit=dev && npm cache clean --force
COPY . .
EXPOSE 5101
CMD [ "node", "app.js" ]