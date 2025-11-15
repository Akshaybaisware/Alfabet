// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Input,
//   Select,
//   Stack,
//   StackDivider,
// } from "@chakra-ui/react";
// import axios from "axios";
// import React, { useEffect, useRef } from "react";
// // import "./EmployeeProfileEdit.css";
// import { useState } from "react";

// import { Link, useNavigate, useParams } from "react-router-dom";

// const EditRegistration = () => {
//   const apiUrl = import.meta.env.VITE_APP_API_URL;
//   // getting id from params
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   console.log(userId);

//   const [inputField, setInputField] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     address: "",
//     plan: "",
//     accessCode: "",
//     caller: "",
//     endDate: "",
//     startDate: "",
//     status: "",
//   });

//   // useEffect to call
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get(
//           `${apiUrl}/user/getuser_by_id/${userId}`
//         );
//         const data = response.data;
//         console.log(data?.User.name);
//         console.log(data?.User);
//         setInputField({
//           name: data?.User?.name,
//           email: data?.User?.email,
//           mobile: data?.User?.mobile,
//           address: data?.User?.address,
//           plan: "",
//           accessCode: data?.User?.access,
//           caller: data?.User?.caller,
//           endDate: formatDate(data?.User?.endDate),
//           startDate: formatDate(data?.User?.startDate),
//           status: "",
//         });
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };

//     fetchUserDetails();
//   }, [userId]);

//   const formatDate = (dateString) => {
//     const options = { day: "2-digit", month: "2-digit", year: "numeric" };
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-GB", options);
//   };

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     let formattedValue = value;

//     if (name.includes("Date")) {
//       formattedValue = formatDate(new Date(value));
//     }

//     setInputField((prevValue) => ({
//       ...prevValue,
//       [name]: formattedValue,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(inputField);
//     try {
//       const response = await axios.put(
//         `${apiUrl}/user/edit_user/${userId}`,
//         inputField,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       console.log(response);
//       alert("Saved successfully.");
//       navigate("/user/registration");
//     } catch (error) {
//       console.log(`Error is ${error}`);
//     }
//   };

//   return (
//     <Box
//       marginBottom={"1rem"}
//       marginLeft={"1rem"}
//       marginTop={"1rem"}
//       className="employee-form-container"
//     >
//       <form className="employee-form" onSubmit={handleSubmit}>
//         <Stack direction={{ base: "column", md: "row" }}>
//           <Box>
//             <FormControl className="employee-form-group">
//               <FormLabel>Name</FormLabel>
//               <Input
//                 width={{ base: "300px", md: "400px" }}
//                 type="text"
//                 placeholder="Kaveri Kappor"
//                 name="name"
//                 value={inputField.name}
//                 onChange={onChangeHandler}
//               />
//             </FormControl>
//           </Box>
//           <Box>
//             <FormControl className="employee-form-group">
//               <FormLabel>Email</FormLabel>
//               <Input
//                 name="email"
//                 value={inputField.email}
//                 onChange={onChangeHandler}
//                 width={{ base: "300px", md: "400px" }}
//                 type="email"
//                 mailto:placeholder="kaveri@gmail.com"
//               />
//             </FormControl>
//           </Box>
//         </Stack>
//         <Stack direction={["column", "row"]}>
//           <Box>
//             <FormControl className="employee-form-group">
//               <FormLabel>Password</FormLabel>
//               <Input
//                 name="password"
//                 value={inputField.password}
//                 onChange={onChangeHandler}
//                 width={{ base: "300px", md: "400px" }}
//                 type="password"
//                 placeholder="kaveri@2023"
//               />
//             </FormControl>
//           </Box>
//           {/* <Box>
//             <FormControl className="employee-form-group">
//               <FormLabel>Access Code</FormLabel>
//               <Input
//                 name="name"
//                 value={inputField.accessCode}
//                 onChange={onChangeHandler}
//                 width={{ base: "300px", md: "400px" }}
//                 type="text"
//                 placeholder="Access Code"
//               />
//             </FormControl>
//           </Box> */}
//         </Stack>

//         <Stack direction={["column", "row"]}>
//           <Box>
//             <FormControl className="employee-form-group">
//               <FormLabel>Mobile</FormLabel>
//               <Input
//                 width={{ base: "300px", md: "400px" }}
//                 type="number"
//                 name="mobile"
//                 value={inputField.mobile}
//                 onChange={onChangeHandler}
//                 placeholder="kaveri@2023"
//               />
//             </FormControl>
//           </Box>
//           <Box>
//             <FormControl className="employee-form-group">
//               <FormLabel>Address</FormLabel>
//               <Input
//                 width={{ base: "300px", md: "400px" }}
//                 type="text"
//                 placeholder="Address"
//                 name="address"
//                 value={inputField.address}
//                 onChange={onChangeHandler}
//               />
//             </FormControl>
//           </Box>
//         </Stack>

