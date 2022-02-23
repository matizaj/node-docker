if (process.env.MODE !== "production") {
  require("dotenv").config();
}
const {
  MONGO_USER,
  MONGO_PSW,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const session = require("express-session");
let RedisStore = require("connect-redis")(session);

// redis@v4
const { createClient } = require("redis");
let redisClient = createClient({
  host: "redis",
  port: 6379,
});

const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

redisClient.on("connect", () => console.log("::> Redis Client Connected"));
redisClient.on("error", (err) => console.log("<:: Redis Client Error", err));

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "secret",
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 30000,
      saveUninitialized: false,
      resave: false,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectWithRetry = () => {
  mongoose
    .connect(
      `mongodb://${MONGO_USER}:${MONGO_PSW}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
    )
    .then(() => console.log("succesfully connected to db"))
    .catch((err) => {
      console.log(err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use(routes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
