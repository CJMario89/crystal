import express ,{Request, Response} from "express";
import * as AuditController from "./controller/AuditController";
const app = express();

app.use(express.json())
app.get("/api/getAllRequested", AuditController.RequestedController.getAllRequested);
app.post("/api/requested", AuditController.RequestedController.requested);

app.listen(5000, ()=>{
    console.log("server started")
});