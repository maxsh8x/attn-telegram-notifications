const amqp = require("amqplib");
const TelegramBot = require("node-telegram-bot-api");

const config = require("./lib/config");

const bot = new TelegramBot(config.telegram.token, { polling: true });

async function run() {
  const amqpConn = await amqp.connect(config.amqp.host);
  const amqpCh = await amqpConn.createChannel();
  amqpCh.qos(1);

  await amqpCh.assertQueue("error", { durable: true });
  amqpCh.consume("error", async msg => {
    const { name, message } = msg.properties.headers;
    const body = Buffer.from(msg.content).toString();
    const result = ["Name: " + name, "Message: " + message, "Body:", body].join(
      "\n"
    );
    bot.sendMessage(config.telegram.chatId, result);
    amqpCh.ack(msg);
  });
}

run();
