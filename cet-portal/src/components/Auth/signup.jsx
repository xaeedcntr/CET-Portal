import {
    Center,
    Input,
    Container,
    FormLabel,
    Heading,
    VStack,
    Box,
    Button,
    Avatar,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  

 export const fileuploadcss={
    
        cursor:"pointer", marginLeft:"-5%",width:"110%",
        border:"none",height:"100%", 
        color:"#ECC94B", backgroundColor:"white",
       
  }

  const fileuploadstyle ={
   "&::file-selector-button": fileuploadcss,
  };
  
  const Signup = () => {


    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [imagepreview, setImagepreview] = useState('');
  
    const changeFilehandler=(e)=>{
        const file=e.target.files[0];
        const read = new FileReader();
        read.readAsDataURL(file);
        read.onload=()=>{
            setImagepreview(read.result);
            setImage(file);
        };
    };
    return (
   <Container h={'95vh'}>
        <VStack h={'full'} spacing="16" justifyContent="center">
          <Heading textTransform={'uppercase'} children="Sign-Up" />
  
          <form style={{width:"100%"}} >

          <Box marginY={"4"} display="flex" justifyContent={'center'}>
           <Avatar src={imagepreview} size={'2xl'}/>
            </Box>

          <Box marginY={"4"}>
            <FormLabel htmlFor="name" children="Name" />
            <Input style={{width:"100%"}}
              required
              id="name"
              focusBorderColor='purple.900'
              value={name}
              onChange={e => setEmail(e.target.value)}
              placeholder="Abcd"
              type={"text"}
            />
            </Box>

           

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
            </Box>

            <Box>
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
             <FormLabel htmlFor="choseAvatar" children="Chose Avatar" />
            <Input style={{width:"100%"}}
              required
              accept='image/*'
              id="choseavatar"
              focusBorderColor='purple.900'
              css={fileuploadstyle}
              type={'file'}
              onChange={changeFilehandler}
            />
            </Box>

            <Box>


            </Box>
         <Button my="4" colorScheme={'yellow'} type="submit">Sign-up</Button>
         <Box my="4">
          Already Have Account?{' '}
          <Link to="/login">
              <Button colorScheme={'green'} variant='link'>Signin</Button>{' '} Here
          </Link>
          </Box>
          </form>
  
         
          
        </VStack>
      
   </Container>
    );
  };
  
  export default Signup