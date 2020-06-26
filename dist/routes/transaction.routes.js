"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TransactionsRepository_1 = __importDefault(require("../repositories/TransactionsRepository"));
var CreateTransactionService_1 = __importDefault(require("../services/CreateTransactionService"));
// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
var transactionRouter = express_1.Router();
var transactionsRepository = new TransactionsRepository_1.default();
var createTransactionService = new CreateTransactionService_1.default(transactionsRepository);
transactionRouter.get('/', function (request, response) {
    try {
        var transactions = transactionsRepository.all();
        var balance = transactionsRepository.getBalance();
        return response.status(200).json({ transactions: transactions, balance: balance });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
transactionRouter.post('/', function (request, response) {
    var _a = request.body, title = _a.title, value = _a.value, type = _a.type;
    try {
        var transaction = createTransactionService.execute({
            title: title,
            value: value,
            type: type,
        });
        return response.status(200).json(transaction);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = transactionRouter;
