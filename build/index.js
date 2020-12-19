"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var PORT = Number(process.env.PORT) || 3000;
var app = express_1.default();
app.get("/", function (req, res) {
    var payload = { id: "64644", name: "New Order Available" };
    var convert = JSON.stringify(payload);
    console.log(convert);
    res.send({});
});
app.listen(PORT, "0.0.0.0");
console.log("server listening on port " + PORT);
