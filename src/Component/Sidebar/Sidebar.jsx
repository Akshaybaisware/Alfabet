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

  return (
    <>
      <List
        p="10px"
        bg="rgb(240, 238, 240)"
        boxShadow="0 4px 10px rgba(128, 0, 128, 0.5)"
      >
        {isMobileView && (
          <IconButton
            icon={<HamburgerIcon />}
            onClick={onOpen}
            display={{ base: "block", md: "none" }}
          />
        )}
        {/* //laptop view for admin */}
        {!isMobileView && (
          <Box bg={"purple"}>
            {isAdmin && (
              <ListItem className="listItem" p="10px" borderRadius="10px">
                <Flex alignItems="center">
                  <DashboardIcon
                    style={{ color: "yellow", marginTop: "0rem" }}
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
                      fontSize={"1.5rem"}
                      marginLeft="8px" // Add some margin for spacing between icon and text
                      _hover={{ textDecoration: "underline" }}
                    >
                      Greeting Admin !
                    </Text>
                  </NavLink>
                </Flex>
              </ListItem>
            )}

            <Divider
              style={{ marginTop: "1.5rem" }}
              borderWidth="2px"
              borderColor={"gray"}
            />
            {/* {showDashboard && ( */}
            {isAdmin && (
              <Stack>
                <Accordion allowToggle width={"90%"}>
                  <ListItem
                    className="listItem"
                    p="0px"
                    borderRadius="10px"
                    m="0px"
                  >
                    <NavLink to="dashboard">
                      <AccordionItem _hover={{ bg: "purple" }}>
                        {({ isExpanded }) => (
                          <>
                            <h2>
                              <AccordionButton>
                                <DescriptionIcon
                                  style={{
                                    borderRadius: "50%",
                                    width: "3.5rem",
                                    height: "3rem",
                                    textAlign: "center",
                                    color: "yellow",
                                  }}
                                />
                                <Text
                                  as="span"
                                  color="white"
                                  fontSize="1.5rem"
                                  marginLeft={"0.7rem"}
                                  // Remove the hover red color
                                >
                                  Forms
                                </Text>

                                {isExpanded ? (
                                  <ChevronUpIcon color={"black"} ml="10px" />
                                ) : (
                                  <ChevronDownIcon color={"black"} ml="10px" />
                                )}
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              <ListItem
                                className="listItem"
                                p="5px"
                                borderRadius="10px"
                              >
                                <ListIcon as={BsAmd} color="yellow" ml="10px" />
                                <NavLink to="/user/Registrationform">
                                  <Text
                                    as="span"
                                    pl="10px"
                                    fontSize={{
                                      base: "1rem",
                                      md: "1rem",
                                    }}
                                    color="white"
                                  >
                                    Add Client
                                  </Text>
                                </NavLink>
                              </ListItem>

                              <Divider borderWidth="1px" borderColor={"gray"} />
                            </AccordionPanel>
                          </>
                        )}
                      </AccordionItem>
                    </NavLink>
                  </ListItem>
                </Accordion>

                <Accordion allowToggle width={"90%"}>
                  <ListItem
                    className="listItem"
                    p="0px"
                    borderRadius="10px"
                    m="0px"
                  >
                    <NavLink to="dashboard">
                      <AccordionItem _hover={{ bg: "purple" }}>
                        {({ isExpanded }) => (
                          <>
                            <h2>
                              <AccordionButton>
                                <ListAltIcon
                                  style={{
                                    borderRadius: "50%",
                                    width: "3.5rem",
                                    height: "3rem",
                                    textAlign: "center",
                                    color: "yellow",
                                  }}
                                />
                                <Text
                                  as="span"
                                  color="white"
                                  fontSize="1.5rem"
                                  marginLeft={"0.7rem"}
                                  // Remove the hover red color
                                >
                                  Procedure
                                </Text>

                                {isExpanded ? (
                                  <ChevronUpIcon color={"black"} ml="10px" />
                                ) : (
                                  <ChevronDownIcon color={"black"} ml="10px" />
                                )}
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              <ListItem
                                color="yellow"
                                className="listItem"
                                p="5px"
                                borderRadius="10px"
                              >
                                <ListIcon as={BsAmd} color="yellow" ml="10px" />
                                <NavLink to="/user/registration">
                                  <Text
                                    as="span"
                                    pl="10px"
                                    fontSize={{ base: "0.6rem", md: "1rem" }}
                                    color="white"
                                  >
                                    All Client
                                  </Text>
                                </NavLink>
                              </ListItem>

                              <ListItem
                                color="yellow"
                                className="listItem"
                                p="5px"
                                borderRadius="10px"
                              >
                                <ListIcon
                                  as={BsFileEarmarkSpreadsheet}
                                  color="yellow"
                                  ml="10px"
                                />
                                <NavLink to="/user/activeUser">
                                  <Text
                                    as="span"
                                    pl="10px"
                                    fontSize={{
                                      base: "1rem",
                                      md: "1rem",
                                    }}
                                    color="white"
                                  >
                                    Working Client
                                  </Text>
                                </NavLink>
                              </ListItem>

                              <ListItem
                                color="yellow"
                                className="listItem"
                                p="5px"
                                borderRadius="10px"
                              >
                                <ListIcon
                                  as={BsFileEarmarkSpreadsheet}
                                  color="yellow"
                                  ml="10px"
                                />
                                <NavLink to="/user/frezzuser">
                                  <Text
                                    as="span"
                                    pl="10px"
                                    fontSize={{
                                      base: "1rem",
                                      md: "1rem",
                                    }}
                                    color="white"
                                  >
                                    QC Failed Client
                                  </Text>
                                </NavLink>
                              </ListItem>

                              <ListItem
                                color="yellow"
                                className="listItem"
                                p="5px"
                                borderRadius="10px"
                              >
                                <ListIcon
                                  as={BsFileEarmarkSpreadsheet}
                                  color="yellow"
                                  ml="10px"
                                />
                                <NavLink to="/user/pending">
                                  <Text
                                    as="span"
                                    pl="10px"
                                    fontSize={{
                                      base: "0.9rem",
                                      md: "1rem",
                                    }}
                                    color="white"
                                  >
                                    Today work to send
                                  </Text>
                                </NavLink>
                              </ListItem>

                              <ListItem
                                color="yellow"
                                className="listItem"
                                p="5px"
                                borderRadius="10px"
                              >
                                <ListIcon
                                  as={CiMoneyBill}
                                  color="yellow"
                                  ml="10px"
                                />
                                <NavLink to="/user/userAgreement">
                                  <Text
                                    as="span"
                                    pl="10px"
                                    fontSize={{
                                      base: "1rem",
                                      md: "1rem",
                                    }}
                                    color="white"
                                  >
                                    User Agreement
                                  </Text>
                                </NavLink>
                              </ListItem>

                              <ListItem
                                style={{ marginTop: "1.5rem" }}
                                className="listItem"
                                p="10px"
                                borderRadius="10px"
                                color="yellow"
                              >
                                <MovingIcon
                                  color="yellow"
                                  className="sidebaricon"
                                />
                                <NavLink to="/report">
                                  <Text
                                    as="span"
                                    color="white"
                                    fontSize="rem"
                                    marginLeft="8px" // Add some margin for spacing between icon and text
                                    _hover={{ textDecoration: "underline" }}
                                  >
                                    Report
                                  </Text>
                                </NavLink>
                              </ListItem>
                              <ListItem
                                style={{ marginTop: "1.5rem" }}
                                className="listItem"
                                p="10px"
                                borderRadius="10px"
                                color="yellow"
                              >
                                <GroupsIcon className="sidebaricon"></GroupsIcon>
                                <NavLink to="/employees">
                                  <Text
                                    as="span"
                                    color="white"
                                    fontSize="rem"
                                    marginLeft="8px" // Add some margin for spacing between icon and text
                                    _hover={{ textDecoration: "underline" }}
                                  >
                                    Employees
                                  </Text>
                                </NavLink>
                              </ListItem>

                              <Divider borderWidth="1px" borderColor={"gray"} />
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
                  p="10px"
                  borderRadius="10px"
                >
                  {/* <MovingIcon className="sidebaricon" /> */}
                  <MovingIcon
                    className="sidebaricon"
                    style={{ color: "yellow" }}
                  />

                  <Text
                    as="span"
                    color="yellow"
                    fontSize="rem"
                    marginLeft="8px" // Add some margin for spacing between icon and text
                    _hover={{ textDecoration: "underline" }}
                    onClick={handleSignout}
                  >
                    SignOut
                  </Text>
                </ListItem>
              </Stack>
            )}
          </Box>
        )}
        {/* mobile view for admin */}
        {isMobileView && (
          <Box bg={"purple"}>
            {isAdmin && (
              <Drawer
                isOpen={isOpen}
                onClose={onClose}
                placement="left"
                width="10px"
              >
                <DrawerOverlay>
                  <DrawerContent bg={"#C13FE6"}>
                    <DrawerCloseButton />
                    <DrawerHeader color={"white"}>
                      Greeting Admin !
                    </DrawerHeader>
                    <DrawerBody>
                      <Stack>
                        <Accordion allowToggle width={"90%"}>
                          <NavLink to="dashboard">
                            <AccordionItem _hover={{ bg: "purple" }}>
                              {({ isExpanded }) => (
                                <>
                                  <h2>
                                    <AccordionButton>
                                      <DescriptionIcon
                                        style={{
                                          borderRadius: "50%",
                                          width: "3.5rem",
                                          height: "3rem",
                                          textAlign: "center",
                                          color: "yellow",
                                        }}
                                      />
                                      <Text
                                        as="span"
                                        color="white"
                                        fontSize="1.5rem"
                                        marginLeft={"0.7rem"}
                                        // Remove the hover red color
                                      >
                                        Form
                                      </Text>

                                      {isExpanded ? (
                                        <ChevronUpIcon
                                          color={"black"}
                                          ml="10px"
                                        />
                                      ) : (
                                        <ChevronDownIcon
                                          color={"black"}
                                          ml="10px"
                                        />
                                      )}
                                    </AccordionButton>
                                  </h2>
                                  <AccordionPanel pb={4}>
                                    <ListItem
                                      className="listItem"
                                      p="5px"
                                      borderRadius="10px"
                                    >
                                      <ListIcon
                                        as={BsAmd}
                                        color="yellow"
                                        ml="10px"
                                      />
                                      <NavLink to="/user/Registrationform">
                                        <Text
                                          as="span"
                                          pl="10px"
                                          fontSize={{
                                            base: "1rem",
                                            md: "1rem",
                                          }}
                                          color="white"
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
                                      borderColor={"gray"}
                                    />
                                  </AccordionPanel>
                                </>
                              )}
                            </AccordionItem>
                          </NavLink>
                        </Accordion>
                        google meet
                        <Accordion allowToggle width={"90%"}>
                          <NavLink to="dashboard">
                            <AccordionItem _hover={{ bg: "purple" }}>
                              {({ isExpanded }) => (
                                <>
                                  <h2>
                                    <AccordionButton>
                                      <ListAltIcon
                                        style={{
                                          borderRadius: "50%",
                                          width: "3.5rem",
                                          height: "3rem",
                                          textAlign: "center",
                                          color: "yellow",
                                        }}
                                      />
                                      <Text
                                        as="span"
                                        color="white"
                                        fontSize="1.5rem"
                                        marginLeft={"0.7rem"}
                                        // Remove the hover red color
                                      >
                                        Procedure
                                      </Text>

                                      {isExpanded ? (
                                        <ChevronUpIcon
                                          color={"black"}
                                          ml="10px"
                                        />
                                      ) : (
                                        <ChevronDownIcon
                                          color={"black"}
                                          ml="10px"
                                        />
                                      )}
                                    </AccordionButton>
                                  </h2>
                                  <AccordionPanel pb={4}>
                                    <ListItem
                                      color="yellow"
                                      className="listItem"
                                      p="5px"
                                      borderRadius="10px"
                                    >
                                      <ListIcon
                                        as={BsAmd}
                                        color="yellow"
                                        ml="10px"
                                      />
                                      <NavLink to="/user/registration">
                                        <Text
                                          as="span"
                                          pl="10px"
                                          fontSize={{
                                            base: "1rem",
                                            md: "1rem",
                                          }}
                                          color="white"
                                        >
                                          All client
                                        </Text>
                                      </NavLink>
                                    </ListItem>

                                    <ListItem
                                      color="yellow"
                                      className="listItem"
                                      p="5px"
                                      borderRadius="10px"
                                    >
                                      <ListIcon
                                        as={BsFileEarmarkSpreadsheet}
                                        color="yellow"
                                        ml="10px"
                                      />
                                      <NavLink to="/user/activeUser">
                                        <Text
                                          as="span"
                                          pl="10px"
                                          fontSize={{
                                            base: "1rem",
                                            md: "1rem",
                                          }}
                                          color="white"
                                        >
                                          Working Client
                                        </Text>
                                      </NavLink>
                                    </ListItem>

                                    <ListItem
                                      color="yellow"
                                      className="listItem"
                                      p="5px"
                                      borderRadius="10px"
                                    >
                                      <ListIcon
                                        as={BsFileEarmarkSpreadsheet}
                                        color="yellow"
                                        ml="10px"
                                      />
                                      <NavLink to="/user/frezzuser">
                                        <Text
                                          as="span"
                                          pl="10px"
                                          fontSize={{
                                            base: "1rem",
                                            md: "1rem",
                                          }}
                                          color="white"
                                        >
                                          QC Failed Client
                                        </Text>
                                      </NavLink>
                                    </ListItem>

                                    <ListItem
                                      color="yellow"
                                      className="listItem"
                                      p="5px"
                                      borderRadius="10px"
                                    >
                                      <ListIcon
                                        as={BsFileEarmarkSpreadsheet}
                                        color="yellow"
                                        ml="10px"
                                      />
                                      <NavLink to="/user/pending">
                                        <Text
                                          as="span"
                                          pl="10px"
                                          fontSize={{
                                            base: "0.9rem",
                                            md: "1rem",
                                          }}
                                          color="white"
                                        >
                                          Today work to send
                                        </Text>
                                      </NavLink>
                                    </ListItem>

                                    <ListItem
                                      color="yellow"
                                      className="listItem"
                                      p="5px"
                                      borderRadius="10px"
                                    >
                                      <ListIcon
                                        as={CiMoneyBill}
                                        color="yellow"
                                        ml="10px"
                                      />
                                      <NavLink to="/user/userAgreement">
                                        <Text
                                          as="span"
                                          pl="10px"
                                          fontSize={{
                                            base: "1rem",
                                            md: "1rem",
                                          }}
                                          color="white"
                                        >
                                          User Agreement
                                        </Text>
                                      </NavLink>
                                    </ListItem>

                                    <ListItem
                                      style={{ marginTop: "1.5rem" }}
                                      className="listItem"
                                      p="10px"
                                      borderRadius="10px"
                                      color="yellow"
                                    >
                                      <MovingIcon
                                        color="yellow"
                                        className="sidebaricon"
                                      />
                                      <NavLink to="/report">
                                        <Text
                                          as="span"
                                          color="white"
                                          fontSize="rem"
                                          marginLeft="8px" // Add some margin for spacing between icon and text
                                          _hover={{
                                            textDecoration: "underline",
                                          }}
                                        >
                                          Report
                                        </Text>
                                      </NavLink>
                                    </ListItem>

                                    <ListItem
                                      style={{ marginTop: "1.5rem" }}
                                      className="listItem"
                                      p="10px"
                                      borderRadius="10px"
                                      color="yellow"
                                    >
                                      <GroupsIcon className="sidebaricon"></GroupsIcon>
                                      <NavLink to="/employees">
                                        <Text
                                          as="span"
                                          color="white"
                                          fontSize="rem"
                                          marginLeft="8px" // Add some margin for spacing between icon and text
                                          _hover={{
                                            textDecoration: "underline",
                                          }}
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
                                      borderColor={"gray"}
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
                          p="10px"
                          borderRadius="10px"
                          color="yellow"
                        >
                          {/* <MovingIcon className="sidebaricon" /> */}
                          <MovingIcon
                            className="sidebaricon"
                            style={{ color: "yellow" }}
                          />

                          <Text
                            as="span"
                            color="yellow"
                            fontSize="rem"
                            marginLeft="8px" // Add some margin for spacing between icon and text
                            _hover={{ textDecoration: "underline" }}
                            onClick={handleSignout}
                          >
                            SignOut
                          </Text>
                        </ListItem>
                      </Stack>
                    </DrawerBody>
                  </DrawerContent>
                </DrawerOverlay>
              </Drawer>
            )}
          </Box>
        )}
      </List>
      <List bg={"purple"}>
        {/* laptop view for user */}
        {!isMobileView && (
          <Box>
            {isUser && (
              <Stack>
                <Accordion allowToggle width={"90%"}>
                  <ListItem
                    className="listItem"
                    p="0px"
                    borderRadius="10px"
                    m="0px"
                  >
                    <AccordionItem>
                      {({ isExpanded }) => (
                        <>
                          <h2>
                            <AccordionButton>
                              <AssignmentIcon
                                style={{
                                  background:
                                    "linear-gradient(135deg, #f06, #f79)", // Gradient background
                                  color: "white", // Icon color
                                  borderRadius: "50%", // Circular shape
                                  width: "3.5rem", // Adjust icon size
                                  height: "3.5rem",
                                  padding: "0.5rem", // Adjust spacing inside the circle
                                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Optional shadow for depth
                                  textAlign: "center",
                                }}
                              />
                              <NavLink to="/assignment">
                                <Text
                                  as="span"
                                  color="white"
                                  fontSize="1.5rem"
                                  marginLeft={"0.7rem"}
                                  // Remove the hover red color
                                >
                                  Assignments
                                </Text>
                              </NavLink>

                              {isExpanded ? (
                                <ChevronUpIcon color={"black"} ml="10px" />
                              ) : (
                                <ChevronDownIcon color={"black"} ml="10px" />
                              )}
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <ListItem
                              className="listItem"
                              p="5px"
                              borderRadius="10px"
                            >
                              <ListIcon
                                as={BsInfoCircle}
                                color="yellow.200"
                                ml="10px"
                              />
                              <NavLink to="/userinstructions">
                                <Text
                                  color={"white"}
                                  as="span"
                                  pl="10px"
                                  fontSize={{ base: "0.6rem", md: "1rem" }}
                                >
                                  Instructions
                                </Text>
                              </NavLink>
                            </ListItem>
                            <ListItem
                              className="listItem"
                              p="5px"
                              borderRadius="10px"
                            >
                              <ListIcon
                                as={FaCheckCircle}
                                color="yellow.400"
                                ml="10px"
                              />
                              <NavLink to="/newassignment">
                                <Text
                                  as="span"
                                  pl="10px"
                                  fontSize={{ base: "0.6rem", md: "1rem" }}
                                  color={"white"}
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

                            <Divider borderWidth="1px" borderColor={"gray"} />
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
                  p="10px"
                  borderRadius="10px"
                >
                  <MovingIcon color="white" className="sidebaricon" />

                  <Text
                    as="span"
                    color="yellow"
                    fontSize="rem"
                    marginLeft="8px" // Add some margin for spacing between icon and text
                    _hover={{ textDecoration: "underline" }}
                    onClick={handleSignout}
                  >
                    SignOut
                  </Text>
                </ListItem>
              </Stack>
            )}
          </Box>
        )}

        {/* mobile view for user */}

        {isMobileView && (
          <Box>
            {isUser && (
              <Drawer isOpen={isOpen} onClose={onClose} placement="top">
                <DrawerOverlay bg={"gray"}>
                  <DrawerContent bg="purple">
                    <DrawerCloseButton />
                    <DrawerHeader fontSize={"2rem"} color={"white"}>
                      Hello User
                    </DrawerHeader>
                    <DrawerBody>
                      <Stack mt={"1rem"}>
                        <Accordion allowToggle width={"105%"}>
                          <AccordionItem>
                            {({ isExpanded }) => (
                              <>
                                <h2>
                                  <NavLink to="/assignment">
                                    <AccordionButton>
                                      <AssignmentIcon
                                        style={{
                                          background:
                                            "linear-gradient(135deg, #f06, #f79)", // Gradient background
                                          color: "white", // Icon color
                                          borderRadius: "50%", // Circular shape
                                          width: "3.5rem", // Adjust icon size
                                          height: "3.5rem",
                                          padding: "0.5rem", // Adjust spacing inside the circle
                                          boxShadow:
                                            "0 4px 8px rgba(0,0,0,0.2)", // Optional shadow for depth
                                          textAlign: "center",
                                        }}
                                      />
                                      <Text
                                        color={"white"}
                                        as="span"
                                        fontSize="1.9rem"
                                        marginLeft={"0.7rem"}
                                        // Remove the hover red color
                                      >
                                        Assignment
                                      </Text>

                                      {isExpanded ? (
                                        <ChevronUpIcon
                                          color={"black"}
                                          ml="10px"
                                          fontSize={"2rem"}
                                        />
                                      ) : (
                                        <ChevronDownIcon
                                          color={"black"}
                                          ml="10px"
                                          fontSize={"2rem"}
                                        />
                                      )}
                                    </AccordionButton>
                                  </NavLink>
                                </h2>
                                <AccordionPanel pb={4}>
                                  <ListItem
                                    className="listItem"
                                    p="5px"
                                    borderRadius="10px"
                                  >
                                    <ListIcon
                                      as={BsInfoCircle}
                                      color="yellow.200"
                                      ml="10px"
                                    />
                                    <NavLink
                                      to="/userinstructions"
                                      onClick={onClose}
                                    >
                                      <Text
                                        color={"white"}
                                        as="span"
                                        pl="10px"
                                        fontSize={{
                                          base: "1.3rem",
                                          md: "1.3rem",
                                        }}
                                      >
                                        Instructions
                                      </Text>
                                    </NavLink>
                                  </ListItem>
                                  <ListItem
                                    className="listItem"
                                    p="5px"
                                    borderRadius="10px"
                                  >
                                    <ListIcon
                                      as={FaCheckCircle}
                                      color="yellow.400"
                                      ml="10px"
                                    />
                                    <NavLink
                                      to="/newassignment"
                                      onClick={onClose}
                                    >
                                      <Text
                                        as="span"
                                        pl="10px"
                                        fontSize={{
                                          base: "1.3rem",
                                          md: "1.3rem",
                                        }}
                                        color={"white"}
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
                                    borderColor={"gray"}
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
                          p="10px"
                          borderRadius="10px"
                        >
                          <MovingIcon color="white" className="sidebaricon" />

                          <Text
                            as="span"
                            color="yellow"
                            fontSize="rem"
                            marginLeft="8px" // Add some margin for spacing between icon and text
                            _hover={{ textDecoration: "underline" }}
                            onClick={handleSignout}
                          >
                            SignOut
                          </Text>
                        </ListItem>
                      </Stack>
                    </DrawerBody>
                    <DrawerFooter> </DrawerFooter>
                  </DrawerContent>
                </DrawerOverlay>
              </Drawer>
            )}
          </Box>
        )}
      </List>
    </>
  );
}
