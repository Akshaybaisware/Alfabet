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
    <Box mt="8" mx="auto" width={["90%", "50%"]}>
      <Box
        color="purple"
        mb="1rem"
        fontSize={["1.5rem", "2rem"]}
        fontWeight="700"
      >
        Add Client
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {/* Name Input */}
          <FormControl isInvalid={errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              id="name"
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
              placeholder="Enter Name"
              _hover={{ borderColor: "teal.500" }}
            />
            {errors.name && <Box color="red">{errors.name.message}</Box>}
          </FormControl>

          {/* Email Input */}
          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
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
              placeholder=".......@gmail.com"
              _hover={{ borderColor: "teal.500" }}
            />
            {errors.email && <Box color="red">{errors.email.message}</Box>}
          </FormControl>

          {/* Mobile Input */}
          <FormControl isInvalid={errors.mobile}>
            <FormLabel>Mobile Number</FormLabel>
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
              placeholder="Enter Mobile No"
              _hover={{ borderColor: "teal.500" }}
            />
            {errors.mobile && <Box color="red">{errors.mobile.message}</Box>}
          </FormControl>

          {/* Address Input */}
          <FormControl isInvalid={errors.address}>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              id="address"
              type="text"
              {...register("address", { required: "Address is required" })}
              placeholder="Address"
              _hover={{ borderColor: "teal.500" }}
            />
            {errors.address && <Box color="red">{errors.address.message}</Box>}
          </FormControl>

          {/* Plan Select */}
          <FormControl isInvalid={errors.plan}>
            <FormLabel>Plan</FormLabel>
            <Controller
              control={control}
              name="plan"
              rules={{ required: "Plan is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select Plan"
                  _hover={{ borderColor: "teal.500" }}
                >
                  <option value="510">530</option>
                </Select>
              )}
            />
            {errors.plan && <Box color="red">{errors.plan.message}</Box>}
          </FormControl>

          {/* Caller Select */}
          <FormControl isInvalid={errors.caller}>
            <FormLabel>Caller</FormLabel>
            <Controller
              control={control}
              name="caller"
              rules={{ required: "Caller is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select Caller"
                  _hover={{ borderColor: "teal.500" }}
                >
                  {/* {employeeData.map((employee, index) => (
                    <option key={index} value={employee.name}>
                      {employee.name}
                    </option>
                  ))} */}
                  <option value="caller1">caller 1</option>
                  <option value="caller2">caller 2</option>
                  <option value="caller3">caller 3</option>
                  <option value="caller4">caller 4</option>
                  <option value="caller5">caller 5</option>
                  <option value="caller6">caller 6</option>
                  <option value="caller7">caller 7</option>
                  <option value="caller8">caller 8</option>
                  <option value="caller9">caller 9</option>
                </Select>
              )}
            />
            {errors.caller && <Box color="red">{errors.caller.message}</Box>}
          </FormControl>
        </Stack>

        <Button
          type="submit"
     bg={"purple"}
     color={"white"}
          mt="4"
          mx="auto"
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{ bgColor: "red" }}
          fontSize="lg"
          fontWeight="bold"
          p={4}
          width="100%" // Set the width to 100% for mobile view
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

export default RegistrationForm;
