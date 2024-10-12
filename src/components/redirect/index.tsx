import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ThankYou: React.FC = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Thank you!!
      </Heading>
      <Text color={'gray.500'}>
        We appreciate your time. Your order has been received and is being processed.
      </Text>
      <Button colorScheme="blue" mt={6}>
        <Link to="/">Return to Home</Link>
      </Button>
    </Box>
  );
};

export default ThankYou;