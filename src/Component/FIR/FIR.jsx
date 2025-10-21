// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Image,
//   Heading,
//   Text,
//   Stack,
//   Divider,
//   Flex,
// } from "@chakra-ui/react";

// // Import the sample images
// import policeHQImage from "../../Images/jodhpur police stamp.jpg";
// import map from "../../Images/indianmapyellow.webp";
// import satyamev from "../../Images/satyamev jayate.jpg";
// import advocte from "../../Images/advocatestamp.png";
// import advocatesign from "../../Images/advocatesign.png";
// import { useLocation } from "react-router-dom";
// import { useToast } from "@chakra-ui/react";
// import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function FIR() {
//   const [userDetails, setUserDetails] = useState(null);
//   const [email, setEmail] = useState("");
//   const apiUrl = import.meta.env.VITE_APP_API_URL;

//   useEffect(() => {
//     const urlParts = window.location.pathname.split("/");
//     const userId = urlParts[urlParts.length - 1];
//     console.log(userId, "userId");

//     const getUserDetailsById = async () => {
//       try {
//         const res = await axios.post(`${apiUrl}/user/getuserbyid`, {
//           userId: userId,
//         });
//         setUserDetails(res.data.User);
//       } catch (e) {
//         console.log(e);
//       }
//     };

//     getUserDetailsById();

//     setTimeout(() => {
//       window.print();
//     }, 2000);
//   }, []);

//   const handleGetUserDetails = async () => {
//     try {
//       const res = await axios.post(`${apiUrl}/user/getuserdetailsbymail`, {
//         email: email,
//       });
//       setUserDetails(res.data.response);
//       console.log(res.data.response);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const formatDate = (date) => {
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const currentDate = new Date();
//   const formattedDate = formatDate(currentDate);
//   return (
//     <Box
//       fontFamily="Arial, sans-serif"
//       p="40px"
//       backgroundPosition="center"
//       backgroundSize="cover"
//       backgroundRepeat="no-repeat"
//       minHeight="100vh"
//     >
//       {/* Horizontal Satyamev Jayate */}
//       <Heading
//         as="h2"
//         size="lg"
//         textAlign="center"
//         color="purple.700"
//         mb="20px"
//         borderBottom="1px solid black"
//       >
//         सत्यमेव जयते
//       </Heading>

//       {/* Top Bar with Flex layout for Police HQ Image */}
//       <Flex justify="center" align="center" mb="40px">
//         <Image
//           src={policeHQImage}
//           alt="Police Headquarters"
//           boxSize="120px"
//           objectFit="contain"
//         />
//       </Flex>

//       <Divider />

//       <Heading color={"red"} size="1.5rem" textAlign="center" mb="20px">
//         First Information Report (FIR)
//       </Heading>
//       <Text textAlign="center" fontSize="0.9rem" fontWeight="bold" mb="30px">
//         Breach of Agreement - Contract Violation
//       </Text>

//       <Stack spacing={6} fontSize="lg">
//         <Text fontSize={"0.9rem"}>
//           <strong>Complainant Name:</strong> {userDetails?.name}
//         </Text>
//         <Text fontSize={"0.9rem"}>
//           <strong>Complaint Date:</strong> {formattedDate}
//         </Text>

//         <Text fontSize={"0.9rem"}>
//           <strong>Address:</strong> {userDetails?.address}
//         </Text>
//         <Text fontSize={"0.8rem"}>
//           This Is a Letter Including Your Details on Behalf Of{" "}
//           <Text as="span" color="red.500">
//             Trickline Enterprises
//           </Text>
//           . Kindly Note the Details And Make Arrangement For Your Legal
//           Proceedings. Kindly Note The Details Given Details Are Being Sent At
//           Jodhpur Consumer Court For Further Legal Proceedings And You Need To
//           Be Present On Delhi Consumer Court And The Case Is To Be Filled Under
//           ICA Section 73,74 With The Challan Amount Of{" "}
//           <Text as="span" color="red.500">
//             78,980/- INR
//           </Text>
//           .
//         </Text>
//         <Text>
//           <strong>Case Type:</strong>{" "}
//           <Text as="span" color="red.500">
//             Breach of Agreement
//           </Text>
//         </Text>

