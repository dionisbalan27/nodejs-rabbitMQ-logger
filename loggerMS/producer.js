const amqp = require("amqplib")
const config = require("./config")

class Producer{
channel;

async createChannel(){
    const connection= await amqp.connect(config.rabbitMQ.url);
    this.channel = await connection.createChannel();
}

async publishMassage(routingKey, message){
    if (!this.channel){
        await this.createChannel();
    }
    const exchangeName = config.rabbitMQ.exchangeName;
    await this.channel.assertExchange(exchangeName,"direct");

    const logDetail= {
        logType:routingKey,
        message:message,
        dateTime: new date(),
    }
    await this.channel.publish(
        exchangeName, 
        routingKey, 
        Buffer.from(JSON.stringify(logDetail))
        );
  
        console.log(`The massage is ${message} is sent to exchange ${exchangeName}`)
}
}

module.exports=Producer;