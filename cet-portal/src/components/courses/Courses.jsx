import React, { useState } from "react";
import {Link} from "react-router-dom"
import {Button, Container, Heading, HStack, Image, Input, Stack, Text, VStack} from '@chakra-ui/react'
import bg from "../../assets/images/Home/image-1.jpg"
const Course=({views,title,id,imagesrc,addtoplaylisthandler,
    creater,description,lecture})=>{
    return(
  <VStack className="course" alignItems={["center","flex-start"]}>
   
   <Image src={imagesrc} boxSize="60" objectFit={"contain"}/>
   
   <Heading textAlign={["center","left"]} maxW="200px"
   
   fontFamily={"sans-sarif"} noOfLines={3} children={title} />
  
  <Text children={description} noOfLines={2} />
   
   <HStack>

   <Text textTransform={'uppercase'} children="creater" fontWeight={'bold'} />

   <Text fontFamily={'body'} children={creater} noOfLines={2} textTransform="uppercase" />

   </HStack>

   <Heading textAlign={"center"} 
   size="xs"
   children={`Lectures-${lecture}`}
   textTransform="uppercase"
   />

<Heading textAlign={"center"} 
   size="xs"
   children={`Views-${views}`}
   textTransform="uppercase"
   />

   <Stack
   direction={["column","row"]}
   alignItems="center"
   >
    <Link to={`/course/${id}`} >
        <Button colorScheme={'blue'}>View Now</Button>
    </Link>


        <Button  variant={"ghost"} colorScheme={'blue'} 
        onClick={()=>addtoplaylisthandler(id)}>Enroll Now</Button>
    

   </Stack>

  </VStack>
    );
}

const Courses = ()=>{

    const [keyword , setKeyword]=useState('');
    const [category , setcategory]=useState('');

    const addtoplaylisthandler=()=>{
        console.log("Added to wishlist");
    }

    const categories=[
        "Web Development", "Android Development", "Arificial Inteligence","Programming Fundamentals", "IOS Developmeny", "Cross Platform Development", "Quality Assurance", "Game Developmeny"
    ];


    return <Container minH={'95vh'} 
    maxWidth="container.lg"
    paddingY={'8'}>

        <Heading children="Availble Courses" margin={'8'}/>
        <Input value={keyword} 
        onChange={ e=>setKeyword(e.target.value)} 
        placeholder="Type Course Name ..." 
        type={'text'}
        focusBorderColor="red.500"
        />
        <HStack overflowX={"auto"} paddingY='8' css={{'&:: -webkit-scrollbar':{display:'none',},}}>
        {
            categories.map((item,index)=>(
                <Button key={index} onClick={()=>setcategory(item)} minW={'60'}>
                    <Text children={item}/>
                </Button>
            ))
        }
        </HStack>

        <Stack 
        direction={["column","row"]}
        flexWrap="wrap"
        justifyContent={["flex-start","space-evenly"]}
        alignItems={["center","flex-start"]}
        >
            <Course

            title={"Sample"} 
            description={"Sample"} 
            views={"23"}
            imagesrc={bg}
            id={"sample"}
            creater={"sample"}
            lecture={"5"}
            addtoplaylisthandler={addtoplaylisthandler}

             />

        </Stack>
    </Container>
}

export default Courses;