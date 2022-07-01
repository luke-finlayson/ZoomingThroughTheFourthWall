FROM node:latest
EXPOSE 443
ENV NODE_ENV=production
ENV GOOGLE_APPLICATION_CREDENTIALS="./gc-credentials.json"
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
RUN npm run build
CMD node server.js