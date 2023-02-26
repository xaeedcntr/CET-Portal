import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import csr from '../../../assets/images/cursor/cursor.png';
import csr2 from '../../../assets/images/cursor/cursor2.png';
import Sidebar from '../Sidebar';
import imgc from '../../../assets/images/Home/image-1.jpg';
import Modalcourse from './coursemodal';

const Admincourses = () => {
  const courses = [
    {
      _id: 'dfsfsdfsd',
      poster: { url: 'hehe' },
      category: 'react',
      views: '123',
      createdby: 'saeed',
      noOfFiles: '14',
      title: 'React',
    },
  ];

  const { isOpen, onClose, onOpen } = useDisclosure();

  
  const deletebtnhandler = (courseid, lctrid) => {
    console.log(lctrid);
    console.log(courseid);
  };
  const addlctrhandler = (e,courseaddid,title,description,file) => {
    e.preventDefault();
  };

  const coursedetailshandler = userid => {
    onOpen();
  };
  const deleteuserhandler = userid => {
    console.log(userid);
  };
  return (
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
      css={{ cursor: `url(${csr}), default` }}
    >
      <Box padding={['0', '8']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="All Courses"
          my={'16'}
          textAlign={['center', 'left']}
        />

        <TableContainer width={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All Courses in the Database</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map(item => (
                <Row
                  key={item._id}
                  item={item}
                  coursedetailshandler={coursedetailshandler}
                  deleteuserhandler={deleteuserhandler}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Modalcourse
          id="first course"
          isOpen={isOpen}
          onClose={onClose}
          deletebtnhandler={deletebtnhandler}
          addlctrhandler={addlctrhandler}
          coursetitle={'react course'}
        />
      </Box>

      <Sidebar />
    </Grid>
  );
};

function Row({ item, coursedetailshandler, deleteuserhandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      {/**replace {imgc with item.poster.url} */}
      <Td>
        <Image src={imgc} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdby}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.noOfFiles}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => coursedetailshandler(item._id)}
            variant="outline"
            color="purple.500"
          >
            View Course
          </Button>
          <Button
            onClick={() => deleteuserhandler(item._id)}
            color={'purple.700'}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
export default Admincourses;
