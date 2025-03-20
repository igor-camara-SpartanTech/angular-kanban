FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Copie os arquivos de configuração de dependências
COPY package.json package-lock.json* ./

# Copie o restante do código-fonte
COPY . .

# Instale as dependências
RUN npm install

# Construa o projeto para produção
RUN npm run build

# Exponha a porta 3000
EXPOSE 4200

# Comando para servir a aplicação
CMD ["npm", "start"]
