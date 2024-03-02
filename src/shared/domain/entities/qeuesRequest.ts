import { QueueName } from "./qeuesName";
import { QueueContent } from "./qeuesContent";

export interface QueueRequest{
    queueName: QueueName;
    queueContent: QueueContent;
}