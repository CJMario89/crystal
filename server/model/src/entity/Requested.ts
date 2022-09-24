import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity('Requested')
export class Requested {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    name: string;
    @Column('text')
    website_URL: string;
    @Column('int')
    chain_id: number;
    @Column('text')
    verified_contract_address: string;
    @Column('text')
    deposit_fees: string;
    @Column('text')
    withdrawal_fees: string;
    @Column('text')
    daily_ROI: string;
    @Column('text')
    launch_time: string;
    @Column('text')
    project_telegram_link: string;
    @Column('text')
    owner_telegram_link: string;
    @Column('text',{nullable:true})
    project_twitter?: string;
    @Column('text',{nullable:true})
    past_projects?: string;
    @Column('text',{nullable:true})
    other_audits?: string;
    @Column('text',{nullable:true})
    other_comments?: string;
    @Column('datetime')
    created_at:String

}
