import { Box, Flex } from "@chakra-ui/react"; // Import Box and Flex from Chakra UI

import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/Sidebar";

//import {useState} from 'react'

//import UserSidebar from "../Dashboard/UserSidebar/UserSidebar"; 

function RootLayout() {
  // const [currentSidebar, setCurrentSidebar] = useState();

  // const toggleSidebar = (role) => {
  //   setCurrentSidebar(role);
  // };

  // let SidebarComponent = SideBar; // Default to regular sidebar

  // if (currentSidebar === "user") {
  //   SidebarComponent = UserSidebar;
  // } else if (currentSidebar === "admin") {
  //   SidebarComponent = SideBar;
  // }

  



  return (
    <Flex direction="column" height="100vh">
      {/* Navbar */}
      <Box>
        <Navbar />
      </Box>

      {/* Main Content */}
      <Flex flexGrow={1}>
        {/* Sidebar */}
        <Box
     boxShadow="10px 0 10px -5px rgba(189, 22, 189, 0.5)" // right-side shadow
        flexBasis={{ base: "60%", md: "20%" }}>
        <SideBar />
        </Box>

        {/* Main Content */}
        <Box
        bg={"#fafbf8"}
      
        flexBasis={{ base: "4770%", md: "70%" }}>
          <Outlet 
          />
        </Box>
      </Flex>
    </Flex>
  );
}

export default RootLayout;
