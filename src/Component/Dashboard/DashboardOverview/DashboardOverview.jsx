import { Box, Flex } from "@chakra-ui/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUsers, FiUserPlus, FiAlertTriangle, FiXCircle, FiClock } from "react-icons/fi";

const DashboardOverview = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [data, setData] = useState(0);
  const [activeUsers, setActive] = useState(0);
  const [registerUsers, setRegisterUsers] = useState(0);
  const [pendingUsers, setPendingUsers] = useState(0);
  const [FrezzUsers, setFrezzUsers] = useState(0);
  const [todaysaggrimentcount, settodaysassignmentcount] = useState(0);
  const [allusercount, setalluserscount] = useState(0);
  const [activeusers, setactiveusers] = useState(0);
  const [todayregistation, settodayregisteration] = useState(0);

  useEffect(() => {
    gettodaysassignmentcount();
    getallusercount();
    getctiveusers();
    getTodaysregistration();
  }, []);

  const gettodaysassignmentcount = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/gettodaysregister`);
      settodaysassignmentcount(response.data.users.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getallusercount = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/getallclient`);
      setalluserscount(response?.data?.data?.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTodaysregistration = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/gettodaysregister`);
      settodayregisteration(response.data.users.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getctiveusers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/getallactive`);
      setactiveusers(response.data.allUser.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {/* Total Client Card */}
      <Flex justifyContent="center" width="100%">
        <Box
          bgGradient="linear(to-r, #667eea, #764ba2)"
          color="white"
          margin="20px auto"
          padding="20px"
          fontWeight="800"
          borderRadius="10px"
          maxWidth="400px"
          width="90%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
        >
          <Box>
            <span
              style={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "700",
                display: "block",
              }}
            >
              {allusercount}
            </span>
            <p
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "16px",
                marginTop: "5px",
              }}
            >
              Total Client
            </p>
          </Box>
          <Box
            bgGradient="linear(to-r, #4facfe, #00f2fe)"
            borderRadius="50%"
            padding="15px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
          >
            <FiUsers size={40} color="#ffffff" />
          </Box>
        </Box>
      </Flex>

      {/* Today's Client Card */}
      <Flex justifyContent="center" width="100%">
        <Box
          bgGradient="linear(to-r, #f093fb, #f5576c)"
          color="white"
          margin="20px auto"
          padding="20px"
          fontWeight="800"
          borderRadius="10px"
          maxWidth="400px"
          width="90%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
        >
          <Box>
            <span
              style={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "700",
                display: "block",
              }}
            >
              {todayregistation}
            </span>
            <p
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "16px",
                marginTop: "5px",
              }}
            >
              Today's Client
            </p>
          </Box>
          <Box
            bgGradient="linear(to-r, #43e97b, #38f9d7)"
            borderRadius="50%"
            padding="15px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
          >
            <FiUserPlus size={40} color="#ffffff" />
          </Box>
        </Box>
      </Flex>

      {/* Not Submit Card */}
      <Flex justifyContent="center" width="100%">
        <Box
          bgGradient="linear(to-r, #4facfe, #00f2fe)"
          color="white"
          margin="20px auto"
          padding="20px"
          fontWeight="800"
          borderRadius="10px"
          maxWidth="400px"
          width="90%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
        >
          <Box>
            <span
              style={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "700",
                display: "block",
              }}
            >
              0
            </span>
            <p
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "16px",
                marginTop: "5px",
              }}
            >
              Not Submit
            </p>
          </Box>
          <Box
            bgGradient="linear(to-r, #667eea, #764ba2)"
            borderRadius="50%"
            padding="15px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
          >
            <FiAlertTriangle size={40} color="#ffffff" />
          </Box>
        </Box>
      </Flex>

      {/* QC Report Fail Card */}
      <Flex justifyContent="center" width="100%">
        <Box
          bgGradient="linear(to-r, #fa709a, #fee140)"
          color="white"
          margin="20px auto"
          padding="20px"
          fontWeight="800"
          borderRadius="10px"
          maxWidth="400px"
          width="90%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
        >
          <Box>
            <span
              style={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "700",
                display: "block",
              }}
            >
              0
            </span>
            <p
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "16px",
                marginTop: "5px",
              }}
            >
              QC Report Fail
            </p>
          </Box>
          <Box
            bgGradient="linear(to-r, #f093fb, #f5576c)"
            borderRadius="50%"
            padding="15px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
          >
            <FiXCircle size={40} color="#ffffff" />
          </Box>
        </Box>
      </Flex>

      {/* Pending User Card */}
      <Flex justifyContent="center" width="100%">
        <Box
          bgGradient="linear(to-r, #43e97b, #38f9d7)"
          color="white"
          margin="20px auto"
          padding="20px"
          fontWeight="800"
          borderRadius="10px"
          maxWidth="400px"
          width="90%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
        >
          <Box>
            <span
              style={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "700",
                display: "block",
              }}
            >
              0
            </span>
            <p
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "16px",
                marginTop: "5px",
              }}
            >
              Pending User
            </p>
          </Box>
          <Box
            bgGradient="linear(to-r, #4facfe, #00f2fe)"
            borderRadius="50%"
            padding="15px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
          >
            <FiClock size={40} color="#ffffff" />
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default DashboardOverview;