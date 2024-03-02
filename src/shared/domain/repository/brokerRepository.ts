import { QueueRequest } from "../entities/qeuesRequest";

export interface BrokerRepository{
    connectionBroker(): Promise<any>;
    createChannel(): Promise<any>;
    sendMessageToChannel(req: QueueRequest): Promise<void>;
}

