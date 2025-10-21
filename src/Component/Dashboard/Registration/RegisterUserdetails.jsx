import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  StackDivider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
// import "./EmployeeProfileEdit.css";
import { useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";

const RegisterUserDetail = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  // using navigate
  const navigate = useNavigate();
  // userId of the user
  const { userId } = useParams();

  // input fields for all inputs
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    plan: "",
    caller: "",
    status: "",
    loginStatus: "",
    password: "",
    startDate: "",
    endDate: "",
  });

  // modal button
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  // const navigate = useNavigate();

  // useEffect to fetch specific user by ID
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post(`${apiUrl}/user/getuserbyid/`, {
          userId: userId,
        });
        const data = response.data;
        console.log(data, "userdata");
        // console.log(data?.User.name);
        // console.log(data?.User);
        setInputField({
          name: data?.User?.name,
          email: data?.User?.email,
          mobile: data?.User?.mobile,
          address: data?.User?.address,
          plan: data?.User?.plan,
          caller: data?.User?.caller,
          status: data?.User?.status,
          password: data?.User?.password,
          startDate: data?.User?.startDate,
          endDate: data?.User?.endDate,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  // form change handler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setInputField({
      ...prevValue,
      [name]: value,
    });
  };

  // delete function call
  const deleteUser = async (id) => {
    try {
      // console.log(id);
      const response = await axios.post(`${apiUrl}/user/deleteuser`, {
        userId: userId,
      });
      if (response.status === 200) {
        navigate("/user/registration");
        alert("User Deleted Succesfully.");
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //send mail again
  const SendEmail = async (userId) => {
    // console.log(userId, "id");
    const hostName = window.location.hostname;
    const port = 5173;
    const url = { url: `http://${hostName}:${port}/` };
    // console.log(url, "Responce URl");
    try {
      const response = await axios.post(`${apiUrl}/user/senduserinfo`, {
        userID: userId,
      });
      // console.log(response, "url mil jayega");

      if (response.status === 200) {
        alert("Mail Send Successfully.");
      } else {
        alert("Failed to send mail.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      marginLeft={"1rem"}
      marginTop={"1rem"}
      className="employee-form-container"
    >
      <form className="employee-form">
        <Stack direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                onChange={onChangeHandler}
                value={inputField.name}
                width={{ base: "300px", md: "400px" }}
                type="text"
                placeholder="Kaveri Kappor"
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={inputField.email}
                onChange={onChangeHandler}
                width={{ base: "300px", md: "400px" }}
                type="email"
                placeholder="kaveri@gmail.com"
              />
            </FormControl>
          </Box>
        </Stack>
        <Stack direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Mobile Number</FormLabel>
              <Input
                name="mobile"
                onChange={onChangeHandler}
                value={inputField.mobile}
                width={{ base: "300px", md: "400px" }}
                type="number"
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Address</FormLabel>
              <Input
                name="address"
                value={inputField.address}
                onChange={onChangeHandler}
                width={{ base: "300px", md: "400px" }}
                type="text"
                placeholder="Address"
              />
            </FormControl>
          </Box>
        </Stack>
        <Stack direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Plan</FormLabel>
              <Select
                name="plan"
                onChange={onChangeHandler}
                value={inputField.plan}
                width={{ base: "300px", md: "400px" }}
                placeholder="Select option"
              >
                <option value="option1">520</option>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Caller</FormLabel>
              <Select
                name="caller"
                onChange={onChangeHandler}
                value={inputField.caller}
                width={{ base: "300px", md: "400px" }}
                placeholder="Select option"
              >
                <option value="option1">Caller 1</option>
                <option value="option2">Caller 2</option>
                <option value="option3">Caller 3</option>
                <option value="option3">Caller 4</option>
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <Stack direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Status</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                type="text"
                name="status"
                onChange={onChangeHandler}
                value={inputField.status}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Login Status</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                type="text"
                name="status"
                value={inputField.status}
                onChange={onChangeHandler}
              />
            </FormControl>
          </Box>
        </Stack>

        <Stack direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>User Id</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                type="text"
                name="status"
                onChange={onChangeHandler}
                value={inputField.email}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Password</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                type="text"
                name="status"
                value={inputField.password}
                onChange={onChangeHandler}
              />
            </FormControl>
          </Box>
        </Stack>

        <Stack direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Start Date</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                type="text"
                name="status"
                onChange={onChangeHandler}
                value={inputField?.startDate?.split("T")[0]}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>End Date</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                type="text"
                name="status"
                value={inputField?.endDate?.split("T")[0]}
                onChange={onChangeHandler}
              />
            </FormControl>
          </Box>
        </Stack>
      </form>

      {/* <DeleteIcon onClick={onOpen} /> */}
      <Stack direction={"column"}>
        <Box width={{ base: "15rem", md: "30rem" }}>
          <Button
            marginTop={"1rem"}
            _hover={{ background: "white", color: "gray" }}
            onClick={onOpen}
            bg={"red"}
          >
            Delete
          </Button>
          {/* Modal Code */}
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete User
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You want to delete !!.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      onClose();
                      deleteUser(userId);
                    }}
                    ml={3}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>

        {/* <Link to={`/user/editregistration/${userId}`}>
          <EditIcon />
        </Link> */}
        <Box width={{ base: "15rem", md: "30rem" }}>
          {/* <Link to={`/user/editregistration/${userId}`}> */}
          <Button
            width={{ md: "5rem" }}
            marginBottom={"1rem"}
            marginTop={"1rem"}
            height={{ base: "3.3rem", md: "2.5r em" }}
            colorScheme="blue"
            onClick={() =>
              navigate(`/user/editregistration/${userId}`, {
                state: { data: inputField, userId: userId },
              })
            }
          >
            Edit
          </Button>
          {/* </Link> */}

          <Button
            onClick={() => SendEmail(userId)}
            height={{ base: "3.3rem", md: "2.5r em" }}
            marginLeft={"1rem"}
            colorScheme="red"
          >
            Send Work Mail
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default RegisterUserDetail;
