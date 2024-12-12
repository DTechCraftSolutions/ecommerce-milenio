# Use uma imagem base do Node.js
FROM node:18-slim

# Configure o diretório de trabalho
WORKDIR /app
ENV NEXT_PUBLIC_APP_URL=http://172.21.16.1:3000cls
ENV NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN=TEST-3281588865999397-060811-9fa64f4b1c84c92ebb53cd747a9cb032-546596274
ENV NEXT_PUBLIC_API_URL=https://milenio-api.vercel.app/
# Copie os arquivos do projeto
COPY package*.json ./
COPY . .

# Instale as dependências e crie o build
RUN npm install
RUN npm run build

# Exponha a porta padrão do Next.js
EXPOSE 3000

# Comando para rodar o servidor Next.js
CMD ["npm", "start"]
