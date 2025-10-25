

// import React from "react";
// import logo from "../../Images/TRICKLINE_2.png";
// import { NavLink } from "react-router-dom";
// import { Box, Button, Image, keyframes } from "@chakra-ui/react";

// // Define keyframes for animations
// const float = keyframes`
//   0% { transform: translateY(0); }
//   50% { transform: translateY(-10px); }
//   100% { transform: translateY(0); }
// `;

// const fadeIn = keyframes`
//   0% { opacity: 0; }
//   100% { opacity: 1; }
// `;

// const bgAnimation = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// const Login = () => {
//   return (
//     <>
//       <Box
//         // bg="linear-gradient(135deg, #333, #444, #555, #666)"
//         bg={"#96436B  "}
//         bgSize="200% 200%"
//         animation={`${bgAnimation} 10s ease infinite`}
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         height="100vh"
//       >
//         {/* Floating logo with rounded corners */}
//         <Box
//           p={4}
//           borderRadius="25%"
//           bg="gray.200"
//           display="inline-flex"
//           animation={`${float} 3s ease-in-out infinite`}
//         >
//           <Image
//             width="23rem"
//             height="auto"
//             src={logo}
//             alt="Logo Image"
//             style={{ borderRadius: "inherit" }}
//           />
//         </Box>

//         {/* Fade-in login buttons */}
//         <Box
//           borderRadius="16px"
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           maxWidth="400px"
//           width="100%"
//           animation={`${fadeIn} 2s ease-in-out`}
//         >
//           <NavLink to="/admin" style={{ textDecoration: "none", width: "100%" }}>
//             <Button
//               height={"3rem"}
//               width="100%"
//               borderRadius="25px"
//               border="2px solid gray"
//               color="pink"
//               background="#6BC15C"
//               fontWeight={700}
//               fontFamily='"Poppins", sans-serif'
//               mt="20px"
//               _hover={{ background: "FloralWhite", color: "black" }}
//             >
//               Login as Admin
//             </Button>
//           </NavLink>
//           <NavLink
//             to="/userlogin"
//             style={{ textDecoration: "none", width: "100%" }}
//           >
//             <Button
//               height={"3rem"}
//               width="100%"
//               borderRadius="25px"
//             border="2px solid gray"
//                 color="pink"
//               background="#6BC15C"
//               fontWeight={700}
//               fontFamily='"Poppins", sans-serif'
//               mt="20px"
//               _hover={{ background: "FloralWhite", color: "black" }}
//             >
//               Login as User
//             </Button>
//           </NavLink>
//         </Box>

//         {/* Optional footer or extra info */}
//         <Box
//           width={"400px"}
//           display={"flex"}
//           justifyContent={"flex-end"}
//           fontWeight={"700"}
//           color={"#901810"}
//           marginTop={"1rem"}
//           textAlign={"right"}
//         ></Box>
//       </Box>
//     </>
//   );
// };

// export default Login;
 

import React from "react";
import logo from "../../Images/ALFABET LOGO.png";
import { NavLink } from "react-router-dom";
import { Box, Button, Image, keyframes } from "@chakra-ui/react";
import bgImage from "../../Images/alfabe_bg.jpg";

// Define keyframes for animations
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Login = () => {
  return (
    <>
      <Box
        bgImage={`url(${bgImage})`}
        bgSize="cover"
        bgPosition="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        color="white"
        // filter="grayscale(100%)" // Black and white effect
        position="relative"
      >
        {/* Overlay for better text contrast */}
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgColor="rgba(0, 0, 0, 0.5)"
          zIndex={0}
        ></Box>

        {/* Top Banner Section */}
        <Box
          textAlign="center"
          fontSize="2xl"
          fontWeight="bold"
          p={6}
          zIndex={1}
          position="relative"
          animation={`${fadeIn} 2s ease-in-out`}
        >
          Highest Paid Data Entry Jobs - Earn from Home
        </Box>

        {/* Floating logo with rounded corners and colored background */}
        <Box
          p={4}
          borderRadius="25%"
          bg="linear-gradient(135deg, #ff7f50, #ff6347)" // Colorful background for the logo
          display="inline-flex"
          zIndex={1}
          position="relative"
          animation={`${float} 3s ease-in-out infinite`}
        >
          <Image
            width="23rem"
            height="auto"
            src={logo}
            alt="Logo Image"
            style={{ borderRadius: "inherit" }}
          />
        </Box>

        {/* Fade-in login buttons */}
        <Box
          borderRadius="16px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          maxWidth="400px"
          width="100%"
          zIndex={1}
          position="relative"
          animation={`${fadeIn} 2s ease-in-out`}
        >
          <NavLink to="/admin" style={{ textDecoration: "none", width: "100%" }}>
            <Button
              height={"3rem"}
              width="100%"
              borderRadius="25px"
              border="2px solid gray"
              color="pink"
              background="#00025A"
              fontWeight={700}
              fontFamily='"Poppins", sans-serif'
              mt="20px"
              _hover={{ background: "FloralWhite", color: "black" }}
            >
              Login as Admin
            </Button>
          </NavLink>
          <NavLink
            to="/userlogin"
            style={{ textDecoration: "none", width: "100%" }}
          >
            <Button
              height={"3rem"}
              width="100%"
              borderRadius="25px"
              border="2px solid gray"
              color="pink"
              background="#00025A"
              fontWeight={700}
              fontFamily='"Poppins", sans-serif'
              mt="20px"
              _hover={{ background: "FloralWhite", color: "black" }}
            >
              Login as User
            </Button>
          </NavLink>
        </Box>
      </Box>
    </>
  );
};

export default Login;
