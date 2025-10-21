// import React, { useState, useEffect } from "react";
// import "./QcReport.css";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { Box, Center, Flex, Input, Stack, Text } from "@chakra-ui/react";

// function QcReport() {
//   const location = useLocation();
//   console.log(location, "location");
//   const state = location.state;
//   console.log(state, "statedata");
//   const [data, setData] = useState([]);
//   const apiUrl = import.meta.env.VITE_APP_API_URL;
//   useEffect(() => {
//     const getrandomassignment = async () => {
//       try {
//         const apidata = await axios.get(
//           `${apiUrl}/assignment/getrandomassignment`
//         );
//         console.log(apidata, "123456");
//         setData(apidata.data.assignments);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getrandomassignment();
//   }, []);

//   const [randomFields, setRandomFields] = useState([]);

//   useEffect(() => {
//     // Randomly select one field (either 'licencenumber' or 'ip') for each object to be highlighted
//     const fields = ["licencenumber", "ip"]; // Fields to choose from
//     const randomFieldsArray = data.map(() => {
//       const randomIndex = Math.floor(Math.random() * fields.length); // Random field index
//       return fields[randomIndex]; // Set the selected field for red border
//     });
//     setRandomFields(randomFieldsArray); // Set the selected fields for red border
//   }, [data]);

//   const hasError = (fieldKey, objectIndex) => {
//     // Highlight the field if it matches the random field for the current object
//     return fieldKey === randomFields[objectIndex] ? "error" : "";
//   };

//   setTimeout(() => {
//     window.print();
//   }, 2000);
// }, []);
  

//   return (
//     <>
//   <Center color={"red"} fontSize={"1.3rem"} fontWeight={"600"}>
    
//      QC Report </Center>
// <Center mb={"1rem"}>
// <Box 
//       borderWidth="1px" 
//       borderRadius="lg" 
//       p={4} 
//       boxShadow="md" 
//       maxW="100vw" 
//       margin="auto" 
//       bg="#8bd6b2" // Light background color
     
//     >
//       <Flex direction="row" spacing={4}>
//         {/* Name Row */}
//         <Flex
//         width={["20vw" , "25vw"]}
//         direction="column" mb={4}>
//           <Text fontWeight="bold">Name:</Text>
//           <Text>{state.name}</Text>
//         </Flex>

//         {/* Mobile Row */}
//         <Flex
        
//         width={["20vw" , "15vw"]}
//         direction="column" mb={4}>
//           <Text fontWeight="bold">Mobile:</Text>
//           <Text>{state.mobile}</Text>
//         </Flex>

//         {/* Address Row */}
       
//         <Flex
//          width={["20vw" , "15vw"]}
//         direction="column" mb={4}>
//           <Text fontWeight="bold">Start-Date:</Text>
//           <Text >{state.startDate.slice(0, 10)}</Text> {/* Slicing here */}
//         </Flex>
//         <Flex 
        
//         width={["20vw" ,"10vw"]}
//         direction="column" mb={4}>
//           <Text fontWeight="bold">End-Date:</Text>
//           <Text 
//           // bg={"black"}
//        >{state.endDate.slice(0, 10)}</Text> {/* Slicing here */}
//         </Flex>

//         <Flex 
//          width={["20vw" , "10vw"]}
//         direction="column" mb={4}>
//           <Text fontWeight="bold">Total Form:</Text>
//           <Text>530</Text>
//         </Flex>

//         {/* Correct Form Row */}
//         <Flex
//          width={["20vw" , "10vw"]}
//         direction="column" mb={4}>
//           <Text fontWeight="bold">Correct Form</Text>
//           <Text>{state?.correctAssignmentCount}</Text>
//         </Flex>

//         {/* Incorrect Form Row */}
//         <Flex 
//           width={["20vw" , "10vw"]}
//         direction="column" mb={4}>
//           <Text fontWeight="bold">Incorrect Form</Text>
//           <Text>{state?.incorrectAssignmentCount}</Text>
//         </Flex>
//       </Flex>
//     </Box>
//     </Center>
//       {/* <div>
//         {data.map((item, index) => (
//           <div key={index} className="form-container">
//             <div className={`form-group ${hasError("firstname", index)}`}>
//               <label>First Name:</label>
//               <input type="text" value={item.firstname} readOnly />
//             </div>

