# Apontamento para o Repositorio Node
FROM node:18-slim

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

# Expondo porta do container
EXPOSE 3333

# Subindo a aplicação
CMD ["npm","run","start"]