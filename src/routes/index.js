const router = require("express").Router();

const morgan = require("morgan");
const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  exitOnError: false,
  level: "info",
  format: format.combine(format.splat(), format.simple()),
  defaultMeta: { service: "node-docker" },
  transports: [new transports.Console()],
});

const myStream = {
  write: (text) => {
    logger.info(text);
  },
};

router.use(morgan("combined", { stream: myStream }));

router.get("/", (req, res) => {
  logger.debug("Receiving get request");
  res.json("Hello node & docker &=<");
});
router.get("/get", (req, res) => {
  logger.debug("Receiving get request");
  res.json("ok");
});

router.post("/post", (req, res) => {
  logger.debug("Receiving post request");
  const { name, age } = req.body;
  res.send({ name, age });
});

module.exports = router;
