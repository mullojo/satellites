# Use the official Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on (if needed)
EXPOSE 3333

# Command to run your app
CMD ["node", "app.js"]
