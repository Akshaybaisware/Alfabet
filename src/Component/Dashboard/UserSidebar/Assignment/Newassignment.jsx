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
  } else {
    console.log("Token not found");
  }

  const [apidata, setapidata] = useState();
  const [randomIndex, setRandomIndex] = useState(null); // State to store the random index
  const [submittedAssignmentCount, setSubmittedAssignmentCount] = useState();
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

  const submitForm = async () => {
    try {
      const response = await axios.post(`${apiUrl}/assignment/addassignment`, {
        userId: userID,
      });

      console.log(response, "mkninmiopn");
      setcurrentpageshowinginui(submittedAssignmentCount + 1);
      if (response.status === 201) {
        alert("Success: Form submitted successfully");

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

        refreshAssignment();
        getUserdetails();
        navigate("/newassignment");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.log(error.message);
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

      <Box bg={"lightgray"} >
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
        <Box mt={"1rem"} border={"1px solid #33ffad"} p="10px" bg="white" borderRadius="8px">
          <Center fontWeight={"700"} width={"100%"} fontSize={"1.3rem"}>
            {apidata && apidata.length > 0 && apidata?.[randomIndex]?.firstname}{" "}
            {apidata?.[randomIndex]?.lastname}
          </Center>
          <Center fontWeight={"700"} width={"100%"} fontSize={"1rem"} color="gray.600">
            {apidata?.[randomIndex]?.email}
          </Center>
          <Center fontWeight={"700"} width={"100%"} fontSize={"1rem"}>
            {apidata?.[randomIndex]?.phonenumber}
          </Center>
          <Center fontWeight="700" width={"100%"} fontSize={"0.9rem"} color="gray.700" mt="5px">
            {apidata?.[randomIndex]?.licencenumber}
          </Center>
          <Center fontWeight="700" width={"100%"} fontSize={"1rem"} mt="5px">
            {apidata?.[randomIndex]?.bankname}
          </Center>
          <Center fontWeight="700" width={"100%"} fontSize={"1rem"}>
            {apidata?.[randomIndex]?.accountnumber}
          </Center>
          <Center fontWeight="700" width={"100%"} fontSize={"1rem"}>
            {apidata?.[randomIndex]?.ip}
          </Center>
          <Center fontWeight="700" width={"100%"} fontSize={"1rem"} mt="5px">
            {apidata?.[randomIndex]?.address}
          </Center>
          <Center fontWeight="700" width={"100%"} fontSize={"1rem"}>
            {apidata?.[randomIndex]?.city}
          </Center>
          <Center fontWeight="700" width={"100%"} fontSize={"1rem"}>
            {apidata?.[randomIndex]?.state}
          </Center>
          <Center fontWeight="700" width={"100%"} fontSize={"1rem"}>
            {apidata?.[randomIndex]?.zipcode}
          </Center>
        </Box>

        <Text
          fontWeight={"700"}
          fontFamily="sans-serif"
          mt={"1rem"}
          mb={"1rem"}
          bg="green.50"
          color="green.800"
          boxShadow="0 4px 8px rgba(0, 128, 0, 0.3)"
          borderRadius="8px"
          p="10px"
          textAlign="center"
        >
          Current Work Load - Form 1
        </Text>

        {/* Form Section */}
        <Box bg="white" p="15px" borderRadius="8px" boxShadow="0 2px 8px rgba(0,0,0,0.1)">
          
          {/* First Row - Labels */}
          <Grid templateColumns="1fr 1fr 1fr 1fr" gap="10px" mb="8px" fontFamily="sans-serif" fontWeight="600">
            <Text>First Name</Text>
            <Text>Last Name</Text>
            <Text>Email</Text>
            <Text>Phone No</Text>
          </Grid>

          {/* First Row - Inputs */}
          <Grid templateColumns="1fr 1fr 1fr 1fr" gap="10px" mb="15px">
            <Input
              ref={name}
              fontFamily="sans-serif"
              bg="gray.50"
              borderColor="gray.300"
              _focus={{ borderColor: "green.400", bg: "white" }}
            />
            <Input
              ref={mobile}
              fontFamily="sans-serif"
              bg="gray.50"
              borderColor="gray.300"
              _focus={{ borderColor: "green.400", bg: "white" }}
            />
            <Input
              ref={address}
              fontFamily="sans-serif"
              bg="gray.50"
              borderColor="gray.300"
              _focus={{ borderColor: "green.400", bg: "white" }}
            />
            <Input
              ref={annualRevenue}
              fontFamily="sans-serif"
              bg="gray.50"
              borderColor="gray.300"
              _focus={{ borderColor: "green.400", bg: "white" }}
            />
          </Grid>

          {/* Second Row - Labels */}
          <Grid templateColumns="1fr 1fr 1fr 1fr" gap="10px" mb="8px" fontFamily="sans-serif" fontWeight="600">
            <Text>Licence No</Text>
            <Text>Bank Name</Text>
            <Text>Account No</Text>
            <Text>IP</Text>
          </Grid>

          {/* Second Row - Inputs */}
          <Grid templateColumns="1fr 1fr 1fr 1fr" gap="10px" mb="15px">
            <Input
              ref={pinCode}
              fontFamily="sans-serif"
              bg="gray.50"
              borderColor="gray.300"
              _focus={{ borderColor: "green.400", bg: "white" }}
            />
            <Input
              ref={bankNameRef}
              fontFamily="sans-serif"
              bg="gray.50"
              borderColor="gray.300"
              _focus={{ borderColor: "green.400", bg: "white" }}
            />
            <Input
              ref={accountNoRef}
              fontFamily="sans-serif"
              bg="gray.50"
              borderColor="gray.300"
              _focus={{ borderColor: "green.400", bg: "white" }}
            />
            <Input
              ref={jobFunctional}
              fontFamily="sans-serif"
              bg="gray.50"
              borderColor="gray.300"
              _focus={{ borderColor: "green.400", bg: "white" }}
            />
          </Grid>

          {/* Third Row - Labels */}
          <Grid templateColumns="1fr 1fr 1fr 1fr" gap="10px" mb="8px" fontFamily="sans-serif" fontWeight="600">
            <Text>Address</Text>
            <Text>City</Text>
            <Text>State</Text>
            <Text>Zipcode</Text>
          </Grid>

          {/* Third Row - Inputs */}
          <Grid templateColumns="1fr 1fr 1fr 1fr" gap="10px" mb="20px">
            <Input
              ref={cityRef}
              fontFamily="sans-serif"
              bg="gray.50"
              borderColor="gray.300"
              _focus={{ borderColor: "green.400", bg: "white" }}
            />
            <Input
              ref={stateRef}
              fontFamily="sans-serif"
              bg="gray.50"
              borderColor="gray.300"
              _focus={{ borderColor: "green.400", bg: "white" }}
            />
            <Input
              ref={zipcodeNewRef}
              fontFamily="sans-serif"
              bg="gray.50"
              borderColor="gray.300"
              _focus={{ borderColor: "green.400", bg: "white" }}
            />
            <Input
              fontFamily="sans-serif"
              bg="gray.50"
              borderColor="gray.300"
              _focus={{ borderColor: "green.400", bg: "white" }}
            />
          </Grid>

          {/* Buttons */}
          <Flex gap="15px" justifyContent="center">
            <Button
              fontFamily="sans-serif"
              onClick={submitForm}
              color="white"
              bg="green.500"
              fontWeight="600"
              px="30px"
              py="10px"
              borderRadius="6px"
              _hover={{ bg: "green.600" }}
            >
              Submit
            </Button>
            <Button
              fontFamily="sans-serif"
              color="white"
              bg="blue.500"
              fontWeight="600"
              px="30px"
              py="10px"
              borderRadius="6px"
              _hover={{ bg: "blue.600" }}
            >
              Save
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default ContentValidationfrom;