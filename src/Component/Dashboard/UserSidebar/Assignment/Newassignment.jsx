import React, { useEffect, useState, useRef } from "react";
import {
  useToast,
  Box,
  Flex,
  Text,
  Input,
  Button,
  Grid,
  GridItem,
  Select,
  Center,
} from "@chakra-ui/react";
import { BiRefresh } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import ChatBot from "react-simple-chatbot";
// import { Segment } from "semantic-ui-react";
import styled, { keyframes } from "styled-components";
// import "semantic-ui-css/semantic.min.css";
import "./contentvalidation.css";
import { ContactsOutlined } from "@mui/icons-material";
// import ChatbotImage from "../assets/chatbot.webp"; // Replace with the correct path to your image
// import image from "../assets/chatbot.webp";
// Define the blinking keyframes for the logo
// import chatbotimage from "../../assets/chatbot.webp";
const blink = keyframes`
  50% {
    opacity: 0;
  }
`;

// Create a styled component for the blinking logo
const BlinkingImage = styled.img`
  position: fixed;
  bottom: 20px;
  right: 80px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  animation: ${blink} 1s step-end infinite;
`;

const BlinkingLogo = ({ onClick }) => {
  return (
    <BlinkingImage
      src={chatbotimage} // Example logo
      alt="Chatbot"
      onClick={onClick}
    />
  );
};

