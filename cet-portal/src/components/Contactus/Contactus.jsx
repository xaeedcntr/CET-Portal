import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contactus=()=>{
   
   
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [message,setMessage]=useState('');

    return(
       <Container h="90vh" >

        <VStack h={"full"} spacing="16" justifyContent={"center"} >

<Heading children="Contact us" />

<form style={{width:"100%"}} >


<Box marginY={"4"}>
          <FormLabel htmlFor="name" children="Enter Name" />
          <Input style={{width:"100%"}}
            required
            id="name"
            focusBorderColor='purple.900'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Abcd"
            type={'text'}
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
          <Box marginY={"4"}>
          <FormLabel htmlFor="message" children="Enter your message" />
          <Textarea style={{width:"100%"}}
            required
            id="message"
            focusBorderColor='purple.900'
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="type Your Message here ...."
            type={'text'}
          />
          </Box>
         
   
<Button my="4" colorScheme={'yellow'} type="submit">Send Message</Button>
      

       <Box my="4">
        Request For A Course{' '}
        <Link to="/request">
            <Button colorScheme={'green'} variant='link'>Click Here</Button>{' '} Here
        </Link>
        </Box>
        </form>

        </VStack>

       </Container>
    );
}

export default Contactus