import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Modal, Button, Form } from 'react-bootstrap';
import { UPDATE_EXPENSE } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { QUERY_EXPENSE } from '../../utils/queries';

const UpdateForm = ({ expenseId }) => {
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState();
    const [expenseDescription, setExpenseDescription] = useState('');
    const [nameError, setNameError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [onUpShow, setOnUpShow] = useState(false);
    const [updateExpense, { error }] = useMutation(UPDATE_EXPENSE);

    const { loading, data } = useQuery(QUERY_EXPENSE, {
        variables: { expenseId: expenseId },
    });

    const getExpenses = (expenseId) => {
        let expense = data?.expense || {};
        if (!loading) {
            setExpenseName(expense.name);
            setExpenseAmount(expense.amount);
            setExpenseDescription(expense.description);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await updateExpense({
                variables: {
                    name: expenseName,
                    amount: parseInt(expenseAmount),
                    description: expenseDescription,
                    expenseId: expenseId
                },
            });
            setExpenseName('');
            setExpenseAmount('');
            setExpenseDescription('');
            setNameError('');
            setAmountError('');
            setDescriptionError('');
            setOnUpShow(false)
            window.location.reload();
        } catch (err) {
            setNameError('');
            setAmountError('');
            setDescriptionError('');
            if (!expenseName) {
                setNameError('Expense name is required!')
            }
            if (!expenseAmount) {
                setAmountError('Expense amount is required!')
            } else if (typeof expenseAmount.value !== 'number') {
                setAmountError('Expense amount must be a number!')
            }
            if (!expenseDescription) {
                setDescriptionError('Expense description is required!')
            } else if (expenseDescription.length > 280) {
                setDescriptionError('Expense description cannot exceed 280 characters!')
            }
            console.error(err);
        }
    };


    const handleChange = (event) => {
        let { name, value } = event.target;

        if (name === 'amount') {
            setExpenseAmount(value)
        }

        if (name === 'name') {
            setExpenseName(value);
        }
        if (name === 'description') {
            setExpenseDescription(value);
        }
    };

    return (
        <div>
            <Button style={{ border: "solid #DF20BA 2px", backgroundColor: "black" }} onClick={() => { setOnUpShow(!onUpShow); getExpenses(expenseId) }}>
                <div className='budget-btn'>Update Expense</div>
            </Button>
            {
                Auth.loggedIn() ? (
                    <>
                        <Modal show={onUpShow} onHide={() => setOnUpShow(false)} role="dialog">
                            <Form onSubmit={handleFormSubmit}>
                                <Modal.Header style={{ backgroundColor: "#DFA420", border: "solid 2px #DF20BA" }} closeButton>
                                    <Modal.Title style={{ color: "#DF20BA" }}>Update Expense</Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{ backgroundColor: "black", border: "solid 2px #DF20BA", borderRadius: "5px" }}>
                                    <textarea
                                        name="name"
                                        placeholder="Name of expense"
                                        value={expenseName}
                                        className="form-input w-100"
                                        style={{ lineHeight: '1.5', resize: 'vertical' }}
                                        onChange={handleChange}
                                    ></textarea>
                                    <p style={{ color: "#DFA420" }}>{nameError}</p>

                                    <textarea
                                        name="amount"
                                        placeholder="amount of expense"
                                        value={expenseAmount}
                                        className="form-input w-100"
                                        style={{ lineHeight: '1.5', resize: 'vertical' }}
                                        onChange={handleChange}
                                    ></textarea>
                                    <p style={{ color: "#DFA420" }}>{amountError}</p>

                                    <textarea
                                        name="description"
                                        placeholder="description of expense"
                                        value={expenseDescription}
                                        className="form-input w-100"
                                        style={{ lineHeight: '1.5', resize: 'vertical' }}
                                        onChange={handleChange}
                                    ></textarea>
                                    <p style={{ color: "#DFA420" }}>{descriptionError}</p>

                                    <div className='d-flex justify-content-end'>
                                        <Button style={{ border: "solid #DF20BA 2px", backgroundColor: "black" }} type='submit' >
                                            <div className='budget-btn'>Update</div>
                                        </Button>
                                    </div>
                                </Modal.Body>
                            </Form>
                        </Modal>
                    </>
                ) : (
                    <p>
                        You need to be logged in to see your expenses. Please{' '}
                        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                    </p>
                )
            }
        </div >
    );

};

export default UpdateForm;