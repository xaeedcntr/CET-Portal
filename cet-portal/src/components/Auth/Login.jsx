import {

  Input,
  Container,
  FormLabel,
  Heading,
  VStack,
  Box,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/action/useraction';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const dispatch= useDispatch();

  const submitHandler=(e)=>{

    e.preventDefault();
    dispatch(login(email,password));

  }

  return (
 <Container h={'95vh'}>
      <VStack h={'full'} spacing="16" justifyContent="center">
        <Heading children="Welcome To CET-Portal" />

        <form onSubmit={submitHandler} style={{width:"100%"}} >
          <Box marginY={"4"}>
          <FormLabel htmlFor="email" children="Enter Email-Address" />
          <Input style={{width:"100%"}}
            required
            id="email"
            focusBorderColor='purple.900'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="xyz@gamil.com"
            type={'email'}
          />
           <FormLabel htmlFor="password" children="Enter Password" />
          <Input style={{width:"100%"}}
            required
            id="password"
            focusBorderColor='purple.900'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password Here"
            type={'password'}
          />
          </Box>
          <Box>

<Link to="/forgetpassword">
    <Button variant={'solid'} fontSize={'sm'}>Forget Password</Button>
</Link>

</Box>
<Button my="4" colorScheme={'yellow'} type="submit">Log in</Button>
       <Box my="4">
        New user{' '}
        <Link to="/signup">
            <Button colorScheme={'green'} variant='link'>Signup</Button>{' '} Here
        </Link>
        </Box>
        </form>

       
        
      </VStack>
    
 </Container>
  );
};

export default Login;
