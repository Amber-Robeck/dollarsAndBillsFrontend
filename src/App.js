import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Budget from './pages/Budget';
import Nav from './components/Nav';
// import { BudgetProvider } from './utils/BudgetContext';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import "./App.css";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});

const httpLink = createHttpLink({
  uri: 'https://dollarsandbillsbackend.onrender.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='app'>
          <Nav />
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/budget/:budgetId"
              element={< Budget />}
            />
            <Route
              path="*"
              element={<Login />}
            />
          </Routes>
        </div>
      </Router>

    </ApolloProvider>
  );
}

export default App;