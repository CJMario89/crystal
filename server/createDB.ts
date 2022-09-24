const sqlite3 = require("sqlite3").verbose();



const db = new sqlite3.Database("./audit.db", sqlite3.OPEN_READWRITE, (err: NodeJS.ErrnoException)=>{
    if(err) console.log(err);
});


// const create_database = `create table requested(id integer primary key, name, website_url, project_telegram_link, owner_telegram_link, chain, verified_contract_address, deposit_fees, withdraw_fees, daily_roi, past_projects, lauch_time, other_audits, other_comments)`;
// db.run(create_database, [], (err:NodeJS.ErrnoException)=>{
//    if(err) console.error(err);
// });

const insert = `insert into requested(name, website_URL, project_telegram_link, owner_telegram_link, chain_id number, verified_contract_address, deposit_fees, withdraw_fees, daily_ROI, lauch_time, past_projects, other_audits, other_comments, created_at timestamp) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`;

db.run(insert, ["2","2","2","2","2","2","2","2","2","2","2","2","2"], (err:NodeJS.ErrnoException)=>{
    if(err) console.error(err);
});

const select = `select * from requested`;

interface REQUESTED{
    name: string;
    website_URL: string;
    chain_id: number;
    verified_contract_address: string;
    deposit_fees: string;
    withdrawal_fees: string;
    daily_ROI: string;
    launch_time: string;
    project_telegram_link: string;
    owner_telegram_link: string;
    project_twitter?: string;
    past_projects?: string;
    other_audits?: string;
    other_comments?: string;
}

db.all(select, [], (err:NodeJS.ErrnoException, rows:REQUESTED[])=>{
    if(err) console.error(err);
    rows.forEach((row:REQUESTED) => {
        console.log(row.name);
    });
});