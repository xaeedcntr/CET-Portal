import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import csr from '../../../assets/images/cursor/cursor.png';
import csr2 from '../../../assets/images/cursor/cursor2.png';
import { fileuploadcss } from '../../Auth/signup';
import Sidebar from '../Sidebar';

const Createcourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdby, setCreatedby] = useState('');
  const [category, setCatogery] = useState('');
  const [image, setImage] = useState('');
  const [imagepreview, setImagepreview] = useState('');
  const [courselength, setCourselenth] = useState('');
  
  const changeFilehandler=(e)=>{
    const file=e.target.files[0];
    const read = new FileReader();
    read.readAsDataURL(file);
    read.onload=()=>{
        setImagepreview(read.result);
        setImage(file);
    };
};
  const categories = [
    'Web Development',
    'Android Development',
    'Arificial Inteligence',
    'Programming Fundamentals',
    'IOS Developmeny',
    'Cross Platform Development',
    'Quality Assurance',
    'Game Developmeny',
  ];

  return (
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
      css={{ cursor: `url(${csr}), default` }}
    >
      <Container py={'16'}>
        <form>
          <Heading
            textTransform={'uppercase'}
            children="Create Course"
            my={'16'}
            textAlign={['center', 'left']}
          />
          <VStack margin={'auto'} spacing="8">
            <Input
              style={{ width: '100%' }}
              required
              id="title"
              focusBorderColor="purple.900"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Course Title Here"
              type={'text'}
            />
            <Input
              style={{ width: '100%' }}
              required
              id="description"
              focusBorderColor="purple.900"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Course Desciption Here"
              type={'text'}
            />
            <Input
              style={{ width: '100%' }}
              required
              id="createdby"
              focusBorderColor="purple.900"
              value={createdby}
              onChange={e => setCreatedby(e.target.value)}
              placeholder="Creator name"
              type={'text'}
            />

<Input
              style={{ width: '100%' }}
              required
              id="courselength"
              focusBorderColor="purple.900"
              value={courselength}
              onChange={e => setCourselenth(e.target.value)}
              placeholder="Course Duration in Hours"
              type={'number'}
            />

            <Select
              focusBorderColor="purple.300"
              value={category}
              onChange={e => setCatogery(e.target.value)}
            >

                <option value="" >Select Catogery
                </option>

                {
                    categories.map(item=>(
                        <option key={item} value={item}
                        >{item}
                        </option> 
                    ))
                }
            </Select>

            <Input style={{width:"100%"}}
              required
              accept='image/*'
           
              focusBorderColor='purple.900'
              css={{ "&::file-selector-button": {
                ...fileuploadcss,color:"purple",
              }}}
              type={'file'}
              onChange={changeFilehandler}
            />
{
  imagepreview && (
    <Image src={imagepreview} boxSize="64" objectFit={'contain'} />
  )
}

<Button width={'full'} colorScheme={"purple"} type={"submit"} >Create</Button>
            
          </VStack>
        </form>
      </Container>

      <Sidebar />
    </Grid>
  );
};
export default Createcourse;
