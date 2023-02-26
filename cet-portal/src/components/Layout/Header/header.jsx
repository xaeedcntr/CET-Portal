import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import {useSelector} from "react-redux"
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';



const LinkButton =({url="/",title="Home", onClose})=>(
 <Link onClick={onClose} to={url}>
  <Button variant={'ghost'}>{title}</Button>
  </Link>
);

const Header = (isauthenticated=false,user) => {

    const {isOpen,onOpen,onClose}=useDisclosure();

   

    const logouthandler=()=>{
      console.log("Logout");
      onClose();
      };

   
  
  return (
    <>
      <ColorModeSwitcher />

      <Button
      zIndex={'overlay'}
      onClick={onOpen}
        colorScheme={'blue'}
        width="12"
        height={'12'}
        rounded="full"
        position={'fixed'}
        top="6"
        left="6"
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={'blur(3px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>CET Portal</DrawerHeader>
          <DrawerBody>
            <VStack spacing={"4"} alignItems='flex-start' >
             <LinkButton onClose={onClose} url="/" title="Home" />
             <LinkButton onClose={onClose} url="/courses" title="ALL Courses" />
             <LinkButton onClose={onClose} url="/request" title="Request A Course" />
             <LinkButton onClose={onClose} url="/contactus" title="Contact Us" />
             <LinkButton onClose={onClose} url="/about" title="About" />

             <HStack justifyContent={'space-evenly'}
              position={'absolute'} bottom={'2rem'} width="80%">
                {isauthenticated?(
                <>
                <VStack>
                  <HStack>
                  <Link onClick={onClose} to="/profile">
                  <Button variant={'ghost'} colorScheme={'yellow'}>Profile</Button>
                  </Link>
                  <Button variant={'ghost'} onClick={logouthandler}><RiLogoutBoxLine/>Logout</Button>
                 
                  </HStack>
                  {
              user && user.role==="admin" && (
              <Link onClick={onClose} to="/admin/dashboard">
                <Button colorScheme={'purple'} variant='ghost'>
                  <RiDashboardFill  style={{margin:"4px"}}/>
                  DashBoard
                </Button>
              </Link>)
             }

                </VStack>
                </>
                ):(
                <>
                <Link onClick={onClose} to="/login">
                  <Button colorScheme={'yellow'}>Login</Button>
                  </Link>

                  <p>Or</p>

                  <Link onClick={onClose} to="/signup">
                  <Button colorScheme={'yellow'}>Register</Button>
                  </Link>
                  
                  </>
                  )}
 
             </HStack>
            
          

            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;


