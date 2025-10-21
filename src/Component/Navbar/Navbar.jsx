import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import Dataentry from "../../Images/logo.png";
import Dataentry from "../../Images/logo.svg";
import { useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const token = localStorage.getItem("token"); // Replace 'token' with your actual cookie name
  console.log(token, "dasdasd");
  // let userID;
  // Check if token exists
  let parsedToken;
  if (token) {
    // Parse the token if it's a JSON object or JWT
    parsedToken = JSON.parse(token);
    // userID = parsedToken._id;
    // console.log(userID, "1234456");
  } else {
    console.log("Token not found");
  }
  const userRole = localStorage.getItem("userrole");
  console.log(userRole);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userRole, "called");

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/auth/adminforgetpassword`, {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
        userEmail: parsedToken.email,
        // userRole,
      });
      console.log(response, "frogetpassword");
      setSuccessMessage(response.data.message);
      setNewPassword("");
      setConfirmPassword("");
      setErrorMessage("");
      console.log(response, "response");
    } catch (error) {
      console.error(error);
      setErrorMessage("Error changing password");
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Flex
      direction={{ base: "row", md: "row" }} // Stack vertically on small screens and horizontally on medium and larger screens
      justifyContent="space-between"
      // alignItems="center"
      paddingX={{ base: "3", md: "8" }} // Add padding on small screens and larger screens
      paddingY="4"
      bg={"rgb(77, 26, 165)"}
      // bg={"#0F0623"}
    >
      <Box
        mt={"1rem"}
        display="flex"
        alignItems="center"
        marginBottom={{ base: "4", md: "0" }}
      >
        {/* <Image
          marginLeft={{ base: "0", md: "0rem" }}
          boxSize={{ base: "90px", md: "150px" }}
          src={Dataentry}

        /> */}
        {/* <Heading
          fontSize={{ base: "2xl", md: "5xl" }}
          marginLeft={{ base: "1rem", md: "10rem" }}
        >
          Zemix Services
        </Heading> */}
        <Heading
          color={"white"}
          fontSize={{ base: "2xl", md: "5xl" }}
          marginLeft={{ base: "1rem", md: "10rem" }}
          style={{
            boxShadow:
              "0 8px 16px rgba(128, 0, 128, 0.1), 0 10px 3px rgba(128, 0, 128, 0.08)",
            //boxShadow: "0 8px 16px rgba(128, 0, 128, 0.1), 20px 10px 3px rgba(128, 0, 128, 0.08)"
          }}
        >
          Alfabet Service
        </Heading>
      </Box>
      {/* <Box>
        <Avatar
          marginTop={"1rem"}
          borderRadius="50%"
          width={{ base: "2.5rem", md: "3.5rem" }}
          height={{ base: "2.4rem", md: "3rem" }}
          bg={'gray'}
          border={'6px solid lightgray'}
          // src="Avatarimage.jpg"
          marginRight="1.5"
        />
      </Box> */}
      {userRole === "Admin" && (
        <Box onClick={handleOpenModal} cursor="pointer">
          {/* <Avatar
            marginTop={"1rem"}
            borderRadius="50%"
            width={{ base: "2.5rem", md: "3.5rem" }}
            height={{ base: "2.4rem", md: "3rem" }}
            bg={"gray"}
            border={"6px solid lightgray"}
            // src="Avatarimage.jpg"
            marginRight="1.5"
          /> */}
          <Avatar
            marginTop={"1rem"}
            borderRadius="50%"
            width={{ base: "2.5rem", md: "3.5rem" }}
            height={{ base: "2.4rem", md: "3rem" }}
            bg={"gray"}
            border={"6px solid lightgray"}
            src="https://randomuser.me/api/portraits/men/33.jpg" // Replace with any Indian-themed placeholder
            marginRight="1.5"
          />
        </Box>
      )}

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />

          {/* Your form for password and confirm password */}
          {/* Example */}
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl marginBottom="1rem">
                <FormLabel>Password:</FormLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  border="1px solid #ccc"
                  borderRadius="4px"
                />
                {console.log(newPassword, "newpassword")}
              </FormControl>
              <FormControl marginTop="1rem" marginBottom="1rem">
                <FormLabel>Confirm Password:</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  border="1px solid #ccc"
                  borderRadius="4px"
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
              Close
            </Button>
            {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
            <Button type="submit" onClick={handleSubmit} colorScheme="blue">
              Change Password
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
