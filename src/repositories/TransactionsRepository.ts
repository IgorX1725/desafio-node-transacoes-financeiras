import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionData {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        return transaction.value;
      }
      return 0;
    });
    const outcome = this.transactions.map(transaction => {
      if (transaction.type === 'outcome') {
        return transaction.value;
      }
      return 0;
    });
    const incomeValue = income.reduce((prev, current) => {
      return current + prev;
    });
    const outcomeValue = outcome.reduce((prev, current) => {
      return current + prev;
    });
    const total = incomeValue - outcomeValue;

    const balance = { income: incomeValue, outcome: outcomeValue, total };
    return balance;
  }

  public create({ title, type, value }: TransactionData): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
