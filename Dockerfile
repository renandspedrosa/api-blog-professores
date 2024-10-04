# Define a imagem base
FROM node:18-slim

# Instala o cliente do PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Executa o build da aplicação
RUN npm run build

# Copia o script de espera para o container
COPY wait-for-postgres.sh .

# Inicia a aplicação e realiza as migrações
CMD ["sh", "-c", "./wait-for-postgres.sh && npm run migrate:prod && npm run start"]