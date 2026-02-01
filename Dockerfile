# STAGE 1: Build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# We use the default configuration (production) defined in your angular.json
RUN npm run build

# STAGE 2: Serve
FROM nginx:alpine

# Clean default files
RUN rm -rf /usr/share/nginx/html/*

# CRITICAL: The path must match your angular.json + /browser
COPY --from=build /app/dist/pvk-solutions-portfolio/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]