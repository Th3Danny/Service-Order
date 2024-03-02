import { QueueContent } from "../../domain/entities/qeuesContent";
import { QueueName } from "../../domain/entities/qeuesName";
import { QueueRequest } from "../../domain/entities/qeuesRequest";
import { BrokerRepository } from "../../domain/repository/brokerRepository";

export class SendMessageService{
    constructor (private readonly brokerRepository: BrokerRepository){}
    async run (data: QueueContent, queueName:QueueName){
        try{
            const requestQueue: QueueRequest={
                queueName: queueName,
                queueContent: data,
            }
            this.brokerRepository.sendMessageToChannel(requestQueue)

        }catch(err: any){
            throw new Error(err);
        }
    }
}