//         <Stack direction={["column", "row"]}>
//           <Box>
//             <FormControl className="employee-form-group">
//               <FormLabel>Caller</FormLabel>
//               <Input
//                 width={{ base: "300px", md: "400px" }}
//                 type="text"
//                 placeholder="kaveri@2023"
//                 name="caller"
//                 value={inputField.caller}
//                 onChange={onChangeHandler}
//               />
//             </FormControl>
//           </Box>
//           <Box>
//             <FormControl className="employee-form-group">
//               <FormLabel>Amount</FormLabel>
//               <Input
//                 width={{ base: "300px", md: "400px" }}
//                 type="number"
//                 placeholder="Address"
//                 name="plan"
//                 value={inputField.plan}
//                 onChange={onChangeHandler}
//               />
//             </FormControl>
//           </Box>
//         </Stack>
//         <Stack direction={["column", "row"]}>
//           <Box>
//             <FormControl className="employee-form-group">
//               <FormLabel>Start Date</FormLabel>
//               <Input
//                 type="Date"
//                 width={{ base: "300px", md: "400px" }}
//                 name="startDate"
//                 value={inputField.startDate}
//                 onChange={onChangeHandler}
//               />
//             </FormControl>
//           </Box>
//           <Box>
//             <FormControl className="employee-form-group">
//               <FormLabel>End date</FormLabel>
//               <Input
//                 type="Date"
//                 width={{ base: "300px", md: "400px" }}
//                 name="endDate"
//                 value={inputField.endDate}
//                 onChange={onChangeHandler}
//               />
//             </FormControl>
//           </Box>
//         </Stack>
//         <Box>
//           <FormControl className="employee-form-group">
//             <FormLabel>Remark</FormLabel>
//             <Input
//               width={{ base: "300px", md: "400px" }}
//               type="text"
//               placeholder="Remark"
//               name=""
//             />
//           </FormControl>
//         </Box>

//         <Button
//           className="employee-btn"
//           colorScheme="teal"
//           mt="4"
//           type="submit"
//         >
//           Save
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default EditRegistration;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Center,
  Textarea,
  FormControl,
  FormLabel,
  Box,
  Button,
} from "@chakra-ui/react";
import { color } from "framer-motion";

const EditClientComponent = () => {
  const location = useLocation();
  const toast = useToast();
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    otp: "",
    name: "",
    address: "",
    email: "",
    mobileNo: "",
    startDate: "",
    endDate: "",
    caller: "",
  });
  console.log(userData, "userData");

  // Extracting data from location.state if available
  const rowData = location.state?.data;
  console.log(location.state, "rawdata");
  const UserId = location.state?.userId;

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  // Function to update state when rowData is available
  useEffect(() => {
    if (rowData) {
      setUserData(rowData);
    }
  }, [rowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "handle change");
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract user ID from the URL parameter
    // console.log(rawData, "asdasds");
    console.log(userData, "userdata");
    const userId = userData._id;

    // Send PUT request to update user details
    try {
      const response = await fetch(
        `${apiUrl}/user/edituser/${userId}`,
        // `http://localhost:5000/api/user/edituser/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      console.log(response, "responsee");
      if (response.ok) {
        // Handle success
        toast({
          title: "User details updated successfully!",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        // navigate(`user/editregistration/${userId}`);

        console.log("User details updated successfully!");
      } else {
        // Handle error
        toast({
          title: "Failed to update user details",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        console.error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Box mt={"3rem"}>
        <Center
          bg={"purple"}
          _hover={{
            bg: "purple.600", // Darken the background color on hover
            transform: "scale(1.05)", // Slightly increase the size on hover
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add a shadow on hover
          }}
          fontWeight={600}
          p={4} // Optional: Adding some padding for better spacing
        >
          Client Details
        </Center>
        <Box p={"1rem"} maxW="600px" mx="auto" mt="4">
          <form onSubmit={handleSubmit}>
            <FormControl mb="4">
              <FormLabel>User Name</FormLabel>
              <Input
                name="userName"
                value={userData.email}
                onChange={handleChange}
                placeholder="User Name"
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Address</FormLabel>
              <Textarea
                name="address"
                value={userData.address}
                onChange={handleChange}
                placeholder="Address"
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Mobile No</FormLabel>
              <Input
                type="tel"
                name="mobileNo"
                value={userData.mobile}
                onChange={handleChange}
                placeholder="Mobile No"
              />
            </FormControl>

            {/* <FormControl mb="4">
            <FormLabel>Start Date</FormLabel>
            <Input

              name="startDate"
              value={userData.startDate}
              onChange={handleChange}
            />
          </FormControl> */}
            <FormControl mb="4">
              <FormLabel>Start Date</FormLabel>
              <Input
                name="startDate"
                type="date"
               value={userData?.startDate ? userData.startDate.slice(0, 10) : ""}

                onChange={(event) => {
                  // Get the input value from the event
                  const inputValue = event.target.value;

                  // Parse the input value as a date
                  const date = new Date(inputValue);

                  // Format the date to 'yyyy-MM-dd' format to remove time
                  const formattedDate = format(date, "yyyy-MM-dd");

                  // Call handleChange with the formatted date
                  handleChange({
                    target: { name: event.target.name, value: formattedDate },
                  });
                }}
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>End Date</FormLabel>
              <Input
                name="endDate"
                type="date"
                value={userData?.endDate?userData.endDate.slice(0, 10):""}
                onChange={handleChange}
              />
            </FormControl>

            <Button
              type="submit"
              color={"white"}
              bg={"purple"}
              _hover={{
                bg: "purple.600", // Darken the background color on hover
                transform: "scale(1.05)", // Slightly increase the size on hover
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add a shadow on hover
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default EditClientComponent;
