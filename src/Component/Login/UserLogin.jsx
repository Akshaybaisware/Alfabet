import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner,
} from "@chakra-ui/react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import logo from "../../Images/TRICKLINE_2.png";
import { jwtDecode } from "jwt-decode";
import { useUserContext } from "../Context/UserContext";
import bg from "../../Images/dataentry_adminbg.webp";
import { keyframes, css } from "@chakra-ui/react";
const borderAnimation = keyframes`
  0% {
    border-color: #FF6347;
    border-width: 4px;
  }
  50% {
    border-color: #00BFFF;
    border-width: 8px;
  }
  100% {
    border-color: #32CD32;
    border-width: 4px;
  }
`;

const UserLogin = () => {
  const { setUserContext } = useUserContext();
  const toast = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputFields((prevVal) => ({
      ...prevVal,
      [name]: value.trim(),
    }));
  };

  console.log(inputFields, "input fileeds");

  const validationForm = () => {
    const newError = {};
    if (!inputFields.email) {
      newError.email = "Email is required.";
    }
    // if (!inputFields.password) {
    //   newError.password = "Password is required.";
    // }
    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validationForm()) return;
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.post(`${apiUrl}/user/login`, inputFields, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     console.log(response, "response ");
  //     if (response.status === 200) {
  //       const endDate = new Date(response.data.user.endDate);
  //       const currentDate = new Date();
  //       if (endDate.getTime() < currentDate.getTime()) {
  //         localStorage.setItem("useremail", response.data.email);
  //         localStorage.setItem("usermobilenumber", response.data.user.mobile);
  //         localStorage.setItem("username", response.data.user.name);
  //         localStorage.setItem("useraddress", response.data.address);
  //         localStorage.setItem(
  //           "usersubmitedforms",
  //           response.data.submittedAssignmentCount
  //         );
  //         localStorage.setItem("endDate", response.data.user.endDate);
  //         localStorage.setItem("status", response.data.user.status);
  //         navigate("/qcfail", {
  //           state: response.data,
  //         });
  //         return;
  //       }
  //       console.log(
  //         response.data.user.submittedAssignmentCount,
  //         "countn333",
  //         endDate.getTime(),
  //         currentDate.getTime()
  //       );
  //       if (
  //         endDate.getTime() > currentDate.getTime() &&
  //         (response.data.user.submittedAssignmentCount === 530 ||
  //           response.data.user.submittedAssignmentCount === 529)
  //       ) {
  //         console.log("in the redirect");
  //         localStorage.setItem("useremail", response.data.email);
  //         localStorage.setItem("usermobilenumber", response.data.user.mobile);
  //         localStorage.setItem("username", response.data.user.name);
  //         localStorage.setItem("useraddress", response.data.address);
  //         localStorage.setItem(
  //           "usersubmitedforms",
  //           response.data.submittedAssignmentCount
  //         );
  //         navigate("/qccheck", {
  //           state: response.data,
  //         });
  //         return;
  //       }

  //       if (response.data.status === "Freeze") {
  //         navigate("/qccheck");
  //       } else if (response.status === 200) {
  //         setUserContext(response.data.role);
  //         localStorage.setItem("userrole", response.data.role);
  //         const { token, id } = response.data;
  //         const decodedToken = jwtDecode(token);
  //         localStorage.setItem("token", JSON.stringify(decodedToken));
  //         localStorage.setItem("id", id);

  //         toast({
  //           title: "Login Success",
  //           status: "success",
  //           duration: 3000,
  //           isClosable: true,
  //           position: "top",
  //         });
  //         navigate("/assignment");
  //       } else {
  //         alert("Invalid credentials");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast({
  //       title: "Login Failed",
  //       description: "Provide Correct EmailId",
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //       position: "top",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validationForm()) return;
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/user/login`, inputFields, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response, "response ");
      if (response.status === 200) {
        const endDate = new Date(response.data.user.endDate);
        const currentDate = new Date();

        // Store necessary data in localStorage
        localStorage.setItem("useremail", response.data.email);
        localStorage.setItem("usermobilenumber", response.data.user.mobile);
        localStorage.setItem("username", response.data.user.name);
        localStorage.setItem("useraddress", response.data.user.address);
        localStorage.setItem(
          "usersubmitedforms",
          response.data.user.submittedAssignmentCount
        );
        localStorage.setItem("endDate", response.data.user.endDate);
        localStorage.setItem("status", response.data.user.status);

        if (endDate.getTime() < currentDate.getTime()) {
          navigate("/qcfail", {
            state: response.data,
          });
          return;
        }

        console.log(
          response.data.user.submittedAssignmentCount,
          "countn333",
          endDate.getTime(),
          currentDate.getTime()
        );

        if (
          endDate.getTime() > currentDate.getTime() &&
          (response.data.user.submittedAssignmentCount === 530 ||
            response.data.user.submittedAssignmentCount === 529)
        ) {
          console.log("in the redirect");
          navigate("/qccheck", {
            state: response.data,
          });
          return;
        }

        if (response.data.user.status === "Freeze") {
          navigate("/qccheck");
        } else if (response.status === 200) {
          setUserContext(response.data.role);
          localStorage.setItem("userrole", response.data.role);
          const { token, id } = response.data;
          const decodedToken = jwtDecode(token);
          localStorage.setItem("token", JSON.stringify(decodedToken));
          localStorage.setItem("id", id);

          toast({
            title: "Login Success",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          navigate("/assignment");
        } else {
          alert("Invalid credentials");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Login Failed",
        description: "Provide Correct EmailId",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userrole");
    const useremail = localStorage.getItem("useremail");
    const usermobile = localStorage.getItem("usermobilenumber");
    const username = localStorage.getItem("username");
    const useraddress = localStorage.getItem("useraddress");
    const usersubmitedforms = localStorage.getItem("usersubmitedforms");
    const endDate = new Date(localStorage.getItem("endDate"));
    const currentDate = new Date();
    const status = localStorage.getItem("status");

    if (token && role === "User") {
      if (endDate.getTime() < currentDate.getTime()) {
        navigate("/qcfail", {
          state: {
            email: useremail,
            mobile: usermobile,
            name: username,
            address: useraddress,
            submittedAssignmentCount: usersubmitedforms,
          },
        });
        return;
      }

      if (
        endDate.getTime() > currentDate.getTime() &&
        (usersubmitedforms === "530" || usersubmitedforms === "529")
      ) {
        navigate("/qccheck", {
          state: {
            email: useremail,
            mobile: usermobile,
            name: username,
            address: useraddress,
            submittedAssignmentCount: usersubmitedforms,
          },
        });
        return;
      }

      if (status === "Freeze") {
        navigate("/qccheck");
      } else {
        navigate("/assignment");
      }
    }
  }, [navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        width={{ base: "100%", md: "100%", lg: "100%", xl: "100%" }}
        marginX="auto"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent={"center"}
        padding="20px"
        bgImage={`url(${bg})`}
        backgroundSize="cover"
        backgroundPosition="center"
        animation="fadeIn 2s ease-in-out" // Apply fade-in animation
        transition="background 0.5s ease-in-out"
      >
        <Box
          borderRadius="25%"
          overflow="hidden" // Ensures the image respects the borderRadius of the Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginY="20px"
          animation={`${borderAnimation} 2s infinite`}
          css={css`
            transition: all 0.3s ease-in-out;
            &:hover {
              border-width: 8px;
            }
          `}
        >
          <Image width={"23rem"} src={logo} alt="Logo" />
        </Box>

        <Flex direction="column" width={["90%", "70%", "50%", "40%"]}>
          <Flex alignItems="center" bg="white" borderRadius="30px" p="10px">
            <FaEnvelope style={{ width: "4%", marginLeft: "20px" }} />
            <Input
              name="email"
              type="text"
              placeholder="Email"
              style={inputStyle}
              onFocus={(e) => (e.target.style.outline = "none")}
              required
              onChange={onChangeHandler}
              value={inputFields.email}
            />
          </Flex>
        </Flex>
        {errors.email && (
          <Alert w="70" status="error">
            <AlertIcon />
            <AlertTitle>{errors.email}</AlertTitle>
          </Alert>
        )}

        <Flex
          direction="column"
          width={["90%", "70%", "50%", "40%"]}
          marginY="10px"
        >
          <Flex alignItems="center" bg="white" borderRadius="30px" p="10px">
            <FaLock style={{ width: "4%", marginLeft: "20px" }} />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              style={inputStyle}
              onFocus={(e) => (e.target.style.outline = "none")}
              required
              value={inputFields.password}
              onChange={onChangeHandler}
            />
          </Flex>
        </Flex>
        {errors.password && (
          <Alert w="70" status="error">
            <AlertIcon />
            <AlertTitle>{errors.password}</AlertTitle>
          </Alert>
        )}

        <Flex direction="column" width={["90%", "70%", "50%", "40%"]}>
          <Button
            height={"3rem"}
            style={buttonStyle}
            type="submit"
            isDisabled={isLoading}
            _hover={{ background: "FloralWhite", color: "black" }}
          >
            {isLoading ? <Spinner size="md" /> : "Login"}
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

const inputStyle = {
  outline: "none",
  marginLeft: "10px",
  width: "100%",
  border: "none",
  background: "white",
  fontSize: "16px",
  color: "gray",
  fontFamily: '"Poppins", sans-serif',
  fontWeight: "400",
  height: "45px",
  borderRadius: "20px",
};

const buttonStyle = {
  padding: "15px",
  width: "100%",
  borderRadius: "25px",
  border: "2px solid black",
  color: "#fff",
  background: "#6BC15C",
  background: "#6BC15C",
  fontWeight: "700",
  fontFamily: '"Poppins", sans-serif',
};

export default UserLogin;
