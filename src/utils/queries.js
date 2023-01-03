import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      budgets {
        _id
        name
        amount
        expenses {
          _id
          name
          amount
          description
        }
      }
    }
  }
`;

export const QUERY_BUDGETS = gql`
  query budgets {
    budgets {
        _id
        name
        amount
        expenses {
            _id
            name
            amount
            description
        }
    }
  }
`;

export const QUERY_BUDGET = gql`
  query budget($budgetId: ID!) {
    budget(budgetId: $budgetId) {
        _id
        name
        amount
        expenses {
            _id
            name
            amount
            description
        }
    }
  }
`;

export const QUERY_EXPENSES = gql`
    query expenses {
        expenses {
            _id
            name
            amount
            description
            userId{
              username
            }
        }
    }
`;

export const QUERY_EXPENSE = gql`
    query expense($expenseId: ID!) {
        expense(expenseId: $expenseId) {
            _id
            name
            amount
            description
            userId{
              username
            }
        }
    }
`;
