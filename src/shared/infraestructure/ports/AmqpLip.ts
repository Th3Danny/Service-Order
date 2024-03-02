import amqp from "amqplib/callback_api";
import { QueueRequest } from "../../domain/entities/qeuesRequest";
import { BrokerRepository } from "../../domain/repository/brokerRepository";
import { Connection, Channel } from "amqplib/callback_api";

export class AmqpLibPort implements BrokerRepository{
    constructor (private readonly url: string){}

    connectionBroker(): Promise<Connection> {
        return new Promise<Connection>((resolve, reject) => {
            amqp.connect(this.url, (err: any, connect: Connection)=>{
                if (err) reject (err);
                resolve(connect);
            })
        })
    }

    async createChannel(): Promise<Channel> {
        try{
         const connect = await this.connectionBroker();
         return new Promise<Channel>((resolve, reject)=>{
            connect.createChannel((errChanel: any, channel: Channel)=>{
                if(errChanel) reject(errChanel)
                resolve (channel)
            })
         })       
        }catch(err: any){
            throw new Error(err);
        }
    }

    async sendMessageToChannel(req: QueueRequest): Promise<void> {
        const { queueName, queueContent } = req;
        try {
          const channel = await this.createChannel();
          await channel.assertQueue(queueName);
          channel.sendToQueue(queueName, Buffer.from(JSON.stringify(queueContent)), {
            persistent: true,
          });
          console.log("message send: " + queueContent);
        } catch (err: any) {
          throw new Error(err);
        }
      }
    }

