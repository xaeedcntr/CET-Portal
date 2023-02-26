import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import {Link} from "react-router-dom";
import sd from '../../assets/images/Team/sd.png';
import muqeet from '../../assets/images/Team/muqeet.png';
import saad from '../../assets/images/Team/sad.png';
import tayab from '../../assets/images/Team/tayab.jpg';
import termsAndCondition from "../../assets/docs/termsAndconditons";

import introvideo from "../../assets/videos/intro.mp4"

const Member1 = () => (
  <Stack direction={['column', 'row']} spacing={['4', '16']} padding="8">
    <VStack>
      <Avatar src={sd} boxSize={['40', '48']} />
      <Text children="Member" opacity={'0.7'} />
    </VStack>
    <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
      <Heading children="Saeed Anwar" />
      <Text
        textAlign={['center', 'left']}
        children="hi , i am a Trainee MERN Stack Developer At Contour software"
        opacity={'0.7'}
      />
    </VStack>
  </Stack>
);

const Member2 = () => (
  <Stack direction={['column', 'row']} spacing={['4', '16']} padding="8">
    <VStack>
      <Avatar src={muqeet} boxSize={['40', '48']} />
      <Text children="Member" opacity={'0.7'} />
    </VStack>
    <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
      <Heading children="Abdul Muqeet" />
      <Text
        textAlign={['center', 'left']}
        children="hi , i am a Trainee MERN Stack Developer At Contour software"
        opacity={'0.7'}
      />
    </VStack>
  </Stack>
);

const Member3 = () => (
  <Stack direction={['column', 'row']} spacing={['4', '16']} padding="8">
    <VStack>
      <Avatar src={saad} boxSize={['40', '48']} />
      <Text children="Member" opacity={'0.7'} />
    </VStack>
    <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
      <Heading children="Saad Bin Arif" />
      <Text
        textAlign={['center', 'left']}
        children="hi , i am a Trainee MERN Stack Developer At Contour software"
        opacity={'0.7'}
      />
    </VStack>
  </Stack>
);

const Member4 = () => (
  <Stack direction={['column', 'row']} spacing={['4', '16']} padding="8">
    <VStack>
      <Avatar src={tayab} boxSize={['40', '48']} />
      <Text children="Member" opacity={'0.7'} />
    </VStack>
    <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
      <Heading children="Muhammad tayab" />
      <Text
        textAlign={['center', 'left']}
        children="hi , i am a Trainee MERN Stack Developer At Contour software"
        opacity={'0.7'}
      />
    </VStack>
  </Stack>
);

//TandC stands for Terms and conditions
const TandC =({termsAndCondition})=>(

    <Box>
        <Heading m={'4'} size={'md'} textAlign={["center","left"]}  children="Terms And Conditions"></Heading>
        <Box overflowY={'scroll'} h="sm" p="4">
          <Text fontFamily={'heading'} letterSpacing={'widest'} textAlign={["center","left"]}>
            {termsAndCondition} 
          </Text>
        </Box>
    </Box>
);
const About = () => {
  return (
    <Container maxWidth={'container.lg'} padding="16" boxShadow={'lg'}>
      <Heading children="About Us" textAlign={['center', 'left']} />
      <Member1 />
      <Member2 />
      <Member3 />
      <Member4 />
      <Stack margin="8" direction={['column', 'row']} alignItems="center">
        <Text fontFamily={'cursive'} margin='8' textAlign={"justify"}>Welcome to our cutting-edge courses portal, designed to enhance your professional skills and knowledge. Our platform offers a diverse range of courses taught by industry experts to help you reach your goals. Don't wait any longer, enroll now and start your journey towards personal and professional growth</Text>

        <Link to="/courses">
            <Button variant={'ghost'} colorScheme={'yellow'}>Apply for Enrollment Now</Button>
            
        </Link>
      </Stack>

      <Box>
    <video autoPlay muted loop 
controlsList="nodownload nofullscreen noremoteplayback" 
disablePictureInPicture

disableRemotePlayback
src={introvideo}
></video>
</Box>

    <TandC termsAndCondition={(termsAndCondition)}/>

    </Container>
  );
};
export default About;
