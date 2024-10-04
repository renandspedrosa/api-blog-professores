# Define a imagem base
FROM node:18-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Executa o comando de build
# RUN npm run build


# Inicia a aplicação
CMD ["npm", "run", "start:dev"]
