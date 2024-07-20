import getincomeExpense from "@/actions/getIncomeExpense";


const IncomeExpense = async () => {
  const { income, expense } = await getincomeExpense();

  return (<>
    <div className="inc-exp-container">
      <div className="money plus">
        ${income}
      </div>
      <div className="money minus">
        ${expense}
      </div>
    </div>
  </>);
}

export default IncomeExpense;