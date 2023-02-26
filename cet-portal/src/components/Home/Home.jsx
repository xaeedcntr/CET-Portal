import React from "react";
import { Box, Button, Heading, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import "./home.css";
import { Link } from "react-router-dom";
import vg from "../../assets/images/Home/image-1.png"
import introvideo from "../../assets/videos/intro.mp4"
import {DiNodejs, DiReact, DiMongodb, DiHtml5, DiBootstrap} from "react-icons/di"


const Home= ()=>{
    return <section className="home">
<div className="container">
<Stack direction={["column","row"]} height="100%" 
justifyContent={["center","space-between"]}
alignItems="center"
spacing={['16','56']}
>

    <VStack width={"full"} alignItems={['center', 'flex-end']}  spacing='8'>

        <Heading children="Its time to get trained" size={'2xl'}/>
        <Text  fontFamily={'cursive'} textAlign={["center","left"]} children="Lets get trained with courses"/>
        <Link to="/courses">
            <Button size={'lg'} colorScheme="blue">Check Now</Button>
        </Link>


    </VStack>

    <Image className="v-g" boxSize={"md"} src={vg} objectFit="contain" />
</Stack>
</div>

<Box padding={"8"} bg={"gray"}>

<Heading textAlign={"center"} fontFamily="body" color="white" children="Technologies"/>
<HStack marginTop={"4"} className="technologiesposter" justifyContent={"space-evenly"}>
   
   <DiNodejs/>
   <DiReact/>
   <DiMongodb/>
   <DiHtml5/>
   <DiBootstrap/>
</HStack>
</Box>

<div className="container2">

<video autoPlay muted loop 
controlsList="nodownload nofullscreen noremoteplayback" 
disablePictureInPicture
disableRemotePlayback
src={introvideo}
></video>



</div>
    </section>
};

export default Home