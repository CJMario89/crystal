"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Requested = void 0;
const typeorm_1 = require("typeorm");
let Requested = class Requested {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Requested.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], Requested.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], Requested.prototype, "website_URL", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Requested.prototype, "chain_id", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], Requested.prototype, "verified_contract_address", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], Requested.prototype, "deposit_fees", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], Requested.prototype, "withdrawal_fees", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], Requested.prototype, "daily_ROI", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], Requested.prototype, "launch_time", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], Requested.prototype, "project_telegram_link", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], Requested.prototype, "owner_telegram_link", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true })
], Requested.prototype, "project_twitter", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true })
], Requested.prototype, "past_projects", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true })
], Requested.prototype, "other_audits", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true })
], Requested.prototype, "other_comments", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime')
], Requested.prototype, "created_at", void 0);
Requested = __decorate([
    (0, typeorm_1.Entity)('Requested')
], Requested);
exports.Requested = Requested;
