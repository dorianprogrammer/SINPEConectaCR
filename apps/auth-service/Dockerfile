# ---- deps ----
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json ./
RUN npm i -g pnpm@9
RUN pnpm install --frozen-lockfile=false

# ---- dev ----
FROM node:20-alpine AS dev
WORKDIR /app
RUN npm i -g pnpm@9

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3001
CMD ["pnpm", "dev"]

# ---- build ----
FROM node:20-alpine AS build
WORKDIR /app
RUN npm i -g pnpm@9

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ---- prod ----
FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./

EXPOSE 3000
CMD ["node", "dist/index.js"]