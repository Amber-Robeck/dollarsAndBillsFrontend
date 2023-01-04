import React from 'react'
import { Stack, Card, Button, Container } from 'react-bootstrap'
import { QUERY_BUDGET } from '../utils/queries';
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Auth from '../utils/auth'
import { REMOVE_BUDGET } from '../utils/mutations';
import { ExpensesGraph } from "./graph";
import ExpenseForm from "../components/ExpenseForm"
import UpdateForm from '../components/UpdateForm';

const Budget = () => {

    const [removeBudget, { error }] = useMutation(REMOVE_BUDGET)

    const handleRemoveBudget = async (budgetId) => {
        try {
            const { data } = await removeBudget({
                variables: { budgetId },
            });
            return data;
        } catch (err) {
            console.error(err);
            console.error(error);
        }
        window.location.replace("/")
    }

    const { budgetId } = useParams();
    const { loading, data } = useQuery(QUERY_BUDGET, {
        variables: { budgetId: budgetId },
    });
    const budget = data?.budget || {};
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {
                Auth.loggedIn() ? (

                    <Container className='my-4'>
                        <Stack direction='horizontal' gap='3' className='mb-4'>
                            <h1 className="me-auto log-text">{budget.name}</h1>
                            <div className='d-flex justify-content-end'>
                                <ExpenseForm budgetId={budgetId}></ExpenseForm>
                                <Button
                                    id="log-button"
                                    style={{ border: "solid #DF20BA 2px", backgroundColor: "black" }}
                                    type='submit'
                                    onClick={() => handleRemoveBudget(budget._id)}>
                                    <div className='budget-btn'>Delete Budget</div>
                                </Button>
                            </div>
                        </Stack>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 2fr))', gap: '2rem', alignItems: 'flex-start', justifyContent: "space-around" }}>
                            {budget &&
                                budget.expenses.map((expense) => (
                                    <Card className='me-2' key={expense._id}>
                                        <Card.Body>
                                            <Card.Title className='d-flex justify-content-center align-items-baseline fw-normal mb-3'>
                                                <div className='me-2 d-flex'>{expense.name} - ${expense.amount}</div>
                                            </Card.Title>
                                            <UpdateForm expenseId={expense._id}></UpdateForm>
                                        </Card.Body>
                                    </Card>
                                ))} </div>
                        <ExpensesGraph budget={budget} />
                    </Container>
                ) : (
                    <p>
                        You need to be logged in see your budgets. Please
                        &nbsp;<Link to="/login" style={{ color: "#DF20BA", }}>login</Link>&nbsp;or&nbsp;
                        <Link to="/signup" style={{ color: "#DF20BA", }}>signup.</Link>
                    </p>
                )
            }
        </>
    )
}

export default Budget