//         <Text>
//           <strong>F.I.R Number:</strong>{" "}
//           <Text as="span" color="red.500">
//             AG562/87987
//           </Text>
//         </Text>
//         <Text>
//           <strong>Approval Status:</strong>{" "}
//           <Text as="span" color="red.500">
//             Pending By District Court
//           </Text>
//         </Text>
//       </Stack>

//       <Divider my="30px" />

//       <Heading as="h3" size="lg" textAlign="center" mb="20px" color="red">
//         शांति सेवा न्याय
//       </Heading>

//       <Box
//         display={"flex"}
//         justifyContent={"space-between"}
//         mt="40px"
//         textAlign="center"
//         fontSize="sm"
//         borderTop="1px solid #000"
//         pt="20px"
//       >
//         <Image
//           src={advocte}
//           alt="Police Headquarters"
//           boxSize="120px"
//           objectFit="contain"
//           borderRadius="100%"
//           border="2px solid"
//           borderColor="purple.500"
//         />
//         <Image src={advocatesign} alt="Police Headquarters" boxSize="150px" />
//       </Box>
//     </Box>
//   );
// }

// export default FIR;

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Image,
//   Heading,
//   Text,
//   Stack,
//   Divider,
//   Flex,
// } from "@chakra-ui/react";

// // Import the sample images
// import policeHQImage from "../../Images/jodhpur police stamp.jpg";
// import map from "../../Images/indianmapyellow.webp";
// import satyamev from "../../Images/satyamev jayate.jpg";
// import advocte from "../../Images/advocatestamp.png";
// import advocatesign from "../../Images/advocatesign.png";
// import { useLocation } from "react-router-dom";
// import { useToast } from "@chakra-ui/react";
// import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function FIR() {
//   const [userDetails, setUserDetails] = useState(null);
//   const [email, setEmail] = useState("");
//   const apiUrl = import.meta.env.VITE_APP_API_URL;

//   useEffect(() => {
//     const urlParts = window.location.pathname.split("/");
//     const userId = urlParts[urlParts.length - 1];
//     console.log(userId, "userId");

//     const getUserDetailsById = async () => {
//       try {
//         const res = await axios.post(`${apiUrl}/user/getuserbyid`, {
//           userId: userId,
//         });
//         setUserDetails(res.data.User);
//       } catch (e) {
//         console.log(e);
//       }
//     };

//     getUserDetailsById();

//     setTimeout(() => {
//       window.print();
//     }, 2000);
//   }, []);

//   const handleGetUserDetails = async () => {
//     try {
//       const res = await axios.post(`${apiUrl}/user/getuserdetailsbymail`, {
//         email: email,
//       });
//       setUserDetails(res.data.response);
//       console.log(res.data.response);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const formatDate = (date) => {
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const currentDate = new Date();
//   const formattedDate = formatDate(currentDate);
//   return (
//     <Box
//       fontFamily="Arial, sans-serif"
//       p="40px"
//       backgroundPosition="center"
//       backgroundSize="cover"
//       backgroundRepeat="no-repeat"
//       minHeight="100vh"
//     >
//       {/* Horizontal Satyamev Jayate */}
//       <Heading
//         as="h2"
//         size="lg"
//         textAlign="center"
//         color="purple.700"
//         mb="20px"
//         borderBottom="1px solid black"
//       >
//         सत्यमेव जयते
//       </Heading>

//       {/* Top Bar with Flex layout for Police HQ Image */}
//       <Flex justify="center" align="center" mb="40px">
//         <Image
//           src={policeHQImage}
//           alt="Police Headquarters"
//           boxSize="120px"
//           objectFit="contain"
//         />
//       </Flex>

