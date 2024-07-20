"use server"

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


interface TransactionData {
  text: String;
  amount: Number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: String;
}

async function addTransaction(formData: FormData): Promise<TransactionResult> {
  const textValue = formData.get("text")
  const amountValue = formData.get("amount")

  if (!textValue || textValue === '' || !amountValue) {
    return { error: "text or amount is missing " }
  }
  const text = textValue.toString()
  const amount = parseFloat(amountValue.toString())

  const { userId } = auth()

  if (!userId) {
    return { error: 'User not found' }
  }
  try {
    const transactionData: TransactionData = await db.transaction.create({
      data: {
        text,
        amount,
        userId
      }
    })

    revalidatePath('/')
    return { data: transactionData }
  } catch (error) {
    return { error: "Transaction not added." }
  }

}

export default addTransaction;