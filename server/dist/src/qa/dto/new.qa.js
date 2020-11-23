"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewQuestionDto = void 0;
const class_validator_1 = require("class-validator");
class NewQuestionDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], NewQuestionDto.prototype, "correctAnswer", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(5),
    class_validator_1.MaxLength(100),
    __metadata("design:type", String)
], NewQuestionDto.prototype, "question", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.ArrayMinSize(2),
    __metadata("design:type", Array)
], NewQuestionDto.prototype, "options", void 0);
exports.NewQuestionDto = NewQuestionDto;
exports.default = NewQuestionDto;
//# sourceMappingURL=new.qa.js.map