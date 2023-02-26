import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Request=()=>{
   
   
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [course,setCourse]=useState('');

    return(
       <Container h="90vh" >

        <VStack h={"full"} spacing="16" justifyContent={"center"} >

<Heading children="Request For New Course" />

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
          <FormLabel htmlFor="course" children="Course Details" />
          <Textarea style={{width:"100%"}}
            required
            id="course"
            focusBorderColor='purple.900'
            value={course}
            onChange={e => setCourse(e.target.value)}
            placeholder="Explain Course details you needed ...."
            type={'text'}
          />
          </Box>
         
   
<Button my="4" colorScheme={'yellow'} type="submit">Send Message</Button>
      

       <Box my="4">
        See Availble Courses{' '}
        <Link to="/courses">
            <Button colorScheme={'green'} variant='link'>Click Here</Button>{' '} Here
        </Link>
        </Box>
        </form>

        </VStack>

       </Container>
    );
}


export default Request;