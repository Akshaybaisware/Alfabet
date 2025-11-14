import React, { useState, useEffect } from "react";
import { Box, Center, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Link } from "react-router-dom";
import { Flex } from "@chakra-ui/layout";
import DataTable from "react-data-table-component";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { NavLink } from "react-router-dom/dist/umd/react-router-dom.development";

import { BiSolidPhoneCall } from "react-icons/bi";
import { TbReload } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

function Pending() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [dependancy, setDependeancy] = useState();
  const [deletedependency, setDeletedependance] = useState();
  const [reload, setReload] = useState(false);

  const iconsarray = [BiSolidPhoneCall, TbReload, IoIosClose];
  const [pendinglist, setPendinglist] = useState();
  const [allusersData, setAllusersData] = useState([]);
  const emailsendingpassword = async (id) => {
    try {
      console.log(id, "asdasdasd");
      const reponse = await axios.post(`${apiUrl}/user/senduserinfo`, {
        userID: id,
      });
      console.log(reponse, "email response");
      toast({
        title: "Email Sent Sucessfullty ",
        description: "Email  Successfully",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      console.log(error.messgae);
      toast({
        title: "Error",
        description: "Error Occured ",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };
  const deleteclientinfo = async (id) => {
    try {
      const response = await axios.post(`${apiUrl}/user/deleteclient`, {
        id: id,
      });
      console.log(response, "deleted response");

      // setFilter(filter.filter((item) => item._id !== id));
      if (response.status === 200) {
        setDeletedependance(response);
        return response;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error Occured ",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      console.log(error);
    }
  };

  const filterdata = (id) => {
    console.log(id, "functions");
    const filtereddata = pendinglist.filter(
      (item) => item.id && item.id.includes(id)
    );

    console.log(filtereddata, "filtereddata");
  };

  const handleAction = async (row, index) => {
    if (index === 0) {
      console.log(row);
      const id = row._id;
      console.log(id, "id");
      await emailsendingpassword(id);
      // filterdata(row._id);
      setReload(true);

      //deleteclientinfo(id);
    } else if (index === 1) {
      console.log("Reload");
    } else if (index === 2) {
      filterdata(row._id);
      setReload(true);
      //deleteclientinfo(row._id);
    }
  };
  const columns = [
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "Mobile",
      selector: "mobile",
    },
    {
      name: "Email",
      selector: "email",
    },
    {
      name: "Start Date",
      cell: (row) => {
        const startDate = row?.startDate?.split("T")[0]; // Extract date part only
        return startDate;
      },
    },
    {
      name: "End Date",
      cell: (row) => {
        const endDate = row?.endDate?.split("T")[0]; // Extract date part only
        return endDate;
      },
    },
    {
      name: "Caller",
      selector: "caller",
      cell: (row) => {
        const selectPlan = row?.caller; // Extract date part only
        return selectPlan;
      },
    },
    {
      name: "Status",
      selector: "Status",
      cell: (row) => {
        const Status = row?.status; // Extract date part only
        return Status;
      },
    },

    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <NavLink to={`/user/registeruserdetail/${row._id}`}>
    //       <Button
    //         colorScheme="blackAlpha"
    //         backgroundColor="#6666ff"
    //         width="80%"
    //       >
    //         View Detail
    //       </Button>
    //     </NavLink>
    //   ),
    // },
    {
      name: "Delete",
      cell: (row) => (
        <Button
          onClick={() => deleteclientinfo(row._id)}
          colorScheme="blackAlpha"
          backgroundColor="#6666ff"
          width="80%"
          marginLeft={10}
        >
          Delete
        </Button>
      ),
    },
    {
      name: "Agreement",
      cell: () => (
        <>
          {/* <NavLink to="https://stamppaper-zemix.netlify.app/"> */}
          <NavLink to={"/employmentform"}>
            <Button
              colorScheme="Red"
              backgroundColor="#6666ff"
              width="80%"
              padding={4}
              margin={4}
            >
              Agreement
            </Button>
          </NavLink>
        </>
      ),
    },
  ];

  const pendingdata = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/user/getallpending`);

      console.log(response.data.users, "pending list ");

      setPendinglist(response.data.users);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    pendingdata();
  }, [dependancy, deletedependency, reload]);

  const getUserdata = async () => {
    try {
      const registrationsConfig = {
        method: "GET",
        url: `${apiUrl}/user/getallclient`,
      };
      const registrationsResponse = await axios(registrationsConfig);
      // Get the current date
      const currentDate = new Date();
      // Set the time to midnight to compare only the date part
      currentDate.setHours(0, 0, 0, 0);

      // Filter the data
      const filteredData = registrationsResponse.data.data.filter((user) => {
        const startDate = new Date(user.startDate);
        // Set the time to midnight to compare only the date part
        startDate.setHours(0, 0, 0, 0);
        return startDate.getTime() === currentDate.getTime();
      });

      // Set the filtered data
      setAllusersData(filteredData);

      //end shoudle be equal or  less than previus data
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUserdata();
  }, []);
  return loading ? (
    <Center height={"100vh"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  ) : (
    <>
      <Center mt={["2rem", "1rem"]}>
        <Box width={{ base: "100vw", sm: "95vw", md: "90vw", lg: "85vw", xl: "80vw" }} overflowX="auto" p={4}>
          <Center mb={4}>
            <Text fontSize="2xl" fontWeight={"800"} color="red">
              Todays Registrations
            </Text>
          </Center>

          <DataTable
            columns={columns}
            data={allusersData}
            pagination
            responsive
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  border: "1px solid gray",
                  borderRadius: "15px",
                  padding: "10px",
                  paddingLeft: "15px",
                  width: "100%",
                }}
              />
            }
          />
        </Box>
      </Center>
    </>
  );
}

export default Pending;
