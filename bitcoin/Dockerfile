# Use the latest Node.js 22.x version as the base image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on (adjust if necessary)
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]