# Use the official lightweight Node.js image based on Alpine
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies (npm packages)
RUN npm install express
RUN npm install mongoose
RUN npm install ejs
RUN npm install dotenv
RUN npm install jest
RUN npm install jsonwebtoken
RUN npm install nodemon

# Copy the rest of the application code to the container
COPY . .

# # Expose the port that the app will run on
# EXPOSE 3000

# Command to start the application
ENTRYPOINT  ["npm","start"]