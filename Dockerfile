FROM mcr.microsoft.com/playwright:v1.52.0-noble

# Set working dir in the container
WORKDIR /app

COPY package*.json .
COPY . .

RUN npm ci

CMD ["npx", "playwright", "test"]
# To run the container locally, use:
# docker run --rm -v "$(pwd)/docker-playwright-report:/app/playwright-report" amazon-e2e