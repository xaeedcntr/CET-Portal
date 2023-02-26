import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

import React, { useState } from 'react';
import { RiDeleteBin4Fill, RiDeleteBin7Fill } from 'react-icons/ri';
import { fileuploadcss } from '../../Auth/signup';

const Modalcourse = ({
  addlctrhandler,
  coursetitle,
  lectures = [1,2,3,4,5,6,7,8,9],
  isOpen,
  onClose,
  onOpen,
  id,
  deletebtnhandler,
}) => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState('');
  const [videopreview, setVideopreview] = useState('');
 
  const changeFilehandler=(e)=>{
    const file=e.target.files[0];
    const read = new FileReader();
    read.readAsDataURL(file);
    read.onload=()=>{
        setVideopreview(read.result);
        setVideo(file);
    };
};
const handlecloser=()=>{
    setTitle('');
    setVideo('');
    setDescription('');
    setVideopreview('');
    onClose();
}
  return (
    <Modal isOpen={isOpen} size="full" scrollBehavior='outside' onClose={handlecloser}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{coursetitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody padding={'16'}>
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box padding={['0', '16']}>
              <Box marginY={'5'}>
                <Heading children={coursetitle} />
                <Heading opacity={0.4} children={`#${id}`} size="sm" />
              </Box>

              <Heading children={'Lectures'} size="lg" />
             

              {
                lectures.map((index,item)=>(
                    <VideCard key={index}
                    title="react Intro"
                    description="This is a course"
                    num={index+1}
                    lectureid="lctr1"
                    courseID={id}
                    deletebtnhandler={deletebtnhandler}
                  />
                ))

              }
            </Box>

            <Box>
              <form
                onSubmit={e => addlctrhandler(e, id, title, description, video)}
              >
                <VStack spacing={'4'}>
                  <Heading
                    children="Add lecture"
                    size={'md'}
                    textTransform={'uppercase'}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                   <Input
                    focusBorderColor="purple.300"
                    placeholder="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />

<Input style={{width:"100%"}}
              required
              accept='video/mp4'
           
              focusBorderColor='purple.900'
              css={{ "&::file-selector-button": {
                ...fileuploadcss,color:"purple",
              }}}
              type={'file'}
              onChange={changeFilehandler}
            />
            {
                videopreview && (
                    <video controlsList='nodownload' controls src={videopreview}></video>
                )
            }
            <Button width={'full'} colorScheme="purple" type='submit' >
                Upload
            </Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>

        <ModalFooter>
            <Button onClick={handlecloser}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Modalcourse;

function VideCard({
  title,
  description,
  num,
  lectureid,
  courseID,
  deletebtnhandler,
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my="8"
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      padding={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>
      <Button
        color={'purple.600'}
        onClick={() => deletebtnhandler(courseID, lectureid)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
