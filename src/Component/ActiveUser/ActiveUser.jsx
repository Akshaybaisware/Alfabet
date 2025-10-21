import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import $ from "jquery";

const ActiveUser = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userData, setUserData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, SetSearch] = useState("");
  const [registrationsCount, setRegistrationsCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [todaysassignmentcount, settodaysassignmentcount] = useState(0);

  const [todaysassignment, settodaysassignment] = useState(0);

  const callers = {
    "66124f906eb6102e7e68e772": "caller 1",
    "66124f986eb6102e7e68e775": "caller 2",
    "66124fa06eb6102e7e68e778": "caller 3",
    "66125cb1076a6663d19e3c07": "caller 4",
    "66125cfc076a6663d19e3c16": "caller 5",
    "66125d26076a6663d19e3c21": "caller 6",
    "66125d4f076a6663d19e3c2d": "caller 7",
  };

  useEffect(() => {
    fetchData();
    todaysRegistrations();
  }, [currentPage]);

  const todaysRegistrations = async () => {
    try {
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      const registrationsConfig = {
        method: "GET",
        url: `${apiUrl}/user/getTodaysRegistrations`,
      };
      const registrationsResponse = await axios(registrationsConfig);
      setRegistrationsCount(registrationsResponse.data);
    } catch (error) {
      console.error("Error fetching today's registrations:", error);
    }
  };

  const fetchData = async () => {
    try {
      const config = {
        method: "GET",
        url: `${apiUrl}/user/getalluser`,
      };
      const response = await axios(config);
      console.log(response, "all users");
      setTotalPages(response.data?.totalPages);
      setUserData(response?.data?.allUser);
      setFilter(response?.data?.allUser);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const result = userData?.filter(
      (item) =>
        item?.name.toLowerCase().includes(search.toLowerCase()) ||
        item?.mobile.toLowerCase().includes(search.toLowerCase())
    );

    setFilter(result);
  }, [search, userData]);

  //export Button
  const Export = ({ onExport }) => (
    <Button 
    
    onClick={(e) => onExport(e.target.value)}>details</Button>
  );

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(userData[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

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
    {
      name: "Action",
      cell: (row) => (
        <NavLink to={`/user/registeruserdetail/${row._id}`}>
          <Button colorScheme="blackAlpha" backgroundColor="black" width="80%">
            View Detail
          </Button>
        </NavLink>
      ),
    },
    {
      name: "Agreement",
      cell: () => (
        <>
          {/* <NavLink to="https://stamppaper-zemix.netlify.app/"> */}
          <NavLink to={"/user/agreement"}>
            <Button colorScheme="Red" backgroundColor="black" width="80%">
              Fill Agreement
            </Button>
          </NavLink>
        </>
      ),
    },
  ];

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(userData)} />,
    []
  );
  const gettodaysassignmentcount = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/gettodaysregister`);
      console.log(response, "todats registertions");
      settodaysassignmentcount(response.data.users.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  const gettodaysdoneassignment = async () => {
    try {
      const reposne = await axios.get(`${apiUrl}/user/gettodaysdone`);
      console.log(reposne.data.users, "todyas doen");
      settodaysassignment(reposne.data.users.length);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    gettodaysassignmentcount();
    gettodaysdoneassignment();
    console.log(todaysassignmentcount, "todaysassignmentcount");
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
        All Actice Client
        </Box>
      
      </Flex>
      <InputGroup mt="1rem" ml={["1rem", "1.5rem"]} width={["90%", "400px"]}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
      </InputGroup>

      <Box width={{ base: "81vw", md: "80vw" }} overflowX="auto" p={4}>
        <DataTable
          id="myTable"
          title=""
          columns={columns}
          data={filter}
          actions={actionsMemo}
          pagination
          subHeader
          subHeaderComponent={
            <input
              id="myInpuTextField"
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

export default ActiveUser;
