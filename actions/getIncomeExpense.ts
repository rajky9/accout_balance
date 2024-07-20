"use server"
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";


async function getincomeExpense(): Promise<{
  income?: number,
  expense?: number,
  error?: string
}> {
  const { userId } = auth()

  if (!userId) {
    return { error: 'User not found!' }
  }

  try {
    const result = await db.transaction.findMany({
      where: {
        userId: userId
      }
    })

    const transactions = result.map((trans) => trans.amount)

    const income = transactions.filter((trans) => trans > 0).reduce((sum, curr) => sum + curr, 0)

    const expense = transactions.filter((trans) => trans < 0).reduce((sum, curr) => sum + curr, 0)

    return { income: income, expense: Math.abs(expense) }
  } catch (error) {
    return { error: "Db error." }
  }

}

export default getincomeExpense;
