import React, { useEffect, useState } from "react";
import { Box, Flex, Icon, Button } from "@chakra-ui/react";
import axios from "axios";
import { FaClipboard, FaDownload } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaTasks } from "react-icons/fa"; // or FaClipboardList if preferred
import { FaCheckCircle } from "react-icons/fa"; // You can also use FaFileAlt

import { NavLink } from "react-router-dom";
const Assignment = () => {
  // for data
  const [data, setData] = useState();
  const [useinfo, setUserInfo] = useState();
  //  for fetch total assingment details in Dashboard
  const apiUrl = import.meta.env.VITE_APP_API_URL;

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
  const getUserdetails = async () => {
    try {
      // console.log(useremail, "ingetuser");
      const userdetails = await axios.post(`${apiUrl}/user/getuserbyid`, {
        userId: userID,
      });
      console.log(userdetails, "userdetails");
      setUserInfo(userdetails.data.User);
    } catch (error) {
      console.log(error);
    }
  }; // fetchDetails of assingment
  const fetchDetails = async () => {
    try {
      const id = localStorage.getItem("id");

      if (!id) {
        console.error("User ID is missing in localstorage");
        return;
      }

      const apiUrl = import.meta.env.VITE_APP_API_URL;
      const response = await axios.get(
        `${apiUrl}/user/get_totalAssignment/${id}`
      );
      const data = response.data;
      console.log(data);
      setData(data);
      // console.log(data?.total);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    // fetchDetails();
    getUserdetails();
  }, []);

  // agreement
  return (
    <Flex
      direction={{ base: "column", md: "column" }}
      align="center"
      justify="center"
    >
      {/* Total Assingment */}
      <Flex textAlign="center" width={{ base: "80%", md: "50%" }}>
        <Box
          color={"black"}
          backgroundColor="#4ddbff"
          border="#ebe9eb"
          margin="20px"
          padding="40px"
          fontWeight="800"
          borderRadius="10px"
          width="300px"
          height="150px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          ml={{ base: "2rem" }}
        >
          <p
            style={{
              color: "black",
              fontWeight: "600",
              flexDirection: "row",
              marginLeft: "0px",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            {/* Add the clipboard icon here */}
            <Icon as={FaClipboard} w={6} h={6} mr={2} />
            Total Assignment {useinfo?.totalAssignmentLimit}
          </p>
        </Box>
      </Flex>

      {/* Submitted Assingment */}
      <Flex textAlign="center" width={{ base: "80%", md: "50%" }}>
        <Box
          color={"black"}
          backgroundColor="#6699ff"
          border="#ebe9eb"
          margin="20px"
          padding="40px"
          fontWeight="800"
          borderRadius="10px"
          width="300px"
          height="150px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          ml={{ base: "2rem" }}
        >
          <p
            style={{
              color: "black",
              fontWeight: "600",
              flexDirection: "row",
              marginLeft: "0px",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            {/* Add the checkmark icon */}
            <Icon as={FaCheckCircle} w={6} h={6} mr={2} />
            Submitted Assignment {useinfo?.submittedAssignmentCount}
          </p>
        </Box>
      </Flex>
      {/* Pending Assingment */}
      <Flex textAlign="center" width={{ base: "80%", md: "50%" }}>
        <Box
          backgroundColor="#ff9966"
          color={"black"}
          border="#ebe9eb"
          margin="20px"
          padding="40px"
          fontWeight="800"
          borderRadius="10px"
          width="300px"
          height="150px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          ml={{ base: "2rem" }}
        >
          <p
            style={{
              color: "black",
              fontWeight: "600",
              flexDirection: "row",
              marginLeft: "0px",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            {/* Add the Tasks Icon here */}
            <Icon as={FaTasks} w={6} h={6} mr={2} />
            Pending Assignment {useinfo?.pendingAssignmentCount}
          </p>
        </Box>
      </Flex>
      {/* End date */}
      <Flex textAlign="center" width={{ base: "80%", md: "50%" }}>
        <Box
          backgroundColor="#d43ad4"
          color={"black"}
          border="#ebe9eb"
          margin="20px"
          padding="40px"
          fontWeight="800"
          borderRadius="10px"
          width="300px"
          height="150px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          ml={{ base: "2rem" }}
        >
          <p
            style={{
              color: "black",
              fontWeight: "600",
              flexDirection: "row",
              marginLeft: "0px",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            {/* Add the Calendar Icon here */}
            <Icon as={FaCalendarAlt} w={6} h={6} mr={2} />
            <span>End-Date: {useinfo?.endDate?.slice(0, 10)}</span>
          </p>
        </Box>
      </Flex>

      {/* agreement */}

      <Flex textAlign="center" width={{ base: "80%", md: "50%" }}>
        <Box
          backgroundColor="#8080ff"
          color={"black"}
          border="#ebe9eb"
          margin="20px"
          padding="40px"
          fontWeight="800"
          borderRadius="10px"
          width="300px"
          height="150px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          ml={{ base: "2rem" }}
        >
          <p style={{ marginBottom: "10px" }}>
            <Icon as={FaClipboard} w={6} h={6} mr={2} /> Agreement Details
          </p>
          <NavLink to={`/employmentformdetails/${useinfo?.email}`}>
            <Button
              colorScheme="blackAlpha"
              backgroundColor="purple"
              width="80%"
              leftIcon={<FaDownload />}
            >
              AGREEMENT
            </Button>
          </NavLink>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Assignment;
