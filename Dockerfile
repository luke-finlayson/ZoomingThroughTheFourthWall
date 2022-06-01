FROM node:latest
EXPOSE 8080
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
RUN cd public && npm install && npm run build
CMD node server.js