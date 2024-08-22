# Use the official Meteor image as a base
FROM meteor/meteor:latest

# Set the working directory
WORKDIR /app

# Copy application files
COPY . /app

# Install dependencies
RUN meteor npm install

# Expose port
EXPOSE 3333

# Start the Meteor application
CMD ["meteor", "npm", "start"]