//             <div className={`form-group ${hasError("lastname", index)}`}>
//               <label>Last Name:</label>
//               <input type="text" value={item.lastname} readOnly />
//             </div>

//             <div className={`form-group ${hasError("email", index)}`}>
//               <label>Email:</label>
//               <input type="text" value={item.email} readOnly />
//             </div>

//             <div className={`form-group ${hasError("phonenumber", index)}`}>
//               <label>Phone Number:</label>
//               <input type="text" value={item.phonenumber} readOnly />
//             </div>

//             <div className={`form-group ${hasError("licencenumber", index)}`}>
//               <label>License Number:</label>
//               <input type="text" value={item.licencenumber} readOnly />
//             </div>

//             <div className={`form-group ${hasError("ip", index)}`}>
//               <label>IP:</label>
//               <input type="text" value={item.ip} readOnly />
//             </div>

//             <div className={`form-group ${hasError("zipcode", index)}`}>
//               <label>Zip Code:</label>
//               <input type="text" value={item.zipcode} readOnly />
//             </div>
           
//           </div>
//         ))}
//       </div> */}
//       <div>
//   {data.map((item, index) => (
//     <Box
//       key={index}
//       p={4}
//       bg="#f7f7f7"
//       mb={4}
//       borderRadius="md"
//       boxShadow="md"
//     >
//       <Flex justify="space-between" mb={2} flexWrap="wrap">
//         <Box flex="1" minWidth="150px" mr={2} className={hasError("firstname", index)}>
//           <Text fontWeight="bold">First Name:</Text>
//           <Input value={item.firstname} readOnly />
//         </Box>

//         <Box flex="1" minWidth="150px" mr={2} className={hasError("lastname", index)}>
//           <Text fontWeight="bold">Last Name:</Text>
//           <Input value={item.lastname} readOnly />
//         </Box>

//         <Box flex="1" minWidth="150px" className={hasError("email", index)}>
//           <Text fontWeight="bold">Email:</Text>
//           <Input value={item.email} readOnly />
//         </Box>
//       </Flex>

//       <Flex justify="space-between" mb={2} flexWrap="wrap">
//         <Box flex="1" minWidth="150px" mr={2} className={hasError("phonenumber", index)}>
//           <Text fontWeight="bold">Phone Number:</Text>
//           <Input value={item.phonenumber} readOnly />
//         </Box>

//         <Box flex="1" minWidth="150px" mr={2} className={hasError("licencenumber", index)}>
//           <Text fontWeight="bold">License Number:</Text>
//           <Input value={item.licencenumber} readOnly />
//         </Box>

//         <Box flex="1" minWidth="150px" className={hasError("ip", index)}>
//           <Text fontWeight="bold">IP:</Text>
//           <Input value={item.ip} readOnly />
//         </Box>
//       </Flex>

//       <Flex justify="space-between" mb={2} flexWrap="wrap">
//         <Box flex="1" minWidth="150px" className={hasError("zipcode", index)}>
//           <Text fontWeight="bold">Zip Code:</Text>
//           <Input value={item.zipcode} readOnly />
//         </Box>
//       </Flex>

//       {/* Dashed Border Line */}
//       {index < data.length - 1 && (
//         <Box as="hr" borderColor="gray.300" borderWidth="1px" borderStyle="dashed" my={4} />
//       )}
//     </Box>
//   ))}
// </div>
//     </>
//   );
// }

// export default QcReport;


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Box, Center, Flex, Input, Text } from "@chakra-ui/react";
import "./QcReport.css";

