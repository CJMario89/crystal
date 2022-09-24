import { Request, Response } from "express";
import { RequestedModel } from "../model/src/RequestedModel";

export const RequestedController = {
    getAllRequested: async (req:Request, res:Response) => {
        const allRequested = await RequestedModel.getAll()
        res.json(allRequested)
    },
    requested: async (req:Request, res:Response) => {
        try{
            const requested = await RequestedModel.set(req)
            return res.status(200).json(requested)
        }catch(e){
            console.log(e);
            return res.status(500).json("fail")
        }
    }
}