//       <Divider />

//       <Heading color={"red"} size="1.5rem" textAlign="center" mb="20px">
//         First Information Report (FIR)
//       </Heading>
//       <Text textAlign="center" fontSize="0.9rem" fontWeight="bold" mb="30px">
//         Breach of Agreement - Contract Violation
//       </Text>

//       <Stack spacing={6} fontSize="lg">
//         <Text fontSize={"0.9rem"}>
//           <strong>Complainant Name:</strong> {userDetails?.name}
//         </Text>
//         <Text fontSize={"0.9rem"}>
//           <strong>Complaint Date:</strong> {formattedDate}
//         </Text>

//         <Text fontSize={"0.9rem"}>
//           <strong>Address:</strong> {userDetails?.address}
//         </Text>
//         <Text fontSize={"0.8rem"}>
//           This Is a Letter Including Your Details on Behalf Of{" "}
//           <Text as="span" color="red.500">
//             Trickline Enterprises
//           </Text>
//           . Kindly Note the Details And Make Arrangement For Your Legal
//           Proceedings. Kindly Note The Details Given Details Are Being Sent At
//           Jodhpur Consumer Court For Further Legal Proceedings And You Need To
//           Be Present On Delhi Consumer Court And The Case Is To Be Filled Under
//           ICA Section 73,74 With The Challan Amount Of{" "}
//           <Text as="span" color="red.500">
//             78,980/- INR
//           </Text>
//           .
//         </Text>
//         <Text>
//           <strong>Case Type:</strong>{" "}
//           <Text as="span" color="red.500">
//             Breach of Agreement
//           </Text>
//         </Text>

//         <Text>
//           <strong>F.I.R Number:</strong>{" "}
//           <Text as="span" color="red.500">
//             AG562/87987
//           </Text>
//         </Text>
//         <Text>
//           <strong>Approval Status:</strong>{" "}
//           <Text as="span" color="red.500">
//             Pending By District Court
//           </Text>
//         </Text>
//       </Stack>

//       <Divider my="30px" />

//       <Heading as="h3" size="lg" textAlign="center" mb="20px" color="red">
//         शांति सेवा न्याय
//       </Heading>

//       <Box
//         display={"flex"}
//         justifyContent={"space-between"}
//         mt="40px"
//         textAlign="center"
//         fontSize="sm"
//         borderTop="1px solid #000"
//         pt="20px"
//       >
//         <Image
//           src={advocte}
//           alt="Police Headquarters"
//           boxSize="120px"
//           objectFit="contain"
//           borderRadius="100%"
//           border="2px solid"
//           borderColor="purple.500"
//         />
//         <Image src={advocatesign} alt="Police Headquarters" boxSize="150px" />
//       </Box>
//     </Box>
//   );
// }

// export default FIR;

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Image,
//   Heading,
//   Text,
//   Stack,
//   Divider,
//   Flex,
// } from "@chakra-ui/react";
// import policeHQImage from "../../Images/jodhpur police stamp.jpg";
// import advocte from "../../Images/advocatestamp.png";
// import advocatesign from "../../Images/advocatesign.png";
// import backgroundImage from "../../Images/firbackgroundimage.jpg";
// import axios from "axios";

// function FIR() {
//   const [userDetails, setUserDetails] = useState(null);
//   const apiUrl = import.meta.env.VITE_APP_API_URL;

//   useEffect(() => {
//     const urlParts = window.location.pathname.split("/");
//     const userId = urlParts[urlParts.length - 1];

//     const getUserDetailsById = async () => {
//       try {
//         const res = await axios.post(`${apiUrl}/user/getuserbyid`, {
//           userId: userId,
//         });
//         setUserDetails(res.data.User);
//       } catch (e) {
//         console.log(e);
//       }
//     };

//     getUserDetailsById();

//     setTimeout(() => {
//       window.print();
//     }, 2000);
//   }, []);

