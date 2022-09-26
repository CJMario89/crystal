"use strict";
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./audit.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err)
        console.log(err);
});
// const create_database = `create table requested(id integer primary key, name, website_url, project_telegram_link, owner_telegram_link, chain, verified_contract_address, deposit_fees, withdraw_fees, daily_roi, past_projects, lauch_time, other_audits, other_comments)`;
// db.run(create_database, [], (err:NodeJS.ErrnoException)=>{
//    if(err) console.error(err);
// });
const insert = `insert into requested(name, website_URL, project_telegram_link, owner_telegram_link, chain_id number, verified_contract_address, deposit_fees, withdraw_fees, daily_ROI, lauch_time, past_projects, other_audits, other_comments, created_at timestamp) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
db.run(insert, ["2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2"], (err) => {
    if (err)
        console.error(err);
});
const select = `select * from requested`;
db.all(select, [], (err, rows) => {
    if (err)
        console.error(err);
    rows.forEach((row) => {
        console.log(row.name);
    });
});
