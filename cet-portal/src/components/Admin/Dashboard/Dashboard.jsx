import { Box, Grid, Heading, HStack, Progress, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import csr from "../../../assets/images/cursor/cursor.png"
import csr2 from "../../../assets/images/cursor/cursor2.png"
import Sidebar from "../Sidebar";
import { Doughnutchart, Linechart } from "./charts";

const Bar =({title,value, positive})=>(
    <Box py='4' px={["0","20"]}>

<Heading children={title} size="sm" mb="2"/>
<HStack w={'full'} alignItems={'center'}>
          <Text children={positive?"0":`-${value}%`}/>
          <Progress width='full' value={positive ? value :0} colorScheme="purple"/>
          <Text children={`${value>100?value:100}%`}/>
          
        </HStack>
    </Box>
)

const Databox =({title,qty,qtyPercantage,positive})=>(
<Box w={["full","20%"]} boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"}
padding='8'
borderRadius={'lg'}>

<Text children={title}></Text>

<HStack spacing={'6'}>

    <Text fontSize={'2xl'} fontWeight={'bold'} children={qty}>

    </Text>
    <HStack>
    <Text children={`${qtyPercantage}%`} />
    {
        positive?<RiArrowUpLine color="green" />:(<RiArrowDownLine color="red"/>)
    }
</HStack>

</HStack>
<Text children="since last month" opacity={0.6}></Text>
</Box>
)

const AdminDashboard =()=>{
    return (   
        <Grid minH={'100vh'} 
        templateColumns={["1fr", "5fr 1fr"]}
        css={{cursor:`url(${csr}), default`}}>

            <Box boxSizing="border-box" py="16" px={['4','0']}
            >
                <Text textAlign={"center"} opacity={0.5} children={`Last Changes Made on ${String(new Date()).split("G")[0]}`}/>
<Heading children="Dashbaord" 
ml={["0",16]}
mb='16'
textAlign={['center','left']}
 />

 <Stack direction={["column","row"]} 
 minH='24' justifyContent={'space-evenly'}>

<Databox title="Progress" qty={123} qtyPercantage={30} positive={true}/>
<Databox title="Users" qty={45} qtyPercantage={60} positive={true}/>
<Databox title="Enrollments" qty={13} qtyPercantage={35} positive={false}/>

 </Stack>

 <Box 
 margin={['0','16']}
 borderRadius='lg'
 p={['0','16']}
 mt={['4','16']}
 boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"}
 >
    <Heading textAlign={["center","left"]} size="md" 
    children="Over All Progress" 
    pt={["8",'0']}
    ml={["0","16"]}/>
<Linechart/>
 </Box>

 <Grid templateColumns={["1fr","2fr 1fr"]}>
    <Box p={'4'}>
        <Heading textAlign={["center","left"]} size="md"
         children="Progress Bar"
         my='8'
         ml={["0","16"]}
         />
<Box>
    <Bar title="Views" value={30} positive={true}/>
    <Bar title="Users" value={70} positive={true}/>
    <Bar title="Enrollments" value={20} positive={false}/>
    {/*Progress bar here */}
</Box>
    </Box>

    <Box padding={["0","16"]} boxSizing={"border-box"} paddingY="4">
    <Heading children="Users"textAlign={'center'} size="md" mb={"4"}  />
    <Doughnutchart />
    </Box>
    
 </Grid>
            </Box>

            <Sidebar />

        </Grid>
     );

}

export default AdminDashboard;