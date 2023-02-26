import { Box, Button, Container, FormLabel, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

const Forgetpassword=()=>{
    
    const [email,setEmail]=useState('');

    return(
<Container padding={'16'} height="90vh">

<form>

<Heading children="Forget Password" 
my="16" textTransform={"uppercase"}
textAlign={["center","left"]}
/>

<VStack spacing={'8'}>

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

           <Button type="submit" w={"full"} colorScheme="orange">Send Reset Link</Button>

</VStack>

</form>

</Container>
    );
}

export default Forgetpassword;