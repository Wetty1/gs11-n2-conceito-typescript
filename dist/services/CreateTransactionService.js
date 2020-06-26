"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateTransactionService = /** @class */ (function () {
    function CreateTransactionService(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    // ? validações do objeto
    CreateTransactionService.prototype.execute = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        if (type === 'outcome') {
            if (value > this.transactionsRepository.getBalance().total) {
                throw new Error('Você não tem saldo suficiente');
            }
        }
        var transaction = this.transactionsRepository.create({
            title: title,
            type: type,
            value: value,
        });
        return transaction;
    };
    return CreateTransactionService;
}());
exports.default = CreateTransactionService;
