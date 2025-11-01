// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import {
//   Button,
//   Input,
//   Box,
//   Flex,
//   Text,
//   Center,
//   Spinner,
// } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import { useToast } from "@chakra-ui/react";
// import axios from "axios";

// function EmployeesTable() {
//   const [data, setData] = useState([]);
//   const toast = useToast();
//   const [updatedelete, setupdatedelete] = useState();
//   const [loading, setloading] = useState(false);

//   const handeleEmployee = async (id) => {
//     try {
//       const response = await axios.post(
//         "https://glorry-bakcend-updated-production.up.railway.app/api/employee/deleteemployee",
//         {
//           employeeId: id,
//         }
//       );
//       console.log(response, "deleted response");
//       setupdatedelete(response);
//       toast({
//         title: "Success",
//         description: "Employee Deleted Successfully",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//         position: "top",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Something went wrong",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//         position: "top",
//       });
//     }
//   };
//   const columns = [
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Designation",
//       selector: (row) => row.designation,
//       sortable: true,
//     },
//     {
//       name: "MobileNo",
//       selector: (row) => row.mobile,
//       sortable: true,
//     },
//     {
//       name: "Branch",
//       selector: (row) => row.branch,
//       sortable: true,
//     },
//     {
//       name: "Address",
//       selector: (row) => row.address,
//       sortable: true,
//     },
//     {
//       name: "Delete Employee",
//       cell: (row) => (
//         <Button onClick={() => handeleEmployee(row._id)} colorScheme="red">
//           Delete
//         </Button>
//       ),
//       sortable: true,
//     },
//   ];

//   const getEmployees = async () => {
//     setloading(true);
//     try {
//       const response = await fetch(
//         "https://glorry-bakcend-updated-production.up.railway.app/api/employee/getallemployee",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const res = await response.json();
//       setData(res.employee);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setloading(false);
//     }
//   };

//   useEffect(() => {
//     getEmployees();
//   }, [updatedelete]);

//   return loading ? (
//     <Center height={"100vh"}>
//       <Spinner
//         thickness="4px"
//         speed="0.65s"
//         emptyColor="gray.200"
//         color="blue.500"
//         size="xl"
//       />
//     </Center>
//   ) : (

//       <Box mt="1.5rem" w="80%" p="4">
//         <Flex direction={"column"} alignItems="center" mb="4">
//           <Text fontSize="2rem" fontWeight="700">
//             Employees
//           </Text>
//           <Link to="/employeeform">
//             <Button color={"white"} bg="blue">
//               + Add Employees
//             </Button>
//           </Link>
//         </Flex>
//         <Input placeholder="Search" mb="4" />
//         <DataTable columns={columns} data={data} pagination />
//       </Box>

//   );
// }

// export default EmployeesTable;

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Button,
  Input,
  Box,
  Flex,
  Text,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

function EmployeesTable() {
  const [data, setData] = useState([]);
  const toast = useToast();
  const [updatedelete, setupdatedelete] = useState();
  const [loading, setloading] = useState(false);

  const handeleEmployee = async (id) => {
    try {
      const response = await axios.post(
        // "https://glorry-bakcend-updated-production.up.railway.app/api/employee/deleteemployee",
        "http://3.111.38.169:5000/api/employee/deleteemployee",
        {
          employeeId: id,
        }
      );
      console.log(response, "deleted response");
      setupdatedelete(response);
      toast({
        title: "Success",
        description: "Employee Deleted Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
    },
    {
      name: "MobileNo",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Branch",
      selector: (row) => row.branch,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Delete Employee",
      cell: (row) => (
        <Button onClick={() => handeleEmployee(row._id)} colorScheme="red">
          Delete
        </Button>
      ),
      sortable: true,
    },
  ];

  const getEmployees = async () => {
    setloading(true);
    try {
      const response = await fetch(
        // "https://glorry-bakcend-updated-production.up.railway.app/api/employee/getallemployee",
        "http://3.111.38.169:5000/api/employee/getallemployee",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      setData(res.employee);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, [updatedelete]);

  return loading ? (
    <Center height={"100vh"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="green.500"
        size="xl"
      />
    </Center>
  ) : (
    // <Box mt="1.5rem" w={{ base: "50%", md: "80%", lg: "70%" }} p={{ base: "2", md: "4" }}>
    <Box width={{ base: "81vw", md: "80vw" }} overflowX="auto" p={4}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={{ base: "4", md: "6" }}
      >
        <Text fontSize={{ base: "1.5rem", md: "2rem" }} fontWeight="700">
          Employees
        </Text>
        <Link to="/employeeform">
          <Button color={"white"} bg="purple" mb={{ base: "2", md: "0" }}>
            + Add Employees
          </Button>
        </Link>
      </Flex>
      <Input placeholder="Search" mb="4" w={{ base: "100%", md: "50%" }} />
      <Box overflowX="auto">
        <DataTable columns={columns} data={data} pagination />
      </Box>
    </Box>
  );
}

export default EmployeesTable;
