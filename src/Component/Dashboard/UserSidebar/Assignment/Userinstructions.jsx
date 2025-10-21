import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';

function Userinstructions() {
  // Dynamic color mode values
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const noticeHeadingColor = useColorModeValue('red.600', 'red.400');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const footerColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Box padding="20px" fontFamily="Arial, sans-serif" textAlign="center" bg={bgColor}>
      {/* Send Email Button */}
  

      {/* Important Notice Section */}
      <Box
        border="1px solid"
        borderColor={borderColor}
        borderRadius="md"
        bg={bgColor}
        padding="20px"
        maxWidth="600px"
        margin="0 auto"
        boxShadow="md"
      >
        <Heading as="h2" color={noticeHeadingColor} marginBottom="10px" fontSize="22px" fontWeight="bold">
          Important Notice
        </Heading>
        <List spacing={3} textAlign="left" lineHeight="1.8" color={textColor} fontSize="16px">
          <ListItem fontWeight="semibold">No extra spaces at the beginning or end of fields.</ListItem>
          <ListItem>
            Avoid using special characters like{' '}
            <Text as="span" color="red.500" fontWeight="bold">
              ~!@#$%^&*()_+=[]{}|;:",&lt;&gt;?/.
            </Text>
          </ListItem>
          <ListItem fontWeight="semibold">
            All spellings are correct and match the expected input exactly.
          </ListItem>
          <ListItem>
            Forms will be reviewed and validated by AI. Even if all spellings are correct, mistakes like extra spaces, 
            <Text as="span" fontWeight="semibold" color="red.500"> special characters</Text>, or mismatched formatting will cause the form to be marked as wrong.
          </ListItem>
          <ListItem>Fill the forms carefully and accurately to ensure smooth processing!</ListItem>
        </List>
      </Box>

      {/* Footer */}
      <Text marginTop="20px" color={footerColor} fontSize="14px">
        © 2025
      </Text>
    </Box>
  );
}

export default Userinstructions;
