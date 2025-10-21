import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const UserAgreemen = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userData, setUserData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, SetSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const config = {
        method: "GET",
        //  url: `${apiUrl}/terms/getterms`,
        url: `${apiUrl}/user/getallclient`,
      };
      const response = await axios(config);
      setTotalPages(response.data?.totalPages);
      setUserData(response?.data?.data);
      setFilter(response?.data?.data);
      console.log(response);
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
        data: {
          status: "Pending",
        },
      };

      const config = {
        method: "POST",
        url: `${apiUrl}/user/search_agreement`,
        data: payload,
      };

      const response = await axios(config);
      setUserData(response.data.users);
      console.log(response);
    } catch (error) {
      console.log(error, "Error");
    }
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const result = userData?.filter((item) =>
      item?.email.toLowerCase().includes(search.toLowerCase())
    );
    console.log(result);
    setFilter(result);
  }, [search, userData]);

  const columns = [
    {
      name: "Email",
      selector: "email",
    },
    {
      name: "Details",
      cell: (row) => (
        <NavLink to={`/employmentformdetails/${row.email}`}>
          <Button colorScheme="blackAlpha" backgroundColor="purple" width="80%">
            AGREEMENT
          </Button>
        </NavLink>
      ),
    },
    {
      name: "Notice",
      cell: (row) => (
        <NavLink to={`/noc/${row?._id}`}>
          <Button colorScheme="blackAlpha" backgroundColor="purple" width="80%">
            Notice
          </Button>
        </NavLink>
      ),
    },
    {
      name: "FIR",
      cell: (row) => (
        <NavLink to={`/fir/${row?._id}`}>
          <Button colorScheme="blackAlpha" backgroundColor="purple" width="80%">
            FIR
          </Button>
        </NavLink>
      ),
    },
    {
      name: "NOC",
      cell: (row) => (
        <NavLink to={`/nonoc/${row?._id}`}>
          <Button colorScheme="blackAlpha" backgroundColor="purple" width="80%">
            NOC
          </Button>
        </NavLink>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <Wrap spacing={4}>
          <WrapItem>
            <Button
              sm
              colorScheme="blackAlpha"
              backgroundColor="red"
              width="80%"
              onClick={() => handleDelete(row._id)}
            >
              Delete User
            </Button>
          </WrapItem>
        </Wrap>
      ),
    },
  ];

  const handleDelete = async (id) => {
    console.log(id, "delete");
    try {
      const response = await fetch(`${apiUrl}/user/deleteAgreement/${id}`, {
        method: "POST",
      });

      if (response.ok) {
        console.log("Agreement deleted successfully!");
        alert("Deleted successfully!");
        fetchData();
      } else {
        console.error("Error deleting user:", await response.text());
        // Handle API errors appropriately (e.g., display error message)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle network errors appropriately (e.g., display error message)
    }
  };

  return (
    <>
      <InputGroup mt="1rem" ml={["1rem", "6.5rem"]} width={["90%", "400px"]}>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
      </InputGroup>

      <Box width={{ base: "81vw", md: "80vw" }} overflowX="auto" p={4}>
        <DataTable
          title=""
          columns={columns}
          data={filter}
          pagination
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => SetSearch(e.target.value)}
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
    </>
  );
};

export default UserAgreemen;
