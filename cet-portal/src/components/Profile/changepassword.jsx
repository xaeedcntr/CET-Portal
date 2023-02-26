import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

const Changepassword =()=>{

    const [newPassword, setNewpassword]=useState('');
    const [oldPassword, setOldpassword]=useState('');
    return (
        <Container py={'16'} minH={'90vh'}>
            
            <form>
                <Heading children="Change Your password"
                 my='16'
                  textTransform={'uppercase'}
                  textAlign={['center','left']} />

                  <VStack spacing={'8'}>
                  
            <Input style={{width:"100%"}}
            required
            focusBorderColor='purple.900'
            value={oldPassword}
            onChange={e => setOldpassword(e.target.value)}
            placeholder="Old Password Here"
            type={'password'}
          />

<Input style={{width:"100%"}}
            required
            focusBorderColor='purple.900'
            value={newPassword}
            onChange={e => setNewpassword(e.target.value)}
            placeholder="New Password Here"
            type={'password'}
          />

          <Button width={'full' } colorScheme={'yellow'} type="submit">Change</Button>

                  </VStack>
            </form>
        </Container>
    );
}

export default Changepassword;