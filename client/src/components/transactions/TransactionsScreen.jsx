import React from "react";
import { useDispatch, useSelector  } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import { startCreatingTransaction } from "../../actions/transactions";
import { useForm } from "../../hooks/useForm";
import { Navbar } from "../navbar/Navbar";


export const TransactionsScreen = () => {
  
  const { user, balance } = useSelector(state => state.auth)

  const { id } = useSelector(state => state.auth);
  const { lastTransaction } = useSelector(state => state.transactions);

  const dispatch = useDispatch();
  
  const [ transactionValues, handleInputChange ] = useForm({
    amount: '',
    userFrom: '',
    userTo: ''
  });

  let { amount, userFrom, userTo } = transactionValues;
  


  const transactionSubmit = async(e) => {
    e.preventDefault();
    
    amount = Number(amount);

    if (userTo !== id) {
      return Swal.fire('Error', 'Wrong User ID', 'error')
    }

    if (userFrom === id) {
      return Swal.fire('Error', 'You can not make a transaction to yourself', 'error')
    }


    if (userTo === undefined || userFrom === undefined || amount === undefined) {
      return Swal.fire('Error', 'Please complete all the fields', 'error')
    }

    dispatch(startCreatingTransaction(amount, userFrom, userTo));

    console.log(lastTransaction);
  }


  return (
    <div>
      <Navbar />

      <Container>
        <SideContainer>
           <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
            
            {
              (lastTransaction !== {}) 
              && 
              <div>
                <MoneyBalance>
                  Your balance:
                  #{ (!lastTransaction.amountLess)	? balance : lastTransaction.amountLess}
                </MoneyBalance>
              
                  <SubTitle>Last Transaction</SubTitle>
            
                  <SubTitle style={{marginBottom: '20px'}}>Amount Transfered:</SubTitle>
                  <div>{lastTransaction.amount}</div>
                  
                  
                  <SubTitle style={{marginBottom: '20px'}}>Sender ID:</SubTitle>
                  <div>{lastTransaction.userTo}</div>
                  
                  
                  <SubTitle style={{marginBottom: '20px'}}>Beneficiary ID:</SubTitle>
                  <div>{lastTransaction.userFrom}</div>
              </div>
            
            }
           </div>
        </SideContainer>

        <SideContainer>
          <SubTitle>Make a transaction</SubTitle>

          <Paragraph>Your ID: { id }</Paragraph>

          <FormTag onSubmit={ transactionSubmit }>
            <CustomInput 
              placeholder='Amount' 
              name='amount'
              value={ amount }
              onChange={ handleInputChange }
            />


            <CustomInput 
              placeholder='Sender ID' 
              name='userTo'
              value={ userTo }
              onChange={ handleInputChange }
            />
 
            <CustomInput 
              placeholder='Beneficiary ID' 
              name='userFrom'
              value={ userFrom }
              onChange={ handleInputChange }
            />

            <SubmitInputContainer>
              <SubmitInput type="submit" />
            </SubmitInputContainer>

          </FormTag>
        </SideContainer>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
`;

const SideContainer = styled.div`
  width: 50%;
`;

const SubTitle = styled.h2`
  margin-top: 70px;
  margin-bottom: 40px;
  font-weight: normal;
  font-size: 26px;
  text-align: ${(props) => props.alignment || "left"};
`;

const Paragraph = styled.p`
  font-size: 24px;
  margin-bottom: 30px;
`;

const CenterInput = styled.div`
  display: flex;
  justify-content: center;
`;

const FormTag = styled.form``;

const CustomInput = styled.input`
  width: 60%;
  padding: 20px;
  border: none;
  background-color: #f0f0f0;
  font-size: 16px;
  color: #444;
  margin-bottom: 20px;

  &:focus {
    outline: none;
  }
`;

const SubmitInputContainer = styled.div`
		width: 64%;
		display: flex;
		justify-content: center;
`;

const SubmitInput = styled.input`
  padding: 18px 60px;
  font-size: 20px;
  border: none;
  background-color: #2980b9;
  color: white;
  border-radius: 5px;

  &:hover {
    background-color: #3188c1;
    cursor: pointer;
  }
`;

const MoneyBalance = styled.h2`
	color: black;
  font-size: 24px;
	padding-top: 30px;
	padding-left: 50px;

`;