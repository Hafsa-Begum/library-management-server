"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
console.log('DATABASE_URL:', process.env.DATABASE_URL); // 👈 check this
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required in .env file');
}
exports.default = {
    port: Number(process.env.PORT) || 3000,
    database_url: process.env.DATABASE_URL,
};
