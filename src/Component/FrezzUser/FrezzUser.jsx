import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NavLink } from "react-router-dom";

const FreezeUser = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userData, setUserData] = useState([]);

  const [allusersData, setAllusersData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const config = {
        method: "GET",
        url: `${apiUrl}/user/user_pagination?page=${currentPage}&status=Freeze&limit=10`,
      };
      const response = await axios(config);
      console.log(response, "Freeze User");
      setTotalPages(response.data?.totalPages);
      setUserData(response?.data?.users);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleSearch = () => {
    if (searchQuery) {
      searchResponse();
      setCurrentPage(1);
      setSearchQuery("");
    } else {
      fetchData();
    }
  };

  const searchResponse = async () => {
    try {
      const payload = {
        name: searchQuery,
      };
      console.log(searchQuery, "BackEnd Search Field");

      const config = {
        method: "POST",
        url: `${apiUrl}/user/search_user_by_name?status=Freeze`,
        data: payload,
      };

      const response = await axios(config);
      console.log(response, "Search Result");
      setUserData(response.data.users);
    } catch (error) {
      console.log(error, "Error");
    }
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };
  const columns = [
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "Status",
      selector: "Status",
      cell: () => (
        <span style={{ color: "red", fontWeight: "bold" }}>
          QC Fail
        </span>
      ),
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
  
  ];

  const paginationOptions = {
    rowsPerPageText: "Rows per page:",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  const getUserdata = async () => {
    try {
      const registrationsConfig = {
        method: "GET",
        url: `${apiUrl}/user/getallclient`,
      };
      const registrationsResponse = await axios(registrationsConfig);
      console.log(registrationsResponse, "Freeze User");
      const currentDate = new Date();
      // Calculate the previous date
      const previousDate = new Date(currentDate);
      previousDate.setDate(currentDate.getDate() - 1);

      // Filter the data
      const filteredData = registrationsResponse.data.data.filter((user) => {
        const endDate = new Date(user.endDate);
        return endDate <= previousDate;
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
  return (
    <>
      <Flex direction="column" align="center">
        <Box
          color="#DD372D"
          ml={["1rem", "0rem"]}
          mt={["1rem", "0"]}
          mb="1rem"
          fontSize={["1.5rem", "2rem"]}
          fontWeight="700"
        >
          Qc Failed Client
        </Box>
      </Flex>
      <InputGroup mt="1rem" ml={["1rem", "6.5rem"]} width={["90%", "400px"]}>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          border="1px solid green"
          width="100%"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <Button
          className="employee-btn"
          colorScheme="teal"
          ml={"1rem"}
          onClick={handleSearch}
        >
          Search
        </Button>
      </InputGroup>
      <Box width={{ base: "81vw", md: "80vw" }} overflowX="auto" p={4}>
        <DataTable
          title=""
          columns={columns}
          data={allusersData}
          pagination
          paginationServer
          paginationTotalRows={totalPages * 10} // Assuming 10 items per page
          onChangePage={(page) => handlePagination(page)}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30]}
          paginationComponentOptions={paginationOptions}
        />
      </Box>
    </>
  );
};

export default FreezeUser;