function ContentValidationfrom() {
  const toast = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token"); // Replace 'token' with your actual cookie name
  console.log(token, "dasdasd");
  let userID;
  // Check if token exists
  if (token) {
    // Parse the token if it's a JSON object or JWT
    const parsedToken = JSON.parse(token);
    userID = parsedToken._id;
    console.log(userID, "1234456");
    console.log("Token not found");
  }

  const [apidata, setapidata] = useState();
  const [randomIndex, setRandomIndex] = useState(null); // State to store the random index
  const [submittedAssignmentCount, setSubmittedAssignmentCount] = useState();
  const [formErrors, setFormErrors] = useState({}); // State for form validation errors
  const name = useRef();
  const mobile = useRef();
  const address = useRef();
  const annualRevenue = useRef();
  const jobFunctional = useRef();
  const pinCode = useRef();
  const bankNameRef = useRef();
  const accountNoRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipcodeNewRef = useRef();

  const [userdata, setUserData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentpageshowinginui, setcurrentpageshowinginui] = useState();

  const handlePageChange = (event) => {
    const selectedPage = Number(event.target.value);
    setCurrentPage(selectedPage);
    setcurrentpageshowinginui(selectedPage);
    onPageChange(selectedPage); // Call the function to refresh the content
  };

  const refreshAssignment = async () => {
    try {
      await getdatafrom(); // Fetch new assignment data
      setRandomIndex(Math.floor(Math.random() * 510)); // Set new random index
      setcurrentpageshowinginui(submittedAssignmentCount + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const getdatafrom = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/assignment/getallassignments`
      );
      console.log(response, "res");
      setapidata(response?.data?.assignments);
      setRandomIndex(Math.floor(Math.random() * 520));

      console.log(randomIndex, "randomIndex");
    } catch (error) {
      toast({
        title: "Error ",
        // description: "Error",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      console.log(error.message);
    }
  };

  const getUserdetails = async () => {
    try {
      // console.log(useremail, "ingetuser");
      const userdetails = await axios.post(`${apiUrl}/user/getuserbyid`, {
        userId: userID,
      });
      console.log(userdetails, "userdetails");
      setUserData(userdetails.data.User);
      setSubmittedAssignmentCount(
        userdetails?.data?.User?.submittedAssignmentCount
      );
      setcurrentpageshowinginui(
        userdetails?.data?.User?.submittedAssignmentCount + 1
      );

      if (userdetails?.data?.User?.submittedAssignmentCount >= 529) {
        navigate(
          "/qccheck"
          //    {
          //   state: response.data
          // }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshAssignment();
  }, [currentPage]);

  // const submitForm = async () => {

  //   try {
  //     const response = await axios.post(`${apiUrl}/assignment/addassignment`, {
  //       userId: userID,
  //     });
  //     console.log(response, "mkninmiopn");
  //     setcurrentpageshowinginui(submittedAssignmentCount + 1);
  //     if (response.status === 201) {
  //       toast({
  //         title: "Success",
  //         description: "Form submitted successfully",
  //         status: "success",
  //         duration: 3000,
  //         position: "top",
  //         isClosable: true,
  //       });
  //       refreshAssignment();
  //       navigate("/newassignment");
  //       // Refresh the assignment data after submission
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Error ",
  //       description: `error: ${error.message}`,
  //       status: "error",
  //       duration: 10000,
  //       position: "top",
  //       isClosable: true,
  //     });
  //     console.log(error.message);
  //   }
  // };

  // Validate form function
  const validateForm = () => {
    const errors = {};

    if (!name.current?.value?.trim()) {
      errors.name = "First Name is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitForm = async () => {
    // Validate form before submission
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/assignment/addassignment`, {
        userId: userID,
      });

      console.log(response, "mkninmiopn");
      setcurrentpageshowinginui(submittedAssignmentCount + 1);
      if (response.status === 201) {
        alert("Success: Form submitted successfully");
        console.log(name);
        // Clear the input fields
        name.current.value = "";
        mobile.current.value = "";
        jobFunctional.current.value = "";
        address.current.value = "";
        pinCode.current.value = "";
        annualRevenue.current.value = "";
        // CLEAR NEW FIELDS
        bankNameRef.current.value = "";
        accountNoRef.current.value = "";
        cityRef.current.value = "";
        stateRef.current.value = "";
        zipcodeNewRef.current.value = "";

        // Clear form errors
        setFormErrors({});

        refreshAssignment();
        getUserdetails();
        navigate("/newassignment");
      }
    } catch (error) {
      // alert(`Error: ${error.message}`);
      console.log("error isn the subit from", error.message);
    }
  };

  // Fetch data on component mount and update every 10 minutes

  const showQc = () => {
    if (userdata?.submittedAssignmentCount >= 529) {
      navigate(
        "/qccheck"
        //    {
        //   state: response.data
        // }
      );
    }
  };

  useEffect(() => {
    getdatafrom();
    getUserdetails();
    showQc();
  }, []);

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Whisper&display=swap')
      </style>

      <Box bg={"lightgray"}>
        <Box>
          <Text
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              padding: "1px",
              borderRadius: "2px",
            }}
          >
            Page Completed: {submittedAssignmentCount} / 530
          </Text>
        </Box>

        <></>
        <Box height="2rem">
          <Center mt={"1rem"}>
            <Text>Go to page directly:</Text>
            <Select
              value={currentPage}
              // value={currentpageshowinginui}
              onChange={handlePageChange}
              width="50px"
              color="ornage"
              placeholder="Select Page"
            >
              {/* {Array.from({ length: apidata?.length }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))} */}
              {console.log(apidata, "apidata assignments")}
              {apidata && apidata.length > 0 && (
                <>
                  {Array.from({ length: apidata.length }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </>
              )}
            </Select>
          </Center>
        </Box>
        <Center height="2rem" mt={"1rem"} bg="red.100" color="red.800">
          Your last date of Submission:
          <Text fontWeight={"700"} as="span" color="brown">
            {userdata?.endDate?.slice(0, 10)}
          </Text>
        </Center>
      </Box>
      <Box
        mt={"1rem"}
        fontFamily="'Dancing Script', cursive"
        className="content"
      >
        {/* address : "3344 Walnut Street" annualRevenue : "$408.0 million"
        cleanCode : "MKZFJQB2DUYAGJ" jobFunctional : "Marketing Manager" name :
        "Hannah Evans" phone : "555-5555" pinCode : 98765 updatedAt :
        "2025-10-25T16:54:09.605Z" userId : "user65" __v : 0 _id :
        "66154b35465e50b6a1744709 */}
        {console.log(apidata, "apidata")}
        <Box mt={"1rem"} border={"1px solid #33ffad"}>
          <Center fontWeight={"700"} width={"100%"} fontSize={"1.3rem"}>
            {apidata && apidata.length > 0 && apidata?.[randomIndex]?.firstname}{" "}
            {apidata?.[randomIndex]?.lastname}
            {/* {apidata?.[randomIndex]?.email} */}
          </Center>
          <Center
            fontWeight={"700"}
            mt={"0.5rem"}
            width={"100%"}
            fontSize={"1.3rem"}
          >
            {apidata?.[randomIndex]?.zipcode}{" "}
          </Center>
          <Center fontWeight={"700"} width={"100%"} fontSize={"1.3rem"}>
            {apidata?.[randomIndex]?.email}
          </Center>
          <Box
            fontWeight={"700"}
            mt={"0.5rem"}
            width={"100%"}
            fontSize={"1.3rem"}
          >
            <Center fontWeight={"700"}>
              {/* {apidata?.[randomIndex]?.phonenumber} */}

              {/* {apidata?.[randomIndex]?.zipcode}{" "} */}
              {apidata?.[randomIndex]?.ip}
            </Center>
          </Box>
          <Center
            fontWeight="700"
            mt={"0.5rem"}
            width={"100%"}
            fontSize={"1rem"}
          >
            {apidata?.[randomIndex]?.licencenumber}
          </Center>
        </Box>
        <Text
          fontWeight={"700"}
          fontFamily="sans-serif"
          mt={"1rem"}
          mb={"1rem"}
          bg="green.50" // Light green background
          color="green.800" // Dark green text color
          boxShadow="0 4px 8px rgba(0, 128, 0, 0.3)" // Green box shadow
          borderRadius="8px" // Optional: adds rounded corners
          p="10px" // Optional: adds padding inside the box
        >
          Start Your Assignment
        </Text>
        <Box
          bg="white"
          p="20px"
          borderRadius="12px"
          boxShadow="0 4px 12px rgba(0,0,0,0.08)"
          mt="1rem"
        >
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Text fontWeight="600" mt="10px" fontFamily="sans-serif">
                First Name: <span style={{ color: "red" }}>*</span>
              </Text>
              <Input
                ref={name}
                fontFamily="sans-serif"
                bg="gray.50"
                borderColor={formErrors.name ? "red.400" : "gray.300"}
                _focus={{
                  borderColor: "green.400",
                  bg: "white",
                  boxShadow: "md",
                }}
                isInvalid={!!formErrors.name}
              />
              {formErrors.name && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {formErrors.name}
                </Text>
              )}
            </GridItem>

            <GridItem>
              <Text fontWeight="600" mt="10px" fontFamily="sans-serif">
                Last Name:
              </Text>
              <Input
                ref={mobile}
                fontFamily="sans-serif"
                bg="gray.50"
                borderColor={formErrors.mobile ? "red.400" : "gray.300"}
                _focus={{
                  borderColor: "green.400",
                  bg: "white",
                  boxShadow: "md",
                }}
              />
            </GridItem>

            <GridItem>
              <Text fontWeight="600" mt="10px" fontFamily="sans-serif">
                Zipcode:
              </Text>
              <Input
                ref={jobFunctional}
                fontFamily="sans-serif"
                bg="gray.50"
                borderColor={formErrors.jobFunctional ? "red.400" : "gray.300"}
                _focus={{
                  borderColor: "green.400",
                  bg: "white",
                  boxShadow: "md",
                }}
              />
            </GridItem>

            <GridItem>
              <Text fontWeight="600" mt="10px" fontFamily="sans-serif">
                Email:
              </Text>
              <Input
                ref={address}
                fontFamily="sans-serif"
                bg="gray.50"
                borderColor={formErrors.address ? "red.400" : "gray.300"}
                _focus={{
                  borderColor: "green.400",
                  bg: "white",
                  boxShadow: "md",
                }}
              />
            </GridItem>
          </Grid>
          <Box>
            <Text
              fontWeight="600"
              mt="10px"
              fontFamily="sans-serif"
              textAlign="center"
            >
              IP:
            </Text>
            <Input
              ref={annualRevenue}
              fontFamily="sans-serif"
              bg="gray.50"
              borderColor={formErrors.annualRevenue ? "red.400" : "gray.300"}
              _focus={{
                borderColor: "green.400",
                bg: "white",
                boxShadow: "md",
              }}
            />
          </Box>

          <Box mt={4}>
            <Text
              fontWeight="600"
              mt="10px"
              fontFamily="sans-serif"
              textAlign="center"
            >
              LICENSE:
            </Text>
            <Input
              ref={pinCode}
              fontFamily="sans-serif"
              bg="gray.50"
              borderColor={formErrors.pinCode ? "red.400" : "gray.300"}
              _focus={{
                borderColor: "green.400",
                bg: "white",
                boxShadow: "md",
              }}
            />
          </Box>

          <Button
            fontFamily="sans-serif"
            mt="1.5rem"
            w="100%"
            onClick={submitForm}
            color="white"
            bg="green.400"
            fontWeight="600"
            py="12px"
            borderRadius="8px"
            boxShadow="0 4px 10px rgba(0, 128, 0, 0.3)"
            _hover={{
              bg: "green.500",
              boxShadow: "0 6px 14px rgba(0, 128, 0, 0.4)",
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ContentValidationfrom;
