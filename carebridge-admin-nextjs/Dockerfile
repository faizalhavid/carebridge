FROM oven/bun:latest AS builder

WORKDIR /app

COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

COPY . .

RUN bunx next build


FROM oven/bun:latest AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock ./bun.lock
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["bun", "run", "start"]
