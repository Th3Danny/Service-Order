import { SendMessageService } from "../../../shared/application/services/sendMessageService";
import { QueueName } from "../../../shared/domain/entities/qeuesName";
import { OrderInterface } from "../../domain/entities/order";

export class CreateOrderService {
    constructor (private readonly sendMessageService: SendMessageService){}
    async run (oder:OrderInterface): Promise<OrderInterface>{
        try{
            await this.sendMessageService.run(oder, QueueName.INITIAL);
            return oder;
        }catch(err:any){
            throw new Error(err);
        }
    }
}