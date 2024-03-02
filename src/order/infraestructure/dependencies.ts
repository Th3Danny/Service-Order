import { SendMessageService } from "../../shared/application/services/sendMessageService";
import { AmqpLibPort } from "../../shared/infraestructure/ports/AmqpLip";
import { CreateOrderService } from "../application/service/createOrderService";
import { CreateOrderController } from "./controller/createOrderController";

const amqpLibPort = new AmqpLibPort("amqp://3.225.191.175");
const sendMessageService = new SendMessageService(amqpLibPort); 
const createOrderService = new CreateOrderService(sendMessageService)

export const createOrderController = new CreateOrderController(createOrderService);