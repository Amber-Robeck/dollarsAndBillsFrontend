import React, { useContext, useState } from 'react';

const BudgetContext = React.createContext()
export function useBudgets() {
    return useContext(BudgetContext)
}

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addBudget({ name, amount }) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets;
            }
            return [...prevBudgets, { name, amount }]
        })
    }

    function addExpense({ name, amount, budgetId }) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { name, amount, budgetId }]
        })
    }

    function deleteBudget({ id }) {
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget._id !== id)
        })
    }

    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense._id !== id)
        })
    }

    return (
        <BudgetContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addBudget,
            addExpense,
            deleteBudget,
            deleteExpense,
            useBudgets
        }}>
            {children}
        </BudgetContext.Provider>
    )
}