//   const formatDate = (date) => {
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const currentDate = new Date();
//   const formattedDate = formatDate(currentDate);

//   return (
//     <Box
//       fontFamily="Arial, sans-serif"
//       p="20px"
//       backgroundImage={"backgroundImage"}
//       backgroundPosition="center"
//       backgroundSize="cover"
//       backgroundRepeat="no-repeat"
//       minHeight="100vh"
//       width="100%"
//       maxWidth="800px"
//       mx="auto"
//       color="blackAlpha.800"
//     >

//       <Heading
//         mt={"4rem"}
//         as="h1"
//         size="lg"
//         textAlign="center"
//         color="purple.700"
//         mb="10px"
//         borderBottom="1px solid black"
//       >
//         सत्यमेव जयते
//       </Heading>

//       <Flex justify="center" align="center" mb="10px">
//         <Image
//           src={policeHQImage}
//           alt="Police Headquarters"
//           boxSize="120px"
//           objectFit="contain"
//         />
//       </Flex>

//       <Divider />

//       <Heading mt={"1rem"} color={"red"} size="md" textAlign="center" mb="10px">
//         First Information Report (FIR)
//       </Heading>
//       <Text
//         mt={"1rem"}
//         textAlign="center"
//         fontSize="0.7rem"
//         fontWeight="bold"
//         mb="15px"
//       >
//         Breach of Agreement - Contract Violation
//       </Text>

//       <Stack spacing={3} fontSize="0.8rem">
//         <Text>
//           <strong>Complainant Name:</strong> {userDetails?.name}
//         </Text>
//         <Text>
//           <strong>Complaint Date:</strong> {formattedDate}
//         </Text>
//         <Text>
//           <strong>Address:</strong> {userDetails?.address}
//         </Text>
//         <Text>
//           This Is a Letter Including Your Details on Behalf Of{" "}
//           <Text as="span" color="red.500">
//             Trickline Enterprises
//           </Text>
//           . Kindly Note the Details And Make Arrangement For Your Legal
//           Proceedings.
//         </Text>
//         <Text>
//           <strong>Case Type:</strong>{" "}
//           <Text as="span" color="red.500">
//             Breach of Agreement
//           </Text>
//         </Text>
//         <Text>
//           <strong>F.I.R Number:</strong>{" "}
//           <Text as="span" color="red.500">
//             AG562/87987
//           </Text>
//         </Text>
//         <Text>
//           <strong>Approval Status:</strong>{" "}
//           <Text as="span" color="red.500">
//             Pending By District Court
//           </Text>
//         </Text>
//       </Stack>

//       <Divider my="15px" />

//       <Heading
//         mt={"3rem"}
//         as="h3"
//         size="md"
//         textAlign="center"
//         mb="10px"
//         color="red"
//       >
//         शांति सेवा न्याय
//       </Heading>

//       <Box
//         display={"flex"}
//         justifyContent={"space-between"}
//         mt={"3rem"}
//         textAlign="center"
//         fontSize="md"
//         borderTop="1px solid #000"
//         pt="10px"
//       >
//         <Image
//           mt={"1rem"}
//           src={advocte}
//           alt="Advocate Stamp"
//           boxSize="100px"
//           objectFit="contain"
//           borderRadius="100%"
//         />
//         <Image
//           mt={"1rem"}
//           bg={"red"}
//           height={"0rem"}
//           src={advocatesign}
//           alt="Advocate Signature"
//           boxSize="100px"
//         />
//       </Box>
//     </Box>
//   );
// }

// export default FIR;

import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Stack,
  Divider,
  Flex,
} from "@chakra-ui/react";
import policeHQImage from "../../Images/jodhpur police stamp.jpg";
import advocte from "../../Images/advocatestamp.png";
import advocatesign from "../../Images/advocatesign.png";
import backgroundImage from "../../Images/firbackgroundimage.jpg";
import axios from "axios";

