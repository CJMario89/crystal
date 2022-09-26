"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestedModel = void 0;
const Requested_1 = require("./entity/Requested");
const data_source_1 = require("./data-source");
const date_fns_1 = require("date-fns");
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Running database");
})
    .catch((err) => {
    console.error(err);
});
exports.RequestedModel = {
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        const allRequested = yield data_source_1.AppDataSource.manager.find(Requested_1.Requested);
        console.log(allRequested);
        return allRequested;
    }),
    set: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const requested = new Requested_1.Requested();
        console.log(req.body);
        requested.name = req.body.name;
        requested.website_URL = req.body.website_URL;
        requested.chain_id = +req.body.chain_id;
        requested.verified_contract_address = req.body.verified_contract_address;
        requested.deposit_fees = req.body.deposit_fees;
        requested.withdrawal_fees = req.body.withdrawal_fees;
        requested.daily_ROI = req.body.daily_ROI;
        requested.launch_time = req.body.launch_time;
        requested.project_telegram_link = req.body.project_telegram_link;
        requested.owner_telegram_link = req.body.owner_telegram_link;
        requested.project_twitter = req.body.project_twitter;
        requested.past_projects = req.body.past_projects;
        requested.other_audits = req.body.other_audits;
        requested.other_comments = req.body.other_comments;
        requested.created_at = (0, date_fns_1.format)(new Date(), "yyyy-MM-dd hh':'mm':'ss");
        const savedRequested = yield data_source_1.AppDataSource.manager.save(requested);
        return savedRequested;
    })
};
