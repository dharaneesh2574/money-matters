
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./


RUN npm install --legacy-peer-deps


COPY . .


COPY .env.local .env.local


RUN npm run build


FROM node:18-alpine AS runner


WORKDIR /app


COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env.local .env.local

ENV NODE_ENV=production


EXPOSE 3000


CMD ["npm", "start"]
