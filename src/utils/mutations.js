import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BUDGET = gql`
mutation addBudget(
$name: String!
 $amount: Int! 
 ) {
  addBudget(
    name: $name 
    amount: $amount
    ) {
    name
    amount
  }
}
`;

export const ADD_EXPENSE = gql`
mutation addExpense(
$budgetId: ID!
$name: String!
 $amount: Int!
 $description: String! 
 ) {
  addExpense(
    name: $name 
    amount: $amount
    description: $description
    budgetId: $budgetId
    ) {
    name
    amount
    description
  }
}
`;

export const REMOVE_EXPENSE = gql`
  mutation removeExpense($expenseId: ID!) {
    removeExpense(expenseId: $expenseId) {
      _id
      name
      amount
      description
    }
  }
`;

export const REMOVE_BUDGET = gql`
mutation removeBudget($budgetId: ID!) {
  removeBudget(budgetId: $budgetId) {
    _id
    name
  }
}`

export const UPDATE_EXPENSE = gql`
mutation updateExpense(
  $name: String!
   $amount: Int!
   $description: String!
    $expenseId: ID!
   ) {
    updateExpense(
      name: $name
      amount: $amount
      description: $description
      expenseId: $expenseId
      ) {
      name
      amount
      description
    }
  }`