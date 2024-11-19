FROM node:18-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Renomeia o .env.example para .env
RUN cp .env.example .env

# Executa o build da aplicação
RUN npm run build

# Inicia a aplicação e realiza as migrações após garantir que o PostgreSQL está acessível
CMD ["sh", "-c", "npm run migrate:prod && npm run start"]
