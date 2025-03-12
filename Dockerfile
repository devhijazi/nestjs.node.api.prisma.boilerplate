# Apontamento para o Repositorio Node
FROM node:18-alpine3.19 AS build

# Criando diretório padrão da aplicação
WORKDIR /usr/src/app

# Copiando arquivo principal para a instação de dependencias da API
COPY  package*.json ./

# Copiando a pasta do prisma 
COPY prisma ./prisma

# Comando principal para rodar a instalação
RUN npm install

# Gerar arquivos do prisma 
RUN npx prisma generate

# Copiando o restante da source para dentro do container
COPY . .

# Rodando o comando de build da aplicação
RUN npm run build

# Instalando dependencias somente de produção
RUN npm ci --only=production

FROM node:18-alpine3.19 AS runner

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

# Expondo porta do container
EXPOSE 3333

# Subindo a aplicação
CMD ["npm","run","start:prod"]