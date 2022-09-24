import { Requested } from "./entity/Requested"
import { AppDataSource } from "./data-source"
import { Request } from "express";
import { format } from "date-fns";

AppDataSource.initialize()
.then(()=>{
    console.log("Running database")
})
.catch((err)=>{
    console.error(err)
})

export const RequestedModel = {
    getAll: async () => {
        const allRequested = await AppDataSource.manager.find(Requested);
        console.log(allRequested)
        return allRequested;
    },
    set: async (req:Request) => {
        const requested = new Requested()
        console.log(req.body);
        requested.name = req.body.name
        requested.website_URL = req.body.website_URL
        requested.chain_id = +req.body.chain_id
        requested.verified_contract_address = req.body.verified_contract_address
        requested.deposit_fees = req.body.deposit_fees
        requested.withdrawal_fees = req.body.withdrawal_fees
        requested.daily_ROI = req.body.daily_ROI
        requested.launch_time = req.body.launch_time
        requested.project_telegram_link = req.body.project_telegram_link
        requested.owner_telegram_link = req.body.owner_telegram_link
        requested.project_twitter = req.body.project_twitter
        requested.past_projects = req.body.past_projects
        requested.other_audits = req.body.other_audits
        requested.other_comments = req.body.other_comments
        requested.created_at = format(new Date(), "yyyy-MM-dd hh':'mm':'ss")

        const savedRequested = await AppDataSource.manager.save(requested)
        return savedRequested;
    }
}