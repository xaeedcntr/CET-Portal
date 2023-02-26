import React from "react";
import {Box, Center, Heading, HStack, Stack, VStack} from "@chakra-ui/react"
import {TiSocialYoutubeCircular, 
    TiSocialInstagramCircular, TiSocialFacebookCircular, 
    TiSocialGithubCircular, 
    TiSocialLinkedinCircular} from "react-icons/ti"
const Footer=()=>{
    return(
<Box padding={"4"} bg="blackAlpha.900" minH={'10vh'}>

<Stack direction={["column","row"]}>

<VStack alignItems={["Center","flex-start"]} width="full" >

<Heading children="All Rights Reserved" color={'white'} />
<Heading size={"sm"} children="Group 5" color={'gold'} fontFamily="body"/>

</VStack>

<HStack spacing={['2','10']} color='white' fontSize={'40'} justifyContent="center">

<a href="https://www.facebook.com/contoursoftware/"  
target={'_blank'}><TiSocialFacebookCircular/></a>

<a href="https://www.youtube.com/@Contour.Software"  
target={'_blank'}><TiSocialYoutubeCircular/></a>

<a href="https://www.linkedin.com/company/contoursoftware"  
target={'_blank'}><TiSocialLinkedinCircular/></a>

<a href="https://www.linkedin.com/company/contoursoftware"  
target={'_blank'}><TiSocialGithubCircular/></a>

<a href="https://www.instagram.com/contoursoftwareltd/"  
target={'_blank'}><TiSocialInstagramCircular/></a>

</HStack>
</Stack>

</Box>
    );
}

export default Footer;