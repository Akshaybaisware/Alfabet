import {
  List,
  ListItem,
  Box,
  Image,
  Container,
  ListIcon,
  Icon,
  Button,
  Divider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  useDisclosure,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useToast,
  Flex,
  Stack,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  IconButton,
} from "@chakra-ui/react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import MovingIcon from "@mui/icons-material/Moving";
import GroupsIcon from "@mui/icons-material/Groups";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MultilineChartIcon from "@mui/icons-material/MultilineChart";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { NavLink, useNavigate, Link } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { BsInfoCircle } from "react-icons/bs";
import { FaCheckCircle, FaBook, FaClipboardList, FaPen } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import {
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import {
  BsGrid,
  BsFlagFill,
  BsFileEarmarkSpreadsheet,
  BsAmd,
  BsFillFileEarmarkSpreadsheetFill,
  BsChevronRight,
} from "react-icons/bs";
import { CiLogout, CiMoneyBill } from "react-icons/ci";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useUserContext } from "../Context/UserContext";

export default function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const { getUser } = useUserContext();
  // const userRole = getUser();
  const userRole = localStorage.getItem("userrole");
  console.log(userRole, "userrole");
  const isAdmin = userRole === "Admin";
  const isUser = userRole === "User";
  console.log(isAdmin, isUser);
  const toast = useToast();
  const navigate = useNavigate();
  console.log(isMobileView, onOpen, "ismobileview");
  useEffect(() => {
    const handleResize = () => {
      // setIsMobileView(window.innerWidth <= 768);
      setIsMobileView(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSignout = () => {
    localStorage.clear();
    localStorage.clear();
    toast({
      title: "Logout Success.",
      // description: "We've created your account for you.",
      position: "top",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/userlogin");
  };

  // Function to handle navigation and close drawer in mobile view
  const handleNavClick = () => {
    if (isMobileView) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Hamburger Button - MOVED OUTSIDE THE LIST */}
      {isMobileView && (
        <IconButton
          icon={<HamburgerIcon />}
          onClick={onOpen}
          display={{ base: "block", md: "none" }}
          bg="linear-gradient(135deg, #FF1493 0%, #8B008B 100%)"
          color="white"
        
          _hover={{
            bg: "linear-gradient(135deg, #8B008B 0%, #FF1493 100%)",
          }}
          size="lg"
          borderRadius="10px"
          m="10px"
          position="fixed"
          top="10px"
          left="10px"
          zIndex="1400"
          transition="all 0.2s ease"
        />
      )}

      <List
       
        bg="linear-gradient(135deg, #8B008B 0%, #4B0082 100%)"
        boxShadow="0 4px 20px rgba(128, 0, 128, 0.4)"
        position="relative"
        overflow="hidden"
        
      >
        {/* Desktop View */}
        {!isMobileView && (
          <Box bg="linear-gradient(135deg, #8B008B 0%, #4B0082 100%)" minH="100vh" p="15px">
            {/* Admin Content */}
            {isAdmin && (
              <>
                <ListItem 
                  className="listItem" 
                  p="15px" 
                  borderRadius="12px"
                  bg="rgba(255, 255, 255, 0.1)"
                  backdropFilter="blur(8px)"
                  border="1px solid rgba(255, 255, 255, 0.15)"
                  mb="20px"
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
                >
                  <Flex alignItems="center">
                    <DashboardIcon
                      style={{ 
                        color: "#FFD700", 
                        marginTop: "0rem",
                        fontSize: "2rem",
                        background: "rgba(255, 215, 0, 0.1)",
                        borderRadius: "8px",
                        padding: "5px"
                      }}
                    />
                    <NavLink
                      to="dashboard"
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        as={"span"}
                        color="white"
                        fontSize={"1.4rem"}
                        marginLeft="12px"
                        fontWeight="bold"
                        textShadow="0 1px 2px rgba(0,0,0,0.2)"
                      >
                        Greeting Admin !
                      </Text>
                    </NavLink>
                  </Flex>
                </ListItem>

                <Divider
                  style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
                  borderWidth="2px"
                  borderColor="rgba(255, 255, 255, 0.2)"
                />

                <Stack spacing={2}>
                  <Accordion allowToggle width={"100%"} reduceMotion={true}>
                    <ListItem
                      className="listItem"
                      p="0px"
                      borderRadius="10px"
                      m="0px"
                      bg="rgba(255, 255, 255, 0.05)"
                      border="1px solid rgba(255, 255, 255, 0.1)"
                      overflow="hidden"
                    >
                      <NavLink to="dashboard">
                        <AccordionItem border="none" _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}>
                          {({ isExpanded }) => (
                            <>
                              <h2>
                                <AccordionButton 
                                  py="15px"
                                  _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                                  transition="background-color 0.2s ease"
                                >
                                  <DescriptionIcon
                                    style={{
                                      borderRadius: "8px",
                                      width: "2.5rem",
                                      height: "2.5rem",
                                      textAlign: "center",
                                      color: "#FFD700",
                                      background: "rgba(255, 215, 0, 0.1)",
                                      padding: "5px"
                                    }}
                                  />
                                  <Text
                                    as="span"
                                    color="white"
                                    fontSize="1.2rem"
                                    marginLeft={"0.7rem"}
                                    fontWeight="600"
                                    flex="1"
                                    textAlign="left"
                                  >
                                    Forms
                                  </Text>

                                  {isExpanded ? (
                                    <ChevronUpIcon color="#FFD700" fontSize="16px" />
                                  ) : (
                                    <ChevronDownIcon color="#FFD700" fontSize="16px" />
                                  )}
                                </AccordionButton>
                              </h2>
                              <AccordionPanel pb={3} bg="rgba(0, 0, 0, 0.2)">
                                <ListItem
                                  className="listItem"
                                  p="8px"
                                  borderRadius="8px"
                                  _hover={{
                                    bg: "rgba(255, 255, 255, 0.1)",
                                  }}
                                  transition="background-color 0.2s ease"
                                >
                                  <ListIcon as={BsAmd} color="#FFD700" ml="8px" />
                                  <NavLink to="/user/Registrationform">
                                    <Text
                                      as="span"
                                      pl="8px"
                                      fontSize="1rem"
                                      color="white"
                                      fontWeight="500"
                                    >
                                      Add Client
                                    </Text>
                                  </NavLink>
                                </ListItem>

                                <Divider borderWidth="1px" borderColor="rgba(255, 255, 255, 0.15)" />
                              </AccordionPanel>
                            </>
                          )}
                        </AccordionItem>
                      </NavLink>
                    </ListItem>
                  </Accordion>

                  <Accordion allowToggle width={"100%"} reduceMotion={true}>
                    <ListItem
                      className="listItem"
                      p="0px"
                      borderRadius="10px"
                      m="0px"
                      bg="rgba(255, 255, 255, 0.05)"
                      border="1px solid rgba(255, 255, 255, 0.1)"
                      overflow="hidden"
                    >
                      <NavLink to="dashboard">
                        <AccordionItem border="none" _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}>
                          {({ isExpanded }) => (
                            <>
                              <h2>
                                <AccordionButton 
                                  py="15px"
                                  _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                                  transition="background-color 0.2s ease"
                                >
                                  <ListAltIcon
                                    style={{
                                      borderRadius: "8px",
                                      width: "2.5rem",
                                      height: "2.5rem",
                                      textAlign: "center",
                                      color: "#FFD700",
                                      background: "rgba(255, 215, 0, 0.1)",
                                      padding: "5px"
                                    }}
                                  />
                                  <Text
                                    as="span"
                                    color="white"
                                    fontSize="1.2rem"
                                    marginLeft={"0.7rem"}
                                    fontWeight="600"
                                    flex="1"
                                    textAlign="left"
                                  >
                                    Procedure
                                  </Text>

                                  {isExpanded ? (
                                    <ChevronUpIcon color="#FFD700" fontSize="16px" />
                                  ) : (
                                    <ChevronDownIcon color="#FFD700" fontSize="16px" />
                                  )}
                                </AccordionButton>
                              </h2>
                              <AccordionPanel pb={3} bg="rgba(0, 0, 0, 0.2)">
                                <ListItem
                                  className="listItem"
                                  p="8px"
                                  borderRadius="8px"
                                  _hover={{
                                    bg: "rgba(255, 255, 255, 0.1)",
                                  }}
                                  transition="background-color 0.2s ease"
                                >
                                  <ListIcon as={BsAmd} color="#FFD700" ml="8px" />
                                  <NavLink to="/user/registration">
                                    <Text
                                      as="span"
                                      pl="8px"
                                      fontSize="1rem"
                                      color="white"
                                      fontWeight="500"
                                    >
                                      All Client
                                    </Text>
                                  </NavLink>
                                </ListItem>

                                <ListItem
                                  className="listItem"
                                  p="8px"
                                  borderRadius="8px"
                                  _hover={{
                                    bg: "rgba(255, 255, 255, 0.1)",
                                  }}
                                  transition="background-color 0.2s ease"
                                >
                                  <ListIcon
                                    as={BsFileEarmarkSpreadsheet}
                                    color="#FFD700"
                                    ml="8px"
                                  />
                                  <NavLink to="/user/activeUser">
                                    <Text
                                      as="span"
                                      pl="8px"
                                      fontSize="1rem"
                                      color="white"
                                      fontWeight="500"
                                    >
                                      Working Client
                                    </Text>
                                  </NavLink>
                                </ListItem>

                                <ListItem
                                  className="listItem"
                                  p="8px"
                                  borderRadius="8px"
                                  _hover={{
                                    bg: "rgba(255, 255, 255, 0.1)",
                                  }}
                                  transition="background-color 0.2s ease"
                                >
                                  <ListIcon
                                    as={BsFileEarmarkSpreadsheet}
                                    color="#FFD700"
                                    ml="8px"
                                  />
                                  <NavLink to="/user/frezzuser">
                                    <Text
                                      as="span"
                                      pl="8px"
                                      fontSize="1rem"
                                      color="white"
                                      fontWeight="500"
                                    >
                                      QC Failed Client
                                    </Text>
                                  </NavLink>
                                </ListItem>

                                <ListItem
                                  className="listItem"
                                  p="8px"
                                  borderRadius="8px"
                                  _hover={{
                                    bg: "rgba(255, 255, 255, 0.1)",
                                  }}
                                  transition="background-color 0.2s ease"
                                >
                                  <ListIcon
                                    as={BsFileEarmarkSpreadsheet}
                                    color="#FFD700"
                                    ml="8px"
                                  />
                                  <NavLink to="/user/pending">
                                    <Text
                                      as="span"
                                      pl="8px"
                                      fontSize="1rem"
                                      color="white"
                                      fontWeight="500"
                                    >
                                      Today work to send
                                    </Text>
                                  </NavLink>
                                </ListItem>

                                <ListItem
                                  className="listItem"
                                    listStyleType="none"
                                  p="8px"
                                  borderRadius="8px"
                                  _hover={{
                                    bg: "rgba(255, 255, 255, 0.1)",
                                  }}
                                  transition="background-color 0.2s ease"
                                >
                                  <ListIcon
                                    as={CiMoneyBill}
                                    color="#FFD700"
                                    ml="8px"
                                  />
                                  <NavLink to="/user/userAgreement">
                                    <Text
                                      as="span"
                                      pl="8px"
                                      fontSize="1rem"
                                      color="white"
                                      fontWeight="500"
                                    >
                                      User Agreement
                                    </Text>
                                  </NavLink>
                                </ListItem>

                                <ListItem
                                  style={{ marginTop: "1rem" }}
                                  className="listItem"
                                  p="10px"
                                  borderRadius="8px"
                                  bg="rgba(255, 255, 255, 0.08)"
                                >
                                  <MovingIcon
                                    style={{ color: "#FFD700" }}
                                    className="sidebaricon"
                                  />
                                  <NavLink to="/report">
                                    <Text
                                      as="span"
                                      color="white"
                                      fontSize="1rem"
                                      marginLeft="8px"
                                      fontWeight="500"
                                    >
                                      Report
                                    </Text>
                                  </NavLink>
                                </ListItem>
                                <ListItem
                                  style={{ marginTop: "0.5rem" }}
                                  className="listItem"
                                  p="10px"
                                  borderRadius="8px"
                                  bg="rgba(255, 255, 255, 0.08)"
                                >
                                  <GroupsIcon style={{ color: "#FFD700" }} className="sidebaricon"></GroupsIcon>
                                  <NavLink to="/employees">
                                    <Text
                                      as="span"
                                      color="white"
                                      fontSize="1rem"
                                      marginLeft="8px"
                                      fontWeight="500"
                                    >
                                      Employees
                                    </Text>
                                  </NavLink>
                                </ListItem>

                                <Divider borderWidth="1px" borderColor="rgba(255, 255, 255, 0.15)" />
                              </AccordionPanel>
                            </>
                          )}
                        </AccordionItem>
                      </NavLink>
                    </ListItem>
                  </Accordion>

                  <ListItem
                    style={{ marginTop: "1.5rem" }}
                    className="listItem"
                    p="12px"
                    borderRadius="10px"
                    bg="linear-gradient(135deg, #DC143C 0%, #8B0000 100%)"
                    cursor="pointer"
                    onClick={handleSignout}
                    transition="all 0.2s ease"
                  >
                    <MovingIcon
                      className="sidebaricon"
                      style={{ color: "white" }}
                    />

                    <Text
                      as="span"
                      color="white"
                      fontSize="1rem"
                      marginLeft="8px"
                      fontWeight="600"
                    >
                      SignOut
                    </Text>
                  </ListItem>
                </Stack>
              </>
            )}

            {/* User Content */}
            {isUser && (
              <Stack spacing={2}>
                <Accordion allowToggle width={"100%"} reduceMotion={true}>
                  <ListItem
                    className="listItem"
                    p="0px"
                    borderRadius="10px"
                    m="0px"
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    overflow="hidden"
                  >
                    <AccordionItem border="none" _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}>
                      {({ isExpanded }) => (
                        <>
                          <h2>
                            <AccordionButton 
                              py="15px"
                              _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                              transition="background-color 0.2s ease"
                            >
                              <AssignmentIcon
                                style={{
                                  background: "linear-gradient(135deg, #FF69B4 0%, #C71585 100%)",
                                  color: "white",
                                  borderRadius: "8px",
                                  width: "2.5rem",
                                  height: "2.5rem",
                                  padding: "5px",
                                  boxShadow: "0 2px 8px rgba(255, 105, 180, 0.3)",
                                  textAlign: "center",
                                }}
                              />
                              <NavLink to="/assignment">
                                <Text
                                  as="span"
                                  color="white"
                                  fontSize="1.2rem"
                                  marginLeft={"0.7rem"}
                                  fontWeight="600"
                                >
                                  Assignments
                                </Text>
                              </NavLink>

                              {isExpanded ? (
                                <ChevronUpIcon color="#FFD700" ml="10px" />
                              ) : (
                                <ChevronDownIcon color="#FFD700" ml="10px" />
                              )}
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={3} bg="rgba(0, 0, 0, 0.2)">
                            <ListItem
                              className="listItem"
                              p="8px"
                              borderRadius="8px"
                              _hover={{
                                bg: "rgba(255, 255, 255, 0.1)",
                              }}
                              transition="background-color 0.2s ease"
                            >
                              <ListIcon
                                as={BsInfoCircle}
                                color="#4facfe"
                                ml="8px"
                              />
                              <NavLink to="/userinstructions">
                                <Text
                                  color={"white"}
                                  as="span"
                                  pl="8px"
                                  fontSize="1rem"
                                  fontWeight="500"
                                >
                                  Instructions
                                </Text>
                              </NavLink>
                            </ListItem>
                            <ListItem
                              className="listItem"
                              p="8px"
                              borderRadius="8px"
                              _hover={{
                                bg: "rgba(255, 255, 255, 0.1)",
                              }}
                              transition="background-color 0.2s ease"
                            >
                              <ListIcon
                                as={FaCheckCircle}
                                color="#00f2fe"
                                ml="8px"
                              />
                              <NavLink to="/newassignment">
                                <Text
                                  as="span"
                                  pl="8px"
                                  fontSize="1rem"
                                  color={"white"}
                                  fontWeight="500"
                                >
                                  New Assignment
                                </Text>
                              </NavLink>
                            </ListItem>
                            {/*
                            <ListItem
                              className="listItem"
                              p="5px"
                              borderRadius="10px"
                            >
                              <ListIcon
                                as={BsFileEarmarkSpreadsheet}
                                color="gray.500"
                                ml="10px"
                              />

                              <Text
                                as="span"
                                pl="10px"
                                fontSize={{ base: "0.6rem", md: "1rem" }}
                                color="black"
                              >
                                Filled Assignment
                              </Text>
                            </ListItem> */}

                            <Divider borderWidth="1px" borderColor="rgba(255, 255, 255, 0.15)" />
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                  </ListItem>
                </Accordion>

                {/* <Divider borderWidth="1px" borderColor={"gray"} /> */}
                <ListItem
                  style={{ marginTop: "1.5rem" }}
                  className="listItem"
                  p="12px"
                  borderRadius="10px"
                  bg="linear-gradient(135deg, #DC143C 0%, #8B0000 100%)"
                  cursor="pointer"
                  onClick={handleSignout}
                  transition="all 0.2s ease"
                >
                  <MovingIcon color="white" className="sidebaricon" />

                  <Text
                    as="span"
                    color="white"
                    fontSize="1rem"
                    marginLeft="8px"
                    fontWeight="600"
                  >
                    SignOut
                  </Text>
                </ListItem>
              </Stack>
            )}
          </Box>
        )}
      </List>

      {/* Mobile Drawers */}
      {isMobileView && (
        <>
          {/* Admin Mobile Drawer */}
          {isAdmin && (
            <Drawer
              isOpen={isOpen}
              onClose={onClose}
              placement="left"
              size="sm"
            >
              <DrawerOverlay bg="rgba(0, 0, 0, 0.4)">
                <DrawerContent bg="linear-gradient(135deg, #8B008B 0%, #4B0082 100%)" boxShadow="2xl">
                  <DrawerCloseButton color="white" size="lg" />
                  <DrawerHeader color={"white"} borderBottom="1px solid rgba(255,255,255,0.2)" fontSize="1.5rem">
                    Greeting Admin !
                  </DrawerHeader>
                  <DrawerBody py="20px">
                    {/* ADDED LIST WRAPPER HERE */}
                    <List>
                      <Stack spacing={2}>
                        <Accordion allowToggle width={"100%"} reduceMotion={true}>
                          <NavLink to="dashboard" >
                            <AccordionItem border="none" _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}>
                              {({ isExpanded }) => (
                                <>
                                  <h2>
                                    <AccordionButton 
                                      py="15px"
                                      _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                                      transition="background-color 0.2s ease"
                                    >
                                      <DescriptionIcon
                                        style={{
                                          borderRadius: "8px",
                                          width: "2.5rem",
                                          height: "2.5rem",
                                          textAlign: "center",
                                          color: "#FFD700",
                                          background: "rgba(255, 215, 0, 0.1)",
                                          padding: "5px"
                                        }}
                                      />
                                      <Text
                                        as="span"
                                        color="white"
                                        fontSize="1.2rem"
                                        marginLeft={"0.7rem"}
                                        fontWeight="600"
                                        flex="1"
                                        textAlign="left"
                                      >
                                        Form
                                      </Text>

                                      {isExpanded ? (
                                        <ChevronUpIcon
                                          color="#FFD700"
                                          ml="10px"
                                        />
                                      ) : (
                                        <ChevronDownIcon
                                          color="#FFD700"
                                          ml="10px"
                                        />
                                      )}
                                    </AccordionButton>
                                  </h2>
                                  <AccordionPanel pb={3} bg="rgba(0, 0, 0, 0.2)">
                                    <ListItem
                                      className="listItem"
                                      p="8px"
                                      borderRadius="8px"
                                      _hover={{
                                        bg: "rgba(255, 255, 255, 0.1)",
                                      }}
                                      transition="background-color 0.2s ease"
                                    >
                                      <ListIcon
                                        as={BsAmd}
                                        color="#FFD700"
                                        ml="8px"
                                      />
                                      <NavLink to="/user/Registrationform" onClick={handleNavClick}>
                                        <Text
                                          as="span"
                                          pl="8px"
                                          fontSize="1rem"
                                          color="white"
                                          fontWeight="500"
                                        >
                                          Add Client
                                        </Text>
                                      </NavLink>
                                    </ListItem>

                                      {/* <ListItem
                                        className="listItem"
                                        p="5px"
                                        borderRadius="10px"
                                      >
                                        <ListIcon
                                          as={BsFillFileEarmarkSpreadsheetFill}
                                          ml="10px"
                                        />
                                        <NavLink to="/user/plan">
                                          <Text
                                            as="span"
                                            pl="10px"
                                            fontSize={{
                                              base: "1rem",
                                              md: "1rem",
                                            }}
                                            color="black"
                                          >
                                            Plan
                                          </Text>
                                        </NavLink>
                                      </ListItem> */}

                                    <Divider
                                      borderWidth="1px"
                                      borderColor="rgba(255, 255, 255, 0.15)"
                                    />
                                  </AccordionPanel>
                                </>
                              )}
                            </AccordionItem>
                          </NavLink>
                        </Accordion>
                        google meet
                        <Accordion allowToggle width={"100%"} reduceMotion={true}>
                          <NavLink to="dashboard" >
                            <AccordionItem border="none" _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}>
                              {({ isExpanded }) => (
                                <>
                                  <h2>
                                    <AccordionButton 
                                      py="15px"
                                      _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                                      transition="background-color 0.2s ease"
                                    >
                                      <ListAltIcon
                                        style={{
                                          borderRadius: "8px",
                                          width: "2.5rem",
                                          height: "2.5rem",
                                          textAlign: "center",
                                          color: "#FFD700",
                                          background: "rgba(255, 215, 0, 0.1)",
                                          padding: "5px"
                                        }}
                                      />
                                      <Text
                                        as="span"
                                        color="white"
                                        fontSize="1.2rem"
                                        marginLeft={"0.7rem"}
                                        fontWeight="600"
                                        flex="1"
                                        textAlign="left"
                                      >
                                        Procedure
                                      </Text>

                                      {isExpanded ? (
                                        <ChevronUpIcon
                                          color="#FFD700"
                                          ml="10px"
                                        />
                                      ) : (
                                        <ChevronDownIcon
                                          color="#FFD700"
                                          ml="10px"
                                        />
                                      )}
                                    </AccordionButton>
                                  </h2>
                                  <AccordionPanel pb={3} bg="rgba(0, 0, 0, 0.2)">
                                    <ListItem
                                      className="listItem"
                                      p="8px"
                                      borderRadius="8px"
                                      _hover={{
                                        bg: "rgba(255, 255, 255, 0.1)",
                                      }}
                                      transition="background-color 0.2s ease"
                                    >
                                      <ListIcon
                                        as={BsAmd}
                                        color="#FFD700"
                                        ml="8px"
                                      />
                                      <NavLink to="/user/registration" onClick={handleNavClick}>
                                        <Text
                                          as="span"
                                          pl="8px"
                                          fontSize="1rem"
                                          color="white"
                                          fontWeight="500"
                                        >
                                          All client
                                        </Text>
                                      </NavLink>
                                    </ListItem>

                                    <ListItem
                                      className="listItem"
                                      p="8px"
                                      borderRadius="8px"
                                      _hover={{
                                        bg: "rgba(255, 255, 255, 0.1)",
                                      }}
                                      transition="background-color 0.2s ease"
                                    >
                                      <ListIcon
                                        as={BsFileEarmarkSpreadsheet}
                                        color="#FFD700"
                                        ml="8px"
                                      />
                                      <NavLink to="/user/activeUser" onClick={handleNavClick}>
                                        <Text
                                          as="span"
                                          pl="8px"
                                          fontSize="1rem"
                                          color="white"
                                          fontWeight="500"
                                        >
                                          Working Client
                                        </Text>
                                      </NavLink>
                                    </ListItem>

                                    <ListItem
                                      className="listItem"
                                      p="8px"
                                      borderRadius="8px"
                                      _hover={{
                                        bg: "rgba(255, 255, 255, 0.1)",
                                      }}
                                      transition="background-color 0.2s ease"
                                    >
                                      <ListIcon
                                        as={BsFileEarmarkSpreadsheet}
                                        color="#FFD700"
                                        ml="8px"
                                      />
                                      <NavLink to="/user/frezzuser" onClick={handleNavClick}>
                                        <Text
                                          as="span"
                                          pl="8px"
                                          fontSize="1rem"
                                          color="white"
                                          fontWeight="500"
                                        >
                                          QC Failed Client
                                        </Text>
                                      </NavLink>
                                    </ListItem>

                                    <ListItem
                                      className="listItem"
                                      p="8px"
                                      borderRadius="8px"
                                      _hover={{
                                        bg: "rgba(255, 255, 255, 0.1)",
                                      }}
                                      transition="background-color 0.2s ease"
                                    >
                                      <ListIcon
                                        as={BsFileEarmarkSpreadsheet}
                                        color="#FFD700"
                                        ml="8px"
                                      />
                                      <NavLink to="/user/pending" onClick={handleNavClick}>
                                        <Text
                                          as="span"
                                          pl="8px"
                                          fontSize="1rem"
                                          color="white"
                                          fontWeight="500"
                                        >
                                          Today work to send
                                        </Text>
                                      </NavLink>
                                    </ListItem>

                                    <ListItem
                                      className="listItem"
                                      p="8px"
                                      borderRadius="8px"
                                      _hover={{
                                        bg: "rgba(255, 255, 255, 0.1)",
                                      }}
                                      transition="background-color 0.2s ease"
                                    >
                                      <ListIcon
                                        as={CiMoneyBill}
                                        color="#FFD700"
                                        ml="8px"
                                      />
                                      <NavLink to="/user/userAgreement" onClick={handleNavClick}>
                                        <Text
                                          as="span"
                                          pl="8px"
                                          fontSize="1rem"
                                          color="white"
                                          fontWeight="500"
                                        >
                                          User Agreement
                                        </Text>
                                      </NavLink>
                                    </ListItem>

                                    <ListItem
                                      style={{ marginTop: "1rem" }}
                                      className="listItem"
                                      p="10px"
                                      borderRadius="8px"
                                      bg="rgba(255, 255, 255, 0.08)"
                                    >
                                      <MovingIcon
                                        color="#FFD700"
                                        className="sidebaricon"
                                      />
                                      <NavLink to="/report" onClick={handleNavClick}>
                                        <Text
                                          as="span"
                                          color="white"
                                          fontSize="1rem"
                                          marginLeft="8px"
                                          fontWeight="500"
                                        >
                                          Report
                                        </Text>
                                      </NavLink>
                                    </ListItem>

                                    <ListItem
                                      style={{ marginTop: "0.5rem" }}
                                      className="listItem"
                                      p="10px"
                                      borderRadius="8px"
                                      bg="rgba(255, 255, 255, 0.08)"
                                    >
                                      <GroupsIcon style={{ color: "#FFD700" }} className="sidebaricon"></GroupsIcon>
                                      <NavLink to="/employees" onClick={handleNavClick}>
                                        <Text
                                          as="span"
                                          color="white"
                                          fontSize="1rem"
                                          marginLeft="8px"
                                          fontWeight="500"
                                        >
                                          Employees
                                        </Text>
                                      </NavLink>
                                    </ListItem>

                                      {/* <ListItem
                                        className="listItem"
                                        p="5px"
                                        borderRadius="10px"
                                      >
                                        <ListIcon
                                          as={BsFillFileEarmarkSpreadsheetFill}
                                          ml="10px"
                                        />
                                        <NavLink to="/user/plan">
                                          <Text
                                            as="span"
                                            pl="10px"
                                            fontSize={{
                                              base: "1rem",
                                              md: "1rem",
                                            }}
                                            color="black"
                                          >
                                            Plan
                                          </Text>
                                        </NavLink>
                                      </ListItem> */}

                                    <Divider
                                      borderWidth="1px"
                                      borderColor="rgba(255, 255, 255, 0.15)"
                                    />
                                  </AccordionPanel>
                                </>
                              )}
                            </AccordionItem>
                          </NavLink>
                        </Accordion>
                        {/* Active User */}
                        <ListItem
                          style={{ marginTop: "1.5rem" }}
                          className="listItem"
                          p="12px"
                          borderRadius="10px"
                          bg="linear-gradient(135deg, #DC143C 0%, #8B0000 100%)"
                          cursor="pointer"
                          onClick={handleSignout}
                          transition="all 0.2s ease"
                        >
                          <MovingIcon
                            className="sidebaricon"
                            style={{ color: "white" }}
                          />

                          <Text
                            as="span"
                            color="white"
                            fontSize="1rem"
                            marginLeft="8px"
                            fontWeight="600"
                          >
                            SignOut
                          </Text>
                        </ListItem>
                      </Stack>
                    </List>
                  </DrawerBody>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          )}

          {/* User Mobile Drawer */}
          {isUser && (
            <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="full">
              <DrawerOverlay bg="rgba(0, 0, 0, 0.4)">
                <DrawerContent bg="linear-gradient(135deg, #8B008B 0%, #4B0082 100%)" borderBottomRadius="15px">
                  <DrawerCloseButton color="white" size="lg" />
                  <DrawerHeader fontSize={"1.8rem"} color={"white"} borderBottom="1px solid rgba(255,255,255,0.2)" textAlign="center">
                    Hello User
                  </DrawerHeader>
                  <DrawerBody py="20px">
                    {/* ADDED LIST WRAPPER HERE */}
                    <List>
                      <Stack mt={"1rem"} spacing={2}>
                        <Accordion allowToggle width={"100%"} reduceMotion={true}>
                          <AccordionItem border="none" _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}>
                            {({ isExpanded }) => (
                              <>
                                <h2>
                                  <NavLink to="/assignment" >
                                    <AccordionButton 
                                      py="15px"
                                      _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                                      transition="background-color 0.2s ease"
                                    >
                                      <AssignmentIcon
                                        style={{
                                          background: "linear-gradient(135deg, #FF69B4 0%, #C71585 100%)",
                                          color: "white",
                                          borderRadius: "8px",
                                          width: "2.5rem",
                                          height: "2.5rem",
                                          padding: "5px",
                                          boxShadow: "0 2px 8px rgba(255, 105, 180, 0.3)",
                                          textAlign: "center",
                                        }}
                                      />
                                      <Text
                                        color={"white"}
                                        as="span"
                                        fontSize="1.4rem"
                                        marginLeft={"0.7rem"}
                                        fontWeight="600"
                                        flex="1"
                                        textAlign="left"
                                        onClick={handleNavClick}
                                      >
                                        Assignment
                                      </Text>

                                      {isExpanded ? (
                                        <ChevronUpIcon
                                          color="#FFD700"
                                          ml="10px"
                                          fontSize={"1.2rem"}
                                        />
                                      ) : (
                                        <ChevronDownIcon
                                          color="#FFD700"
                                          ml="10px"
                                          fontSize={"1.2rem"}
                                        />
                                      )}
                                    </AccordionButton>
                                  </NavLink>
                                </h2>
                                <AccordionPanel pb={3} bg="rgba(0, 0, 0, 0.2)">
                                  <ListItem
                                    className="listItem"
                                    p="8px"
                                    borderRadius="8px"
                                    _hover={{
                                      bg: "rgba(255, 255, 255, 0.1)",
                                    }}
                                    transition="background-color 0.2s ease"
                                  >
                                    <ListIcon
                                      as={BsInfoCircle}
                                      color="#4facfe"
                                      ml="8px"
                                    />
                                    <NavLink
                                      to="/userinstructions"
                                      onClick={handleNavClick}
                                    >
                                      <Text
                                        color={"white"}
                                        as="span"
                                        pl="8px"
                                        fontSize="1.1rem"
                                        fontWeight="500"
                                      >
                                        Instructions
                                      </Text>
                                    </NavLink>
                                  </ListItem>
                                  <ListItem
                                    className="listItem"
                                    p="8px"
                                    borderRadius="8px"
                                    _hover={{
                                      bg: "rgba(255, 255, 255, 0.1)",
                                    }}
                                    transition="background-color 0.2s ease"
                                  >
                                    <ListIcon
                                      as={FaCheckCircle}
                                      color="#00f2fe"
                                      ml="8px"
                                    />
                                    <NavLink
                                      to="/newassignment"
                                      onClick={handleNavClick}
                                    >
                                      <Text
                                        as="span"
                                        pl="8px"
                                        fontSize="1.1rem"
                                        color={"white"}
                                        fontWeight="500"
                                      >
                                        New Assignment
                                      </Text>
                                      </NavLink>
                                  </ListItem>

                                    {/* <ListItem
                                      className="listItem"
                                      p="5px"
                                      borderRadius="10px"
                                    >
                                      <ListIcon
                                        as={BsFileEarmarkSpreadsheet}
                                        color="gray.500"
                                        ml="10px"
                                      />

                                      <Text
                                        as="span"
                                        pl="10px"
                                        fontSize={{
                                          base: "1.3rem",
                                          md: "1.3rem",
                                        }}
                                        color="black"
                                      >
                                        Filled Assignment
                                      </Text>
                                    </ListItem> */}

                                  <Divider
                                    borderWidth="1px"
                                    borderColor="rgba(255, 255, 255, 0.15)"
                                  />
                                </AccordionPanel>
                              </>
                            )}
                          </AccordionItem>
                        </Accordion>

                          {/* <Divider borderWidth="1px" borderColor={"gray"} /> */}
                        <ListItem
                          style={{ marginTop: "1.5rem" }}
                          className="listItem"
                          p="12px"
                          borderRadius="10px"
                          bg="linear-gradient(135deg, #DC143C 0%, #8B0000 100%)"
                          cursor="pointer"
                          onClick={handleSignout}
                          transition="all 0.2s ease"
                        >
                          <MovingIcon color="white" className="sidebaricon" />

                          <Text
                            as="span"
                            color="white"
                            fontSize="1.1rem"
                            marginLeft="8px"
                            fontWeight="600"
                          >
                            SignOut
                          </Text>
                        </ListItem>
                      </Stack>
                    </List>
                  </DrawerBody>
                  <DrawerFooter> </DrawerFooter>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          )}
        </>
      )}
    </>
  );
}