function QcReport() {
  const location = useLocation();
  const state = location.state;
  const [data, setData] = useState([]);
  const [randomFields, setRandomFields] = useState([]);
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  // Fetch data from API
  useEffect(() => {
    const getRandomAssignment = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/assignment/getrandomassignment`
        );
        setData(response.data.assignments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getRandomAssignment();
  }, [apiUrl]);

  // Randomly select a field (either 'licencenumber' or 'ip') for highlighting
  useEffect(() => {
    if (data.length > 0) {
      const fields = ["licencenumber", "ip"];
      setRandomFields(
        data.map(() => fields[Math.floor(Math.random() * fields.length)])
      );
    }
  }, [data]);

  // Automatically trigger print after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Check if a field should have an error highlight
  const hasError = (fieldKey, objectIndex) =>
    fieldKey === randomFields[objectIndex] ? "error" : "";

  return (
    <>
      <Center color="red" fontSize="1.3rem" fontWeight="600">
        QC Report
      </Center>
      <Center mb="1rem">
        <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md" maxW="100vw" margin="auto" bg="#8bd6b2">
          <Flex direction="row" wrap="wrap">
            {/* Name */}
            <Box width={["20vw", "25vw"]} mb={4}>
              <Text fontWeight="bold">Name:</Text>
              <Text>{state?.name}</Text>
            </Box>

            {/* Mobile */}
            <Box width={["20vw", "15vw"]} mb={4}>
              <Text fontWeight="bold">Mobile:</Text>
              <Text>{state?.mobile}</Text>
            </Box>

            {/* Start Date */}
            <Box width={["20vw", "15vw"]} mb={4}>
              <Text fontWeight="bold">Start Date:</Text>
              <Text>{state?.startDate?.slice(0, 10)}</Text>
            </Box>

            {/* End Date */}
            <Box width={["20vw", "10vw"]} mb={4}>
              <Text fontWeight="bold">End Date:</Text>
              <Text>{state?.endDate?.slice(0, 10)}</Text>
            </Box>

            {/* Total Forms */}
            <Box width={["20vw", "10vw"]} mb={4}>
              <Text fontWeight="bold">Total Forms:</Text>
              <Text>530</Text>
            </Box>

            {/* Correct Forms */}
            <Box width={["20vw", "10vw"]} mb={4}>
              <Text fontWeight="bold">Correct Forms:</Text>
              <Text>{state?.correctAssignmentCount}</Text>
            </Box>

            {/* Incorrect Forms */}
            <Box width={["20vw", "10vw"]} mb={4}>
              <Text fontWeight="bold">Incorrect Forms:</Text>
              <Text>{state?.incorrectAssignmentCount}</Text>
            </Box>
          </Flex>
        </Box>
      </Center>

      {/* Display assignment details */}
      <div>
        {data.map((item, index) => (
          <Box key={index} p={4} bg="#f7f7f7" mb={4} borderRadius="md" boxShadow="md">
            <Flex justify="space-between" mb={2} flexWrap="wrap">
              <Box flex="1" minWidth="150px" mr={2} className={hasError("firstname", index)}>
                <Text fontWeight="bold">First Name:</Text>
                <Input value={item.firstname} readOnly />
              </Box>

              <Box flex="1" minWidth="150px" mr={2} className={hasError("lastname", index)}>
                <Text fontWeight="bold">Last Name:</Text>
                <Input value={item.lastname} readOnly />
              </Box>

              <Box flex="1" minWidth="150px" className={hasError("email", index)}>
                <Text fontWeight="bold">Email:</Text>
                <Input value={item.email} readOnly />
              </Box>
            </Flex>

            <Flex justify="space-between" mb={2} flexWrap="wrap">
              <Box flex="1" minWidth="150px" mr={2} className={hasError("phonenumber", index)}>
                <Text fontWeight="bold">Phone Number:</Text>
                <Input value={item.phonenumber} readOnly />
              </Box>

              <Box flex="1" minWidth="150px" mr={2} className={hasError("licencenumber", index)}>
                <Text fontWeight="bold">License Number:</Text>
                <Input value={item.licencenumber} readOnly />
              </Box>

              <Box flex="1" minWidth="150px" className={hasError("ip", index)}>
                <Text fontWeight="bold">IP:</Text>
                <Input value={item.ip} readOnly />
              </Box>
            </Flex>

            <Flex justify="space-between" mb={2} flexWrap="wrap">
              <Box flex="1" minWidth="150px" className={hasError("zipcode", index)}>
                <Text fontWeight="bold">Zip Code:</Text>
                <Input value={item.zipcode} readOnly />
              </Box>
            </Flex>

            {/* Dashed Border Line */}
            {index < data.length - 1 && (
              <Box as="hr" borderColor="gray.300" borderWidth="1px" borderStyle="dashed" my={4} />
            )}
          </Box>
        ))}
      </div>
    </>
  );
}

export default QcReport;

