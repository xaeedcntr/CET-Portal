import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import introvideo from "../../assets/videos/intro.mp4"

const Coursepage=()=>{

   
    const [lectureno,setLectureno]=useState(0);
    const lectures=[{
        _id:"sd",
        title:"Sample" , description:"Sample sdfsfsdffs",
        video:{
            url:"sasadasd",
        }
        
    },
    {
        _id:"sd",
        title:"Sample2" , description:"Sample sdfsfsdffs",
        video:{
            url:"sasadasd",
        }
        
    },{
        _id:"sd",
        title:"Sample3" , description:"Sample sdfsfsdffs",
        video:{
            url:"sasadasd",
        }
        
    }]
    return(
        <Grid h={'90vh'} templateColumns={["1fr","3fr 1fr"]}>
            <Box>
            <video width={"100%"} autoPlay muted loop controls
controlsList="nodownload noremoteplayback" 
disablePictureInPicture
disableRemotePlayback
src={introvideo}
></video>

<Heading children={`#${lectureno+1} ${lectures[lectureno].title}`} m={'4'}/>

<Heading children="Description" m={'4'}/>

<Text children={lectures[lectureno].description} />


            </Box>

            <VStack>
                {
                    lectures.map((item,index)=>(
                        <button onClick={()=>setLectureno(index)}
                         key={item._id}
                          style={{width:'100%',
                           padding:'1rem' ,
                            textalign:'center',
                             margin:0, 
                             borderBottom:"1px solid rgba(0,0,0,0.2)" } }>
                            
                            <Text noOfLines={1}>
                                #{index+1} {item.title}
                        </Text>
                        </button>
                    ))
                }
            </VStack>

        </Grid>
    )
}

export default Coursepage;