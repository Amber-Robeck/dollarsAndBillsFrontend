import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import "../App.css"
ChartJS.register(ArcElement, Tooltip, Legend);

export function ExpensesGraph({ budget }) {
  let name
  let amount
  const backgroundArr = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ]
  const borderArr = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ]

  if (budget.expenses.length === 0) {
    name = ["Total budget"]
    amount = [budget.amount]

    const graphData = {
      labels: name,
      datasets: [
        {
          label: '# of Expenses',
          data: amount,
          backgroundColor: backgroundArr,
          borderColor: borderArr,
          borderWidth: 1,
        },
      ],
    };


    return (<div className='graph'><Doughnut data={graphData} /></div>)

  } else {

    let sum = budget.expenses.map(expense => expense.amount)
    let remaining = budget.amount - sum.reduce((a, b) => a + b)
    let name = budget.expenses.map(expense => expense.name)
    name.push("Remaining budget")
    let amount = budget.expenses.map(expense => expense.amount)
    amount.push(remaining)


    const graphData = {
      labels: name,
      datasets: [
        {
          label: '# of Expenses',
          data: amount,
          backgroundColor: backgroundArr,
          borderColor: borderArr,
          borderWidth: 1,
        },
      ],
    };


    return (<div className='graph'><Doughnut data={graphData} /></div>);
  }
}
