import { Box, Flex, Center } from "@chakra-ui/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUsers, FiUserPlus,FiAlertTriangle,FiXCircle,FiClock } from "react-icons/fi";


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
  const [todayregistation, settodayregisteration] = useState();
  useEffect(() => {
    // fetchDetails();
    // totlalActiveUser();
    // totlalRegistrationUser();
    // totlalPendingUser();
    // totlalFrezzUser();
    gettodaysassignmentcount();
    getallusercount();
    getctiveusers();
    getTodaysregistration();
  }, [setData]);

  const fetchDetails = async () => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const response = await axios.get(`${apiUrl}/user/get_all_user`);
    const totalData = response?.data?.allUsers;
    // console.log(totalData);
    setData(totalData);
  };

  const gettodaysassignmentcount = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/gettodaysregister`);
      console.log(response, "todats registertions");
      settodaysassignmentcount(response.data.users.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getallusercount = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/getallclient`);
      console.log(response, "todats registertions");
      setalluserscount(response?.data?.data?.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTodaysregistration = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/gettodaysregister`);
      console.log(response, "todats registertions");
      settodayregisteration(response.data.users.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getctiveusers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/getallactive`);
      console.log(response, "todats registertions");
      setactiveusers(response.data.allUser.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  const totlalActiveUser = async () => {
    const response = await axios.get(
      `${apiUrl}/user/user_pagination?status=Active`
    );
    const totalActiveUserData = response?.data?.users.length;
    setActive(totalActiveUserData);
    // console.log(totalActiveUserData,"totalActive");
  };

  const totlalRegistrationUser = async () => {
    const response = await axios.get(
      `${apiUrl}/user/user_pagination?status=Registered`
    );
    const totalRigistraUserData = response?.data?.users.length;
    setRegisterUsers(totalRigistraUserData);
    // console.log(response?.data?.users.length,"totalRegistration");
  };

  const totlalPendingUser = async () => {
    const response = await axios.get(
      `${apiUrl}/user/user_pagination?status=Pending`
    );
    const totalPendingUser = response?.data?.users.length;
    setPendingUsers(totalPendingUser);
    // console.log(totalPendingUser,"totalPending");
  };

  const totlalFrezzUser = async () => {
    const response = await axios.get(
      `${apiUrl}/user/user_pagination?status=Freeze`
    );
    const totalFrezzUser = response.data.totalUsers;
    setFrezzUsers(totalFrezzUser);
    // console.log(totalFrezzUser,"totalFrezz");
  };

  return (
    <>
 <Flex justifyContent="center" width="100%">
      <Box
        backgroundColor="#1a1a2e"
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
        {/* Text Content */}
        <Box>
          <span
            style={{
              color: "#00d4ff",
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

        {/* Icon */}
        <Box
          backgroundColor="#0f3460"
          borderRadius="50%"
          padding="15px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
        >
          <FiUsers size={40} color="#00d4ff" />
        </Box>
      </Box>
    </Flex>
 <Flex justifyContent="center" width="100%">
      <Box
        backgroundColor="#0d080d"
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
        {/* Text Content */}
        <Box>
          <span
            style={{
              color: "#f39c12",
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

        {/* Icon */}
        <Box
          backgroundColor="#f39c12"
          borderRadius="50%"
          padding="15px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
        >
          <FiUserPlus size={40} color="#0d080d" />
        </Box>
      </Box>
    </Flex>

    <Flex justifyContent="center" width="100%">
      <Box
        backgroundColor="#0d080d"
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
        {/* Text Content */}
        <Box>
          <span
            style={{
              color: "#e74c3c",
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

        {/* Icon */}
        <Box
          backgroundColor="#e74c3c"
          borderRadius="50%"
          padding="15px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
        >
          <FiAlertTriangle size={40} color="#0d080d" />
        </Box>
      </Box>
    </Flex>
    <Flex justifyContent="center" width="100%">
      <Box
        backgroundColor="#0d080d"
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
        {/* Text Content */}
        <Box>
          <span
            style={{
              color: "#e74c3c",
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

        {/* Icon */}
        <Box
          backgroundColor="#e74c3c"
          borderRadius="50%"
          padding="15px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
        >
          <FiXCircle size={40} color="#0d080d" />
        </Box>
      </Box>
    </Flex>

    <Flex justifyContent="center" width="100%">
      <Box
        backgroundColor="#0d080d"
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
        {/* Text Content */}
        <Box>
          <span
            style={{
              color: "#f1c40f",
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

        {/* Icon */}
        <Box
          backgroundColor="#f1c40f"
          borderRadius="50%"
          padding="15px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
        >
          <FiClock size={40} color="#0d080d" />
        </Box>
      </Box>
    </Flex>
     
    </>
  );
};

export default DashboardOverview;
