// import {
//   Box,
//   Button,
//   Flex,
//   Heading,
//   Image,
//   Input,
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   Spinner, // Chakra UI spinner for loader
// } from "@chakra-ui/react";
// import { FaEnvelope, FaLock } from "react-icons/fa"; // Icons from react-icons library
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import React, { useState } from "react";

// import axios from "axios";
// import logo from "../../Images/TRICKLINE_2.png";
// import { jwtDecode } from "jwt-decode";
// import { useUserContext } from "../Context/UserContext";
// import { useToast } from "@chakra-ui/react";

// const LoginAdmin = () => {
//   const { setUserContext } = useUserContext();
//   const toast = useToast();

//   const [userrole, setUserrole] = useState("");
//   const [loading, setLoading] = useState(false); // Add loading state
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   const [inputFields, setInputFields] = useState({
//     username: "",
//     password: "",
//   });

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setInputFields((prevVal) => {
//       return {
//         ...prevVal,
//         [name]: value,
//       };
//     });
//   };

//   const validationForm = (inputFields) => {
//     const newError = {};
//     setErrors(newError);
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading to true when the login process starts

//     try {
//       const apiUrl = import.meta.env.VITE_APP_API_URL;
//       // /const apiUrl = "https://webifycode.com/api";
//       const response = await axios.post(
//         `${apiUrl}/auth/adminsignin`,
//         inputFields,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log(response, "adming login response");

//       if (response.status === 200) {
//         setUserrole(response.data.role);
//         setUserContext(response.data.role);
//         sessionStorage.setItem("userrole", response.data.role);

//         const token = response.data.token;
//         const decodedToken = jwtDecode(token);
//         sessionStorage.setItem("token", JSON.stringify(decodedToken));

//         toast({
//           title: "Hello Admin",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//           position: "top",
//         });

//         navigate("/dashboard");
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       if (error.response && error.response.status === 401) {
//         toast({
//           title: "Invalid credentials",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//           position: "top",
//         });
//       } else {
//         toast({
//           title: "Login Failed",
//           description: "Provide Correct UserId and Password",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//           position: "top",
//         });
//       }
//     } finally {
//       setLoading(false); // Set loading to false after the login process finishes
//     }
//   };

//   return (
//     <form>
//       <Box
//         width={{ base: "100%", md: "100%", lg: "100%", xl: "100%" }}
//         marginX="auto"
//         minHeight="100vh"
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent={"center"}
//         padding="20px"
//         bg={"#96436B  "}
//       >
//         <Box
//           borderRadius="25%"
//           overflow="hidden" // Ensures the image respects the borderRadius of the Box
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           marginY="20px"
//         >
//           <Image width={"23rem"} src={logo} alt="Logo" />
//         </Box>

//         <Flex direction="column" width={["90%", "70%", "50%", "40%"]}>
//           <Flex alignItems="center" bg="white" borderRadius="30px" p="10px">
//             <FaEnvelope style={{ width: "4%", marginLeft: "20px" }} />
//             <Input
//               name="username"
//               type="text"
//               placeholder="UserID"
//               style={inputStyle}
//               onFocus={(e) => (e.target.style.outline = "none")}
//               required
//               onChange={onChangeHandler}
//               value={inputFields.username}
//             />
//           </Flex>
//         </Flex>
//         {errors.username && (
//           <Alert width="20%" status="error">
//             <AlertIcon />
//             <AlertTitle> {errors.username}</AlertTitle>
//           </Alert>
//         )}

//         <Flex
//           direction="column"
//           width={["90%", "70%", "50%", "40%"]}
//           marginY="10px"
//         >
//           <Flex alignItems="center" bg="white" borderRadius="30px" p="10px">
//             <FaLock style={{ width: "4%", marginLeft: "20px" }} />
//             <Input
//               name="password"
//               type="password"
//               placeholder="Password"
//               style={inputStyle}
//               onFocus={(e) => (e.target.style.outline = "none")}
//               value={inputFields.password}
//               onChange={onChangeHandler}
//             />
//           </Flex>
//         </Flex>

//         {errors.password && (
//           <Alert width="20%" status="error">
//             <AlertIcon />
//             <AlertTitle>{errors.password}</AlertTitle>
//           </Alert>
//         )}

//         <Flex direction="column" width={["90%", "70%", "50%", "40%"]}>
//           <Box marginBottom={"0.6rem"} display="flex" justifyContent="flex-end">
//             <NavLink
//               to="/ForgetPassword"
//               style={{
//                 fontSize: "16px",
//                 fontFamily: "Poppins",
//                 color: "white",
//                 marginRight: "20px",
//               }}
//             >
//               Forget the password?
//             </NavLink>
//           </Box>

//           <Button
//             bg={"#6BC15C"}
//             height={"3rem"}
//             style={buttonStyle}
//             type="submit"
//             onClick={handleSubmit}
//             _hover={{ background: "white", color: "black" }}
//             isDisabled={loading} // Disable the button while loading
//           >
//             {loading ? <Spinner size="sm" color="gray" /> : "Login"}{" "}
//             {/* Show spinner when loading */}
//           </Button>
//         </Flex>
//       </Box>
//     </form>
//   );
// };

// const inputStyle = {
//   outline: "none",
//   marginLeft: "10px",
//   width: "100%",
//   border: "none",
//   background: "white",
//   fontSize: "16px",
//   color: "gray",
//   fontFamily: '"Poppins", sans-serif',
//   fontWeight: "400",
//   height: "45px",
//   borderRadius: "20px",
// };

// const buttonStyle = {
//   padding: "15px",
//   width: "100%",
//   borderRadius: "25px",
//   border: "2px solid black",
//   color: "black",
//   bg: "#6BC15C",
//   fontWeight: "700",
//   fontFamily: '"Poppins", sans-serif',
//   transition: "background 0.3s, color 0.3s",

//   ":hover": {
//     background: "FloralWhite",
//     color: "black",
//   },
// };

// export default LoginAdmin;

import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner, // Chakra UI spinner for loader
  useToast,
} from "@chakra-ui/react";
import { keyframes, css } from "@chakra-ui/react";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Icons from react-icons library
import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../Images/TRICKLINE_2.png";
import { jwtDecode } from "jwt-decode";
import { useUserContext } from "../Context/UserContext";
import bg from "../../Images/dataentry_adminbg.webp";
// Define a light-weight background image URL (replace with your preferred URL)

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

const LoginAdmin = () => {
  const { setUserContext } = useUserContext();
  const toast = useToast();

  const [userrole, setUserrole] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button and spinner
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState({
    username: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputFields((prevVal) => {
      return {
        ...prevVal,
        [name]: value.trim(),
      };
    });
  };

  const validationForm = (inputFields) => {
    const newError = {};
    setErrors(newError);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the login process starts

    try {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      const response = await axios.post(
        `${apiUrl}/auth/adminsignin`,
        inputFields,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setUserrole(response.data.role);
        setUserContext(response.data.role);
        localStorage.setItem("userrole", response.data.role);

        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        localStorage.setItem("token", JSON.stringify(decodedToken));

        toast({
          title: "Hello Admin",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 401) {
        toast({
          title: "Invalid credentials",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Provide Correct UserId and Password",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } finally {
      setLoading(false); // Set loading to false after the login process finishes
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userrole = localStorage.getItem("userrole");
    const isAdmin = userrole === "Admin";
    if (token && isAdmin) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <form>
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
          overflow="hidden"
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginY="20px"
          border="4px solid #FF6347"
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
              name="username"
              type="text"
              placeholder="UserID"
              style={inputStyle}
              onFocus={(e) => (e.target.style.outline = "none")}
              required
              onChange={onChangeHandler}
              value={inputFields.username}
            />
          </Flex>
        </Flex>
        {errors.username && (
          <Alert width="20%" status="error">
            <AlertIcon />
            <AlertTitle>{errors.username}</AlertTitle>
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
              value={inputFields.password}
              onChange={onChangeHandler}
            />
          </Flex>
        </Flex>

        {errors.password && (
          <Alert width="20%" status="error">
            <AlertIcon />
            <AlertTitle>{errors.password}</AlertTitle>
          </Alert>
        )}

        <Flex direction="column" width={["90%", "70%", "50%", "40%"]}>
          {/* <Box marginBottom={"0.6rem"} display="flex" justifyContent="flex-end">
            <NavLink
              to="/ForgetPassword"
              style={{
                fontSize: "16px",
                fontFamily: "Poppins",
                color: "white",
                marginRight: "20px",
              }}
            >
              Forget the password?
            </NavLink>
          </Box> */}

          <Button
            bg={"#6BC15C"}
            height={"3rem"}
            style={buttonStyle}
            type="submit"
            onClick={handleSubmit}
            _hover={{ background: "FloralWhite", color: "black" }}
            isDisabled={loading} // Disable the button while loading
          >
            {loading ? <Spinner size="sm" color="gray" /> : "Login"}{" "}
            {/* Spinner while loading */}
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
  color: "black",
  bg: "#6BC15C",
  fontWeight: "700",
  fontFamily: '"Poppins", sans-serif',
  transition: "background 0.3s, color 0.3s",
  ":hover": {
    background: "FloralWhite",
    color: "black",
  },
};

export default LoginAdmin;
