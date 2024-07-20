"use client"
import { addCommas } from "@/lib/utils";
import { Transaction } from "@/types/Transaction";
import { toast } from "react-toastify";
import deleteTransaction from "@/actions/deleteTransaction";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const sign = transaction.amount > 0 ? "+" : "-";

  const handleDeleteAction = async (transactionId: string) => {
    const confirm = window.confirm('Are you sure you want to delete transaction?')

    if (!confirm) return;

    const { message, error } = await deleteTransaction(transactionId);

    if (error) {
      toast.error(error);
    }
    toast.success(message)



  }

  return (<>
    <li className={`${transaction.amount > 0 ? 'plus' : 'minus'}`}>
      <span>{transaction.text}</span>
      <span>{sign}${addCommas(Math.abs(transaction.amount))}</span>
      <button
        className="delete-btn"
        onClick={() => handleDeleteAction(transaction.id)}
      >
        X
      </button>
    </li>
  </>);
}

export default TransactionItem;