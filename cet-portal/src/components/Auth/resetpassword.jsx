import { Box, Button, Container, FormLabel, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Resetpassword=()=>{
    
    const [password,setPassword]=useState('');

    const params= useParams();

    console.log(params.token);

    
    return(
<Container padding={'16'} height="90vh">

<form>

<Heading children="Reset Passowrd" 
my="16" textTransform={"uppercase"}
textAlign={["center","left"]}
/>

<VStack spacing={'8'}>

 <Box marginY={"4"}>
            <FormLabel htmlFor="password" children="Enter New Password" />
            <Input style={{width:"100%"}}
              required
              id="password"
              focusBorderColor='purple.900'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="New Password Here"
              type={'password'}
            />
            </Box>
           <Button type="submit" w={"full"} colorScheme="orange">Reset Password</Button>
</VStack>

</form>

</Container>
    );
}

export default Resetpassword;