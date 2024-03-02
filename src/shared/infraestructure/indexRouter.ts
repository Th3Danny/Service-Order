import { Router, Request, Response  } from "express";
import orderRouter from "../../order/infraestructure/orderRouter";

const prefijo = "/api";
const indexRouter = Router();

indexRouter.use(`${prefijo}/order`, orderRouter);

indexRouter.get(prefijo, (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

export default indexRouter;