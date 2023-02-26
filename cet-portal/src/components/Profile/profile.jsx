import { Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Avatar, Button, Container, Heading, HStack, Image, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import {Link} from "react-router-dom";
import ci from "../../assets/images/Home/image-1.jpg"
import { fileuploadcss } from '../Auth/signup';

const Profile = () => {

    //Dummy user data, will be replaced by dynamic data in future.
    const user = {
        name:"Saeed", email:"adscd@gmail.com", 
        joinedon:String(new Date().toISOString()),
        role:"user",
        enrolledcourses:[
            {course:"mern",imageurl:ci}
        ]
    };

    const removefromenrollmenthandler=id=>{
        console.log(id);
    }

    const changeImagesubmitHander =(e,image)=>{
        e.preventDefault();
        console.log(image);
    };

    const {isOpen,onClose,onOpen}=useDisclosure();
  return (
    <Container minH={'95vh'} maxW="container.lg" py={'8'}>
      <Heading children="Profile" m="8" textTransform={'uppercase'} />

      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={'center'}
        spacing={['8', '16']}
        padding="8"
      >
        <VStack>
            <Avatar boxSize={'48'} />
            <Button onClick={onOpen} colorScheme={'orange'} variant={'ghost'}>Change Profile Image</Button>
        </VStack>
        <VStack spacing={'4'} alignItems={["center",'flex-start']}>
            <HStack>
                <Text children="Name" fontWeight={'bold'}/>
                <Text children={user.name} fontWeight={'bold'}/>
            </HStack>
            <HStack>
                <Text children="Email" fontWeight={'bold'}/>
                <Text children={user.email} fontWeight={'bold'}/>
            </HStack>
            <HStack>
                <Text children="Joined on" fontWeight={'bold'}/>
                <Text children={user.joinedon.split('T')[0]} fontWeight={'bold'}/>
            </HStack>
   
            <Stack direction={['column','row']} alignItems='center'>
               <Link to="/updateprofile">
                <Button>
                    Update Profile
                </Button>
               </Link>
               <Link to="/changepassword">
                <Button>
                    Update Password
                </Button>
               </Link>

            </Stack>
        </VStack>
      </Stack>

      <Heading children="Enrolled Courses"/>
{
    user.enrolledcourses.length>0 && (
        <Stack direction={["column","row"]}
         alignItems="center" flexWrap={'wrap'} padding='4'>

            {
                user.enrolledcourses.map((item,index)=>(
                    <VStack w="48" m="2" key={item.course}>
                        <Image boxSize={"full"} 
                        objectFit="contain" src={item.imageurl}
                        />

                        <HStack>
                            <Link to={`/course/${item.course}`}>
                                <Button variant={'ghost'} colorScheme="yellow">Watch Now</Button>

                            </Link>

                            <Button onClick={()=>removefromenrollmenthandler(item.course)}>
                                <RiDeleteBin7Fill/>
                            </Button>

                        </HStack>
                    </VStack>
                ))
            }
        </Stack>
    )
}

<ChangeProfile changeImagesubmitHander={changeImagesubmitHander}  isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export default Profile;

function ChangeProfile({isOpen,onClose,changeImagesubmitHander}){

    const changeImage=(e)=>{
        const file=e.target.files[0];
        const read = new FileReader();
        read.readAsDataURL(file);
        read.onload=()=>{
            setImagepreview(read.result);
            setImage(file);
        };
    };
const closehandler=()=>{
    onClose();
    setImagepreview('');
    setImage(''); 
}
    const [Image , setImage]=useState('');
    const [Imagepreview, setImagepreview]=useState('');
return(
    <Modal isOpen={isOpen} onClose={closehandler}>
      <ModalOverlay backdropFilter={'blur(9px)'}/>
      <ModalContent>
        <ModalHeader>
            Change Image
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
            <Container>
                <form onSubmit={(e)=>changeImagesubmitHander(e,Image)}>
                    <VStack spacing={'8'}>
                      {Imagepreview &&  <Avatar src={Imagepreview} boxSize={'48'}/>}
                        <input onChange={changeImage} type="file" css={{"&::file-selector-button":fileuploadcss}}/>
<Button width={'full'} type="submit" colorScheme={'yellow'}>Change</Button>
                    </VStack>
                </form>
            </Container>
        </ModalBody>
        <Button onClick={closehandler} mr={'3'}>Cancel</Button>
       < ModalFooter>
       </ModalFooter>
      </ModalContent>
    </Modal>
)
}