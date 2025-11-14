import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@chakra-ui/react";

const RegistrationForm = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  // const apiUrl = "http://localhost:5000";
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [employeeData, setEmployeeData] = useState([]);
  const toast = useToast();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const userDataPayload = { ...data };

      const config = {
        method: "POST",
        url: `${apiUrl}/user/adduser`,
        data: userDataPayload,
      };

      const AdduserApiResponse = await axios(config);
      console.log("add", AdduserApiResponse);
      reset();
    
      navigate("/user/registration");
    } catch (err) {
      toast({
        title: "Email has Already been used",
        status: "error",
        duration: 3000, // Toast message will disappear after 3 seconds
        isClosable: true,
        position: "top",
      });
    }
  };

  // useEffect(() => {
  //   fetchEmployeeData();
  // }, []);

  // const fetchEmployeeData = async () => {
  //   try {
  //     const config = {
  //       method: "GET",
  //       url: `${apiUrl}/user/get_all_employee`,
  //     };
  //     const response = await axios(config);
  //     setEmployeeData(response.data.allemployee);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error, "error");
  //   }
  // };

  return (
    <Box 
      minH="100vh" 
      bg="gray.50" 
      py={8} 
      px={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box 
        bg="white" 
        p={8} 
        borderRadius="2xl" 
        boxShadow="0 20px 40px rgba(0, 0, 128, 0.15)"
        border="1px"
        borderColor="gray.200"
        width={["95%", "90%", "80%", "60%"]}
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          bgGradient: "linear(to-r, #000080 0%, #1e3a8a 50%, #3b82f6 100%)",
          borderRadius: "2xl 2xl 0 0"
        }}
      >
        {/* Header Section */}
        <Box textAlign="center" mb={8}>
          <Box
            color="gray.800"
            fontSize={["1.75rem", "2.25rem"]}
            fontWeight="800"
            mb={3}
            letterSpacing="tight"
          >
            Add New Client
          </Box>
          <Box
            color="gray.600"
            fontSize="lg"
            fontWeight="500"
          >
            Complete the client registration form
          </Box>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={7}>
            {/* Name Input here i update the code */}
            <FormControl isInvalid={errors.name}>
              <FormLabel 
                fontWeight="700" 
                color="gray.800" 
                mb={3}
                fontSize="md"
              >
                Full Name
              </FormLabel>
              <Input
                name="name"
                id="name"
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                })}
                placeholder="Enter client's full name"
                size="lg"
                height="50px"
                borderRadius="12px"
                border="2px"
                borderColor={errors.name ? "red.300" : "gray.300"}
                _hover={{ 
                  borderColor: errors.name ? "red.400" : "#1e3a8a",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(30, 58, 138, 0.12)"
                }}
                _focus={{
                  borderColor: errors.name ? "red.500" : "#1e3a8a",
                  boxShadow: "0 0 0 4px rgba(30, 58, 138, 0.15)",
                  transform: "translateY(-2px)",
                  bg: "white"
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                bg="white"
                fontSize="md"
              />
              {errors.name && (
                <Box color="red.500" fontSize="sm" mt={2} fontWeight="500">
                  {errors.name.message}
                </Box>
              )}
            </FormControl>

            {/* Email Input */}
            <FormControl isInvalid={errors.email}>
              <FormLabel 
                fontWeight="700" 
                color="gray.800" 
                mb={3}
                fontSize="md"
              >
                Email Address
              </FormLabel>
              <Input
                id="email"
                type="email"
                name="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="client@company.com"
                size="lg"
                height="50px"
                borderRadius="12px"
                border="2px"
                borderColor={errors.email ? "red.300" : "gray.300"}
                _hover={{ 
                  borderColor: errors.email ? "red.400" : "#1e3a8a",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(30, 58, 138, 0.12)"
                }}
                _focus={{
                  borderColor: errors.email ? "red.500" : "#1e3a8a",
                  boxShadow: "0 0 0 4px rgba(30, 58, 138, 0.15)",
                  transform: "translateY(-2px)",
                  bg: "white"
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                bg="white"
                fontSize="md"
              />
              {errors.email && (
                <Box color="red.500" fontSize="sm" mt={2} fontWeight="500">
                  {errors.email.message}
                </Box>
              )}
            </FormControl>

            {/* Mobile Input */}
            <FormControl isInvalid={errors.mobile}>
              <FormLabel 
                fontWeight="700" 
                color="gray.800" 
                mb={3}
                fontSize="md"
              >
                Mobile Number
              </FormLabel>
              <Input
                type="tel"
                id="mobile"
                name="mobile"
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Mobile number must be 10 digits",
                  },
                })}
                placeholder="Enter 10-digit mobile number"
                size="lg"
                height="50px"
                borderRadius="12px"
                border="2px"
                borderColor={errors.mobile ? "red.300" : "gray.300"}
                _hover={{ 
                  borderColor: errors.mobile ? "red.400" : "#1e3a8a",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(30, 58, 138, 0.12)"
                }}
                _focus={{
                  borderColor: errors.mobile ? "red.500" : "#1e3a8a",
                  boxShadow: "0 0 0 4px rgba(30, 58, 138, 0.15)",
                  transform: "translateY(-2px)",
                  bg: "white"
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                bg="white"
                fontSize="md"
              />
              {errors.mobile && (
                <Box color="red.500" fontSize="sm" mt={2} fontWeight="500">
                  {errors.mobile.message}
                </Box>
              )}
            </FormControl>

            {/* Address Input */}
            <FormControl isInvalid={errors.address}>
              <FormLabel 
                fontWeight="700" 
                color="gray.800" 
                mb={3}
                fontSize="md"
              >
                Complete Address
              </FormLabel>
              <Input
                name="address"
                id="address"
                type="text"
                {...register("address", { required: "Address is required" })}
                placeholder="Enter complete residential address"
                size="lg"
                height="50px"
                borderRadius="12px"
                border="2px"
                borderColor={errors.address ? "red.300" : "gray.300"}
                _hover={{ 
                  borderColor: errors.address ? "red.400" : "#1e3a8a",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(30, 58, 138, 0.12)"
                }}
                _focus={{
                  borderColor: errors.address ? "red.500" : "#1e3a8a",
                  boxShadow: "0 0 0 4px rgba(30, 58, 138, 0.15)",
                  transform: "translateY(-2px)",
                  bg: "white"
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                bg="white"
                fontSize="md"
              />
              {errors.address && (
                <Box color="red.500" fontSize="sm" mt={2} fontWeight="500">
                  {errors.address.message}
                </Box>
              )}
            </FormControl>

            {/* Plan Select */}
            <FormControl isInvalid={errors.plan}>
              <FormLabel 
                fontWeight="700" 
                color="gray.800" 
                mb={3}
                fontSize="md"
              >
                Service Plan
              </FormLabel>
              <Controller
                control={control}
                name="plan"
                rules={{ required: "Plan is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Choose service plan"
                    size="lg"
                    height="50px"
                    borderRadius="12px"
                    border="2px"
                    borderColor={errors.plan ? "red.300" : "gray.300"}
                    _hover={{ 
                      borderColor: errors.plan ? "red.400" : "#1e3a8a",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 20px rgba(30, 58, 138, 0.12)"
                    }}
                    _focus={{
                      borderColor: errors.plan ? "red.500" : "#1e3a8a",
                      boxShadow: "0 0 0 4px rgba(30, 58, 138, 0.15)",
                      transform: "translateY(-2px)",
                      bg: "white"
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    bg="white"
                    fontSize="md"
                  >
                    <option value="510">530 Plan</option>
                  </Select>
                )}
              />
              {errors.plan && (
                <Box color="red.500" fontSize="sm" mt={2} fontWeight="500">
                  {errors.plan.message}
                </Box>
              )}
            </FormControl>

            {/* Caller Select */}
            <FormControl isInvalid={errors.caller}>
              <FormLabel 
                fontWeight="700" 
                color="gray.800" 
                mb={3}
                fontSize="md"
              >
                Assigned Caller
              </FormLabel>
              <Controller
                control={control}
                name="caller"
                rules={{ required: "Caller is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Select assigned caller"
                    size="lg"
                    height="50px"
                    borderRadius="12px"
                    border="2px"
                    borderColor={errors.caller ? "red.300" : "gray.300"}
                    _hover={{ 
                      borderColor: errors.caller ? "red.400" : "#1e3a8a",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 20px rgba(30, 58, 138, 0.12)"
                    }}
                    _focus={{
                      borderColor: errors.caller ? "red.500" : "#1e3a8a",
                      boxShadow: "0 0 0 4px rgba(30, 58, 138, 0.15)",
                      transform: "translateY(-2px)",
                      bg: "white"
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    bg="white"
                    fontSize="md"
                  >
                    {/* {employeeData.map((employee, index) => (
                      <option key={index} value={employee.name}>
                        {employee.name}
                      </option>
                    ))} */}
                    <option value="caller1">Caller 1</option>
                    <option value="caller2">Caller 2</option>
                    <option value="caller3">Caller 3</option>
                    <option value="caller4">Caller 4</option>
                    <option value="caller5">Caller 5</option>
                    <option value="caller6">Caller 6</option>
                    <option value="caller7">Caller 7</option>
                    <option value="caller8">Caller 8</option>
                    <option value="caller9">Caller 9</option>
                  </Select>
                )}
              />
              {errors.caller && (
                <Box color="red.500" fontSize="sm" mt={2} fontWeight="500">
                  {errors.caller.message}
                </Box>
              )}
            </FormControl>
          </Stack>

          <Button
            type="submit"
            bgGradient="linear(to-r, #000080 0%, #1e3a8a 50%, #3b82f6 100%)"
            color="white"
            mt={10}
            mx="auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{ 
              bgGradient: "linear(to-r, #3b82f6 0%, #1e3a8a 50%, #000080 100%)",
              transform: "translateY(-3px) scale(1.02)",
              boxShadow: "0 15px 30px rgba(0, 0, 128, 0.25)"
            }}
            _active={{
              transform: "translateY(0) scale(1)",
            }}
            fontSize="lg"
            fontWeight="700"
            height="60px"
            width="100%"
            borderRadius="12px"
            transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            boxShadow="0 10px 25px rgba(0, 0, 128, 0.2)"
            letterSpacing="wide"
          >
            CREATE CLIENT ACCOUNT
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default RegistrationForm;