import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: RequestDTO): Transaction {
    const transactionData = { title, type, value };
    if (transactionData.type === 'income') {
      const transaction = this.transactionsRepository.create(transactionData);
      return transaction;
    }
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (balance.total > transactionData.value) {
        const transaction = this.transactionsRepository.create(transactionData);
        return transaction;
      }
      throw Error('Insuficient Balance');
    }
    throw Error('the type of transactios is wrong');
  }
}

export default CreateTransactionService;
