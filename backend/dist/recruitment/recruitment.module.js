"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruitmentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const recruitment_service_1 = require("./recruitment.service");
const recruitment_controller_1 = require("./recruitment.controller");
const recruitment_entity_1 = require("./entities/recruitment.entity");
let RecruitmentModule = class RecruitmentModule {
};
exports.RecruitmentModule = RecruitmentModule;
exports.RecruitmentModule = RecruitmentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([recruitment_entity_1.Recruitment])],
        controllers: [recruitment_controller_1.RecruitmentController],
        providers: [recruitment_service_1.RecruitmentService],
        exports: [recruitment_service_1.RecruitmentService],
    })
], RecruitmentModule);
//# sourceMappingURL=recruitment.module.js.map