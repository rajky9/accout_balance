"use client"

import addTransaction from "@/actions/addTransaction"
import { Transaction } from "@prisma/client"
import { FormEvent, useRef, useState } from "react"
import { toast } from "react-toastify"

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAction = async (event: FormEvent) => {
    setIsLoading(true)
    event.preventDefault();
    const formData = new FormData(formRef.current!)
    try {
      const { error } = await addTransaction(formData)

      if (error) {
        toast.error(error, {
          position: "bottom-right"
        })
      } else {
        toast.success('Transaction added',
          {
            position: "bottom-right"
          }
        );
        formRef.current?.reset();
      }
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h3>Add transaction</h3>
      <form ref={formRef} onSubmit={handleAction} >
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            name="text"
            placeholder="Enter text..."
            id="text"
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount..."
            step="0.01"
            id="amount"
          />
        </div>
        <button className="btn" type="submit" disabled={isLoading}>Add transaction</button>
      </form>
    </>

  );
}

export default AddTransaction;