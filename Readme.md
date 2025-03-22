# Express, Mongoose & JWT Authentication Project

This is a **Node.js** project using **Express.js** for routing, **Mongoose** for MongoDB, and **JWT (JSON Web Token)** for authentication and authorization.

## 📌 Installation

Follow these steps to set up the project:

### 1️⃣ Initialize a Node.js Project  
Run the following command to create a `package.json` file:  
```sh
npm init -y
```

```sh
npm i express
```
```sh
npm i mongoose
```sh

npm i jsonwebtoken
npm i bcryptjs

npm i dotenv

npm i nodemon
```

If using nodemon, add the following script in package.json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
Run the server using:
node index

/project-root
│── server.js          # Main server file
│── .env               # Environment variables
│── package.json       # Project dependencies & scripts
│── node_modules/      # Installed dependencies
│── models/            # Mongoose models
│── routes/            # Express routes
│── middleware/        # Authentication middleware
