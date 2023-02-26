import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

const Updateprofile =()=>{
const [name,setName]=useState('');
const [email,setEmail]=useState('');
   
    return (
        <Container py={'16'} minH={'90vh'}>
            
            <form>
                <Heading children="Update Profile"
                 my='16'
                  textTransform={'uppercase'}
                  textAlign={['center','left']} />

                  <VStack spacing={'8'}>
                  
            <Input style={{width:"100%"}}
            
            focusBorderColor='purple.900'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name Here"
            type={'text'}
          />

<Input style={{width:"100%"}}
            
            focusBorderColor='purple.900'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email Here"
            type={'email'}
          />



          <Button width={'full' } colorScheme={'yellow'} type="submit">Change</Button>

                  </VStack>
            </form>
        </Container>
    );
}

export default Updateprofile;