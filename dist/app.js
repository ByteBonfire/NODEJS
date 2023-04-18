"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
const port = 3000;
const url = "mongodb+srv://nplsbc99:sarojbc00@cluster0.uhwtam5.mongodb.net/?retryWrites=true&w=majority";
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
(0, router_1.default)(app);
mongoose.connect(url);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map