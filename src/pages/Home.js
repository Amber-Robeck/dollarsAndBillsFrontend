import React from "react";
import { Stack } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import BudgetCard from '../components/BudgetCard';
import { QUERY_USER } from '../utils/queries';
import { useQuery } from "@apollo/client";
import Auth1 from '../utils/auth';
import BudgetForm from '../components/BudgetForm'
import { Link } from 'react-router-dom';
import Auth from '../utils/auth'

const Home = () => {
    const userName = Auth1.getUsername();
    const { loading, data } = useQuery(QUERY_USER, { variables: { username: userName } });
    let user;

    if (data) {
        user = data.user;
    }

    const budgets = user?.budgets || [];
    return (
        <>
            {
                Auth.loggedIn() ? (
                    <Container className='my-4 background'>
                        <Stack direction='horizontal' gap='3' className='mb-4'>
                            <h1 className="me-auto budget-header">Budgets</h1>
                            <BudgetForm></BudgetForm>
                        </Stack>
                        <div style={{ display: 'grid', gridTemplateRows: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', }}>
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                <div className="budgetCard">
                                    <BudgetCard style={{ color: "#DF20BA" }} budgets={budgets} now={0} />
                                </div>
                            )}
                        </div>
                        <div className='d-flex align-items-baseline' style={{ color: "#DF20BA", fontSize: "36px" }}>Budgets Total: ${budgets.map(budget => budget.amount).reduce((prev, curr) => prev + curr, 0)}
                        </div>
                    </Container>
                ) : (
                    <>
                        <p className="budget-text">
                            You need to be logged in see your budgets. Please
                            &nbsp;<Link to="/login" style={{ color: "#DF20BA", }}>login</Link>&nbsp;or&nbsp;
                            <Link to="/signup" style={{ color: "#DF20BA", }}>signup.</Link>
                        </p>
                        <div id="bigLogo">
                            <img className="image1"
                                src="assets/dollars_and_bills_DT.png"
                                alt="logo">
                            </img>
                        </div>
                    </>
                )
            }
        </>
    )
}
export default Home
