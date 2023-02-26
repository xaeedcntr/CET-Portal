import { Box, Button, Grid, Heading, HStack, Table, TableCaption, TableContainer, Thead, Tr,Th, Tbody,Td} from "@chakra-ui/react";
import React from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import csr from "../../../assets/images/cursor/cursor.png"
import csr2 from "../../../assets/images/cursor/cursor2.png"
import Sidebar from "../Sidebar";

const Users =()=>{
    const users= [{

        _id:"dfsfsdfsd",
        name:"Saeed",
        role:"Admin",
        enrollment:{status:"Enrolled"},
        email:"abx@gmail.com",


    }];

    const updatehandler =userid=>{
        console.log(userid);
    };
    const deleteuserhandler =userid=>{
        console.log(userid);
    };
    return(
        <Grid minH={'100vh'} 
        templateColumns={["1fr", "5fr 1fr"]}
        css={{cursor:`url(${csr}), default`}}>

            <Box padding={["0","16"]} overflowX="auto">
                <Heading textTransform={'uppercase'} children="All Users" my={'16'} textAlign={["center","left"]} />

<TableContainer width={['100vw','full']} >
    <Table variant={'simple'} size="lg">
        <TableCaption>All users in the Database</TableCaption>
        <Thead>
            <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Enrolled</Th>
                <Th isNumeric>Action</Th>
            </Tr>
        </Thead>
        <Tbody>

{
   users.map(item=>(
    <Row key={item._id} item={item} updatehandler={updatehandler} deleteuserhandler={deleteuserhandler}/>
   )) 
}
        </Tbody>
    </Table>
</TableContainer>
            </Box>

            <Sidebar />

        </Grid>
    )
}
export default Users;

function Row({item,updatehandler,deleteuserhandler}) {
return(
    <Tr>
        <Td>#{item._id}</Td>
        <Td>{item.name}</Td>
        <Td>{item.email}</Td>
        <Td>{item.role}</Td>
        <Td>{item.enrollment.status==='Enrolled'?'Enrolled' :"Not Enrolled"}</Td>
        <Td isNumeric>
            <HStack justifyContent={'flex-end'}>
                <Button onClick={()=>updatehandler(item._id)} variant="outline" color="purple.500" >Change Role</Button>
                <Button onClick={()=>deleteuserhandler(item._id)} color={'purple.700'}>
                    <RiDeleteBin7Fill/>
                </Button>
            </HStack></Td>
    </Tr>
)
}