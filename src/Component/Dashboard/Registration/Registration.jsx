import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import $ from "jquery";
import { FaDownload } from "react-icons/fa";
import * as xlsx from "xlsx";
import { saveAs } from "file-saver";
import { FaPencilAlt } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
// import { FaDownload } from "react-icons/fa6";
import { FaFile } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiLinkExternal } from "react-icons/bi";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { AiTwotoneWarning } from "react-icons/ai";
import FIR from "../../FIR/FIR";
import StampPaperView from "../../StampPaper/StampPaperView123";
import { toast } from "react-toastify";

import { IconButton } from "@chakra-ui/react";

import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineWarning } from "react-icons/ai";
import { FaFileAlt } from "react-icons/fa";
import { IoIosClipboard } from "react-icons/io";

const Registration = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();
  const [showFIR, setShowFIR] = useState(false);

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
  const [donwloadpdf, setDownalodpdf] = useState(false);
  const [todaysassignment, settodaysassignment] = useState(0);
  const [rowdatafordir, setRowdataforFir] = useState();
  const [useDatatoSend, setUSerdatatoSend] = useState();
  const [showDoanload, setShowDoanload] = useState(false);

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

  // const icons = [
  //   FaPencilAlt,
  //   TfiReload,
  //   FaDownload,
  //   AiTwotoneWarning,
  //   FaFile,
  //   RiDeleteBin5Fill,
  // ];
  // const iconspending = [
  //   FaPencilAlt,
  //   TfiReload,
  //   BiLinkExternal,
  //   AiTwotoneWarning,
  //   RiDeleteBin5Fill,
  // ];

  const icons = [
    { Icon: FaPencilAlt, color: "#e91e63" },

    { Icon: FaDownload, color: "#4caf50" },
    // { Icon: AiTwotoneWarning, color: "#ff9800" },
    // { Icon: FaFile, color: "#9c27b0" },
    // { Icon: RiDeleteBin5Fill, color: "#f44336" },
  ];

  const iconspending = [
    { Icon: FaPencilAlt, color: "#ff5722" },

    { Icon: FaDownload, color: "#4caf50" },
  ];

  // const handleDownloadClick = () => {
  //   setShowFIR(true); // Render the FIR component
  // };

  const handlePDFGenerated = () => {
    setShowFIR(false); // Remove the FIR component after the PDF is generated
  };

  // https://glorry-bakcend-updated-production.up.railway.app/api/user/gettodaysregister

  // mail ki part

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
      console.log(response, "url mil jayega");

      if (response.status === 200) {
        alert("Mail Send Successfully.");
      } else {
        alert("Failed to send mail.");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
  // excel data
  const exportToExcel = () => {
    // Convert data to worksheet format
    const worksheet = xlsx.utils.json_to_sheet(filter); // Use 'filter' state

    // Create a new workbook and add the worksheet
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Registrations");

    // Write the workbook to a binary format
    const excelBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Convert the binary data to a Blob
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    // Save the Excel file using FileSaver
    saveAs(blob, "registrations.xlsx");
  };

  const fetchData = async () => {
    try {
      const config = {
        method: "GET",
        url: `${apiUrl}/user/getallclient`,
      };
      const response = await axios(config);
      console.log(response, "all users");
      setTotalPages(response.data?.data?.totalPages);
      setUserData(response?.data?.data);
      setFilter(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // red notice

  const SendnoticeEmail = async (userId, email, name, address) => {
    const date = prompt("Enter the date (YYYY-MM-DD):");
    const amount = prompt("Enter the amount:");

    // Validate inputs
    if (!date || !amount || isNaN(amount)) {
      alert("Invalid input. Please enter a valid date and a numeric amount.");
      return;
    }
    try {
      const hostName = window.location.hostname;
      const port = 5173;
      const url = `http://${hostName}:${port}/`; // The URL can be used for other purposes if needed

      const response = await axios.post(`${apiUrl}/user/sendRedNotice`, {
        userID: userId,
        email: email, // Add email if needed for your backend request
        name: name, // Add name if required
        address: address, // Add address if required
        date: date,
        amount: amount,
      });

      console.log(response, "Response from API");

      if (response.status === 200) {
        alert("Mail sent successfully.");
      } else {
        alert("Failed to send mail.");
      }
    } catch (error) {
      console.error("Error occurred while sending the email:", error);
      alert("An error occurred while sending the email.");
    }
  };

  // notice
  // const Sendnoticemail = async (userId, email, name, address) => {
  //   try {
  //     const hostName = window.location.hostname;
  //     const port = 5173;
  //     const url = `http://${hostName}:${port}/`; // The URL can be used for other purposes if needed

  //     const response = await axios.post(`${apiUrl}/user/sendRedNotice`, {
  //       userID: userId,
  //       email: email, // Add email if needed for your backend request
  //       name: name, // Add name if required
  //       address: address, // Add address if required
  //     });

  //     console.log(response, "Response from API");

  //     if (response.status === 200) {
  //       alert("Mail sent successfully.");
  //     } else {
  //       alert("Failed to send mail.");
  //     }
  //   } catch (error) {
  //     console.error("Error occurred while sending the email:", error);
  //     alert("An error occurred while sending the email.");
  //   }
  // };

  // fir

  // const Firmail = async (userId, email, name, address) => {
  //   try {
  //     const hostName = window.location.hostname;
  //     const port = 5173;
  //     const url = `http://${hostName}:${port}/`; // The URL can be used for other purposes if needed

  //     const response = await axios.post(`${apiUrl}/user/sendRedNotice`, {
  //       userID: userId,
  //       email: email, // Add email if needed for your backend request
  //       name: name, // Add name if required
  //       address: address, // Add address if required
  //     });

  //     console.log(response, "Response from API");

  //     if (response.status === 200) {
  //       alert("Mail sent successfully.");
  //     } else {
  //       alert("Failed to send mail.");
  //     }
  //   } catch (error) {
  //     console.error("Error occurred while sending the email:", error);
  //     alert("An error occurred while sending the email.");
  //   }
  // };

  useEffect(() => {
    const result = userData?.filter(
      (item) =>
        item?.name.toLowerCase().includes(search.toLowerCase()) ||
        item?.mobile.toLowerCase().includes(search.toLowerCase())
    );

    setFilter(result);
  }, [search, userData]);
  const gloryapiurl = import.meta.env.VITE_APP_API_URL;
  const deleteclientinfo = async (id) => {
    try {
      console.log(id, "delete user details");
      const response = await axios.post(
        // "https://zemixbe-production.up.railway.app/api/user/deleteclient",
        `${gloryapiurl}/user/deleteclient`, //gloryapiurl,
        {
          id: id,
        }
      );
      // await deletaggrimet(id);
      console.log(response, "deleted response");
      setFilter(filter.filter((item) => item._id !== id));
      if (response.status) {
        toast({
          title: "Deleted",
          description: "Client Deleted Successfully",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Client Not Deleted",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      console.log(error);
    }
  };
  // const handledownload = async (rowData) => {
  //   // navigate("/downloadreport", {
  //   //   state: {
  //   //     data: rowData,
  //   //     downlodePDFparentcompoent: true,
  //   //   },
  //   // });
  //   // navigate("/employmentformdetails/:id", {
  //   //   state: {
  //   //     data: rowData,
  //   //     downlodePDFparentcompoent: true,
  //   //   },
  //   // });
  //   setDownalodpdf(true);

  //   setUSerdatatoSend(rowData);
  // };

  const handlePrint = async (email) => {
    try {
      console.log("email", email);
      const response = await axios.get(
        // `http://localhost:5000/api/user/generatePdf/${email}`,
        `${apiUrl}/user/generatePdf/${email}`,
        {
          responseType: "blob", // Important for handling PDF file  `1
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Report_${email}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  const emailsending = async (email, _id) => {
    try {
      // console.log("email function", localStorage.getItem("token"));
      const response = await axios.post(
        // "https://zemixbe-production.up.railway.app/api/user/sendconfirmmail",
        "https://glorry-bakcend-updated-production.up.railway.app/api/user/senduserinfo",
        {
          email: email,
          // userID: localStorage.getItem("token")._id
          userID: _id,
        }
      );
      console.log(response, "email response");

      if (response.status === 200) {
        toast({
          title: "Email Sent",
          description: "Email Sent Successfully",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Email Not Sent",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };
  console.log(showFIR, "showfir");

  // const handleDownloadPdf = () => {
  //   setDownalodpdf(true);
  // };
  const handleDownalodcomplete = () => {
    setShowDoanload(false);
  };
  const handleIconClick = (rowData, iconIndex) => {
    // Perform actions based on rowData and iconIndex
    console.log("Clicked on icon:", iconIndex);
    console.log("Row data:", rowData);
    console.log(rowData, "filteredData");

    if (
      rowData.status === "Active" ||
      rowData.status === "Registered" ||
      rowData.status === "Success"
    ) {
      switch (iconIndex) {
        case 0:
          navigate("/editclient", {
            state: { data: rowData },
          });
          break;
        case 1:
          // console.log("email");
          // emailsending(rowData.email, rowData._id);
          navigate(`/employmentformdetails/${rowData.email}`);
          // handlePrint(rowData?.email);
          break;
        case 2:
          // setShowDoanload(true);
          // handledownload(rowData);
          //  navigate("/downloadreport/", {
          //   state: { data: rowData },
          // });
          navigate(`/employmentformdetails/${rowData.email}`);
          // handlePrint(rowData?.email);

          break;
        case 3:
          console.log("danger icon");
          setShowFIR(true);
          setRowdataforFir(rowData);
          // {
          //   showFIR && <FIR onPDFGenerated={handlePDFGenerated} />;
          // }
          // navigate("/downloadreport", {
          //   state: { data: rowData },
          // });
          break;
        case 4:
          // deleteclientinfo(rowData._id);
          console.log("danger icon");
          navigate("/editclient", {
            state: { data: rowData },
          });
          // deletaggrimet(rowData.email);
          break;
        default:
          // Handle default case
          break;
      }
    } else if (rowData.status === "Pending") {
      switch (iconIndex) {
        // Add your pending logic here
        case 0:
          navigate("/editclient", {
            state: { data: rowData },
          });
          // Perform action for the first icon
          break;
        case 1:
          emailsending(rowData.email);
          break;
        // Perform action for the second icon

        // Add cases for other icons as needed
        case 2:
          navigate("/stamppaper");
          document.createElement("a").click();

          break;
        case 3:
          console.log("danger icon");
          // deleteclientinfo(rowData._id);
          setShowFIR(true);
          setRowdataforFir(rowData);

          // {
          //   showFIR && <FIR onPDFGenerated={handlePDFGenerated} />;
          // }
          break;
        default:
          // Handle default case
          break;
      }
    }
  };

  const handleSendNocMail = async (row) => {
    try {
      const res = await axios.post(`${apiUrl}/user/sendFirNotice`, {
        userID: row._id,
        email: row?.email,
        name: row?.name,
        address: row?.address,
      });
      console.log(res, "FIR Mail Response");
      if (res.status == 200) {
        console.log("FIR Mail Sent Successfully");
        alert("NOC Mail Sent Successfully");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSendFirmail = async (row) => {
    try {
      const res = await axios.post(`${apiUrl}/user/sendNotice`, {
        userID: row._id,
        email: row?.email,
        name: row?.name,
        address: row?.address,
      });
      console.log(res, "FIR Mail Response");
      if (res.status == 200) {
        console.log("FIR Mail Sent Successfully");
        alert("FIR Mail Sent Successfully");
      }
    } catch (e) {
      console.log(e);
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

    {
      name: "Agreement",

      cell: () => (
        <>
          {/* <NavLink to="https://stamppaper-zemix.netlify.app/"> */}
          <NavLink to={"/employmentform"}>
            <Button
              colorScheme="Red"
              backgroundColor="purple"
              width="80%"
              padding={2}
              margin={2}
            >
              Fill Agreement
            </Button>
          </NavLink>
        </>
      ),
    },

    {
      name: "Actions",
      cell: (row) => (
        // <Flex>

        //   {row.status === "Active" ||
        //   row.status === "Registered" ||
        //   row.status === "Success"
        //     ? icons.map((Icon, index) => (
        //         <Icon
        //           key={index}
        //           style={{
        //             fontSize: "35px",
        //             cursor: "pointer",
        //           }}

        //           onClick={() => handleIconClick(row, index)}
        //         />
        //       ))
        //     : iconspending.map((Icon, index) => (

        //         <Icon
        //           key={index}
        //           style={{
        //             fontSize: "35px",
        //             cursor: "pointer",
        //           }}

        //           onClick={() => handleIconClick(row, index)}
        //         />
        //       ))}
        // </Flex>

        // red
        <Flex>
          {(row.status === "Active" ||
          row.status === "Registered" ||
          row.status === "Success"
            ? icons
            : icons
          ).map(({ Icon, color }, index) => (
            <Icon
              key={index}
              style={{
                fontSize: "35px",
                cursor: "pointer",
                color,
              }}
              onClick={() => handleIconClick(row, index)}
            />
          ))}
        </Flex>
      ),
    },

    // {
    //   name: "Delete",
    //   cell: (row) => (
    //     <Button
    //       onClick={() => deleteclientinfo(row._id)}
    //       colorScheme="blackAlpha"
    //       backgroundColor="#6666ff"
    //       width="80%"
    //       marginLeft={20}
    //     >
    //       Delete
    //     </Button>
    //   ),
    // },

    // second mail part

    // {
    //   name: "mail",
    //   cell: (row) => (
    //     <Button
    //       onClick={() => SendEmail(row.userId || row._id)} // Adjust field based on your data structure
    //       colorScheme="blackAlpha"
    //       backgroundColor="#6666ff"
    //       width="80%"
    //       marginLeft={20}
    //     >
    //       Mail
    //     </Button>
    //   ),
    // },

    {
      cell: (row) => (
        <HStack spacing={4}>
          <IconButton
            icon={<AiOutlineMail />}
            colorScheme="teal"
            backgroundColor="#4caf50"
            borderRadius="full"
            size="md"
            aria-label="Send Mail"
            onClick={() => SendEmail(row.userId || row._id)} // Adjust field based on your data structure
          />
          <IconButton
            icon={<AiOutlineWarning />}
            colorScheme="red"
            backgroundColor="#f44336"
            borderRadius="full"
            size="md"
            aria-label="Red Notice"
            onClick={() =>
              SendnoticeEmail(row._id, row.email, row.name, row.address)
            } // Passing user details
          />

          {/* Notice Icon */}
          <IconButton
            icon={<FaFileAlt />}
            colorScheme="blue"
            backgroundColor="#6666ff"
            borderRadius="full"
            size="md"
            aria-label="Notice"
            onClick={() => handleSendNocMail(row)}
          />

          {/* FIR Icon */}
          <IconButton
            icon={<IoIosClipboard />}
            colorScheme="teal"
            backgroundColor="#4caf50"
            borderRadius="full"
            size="md"
            aria-label="FIR"
            onClick={() => handleSendFirmail(row)}
          />
          <IconButton
            icon={<RiDeleteBin5Fill />}
            colorScheme="teal"
            backgroundColor="#f44336"
            borderRadius="full"
            size="md"
            aria-label="Delete"
            onClick={() => deleteclientinfo(row._id)}
          />
        </HStack>
      ),
    },
    // {
    //   name: "Agreement",

    //   cell: () => (
    //     <>
    //       {/* <NavLink to="https://stamppaper-zemix.netlify.app/"> */}
    //       <NavLink to={"/employmentform"}>
    //         <Button
    //           colorScheme="Red"
    //           backgroundColor="#6666ff"
    //           width="80%"
    //           padding={4}
    //           margin={4}
    //         >
    //           Agreement
    //         </Button>
    //       </NavLink>
    //     </>
    //   ),
    // },
    // red notice
    // {
    //   name: "red notice",
    //   cell: (row) => (
    //     <Button
    //       onClick={() =>
    //         SendnoticeEmail(row._id, row.email, row.name, row.address)
    //       } // Passing user details
    //       colorScheme="blackAlpha"
    //       backgroundColor="#6666ff"
    //       width="80%"
    //       marginLeft={20}
    //     >
    //       Red Notice
    //     </Button>
    //   ),
    // },

    // // notice
    // {
    //   name: "notice",
    //   cell: (row) => (
    //     <Button
    //       // onClick={() => SendEmail(row.userId || row._id)} // Adjust field based on your data structure
    //       colorScheme="blackAlpha"
    //       backgroundColor="#6666ff"
    //       width="80%"
    //       marginLeft={20}
    //     >
    //       notice
    //     </Button>
    //   ),
    // },

    // // fir
    // {
    //   name: "fir",
    //   cell: (row) => (
    //     <Button
    //       // onClick={() => SendEmail(row.userId || row._id)} // Adjust field based on your data structure
    //       colorScheme="blackAlpha"
    //       backgroundColor="#6666ff"
    //       width="80%"
    //       marginLeft={20}
    //     >
    //       fir
    //     </Button>
    //   ),
    // },
  ];

  // const actionsMemo = React.useMemo(
  //   () => <Export onExport={() => downloadCSV(userData)} />,
  //   []
  // );
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
      <Flex mt={"2rem"} justifyContent="flex-end">
        <Button
          color={"white"}
          bg={"purple"}
          leftIcon={<FaDownload />}
          onClick={exportToExcel}
        >
          Export to Excel
        </Button>
      </Flex>

      <Flex direction="column" align="center">
        {/* <Flex direction={"column"}>
          <Box>
            All Users
            {" " +
              new Date().toLocaleString("en-IN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
          </Box>

          <Box>
            <Text fontWeight={700} fontSize={["md", "xl"]} marginBottom="4">
              Today Pending
              {`${todaysassignmentcount}`} | Today Sucess{" "}
              {`${todaysassignment}`}
            </Text>
          </Box>
        </Flex> */}
        <Flex
          direction={{ base: "column", md: "column" }} // Stacks on small screens, row on medium+
          p={{ base: 4, md: 6 }} // Padding based on screen size
          align="center"
          justify="space-between" // Space between boxes in row direction
          wrap="wrap" // Wrap content on smaller screens
          gap={0} // Gap between children
        >
          <Box
            p={2}
            bg="#953553" // Light background for visibility
            color={"white"}
            borderRadius="md"
            flex={{ base: "1", md: "0 0 45%" }} // Flex-grow on small screens, fixed width on medium+
            textAlign={{ base: "center", md: "left" }} // Center text on small screens
          >
            All Users{" "}
            {new Date().toLocaleString("en-IN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Box>

          <Box
            mt={"0.5rem"}
            p={0.5}
            bg="#953553" // Light background for visibility
            color={"white"}
            borderRadius="md"
            flex={{ base: "1", md: "0 0 45%" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Text fontWeight={600} fontSize={{ base: "md", md: "xl" }} mb={4}>
              Today Total: {todaysassignmentcount} | Today Success:{" "}
              {todaysassignment}
            </Text>
          </Box>
        </Flex>

        <div>
          {loading && <p>Loading...</p>}
          {/* {error && <p>{error}</p>} */}
          {registrationsCount !== null && (
            <Box
              fontSize={["1.3rem", "1.5rem"]}
              mt={"5rem"}
              fontWeight={"700"}
              color={"green"}
            >
              Today's Registrations: {registrationsCount}
            </Box>
          )}
        </div>
        <Box
          color="#0c9d49"
          ml={["1rem", "0rem"]}
          mt={["0rem", "0"]}
          mb="1rem"
          fontSize={["1.5rem", "2rem"]}
          fontWeight="700"
        >
          ALL CLIENTS..!
        </Box>
        {/* <NavLink to="/user/Registrationform">
          <Button
            mt="0rem"
            mb={"1rem"}
            _hover={{ background: "white", color: "gray" }}
            p="1rem"
            color="white"
            bg="#71a507" // Light background for visibility
            width={"6rem"}
          >
            Add User
          </Button>
        </NavLink> */}
      </Flex>
      <InputGroup mt="1rem" ml={["1rem", "1.5rem"]} width={["90%", "400px"]}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
      </InputGroup>

      {/* <Box width={{ base: "110vw", md: "90vw" }} overflowX="auto" p={4}> */}
      <Box width={{ base: "81vw", md: "80vw" }} overflowX="auto" p={4}>
        <DataTable
          id="myTable"
          title=""
          columns={columns}
          data={filter}
          // actions={actionsMemo}
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
                paddingLeft: "25px",
                width: "100%",
              }}
            />
          }
          customStyles={{
            headCells: {
              style: {
                fontSize: "16px", // Adjust the font size of table header cells
                fontWeight: "bold", // Make the font bold if desired
              },
            },
            rows: {
              style: {
                fontSize: "14px", // Adjust the font size of table rows
              },
            },
            table: {
              style: {
                borderCollapse: "collapse", // Collapse table borders
                // border: "2px solid gray", // Adjust the border thickness and color of the table
              },
            },
          }}
        />
      </Box>
      {showFIR && (
        <FIR onPDFGenerated={handlePDFGenerated} rowData={rowdatafordir} />
      )}
      {showDoanload && (
        <StampPaperView
          onDownalodClick={handleDownalodcomplete}
          rowData={useDatatoSend}
        />
      )}
    </>
  );
};

export default Registration;