function FIR() {
  const [userDetails, setUserDetails] = useState(null);
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const urlParts = window.location.pathname.split("/");
    const userId = urlParts[urlParts.length - 1];

    const getUserDetailsById = async () => {
      try {
        const res = await axios.post(`${apiUrl}/user/getuserbyid`, {
          userId: userId,
        });
        setUserDetails(res.data.User);
      } catch (e) {
        console.log(e);
      }
    };

    getUserDetailsById();

    setTimeout(() => {
      window.print();
    }, 2000);
  }, []);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  return (
    <Box
      fontFamily="Arial, sans-serif"
      p="40px"
      position="relative"
      minHeight="100vh"
      color="gray.900"
      backgroundColor="white"
      sx={{
        "@media print": {
          background: "none", // Remove default background for print
          "-webkit-print-color-adjust": "exact", // Ensures colors are adjusted during printing
          "print-color-adjust": "exact", // Ensures print color is rendered accurately
        },
      }}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex="-1"
        background={`url(${backgroundImage})`}
        backgroundPosition="center center" // Ensures the image is centered
        backgroundSize="cover" // Ensures the image covers the entire area without cutting
        opacity="0.1" // Very faint opacity for the background image
        backgroundColor="rgba(255, 255, 255, 0.8)" // White overlay for transparent effect
      />
      {/* Children or content passed to the component */}

      <Heading
        mt={"4rem"}
        as="h1"
        size="lg"
        textAlign="center"
        color="purple.700"
        mb="10px"
        borderBottom="1px solid black"
      >
        सत्यमेव जयते
      </Heading>

      <Flex justify="center" align="center" mb="10px">
        <Image
          src={policeHQImage}
          alt="Police Headquarters"
          boxSize="120px"
          objectFit="contain"
        />
      </Flex>

      <Divider />

      <Heading mt={"1rem"} color={"red"} size="md" textAlign="center" mb="10px">
        First Information Report (FIR)
      </Heading>
      <Text
        mt={"1rem"}
        textAlign="center"
        fontSize="0.7rem"
        fontWeight="bold"
        mb="15px"
      >
        Breach of Agreement - Contract Violation
      </Text>

      <Stack spacing={3} fontSize="0.8rem">
        <Text>
          <strong>Complainant Name:</strong> {userDetails?.name}
        </Text>
        <Text>
          <strong>Complaint Date:</strong> {formattedDate}
        </Text>
        <Text>
          <strong>Address:</strong> {userDetails?.address}
        </Text>
        <Text>
          This Is a Letter Including Your Details on Behalf Of{" "}
          <Text as="span" color="red.500">
            Alfabet Service
          </Text>
          . Kindly Note the Details And Make Arrangement For Your Legal
          Proceedings.
        </Text>
        <Text>
          <strong>Case Type:</strong>{" "}
          <Text as="span" color="red.500">
            Breach of Agreement
          </Text>
        </Text>
        <Text>
          <strong>F.I.R Number:</strong>{" "}
          <Text as="span" color="red.500">
            AG562/87987
          </Text>
        </Text>
        <Text>
          <strong>Approval Status:</strong>{" "}
          <Text as="span" color="red.500">
            Pending By District Court
          </Text>
        </Text>
      </Stack>

      <Divider my="15px" />

      <Heading
        mt={"3rem"}
        as="h3"
        size="md"
        textAlign="center"
        mb="10px"
        color="red"
      >
        शांति सेवा न्याय
      </Heading>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        mt={"3rem"}
        textAlign="center"
        fontSize="md"
        borderTop="1px solid #000"
        pt="10px"
      >
        <Image
          mt={"1rem"}
          src={advocte}
          alt="Advocate Stamp"
          boxSize="100px"
          objectFit="contain"
          borderRadius="100%"
        />
        <Image
          mt={"1rem"}
          bg={"red"}
          height={"0rem"}
          src={advocatesign}
          alt="Advocate Signature"
          boxSize="100px"
        />
      </Box>
    </Box>
  );
}

export default FIR;
