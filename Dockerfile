FROM node:18-alpine AS builder

WORKDIR /home/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

FROM node:18-alpine

WORKDIR /home/app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /home/app/app.js ./

RUN chown -R appuser:appgroup /home/app

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "app.js"]