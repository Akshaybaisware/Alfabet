// import {
//   Box,
//   Heading,
//   Text,
//   Image,
//   Table,
//   Tr,
//   Td,
//   Input,
//   Button,
//   FormControl,
//   FormLabel,
//   Flex,
// } from "@chakra-ui/react";
// // import image from "./SVG STAM.svg";
// import image from "../../Images/SVG STAM.svg";
// import { useEffect, useState } from "react";
// import notri from "../../Images/notriimage.svg";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import LeaseAgreement from "../../Images/notri.svg";
// import sign from "../../Images/SIGN 6.svg";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { usePDF } from "react-to-pdf";
// import generatePDF, { Resolution, Margin } from "react-to-pdf";
// import moment from "moment";
// const StampPaperView = () => {
//   const { toPDF, targetRef } = usePDF({ filename: "Agreement.pdf" });
//   const { id } = useParams();
//   console.log(id, "userId");
//   const appUrl = import.meta.env.VITE_APP_API_URL;
//   const [doc, setDoc] = useState(null);
//   const [username, setusername] = useState("");
//   const [useraddress, setuseraddress] = useState("");
//   const [inputField, setInputField] = useState({
//     name: "",
//     email: "",
//     startDate: "",
//     address: "",
//     photo: "",
//     signature: "",
//   });

//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [signaturePreview, setSignaturePreview] = useState(null);
//   console.log(photoPreview);

//   const [loader, setLoader] = useState(false);

//   const downloadPDF = async (photoPreview, signaturePreview) => {
//     const capture = document.querySelector(".downLoadBox");
//     setLoader(true);

//     html2canvas(capture).then(async (canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const doc = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: [canvas.width, canvas.height],
//       });

//       const marginLeft = 0;
//       const marginTop = 0;
//       const contentWidth = doc.internal.pageSize.getWidth() - 2 * marginLeft;
//       const contentHeight = doc.internal.pageSize.getHeight() - 2 * marginTop;
//       const aspectRatio = canvas.width / canvas.height;
//       let imgWidth = contentWidth;
//       let imgHeight = contentWidth / aspectRatio;

//       if (imgHeight > contentHeight) {
//         imgHeight = contentHeight;
//         imgWidth = contentHeight * aspectRatio;
//       }

//       const imgX = marginLeft + (contentWidth - imgWidth) / 2;
//       const imgY = marginTop + (contentHeight - imgHeight) / 2;

//       doc.addImage(imgData, "PNG", imgX, imgY, imgWidth, imgHeight);

//       const photoWidth = 0.05 * contentWidth;
//       const photoHeight = photoWidth / aspectRatio / 3;
//       const photoX = marginLeft + 0.2 * contentWidth;
//       const photoTopMargin = 0.08 * contentHeight;
//       const photoY =
//         doc.internal.pageSize.getHeight() -
//         0.05 * contentHeight -
//         photoHeight -
//         photoTopMargin;

//       if (photoPreview) {
//         await new Promise((resolve) => {
//           const image = new Image();
//           image.onload = function () {
//             doc.addImage(this, "JPEG", photoX, photoY, photoWidth, photoHeight);
//             resolve();
//           };
//           image.src = photoPreview;
//         });
//       }

//       const signatureWidth = 0.05 * contentWidth;
//       const signatureHeight = signatureWidth / aspectRatio / 3;
//       const signatureX = marginLeft + 0.2 * contentWidth;
//       const signatureTopMargin = -0.09 * contentHeight;
//       const signatureY =
//         doc.internal.pageSize.getHeight() -
//         0.25 * contentHeight -
//         signatureHeight -
//         signatureTopMargin;

//       if (signaturePreview) {
//         await new Promise((resolve) => {
//           const image = new Image();
//           image.onload = function () {
//             doc.addImage(
//               this,
//               "PNG",
//               signatureX,
//               signatureY,
//               signatureWidth,
//               signatureHeight
//             );
//             resolve();
//           };
//           image.src = signaturePreview;
//         });
//       }

//       // Save the PDF and open it in a new tab
//       doc.save("Agreement.pdf");
//       setLoader(false);
//     });
//   };

//   const handlePhotoChange = (e) => {
//     const selectedPhoto = e.target.files[0];
//     setPhoto(selectedPhoto);
//     setPhotoPreview(URL.createObjectURL(selectedPhoto));
//   };

//   const handleSignatureChange = (e) => {
//     const selectedSignature = e.target.files[0];
//     setSignature(selectedSignature);
//     setSignaturePreview(URL.createObjectURL(selectedSignature));
//   };

//   // useEffect to call
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.post(
//           `${appUrl}/aggriment/getaggrimentdetails`,
//           {
//             email: id,
//           }
//         );
//         const data = response.data;
//         console.log(data, "data hai ye");
//         console.log(data?.results);
//         console.log(data?.userData);
//         console.log(`${appUrl} / data?.signature`);
//         // const data = response.data;
//         const startDate = response.data.data?.startdate
//           ? new Date(response.data.data.startdate).toLocaleDateString()
//           : "";
//         console.log("$$$$", response.data.data);
//         setInputField({
//           name: data?.data?.name,
//           email: data?.data?.email,
//           startDate: data?.data?.startDate,
//           endDate: data?.data?.endDate,
//           address: data?.data?.address,
//           signature: data?.data?.signature,
//           photo: data?.data?.photo,
//         });
//         setPhotoPreview(data?.data?.photo);
//         setSignaturePreview(data?.data?.signature);
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };
//     const getuserdetails = async () => {
//       // const locationid = locationdata?.state?.data?.email;
//       // const otherid = id;
//       // const emailid = locationid ? locationid : otherid;
//       try {
//         const response = await axios.post(
//           // "http://localhost:5000/api/user/getuserdetailsbymail",
//           `${appUrl}/user/getuserdetailsbymail`,

//           {
//             email: id,
//           }
//         );
//         console.log(response.data.response, "email data ");

//         setusername(response.data.response?.name);
//         setuseraddress(response.data.response?.address);
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };
//     getuserdetails();
//     fetchUserDetails();
//   }, [id]);

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;

//     setInputField({
//       ...prevValue,
//       [name]: value,
//     });
//   };
//   console.log("onChangeHandler", onChangeHandler);

//   const handleFileChange = (e, field) => {
//     const file = e.target.files[0];

//     // Check if a file is selected
//     if (file) {
//       // Read the file as a data URL
//       const reader = new FileReader();
//       reader.onload = () => {
//         setInputField({
//           ...inputField,
//           [field]: reader.result,
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const options = {
//     // default is `save`
//     method: "open",
//     // default is Resolution.MEDIUM = 3, which should be enough, higher values
//     // increases the image quality but also the size of the PDF, so be careful
//     // using values higher than 10 when having multiple pages generated, it
//     // might cause the page to crash or hang.
//     resolution: Resolution.HIGH,
//     page: {
//       // margin is in MM, default is Margin.NONE = 0
//       margin: Margin.SMALL,
//       // default is 'A4'
//       format: "letter",
//       // default is 'portrait'
//       orientation: "landscape",
//     },
//     canvas: {
//       // default is 'image/jpeg' for better size performance
//       mimeType: "image/png",
//       qualityRatio: 1,
//     },
//     // Customize any value passed to the jsPDF instance and html2canvas
//     // function. You probably will not need this and things can break,
//     // so use with caution.
//     overrides: {
//       // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
//       pdf: {
//         compress: true,
//       },
//       // see https://html2canvas.hertzen.com/configuration for more options
//       canvas: {
//         useCORS: true,
//       },
//     },
//   };

//   // you can use a function to return the target element besides using React refs
//   const getTargetElement = () => document.getElementById("content-id");

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Zero-pad month
//     const day = String(date.getDate()).padStart(2, "0"); // Zero-pad day
//     return `${year}-${month}-${day}`; // Formatted date YYYY-MM-DD
//   };

//   return (
//     <Box>
//       <Box ref={targetRef} p="20px" id="content-id" className="downLoadBox">
//         <Box width="100%" m="auto">
//           <Box mx="auto" w="100%" overflow="hidden">
//             <Image
//               mx="auto"
//               src={image}
//               alt="Description of the image"
//               maxW="100%"
//             />
//           </Box>
//         </Box>

//         <Box display="flex" justifyContent="space-evenly">
//           <Box>
//             <Image w="150px" h="350px" src={notri} alt="Dan Abramov" />
//           </Box>
//           <Box textAlign="center">
//             <Heading fontSize="1.2rem" mb="4">
//               Legal Employment Contract 2024
//             </Heading>

//             <Text fontSize="1rem">
//               THIS DIGITAL EMPLOYMENT CONTRACT (this "Agreement") Valid Till
//               Eleven Months From 2024-01-01 BETWEEN:
//             </Text>

//             <Text>
//               <Heading fontSize="1.2rem">Zemix Services</Heading>
//             </Text>
//             <Text fontSize="1rem">
//               KASTURI WADI INDRA BAZAR GHANSHAM APARTMENT JAIPUR, RAJASTHAN
//               (RJ), INDIA(IN), 302031 of
//             </Text>

//             {/* <Text fontSize={"1.5rem"}>
//               <strong>(The "Employer")</strong>
//             </Text> */}
//             <Text>
//               <Heading fontSize="1rem">The "Employer"</Heading>
//             </Text>
//             <Text fontSize="1rem">OF THE FIRST PARTY </Text>

//             <Text fontSize="1rem">-AND-</Text>
//             <Text>
//               S/O &nbsp;... &nbsp;... &nbsp;... &nbsp;... &nbsp;... &nbsp;...
//               <strong>(The "Employee")</strong>
//             </Text>
//             <Text fontSize="1rem">OF THE SECOND PARTY</Text>
//           </Box>
//         </Box>

//         <Box>
//           <Heading as="h3" mb={4} size="md">
//             Background
//           </Heading>
//           <Text fontSize="md">
//             A. The Employer Is Of The Opinion That The Employee Has The
//             Necessary Qualifications, Experience, And Abilities To Assist And
//             Benefit The Employer In Requisiting Skills And Infrastructure For
//             Successful Execution Of Form Filling Projects.
//             <br />
//             <br />
//             B. The Employer Desires To Employ The Employee, And The Employee Has
//             Agreed To Accept And Enter Such Employment Upon The Terms And
//             Conditions Set Out In This Agreement.
//             {/* ... (rest of the Background section) */}
//           </Text>
//           <Text fontSize="md">
//             <br />
//             Presently It Is In A Position To Procure The Business For Form
//             Filling More Meaningfully Described In The Column Scope Of Work,
//             Through Their Principals. The Current Project Is Carried Out Under
//             The Cost Of Client And Not An Assignment As Such Acquired By
//             Employee. and where as The Employee Is Engaged Inter Alias, In The
//             Business Of Providing A Wide Spectrum Of Software Solutions &
//             Services.
//             <br />
//             <br />
//             IN CONSIDERATION OF The Matters Described Above and of The Mutual
//             Benefits and Obligations Set Forth In This Agreement, The Receipt
//             And Sufficiency of Which Consideration Is Hereby Acknowledged, The
//             Parties To This Agreement Agree As Follows:
//           </Text>
//         </Box>

//         {/* Commencement Date and Term Section */}
//         <Box>
//           <Heading as="h3" mb={4} size="md">
//             <br />
//             Commencement Date and Term
//           </Heading>
//           <Text fontSize="md">
//             Scope Of Work: The Employee Will Commence Employment With The
//             Employer On 2024-01-01 (the "Commencement Date") Extending Till
//             2024-11-01 (End Of "Term Date").
//             <br />
//             <br />
//             Subject To The Probationary Period And Subject To Termination As
//             Provided In This Agreement, The Employee Is Required To Feed The
//             Provided Data In The Provided Portal As Per The Guidelines Within 5
//             Days From The Date Of Commencement. The Parties Acknowledge That
//             Various Provisions Of This Agreement Survive Past Termination Of
//             Employment.
//           </Text>
//         </Box>

//         {/* Job Title and Description Section */}
//         <Box>
//           <Heading as="h3" mb={4} size="md">
//             <br />
//             1. Job Title and Description
//           </Heading>
//           <Text fontSize="md">
//             1.1. The Initial Job Duties The Employee Will Be Expected To Perform
//             Will Be Consisted Of Filling Of The Forms (Data Entry) As Per The
//             Information And Data Given The Online Portal.
//             <br />
//             <br />
//             1.2. The Employee Agrees To Be Employed On The Terms And Conditions
//             Set Out In This Agreement. The Employee Agrees To Be Subject To The
//             General Supervision Of And Act Pursuant To The Orders, Advice, And
//             Direction Of The Employer.
//             <br /> <br />
//             1.3.The Employee Will Perform Any And All Duties As Requested By The
//             Employer That Are Reasonable And That Are Customarily Performed By A
//             Person Holding A Similar Position In The Industry Or Business Of The
//             Employer.
//             <br />
//             <br />
//             1.4.The Employer May Make Changes To The Job Title Or Duties Of The
//             Employee Where The Changes Would Be Considered Reasonable For A
//             Similar Position In The Industry Or Business Of The Employer.
//             <br />
//             <br />
//             1.5.The Employee Agrees To Abide By The Employers Rules,
//             Regulations, Policies And Practices, Including Those Concerning Work
//             Schedules, Annual Leave And Sick Leave, As They May From Time To
//             Time Be Adopted Or Modified.
//             <br />
//             {/* ... (rest of the Job Title and Description section) */}
//           </Text>
//         </Box>

//         {/* Employee Remuneration Section */}
//         <Box>
//           <Heading as="h3" mb={4} size="md">
//             <br />
//             2. Employee Remuneration
//           </Heading>
//           <Text fontSize="md">
//             2.1. Remuneration: - For The Form Filling Services Rendered By The
//             Employee, The Employee Shall Be Entitled For Payment Of Price 40Rs.
//             (INR) Max Per Form For The Salary May Vary From 20900/- INR To
//             20130/- INR Depends Upon The Accuracy.
//             <br /> <br />
//             2.2.Billing :- Employer Will Provide Workload Of 520 FORMS Which The
//             Employee Shall Complete The Work Within 5 DAYS Under The Given
//             Criteria Of This Agreement. This Agreement Has Been Signed For One
//             System. The Employer Will Make The Payment For The Billing Within 3
//             INTERNATIONAL WORKING Days From Date Of Raising The Project Subject
//             To The Quality Check Report.
//             <br />
//             <br />
//             2.3.Accuracy :- Employer Will Provide Adequate Feedback Within 15
//             Working Days For All Data And On Completion Of Quality Check Shall
//             Issue A Quality Report. Both Parties Agree To Assure Highest Quality
//             Of End Service. Following Cycle For Accuracy Will Be Followed. Cut
//             Off Forms - 468/520 (In Total) - Above 90% @ 40/- INR Per Form. If
//             Below Cut Off Or ID Is Terminated Then The Employee Is Supposed To
//             Clear Registration Amount.
//             <br /> <br />
//             The Q.C. Department Will Check The Forms Randomly. Until The
//             Submitted Slot Is Rejected Above The Cut-Off Criteria If Employee
//             Makes Any Mistake, (Which Includes But Not Limited To Spelling,
//             Punctuation, Extra/Missing Space, Extra/Missing Word, Extra/Missing
//             Line Etc.) In A Form That Form Will Be Rejected, Likewise Employee
//             Have To Maintain Cut Off Or Accuracy.
//             <br />
//             <br />
//             If All The Forms Are Submitted Or In Submit Mode, Then Only The Q.C.
//             Report Will Be Generated Else Not. If Forms Are In Save Mode Then
//             Q.C. Report Will Not Be Generated And That Thing Will Be Considered
//             As Incomplete Submission Only.
//             <br />
//             <br />
//             You Can Save The Forms, Saved Forms Are Editable/Changeable For 48
//             Hours Only, Then After All Those Forms Will Automatically Submitted
//             And Becomes Non-Editable.
//             <br />
//             <br />
//             To Generate The Q.C. Report, All The Forms Should Be Submitted. If
//             All The Forms Are Not Submitted Then It Will Be Considered As
//             Incomplete Submission Only.
//             <br />
//             <br />
//             <br />
//             {/* ... (rest of the Employee Remuneration section) */}
//           </Text>
//         </Box>

//         {/* Conflict of Interest Section */}
//         <Box>
//           <Heading as="h3" mb={4} size="md">
//             3. Conflict of Interest
//           </Heading>
//           <Text color="red" fontSize="md">
//             3.1. Application Fee(s): The Registration Amount Of 6700/- INR. Will
//             Be Deducted From The Salary If Generated, And If The Salary Is Not
//             Generated i.e If The Employee Fails To Complete The Work, Then You
//             are required to work for 5 days. If you fail to commence your work
//             after accepting it or choose to cancel it, you will be obligated to
//             pay the registration amount.
//           </Text>

//           <br />
//           <Text>
//             He/She Is Liable Pay The Same Registration Amount On Their Own. The
//             Employee Must Start & Complete His/her Work Of Form-Filling Assigned
//             To Them By The Employer From The Date Of Starting The Project
//             (Selected By The Employee As Per His/her Own Convenience). In Case
//             Of Failure In Starting Of The Work From Employee's End Or "0" Number
//             Of Forms Detected Or Incomplete Submission Of Work Is Defined By The
//             Employer Then Application Fee(s) + NOC Invoice Needs To Be Cleared
//             By The Employee. <br /> <br />
//             As The Employer Will Have To Face The Economic Crisis In The
//             Business In Case Of Failure Of This Project In Any Of The Criteria
//             As Per This Agreement. <br /> <br />
//             The Employee Understands And Agrees That Any Attempt On The Part Of
//             The Employee To Induce Other Employees Or Contractors To Leave The
//             Employers Employ, Or Any Effort By The Employee To Interfere With
//             The Employers Relationship With Its Other Employees And Contractors
//             Would Be Harmful And Damaging To The Employer.
//             <br /> <br />
//             During The Term Of The Employees Active Employment With The
//             Employer, The Employee Will Not, Directly Or Indirectly, Engage Or
//             Participate In Any Other Business Activities That The Employer, In
//             Its Reasonable Discretion, Determines To Be In Conflict With The
//             Best Interests Of The Employer Without The Written Consent Of The
//             Employer.
//             <br /> <br />
//             3.2.ID Allocation :- Employee Will Get A Single ID To Work On And
//             Employee Can Work 24X7 On This ID. If The Software Portal Or The
//             Server Of The Company Detects That There Are Multiple Login
//             Attempts/Multiple IP Addresses Login Of The User Account Or I.D, The
//             Company Will Not Be Responsible For The Corruption Of The Data In
//             Both Online And Offline Modules. And The Employee€™s I.D. Will Get
//             Terminated Without Any Intimation And The Employee Needs To Clear
//             The Server Maintenance Charge Up to 7999/- INR.(Refundable Amount)
//             For That Particular Project As Per This Agreement.
//             <br /> <br />
//             3.3.TAT (Turn Around Time): The Second Party Has 5 Days(Including
//             Holidays) To Complete The New Work And Second Party Has To Send It
//             To First Party. The First Party Shall Give An Accuracy Report Within
//             2-3 Working Days For The New Work, After Submissions As Per
//             Technical Specifications Which Are Included In This Agreement With
//             Accuracy Parameters.
//             <br /> <br />
//             3.4.Employer Agrees To Provide Formats And Other Information For
//             Processing The Job To Employee At The Time Of Providing The Data And
//             The Employee Agrees With The Format And Other Information Which Is
//             Being Processed To The Particular. <br /> <br />
//             3.5.Employee Will Execute The Data Processing Work Provided By
//             Employer Through Experienced Persons In Such Manner So As To Carry
//             Out The Work Efficiently At Minimum Of 90% Accuracy For Out Files.
//             <br /> <br />
//             3.6.This Agreement Represents The Business Agreement And Operational
//             Understandings Between The Parties And Shall Remain In Effect For A
//             Period Of Eleven Months From The Date Of Execution Hereof. The
//             Employers Specifications In Terms Of Quality And Other Parameters
//             That Shall Be Issued By TheEmployer/Their Principals From Time To
//             Time And Acknowledged By The Employer Shall Be Read With This
//             Agreement. <br /> <br />
//             Employer/Their Principals From Time To Time And Acknowledged By The
//             Employer Shall Be Read With This Agreement.
//             {/* ... (rest of the Conflict of Interest section) */}
//           </Text>
//         </Box>

//         {/* Termination of Employment Section */}
//         <Box>
//           <Heading as="h3" mb={4} size="md">
//             <br />
//             4. Termination of Employment
//           </Heading>
//           <Text fontSize="md">
//             4.1. Termination: - If Employee Fails To Submit Data On Time Or, If
//             Employee Fails To Give Accuracy In Output Files.
//             <br />
//             Client Reserves The Right To Terminate The Agreement With Immediate
//             Effect. And Zemex Services Will Not Be Responsible For Any Further
//             Data And Payment To The Employee. And Employee Will Be Liable To Pay
//             The Maintenance Amount To The Client As Mentioned In Clause-4 In
//             This Agreement And Employee Will Also Be Liable To Pay Expenses Of
//             The Employer For Legal Proceedings. Where There Is Just Cause For
//             Termination, The Employer May Terminate The Employee Employment
//             Without Notice, As Permitted By Law.
//             <br /> <br />
//             4.2.No Modification Of The Terms Of This AGREEMENT Shall Be Valid
//             Unless It Is In Writing And Signed By Both The Parties.
//             <br />
//             4.3.Force Majeure: If The Rendition Of The Form Filling Services Is
//             Hampered Due To Earthquake, Flood, Tempest, Civil Riots Or Act Of
//             God Then The Business Associate Shall Be Absolved Of Its Obligations
//             Hereunder Till Normalcy Is Restored After The Cessation Of The
//             Aforementioned Contingencies. The Employee Shall Likewise Be
//             Absolved If Rendition Of The Services Is Hampered Due To A Strike
//             Called By The Data Entry Operators Engaged By The Employee, Violence
//             Or Political Turbulence Or For Any Other Reason Of A Similar Nature,
//             Which Is Beyond The Control Of The Employee.
//             <br /> <br />
//             {/* ... (rest of the Termination of Employment section) */}
//           </Text>
//         </Box>

//         {/* Non-Solicitation Section */}
//         <Box>
//           <Heading as="h3" mb={4} size="md">
//             5. Non-Solicitation
//           </Heading>
//           <Text fontSize="md">
//             5.1. The Employee Understands And Agrees That Any Attempt On The
//             Part Of The Employee To Induce Other Employees Or Contractors To
//             Leave The Employers Employ Would Be Harmful And Damaging To The
//             Employer.
//             <br />
//             <br />
//             5.2.The Employee Will Not In Any Way, Directly Or Indirectly :-{" "}
//             <br />
//             <br />
//             <Text ml={"1rem"}>
//               5.2.1.Induce Or Attempt To Induce Any Employee Or Contractor Of
//               The Employer To Quit Employment O Retainer With The Employer.{" "}
//               <br /> <br />
//               5.2.2.Discuss Employment Opportunities Or Provide Information
//               About Competitive Employment To Any O The Employers Employees Or
//               Contractors.
//             </Text>
//             <br />
//             This Non-solicitation Obligation As Described In This Section Will
//             Be Limited To Employees Or Contractors Who Were Employees Or
//             Contractors Of The Employer During The Period That The Employee Was
//             Employed By The Employer.
//             <br /> <br />
//             {/* ... (rest of the Non-Solicitation section) */}
//           </Text>
//         </Box>

//         {/* Confidential Information Section */}
//         <Box>
//           <Heading as="h3" mb={4} size="md">
//             6. Confidential Information
//           </Heading>
//           <Text fontSize="md">
//             6.1. The Employee Acknowledges That, In Any Position The Employee
//             May Hold, In And As A Result Of The Employees Employment By The
//             Employer, The Employee Will, Or May, Be Making Use Of, Acquiring Or
//             Adding To Information Which Is Confidential To The Employer (the
//             "Confidential Information").
//             <br />
//             <br />
//             6.2.The Employee Agrees And Acknowledges That The Confidential
//             Information Is Of A Proprietary And Confidential Nature And That Any
//             Disclosure Of The Confidential Information To A Third Party In
//             Breach Of This Agreement Cannot Be Reasonably Or Adequately
//             Compensated For In Money Damages, Would Cause Irreparable Injury To
//             Employer, Would Gravely Affect The Effective And Successful Conduct
//             Of The Employers Business And Goodwill, And Would Be A Material
//             Breach Of This Agreement.
//             <br /> <br />
//             {/* ... (rest of the Confidential Information section) */}
//           </Text>
//         </Box>

//         {/* Severability Section */}
//         <Box>
//           <Heading as="h3" mb={4} size="md">
//             7. Severability
//           </Heading>
//           <Text fontSize="md">
//             7.1.The Employer And The Employee Acknowledge That This Agreement Is
//             Reasonable, Valid And Enforceable. However, If Any Term, Covenant,
//             Condition Or Provision Of This Agreement Is Held By A Court Of
//             Competent Jurisdiction To Be Invalid, Void Or Unenforceable, It Is
//             The Parties Intent That Such Provision Be Changed In Scope By The
//             Court Only To The Extent Deemed Necessary By That Court To Render
//             The Provision Reasonable And Enforceable And The Remainder Of The
//             Provisions Of This Agreement Will In No Way Be Affected, Impaired Or
//             Invalidated As A Result.
//             <br />
//             <br />
//             7.2.Variation: Except As Otherwise Expressly Provided In This
//             Agreement, This Agreement May Not Be Changed Or Modified In Any Way
//             After It Has Been Signed, Except In Writing Signed By Or On Behalf
//             Of Both Of The Parties.
//             <br /> <br />
//             7.3.Dispute Resolution & Jurisdiction: In The Event Of Any Dispute
//             Or Difference Arising Between The Parties Hereto Relating To Or
//             Arising Out Of This Agreement, Including The Implementation,
//             Execution, Interpretation, Rectification, Validity, Enforceability,
//             Termination Or Rescission Thereof, Including The Rights, Obligations
//             Or Liabilities Of The Parties Hereto, The Same Will Be Adjudicated
//             And Determined By Arbitration. The Indian Arbitration & Conciliation
//             Act, 1996 Or Any Statutory Amendment Or Re-enactment Thereof In
//             Force In India, Shall Govern The Reference. Both Parties Shall
//             Appoint Their Respective Arbitrator, And Both Arbitrators Thus
//             Appointed Should Appoint The Third Arbitrator Who Shall Function As
//             The Presiding Arbitrator. The Venue Of Arbitration Shall Be Jaipur
//             (Rajasthan). The Courts In The City Of Rajkot Shall Have Exclusive
//             Jurisdiction To Entertain Try And Determine The Same
//             <br /> <br />
//             7.4.Both The Parties Hereby Agree Neither To Circumvent Or Nor To
//             Disclose The Identities, Information As Well As The Essence Of The
//             Project Etc. Of Each Others/Principles, Clients Etc. To Any Other
//             Third Party And Neither Of Us Will Approach Each Contracts Of Each
//             Other As Identified From Time To Time.
//             <br />
//             <br />
//             {/* ... (rest of the Severability section) */}
//           </Text>
//         </Box>
//         <Box>
//           <Text fontSize="md" fontWeight="bold">
//             IN WITNESS WHEREOF
//           </Text>
//           <Text fontSize="md">
//             The Parties Hereto Have Executed These Presents On the Date Herein
//             Before Written :-
//           </Text>

//           <Text fontWeight={"500"} fontSize="1xl" mt="4">
//             A. Employer : -
//           </Text>
//           <Text fontSize="md">
//             Name : Zemex Service <br />
//             Email : helplinezxservicewww@gmail.com <br />
//             Address : KASTURI WADI INDRA BAZAR GHANSHAM APARTMENT JAIPUR,
//             RAJASTHAN(RJ), INDIA(IN) 302031
//           </Text>

//           <Text fontWeight={"500"} mt="4" fontSize="1 xl">
//             B. Employee : -
//           </Text>
//         </Box>
//         <Box display="flex" justifyContent="space-between">
//           <Box>
//             {/* <FormControl w="400px">
//               <Text>Name : {inputField.name}</Text>

//             </FormControl> */}
//             <FormControl minW="400px">
//               <Text fontSize="md"> Name: {username}</Text>
//               <Text fontSize="md"> Email: {inputField.email}</Text>
//               <Text fontSize="md"> Address: {useraddress}</Text>
//             </FormControl>
//             <FormControl w="200px">
//               {/* <Input
//             value={date}
//             onChange={(e) =>setDate(e.target.value)}
//             type="date"
//             placeholder="Enter the Date"
//             _hover={{ borderColor: "teal.500" }}
//           /> */}
//               <Text fontSize="md">
//                 {" "}
//                 Start-Date: {moment(inputField.startdate).format("MM/DD/YYYY")}
//               </Text>
//             </FormControl>
//             <FormControl w="200px">
//               <Text fontSize="md">
//                 {" "}
//                 End-Date:{" "}
//                 {moment(inputField?.startdate)
//                   .add(4, "days")
//                   .format("MM/DD/YYYY")}
//               </Text>
//             </FormControl>

//             <Table w="400px" style={{ marginTop: "20px" }}>
//               <Tr>
//                 <Td>
//                   <Box onChange={handleSignatureChange}>
//                     <Text mb={"10px"}>Signature</Text>
//                     {signaturePreview && (
//                       <Image
//                         src={signaturePreview}
//                         alt="Signature Preview"
//                         w="25%"
//                         // style={{ maxWidth: "100px", marginTop: "10px",}}
//                       />
//                     )}
//                     {console.log(signaturePreview, "signaturePreview")}
//                   </Box>
//                 </Td>
//                 <Td>
//                   <Box ml={"-10rem"} onChange={handlePhotoChange}>
//                     <Text mb={"10px"}>Photo</Text>
//                     {photoPreview && (
//                       <Image
//                         src={photoPreview}
//                         alt="Photo Preview"
//                         w="20%"
//                         // style={{
//                         //   maxWidth: "100px",
//                         //   marginTop: "10px",
//                         // }}
//                       />
//                     )}
//                   </Box>
//                 </Td>
//               </Tr>
//             </Table>
//           </Box>
//         </Box>
//         <Flex>
//           <Box mt={"1rem"} boxSize="sm">
//             <Image src={LeaseAgreement} alt="Stamp" w={["60%", "40%"]} />
//           </Box>
//           <Box mr={"4rem"} mt={"1.3bhai rem"} boxSize="sm">
//             <Image src={sign} alt="Stamp" w="70%" />
//           </Box>
//         </Flex>
//       </Box>
//       <Box>
//         <Button
//           ml={"2rem"}
//           mt={"-30rem"}
//           bg={"lightgreen"}
//           _hover={{ background: "gray", color: "white" }}
//           onClick={() => toPDF()}
//         >
//           Download PDF
//         </Button>
//         <Button onClick={() => downloadPDF()}>Generate PDF</Button>
//       </Box>
//     </Box>
//   );
// };

// export default StampPaperView;

// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import moment from "moment";
// import {
//   Box,
//   Heading,
//   Text,
//   Image,
//   Table,
//   Tr,
//   Td,
//   Input,
//   Button,
//   FormControl,
//   FormLabel,
//   Flex,
// } from "@chakra-ui/react";
// import { useLocation } from "react-router-dom";
// import Front from "../../assets/Front.jpg";
// import { useEffect, useState } from "react";
// import { usePDF } from "react-to-pdf";

// import axios from "axios";
// import { useParams } from "react-router-dom";
// // import sign from "../../assets/Stamp.jpg";
// import stamplogo from "../../assets/stamplogo.svg"
// const StampPaperView = () => {
//   const { toPDF, targetRef } = usePDF({ filename: "Legal-Agreement.pdf" });
//   const locationdata = useLocation();

//   console.log(locationdata?.state?.data, "location date ");
//   const { id } = useParams();
//   const appUrl = import.meta.env.VITE_APP_API_URL;
//   const [doc, setDoc] = useState(null);
//   const [username, setusername] = useState("");
//   const [useraddress, setuseraddress] = useState("");
//   const [inputField, setInputField] = useState({
//     name: "",
//     email: "",
//     startdate: "",
//     address: "",
//     photo: "",
//     signature: "",
//     enddate: "",
//   });

//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [signaturePreview, setSignaturePreview] = useState(null);

//   const userId = localStorage.getItem("userId");

//   const [loader, setLoader] = useState(false);

//   const downlodePDF = async (photoPreview, signaturePreview) => {
//     const capture = document.querySelector(".downLodeBox");
//     setLoader(true);

//     html2canvas(capture).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const doc = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         // format: [canvas.width, canvas.height],
//         format: window.innerWidth > 600 ? [canvas.width, canvas.height] : "a4",
//       });

//       // const marginLeft = 0;
//       // const marginTop = 0;
//       const marginLeft = 10; // Adjust as needed
//       const marginRight = 10; // Adjust as needed
//       const marginTop = 10; // Adjust as needed
//       const marginBottom = 10; // Adjust as needed

//       // const contentWidth = doc.internal.pageSize.getWidth() - 2 * marginLeft;
//       // const contentHeight = doc.internal.pageSize.getHeight() - 2 * marginTop;

//       const contentWidth =
//         doc.internal.pageSize.getWidth() - marginLeft - marginRight;
//       const contentHeight =
//         doc.internal.pageSize.getHeight() - marginTop - marginBottom;

//       const aspectRatio = canvas.width / canvas.height;
//       let imgWidth = contentWidth;
//       let imgHeight = contentWidth / aspectRatio;

//       if (imgHeight > contentHeight) {
//         imgHeight = contentHeight;
//         imgWidth = contentHeight * aspectRatio;
//       }

//       const imgX = marginLeft + (contentWidth - imgWidth) / 2;
//       const imgY = marginTop + (contentHeight - imgHeight) / 2;

//       doc.addImage(imgData, "PNG", imgX, imgY, imgWidth, imgHeight);

//       // const photoX = marginLeft + 420;
//       // const photoY = doc.internal.pageSize.getHeight() - 400;
//       // if (photoPreview) {
//       //     doc.addImage(photoPreview, "JPEG", photoX, photoY, 35, 75);
//       // }

//       // const signatureX = marginLeft + 400;
//       // const signatureY = doc.internal.pageSize.getHeight() - 400;
//       // if (signaturePreview) {
//       //     doc.addImage(signaturePreview, "PNG", signatureX, signatureY, 35, 75);
//       // }

//       const photoWidth = 0.05 * contentWidth;
//       const photoHeight = photoWidth / aspectRatio / 3;
//       const photoX = marginLeft + 0.2 * contentWidth;
//       const photoTopMargin = 0.08 * contentHeight;
//       const photoY =
//         doc.internal.pageSize.getHeight() -
//         0.05 * contentHeight -
//         photoHeight -
//         photoTopMargin;

//       if (photoPreview) {
//         doc.addImage(
//           photoPreview,
//           "JPEG",
//           photoX,
//           photoY,
//           photoWidth,
//           photoHeight
//         );
//       }

//       const signatureWidth = 0.05 * contentWidth;
//       const signatureHeight = signatureWidth / aspectRatio / 3;
//       const signatureX = marginLeft + 0.2 * contentWidth;
//       const signatureTopMargin = -0.09 * contentHeight;
//       const signatureY =
//         // doc.internal.pageSize.getHeight() -
//         // 0.25 * contentHeight -
//         // signatureHeight -
//         // signatureTopMargin;
//         marginTop + 0.05 * contentHeight + signatureHeight + signatureTopMargin;

//       if (signaturePreview) {
//         doc.addImage(
//           signaturePreview,
//           "PNG",
//           signatureX,
//           signatureY,
//           signatureWidth,
//           signatureHeight
//         );
//       }

//       // Save the PDF and open it in a new tab
//       doc.save("Agreement.pdf");
//       setLoader(false);

//       // Open the PDF in a new tab
//       // const pdfBlob = doc.output('blob');
//       // const pdfUrl = URL.createObjectURL(pdfBlob);
//       // window.open(pdfUrl, '_blank');
//     });
//   };

//   const handlePhotoChange = (e) => {
//     const selectedPhoto = e.target.files[0];
//     setPhoto(selectedPhoto);
//     setPhotoPreview(URL.createObjectURL(selectedPhoto));
//   };

//   const handleSignatureChange = (e) => {
//     const selectedSignature = e.target.files[0];
//     setSignature(selectedSignature);
//     setSignaturePreview(URL.createObjectURL(selectedSignature));
//   };

//   const getuserdetails = async () => {
//     const locationid = locationdata?.state?.data?.email;
//     const otherid = id;
//     const emailid = locationid ? locationid : otherid;
//     try {
//       const response = await axios.post(
//         // "http://localhost:5000/api/user/getuserdetailsbymail",
//         `https://greentenbe-production.up.railway.app/api/user/getuserdetailsbymail`,

//         {
//           email: emailid,
//         }
//       );
//       console.log(response.data.response, "email data ");

//       setusername(response.data.response?.name);
//       setuseraddress(response.data.response?.address);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const locationid = locationdata?.state?.data?.email;
//       const otherid = id;
//       const emailid = locationid ? locationid : otherid;

//       console.log(emailid, "id");
//       try {
//         const response = await axios.post(
//           `https://greentenbe-production.up.railway.app/api/aggriment/getaggrimentdetails`,
//           {
//             email: emailid,
//           }
//         );
//         const data = response.data;
//         const startDate = response.data.data?.startdate
//           ? new Date(response.data.data.startdate).toLocaleDateString()
//           : "";
//           console.log("$$$$" , response.data.data);
//         setInputField({
//           // name: response.data.data?.name,
//           email: response.data.data?.email,
//           startdate: response.data.data?.startdate,
//           // address: response.data.data?.address,
//           signature: response.data.data?.signature,
//           photo: response.data.data?.photo,
//           enddate: response.data.data?.endDate,
//         });
//         console.log(inputField, "inputField");
//         setPhotoPreview(response.data.data.photo);
//         setSignaturePreview(response.data.data?.signature);
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };

//     fetchUserDetails();
//   }, [id]);
//   useEffect(() => {
//     getuserdetails();
//   }, [id]);

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;

//     setInputField({
//       ...prevValue,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e, field) => {
//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setInputField({
//           ...inputField,
//           [field]: reader.result,
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   // ... rest of the code

//   return (
//     <>
//       <Box>
//         <Box minWidth="100%" ref={targetRef}>
//           <Box
//             display="flex"
//             flexDirection="column"
//             textAlign="center"
//             maxWidth="100%"
//           >
//             <Box
//               mx="auto"
//               boxSize={{ base: "100%", md: "auto" }} // Adjusted to "auto" for non-base screen sizes
//               objectFit="contain"
//               mb={{ base: "2", lg: "0" }}
//               bg={"red"}
//               maxWidth="100%" // Added maxWidth property
//             >
//               <Image src={Front} alt="Description of the image" />
//             </Box>
//           </Box>

//           <Box>
//             <Text
//               fontSize={["0.8rem", "1.5rem"]}
//               mt={["-3rem", "-1rem"]}
//               padding={["1rem", "3rem"]}
//               fontWeight={"500"}
//             >
//               Present we are providing the business for form filling more
//               meaningfully described in the column Scope of Work, through their
//               principals.
//               <br />
//               <br />
//               AND WHEREAS the Business Associate is engaged inter alias, in the
//               business of providing a wide Spectrum of online form filling &
//               services.
//               <br />
//               <br />
//               The Business Associate has acquired the necessary expertise and
//               developed the requisite skill base and infrastructure for
//               successful execution of Form Filling Projects.
//               <br />
//               <br />
//               This Agreement represents the business Agreement and operational
//               understandings between the parties and shall remain in effect for
//               a period of ELEVEN MONTHS from the date of execution hereof or
//               from the date of providing the first data whichever is later & can
//               be extended for the period as mutually agreed upon, for the
//               purpose
//               <br />
//               <br />
//               {/* <p color="red" fontSize={{ base: "1rem", md: "1rem" }}>
//       NOW THIS AGREEMENT WITNESSETH AS FOLLOWS: BOTH PARTIES ARE
//       MUTUALLY AGREE FOR THE FOLLOWING POINTS.
//     </p> */}
//               <Text fontSize={["0.8rem", "1.5rem"]} color="red">
//                 NOW THIS AGREEMENT WITNESSETH AS FOLLOWS: BOTH PARTIES ARE
//                 MUTUALLY AGREE FOR THE FOLLOWING POINTS.
//               </Text>
//               <br />
//               1. Main Purpose: The Original data will be available online on
//               website provided by Greenten Enterprise at the time of signup. You
//               are required to feed the provided data field wise online as per
//               the guidelines. Data supply and preservation of the output file is
//               done online on real time basis.
//               <br />
//               <br /> 2. Compensation: For the Form Filling services rendered by
//               the Business Associate, they shall be entitled for payment of
//               price 38 RS (INR) per form (if you achieved cut-off above 450) The
//               Business Associate shall raise invoice after completion of work
//               with the data. The Invoice can be raised through email. Q.C.
//               report will be provided in 72 Hrs. International Working Days from
//               the date of submission.
//               <br />
//               <br />
//               3. Payouts: Client will provide workload of 400 FORMS 5 Days. This
//               MOU has been signed for 1 system.
//               <br />
//               <br />
//               4. SERVICES: - Business Associate will get single id to work on
//               and business associate can work 24X7 on this id.
//               <br />
//               <br />
//               5. Time Period for work completion: you have 5 days (include
//               holidays) to complete the New work and Second Party has to send it
//               to First Party. The First Party shall give an accuracy report
//               within 72 hrs. For the New Work, after submissions as per
//               technical specifications which are included in this agreement with
//               accuracy parameters
//               <br />
//               <br /> 6. Client agrees to provide formats and other information
//               for processing the job to Business Associate at the time of
//               providing the data.
//               <br />
//               <br />
//               7. Telecommunication cost applicable at each end shall be borne by
//               the respective parties. 8. Business Associate will execute the
//               data processing work provided by Client through experienced
//               persons in such manner so as to carry out the work efficiently at
//               minimum of 90% accuracy for out files.
//               <br />
//               <br />
//               <p
//                 style={{
//                   color: "red",
//                 }}
//               >
//                 If you want Extra days to complete the project than you need to
//                 pay extension charges to the company.
//               </p>
//               {/* ... (rest of the Background section) */}
//             </Text>
//             <Text
//               fontSize={["0.8rem", "1.5rem"]}
//               mt={["-3rem", "-5rem"]}
//               fontWeight={"500"}
//               padding={["1rem", "3rem"]}
//             >
//               <br />
//               9. This agreement represents the business Agreement and
//               operational understandings between the parties and shall remain in
//               effect for a period of Eleven months from the date of execution
//               hereof. The client specifications in terms of quality and other
//               parameters that shall be issued by the Client/their principals
//               from time to time and acknowledged by the Business Associate shall
//               be read with this agreement.
//               <br />
//               <br />
//               10. Termination Clauses: - If you fail to submit data on time or,
//               If fails to give accuracy in output files. Company reserves the
//               right to terminate the agreement with immediate effect. And PEXIV
//               will not be responsible for any further data and payment to the
//               Business Associate.
//               <br />
//               <br />- If company found that there are multiple logins of a
//               single I.D., The company will not be responsible for the
//               corruption of the data in both online and offline modules. And
//               your I.D. will get terminated without any intimation. If we find
//               any 2 login/ logout together, 2 IP address without login/ logout,
//               browser upgrade/ degrade without login / logout then ID will be
//               terminate without any prior intimation.
//               <br />
//               <br />- If any kind of malfunctioning found in the work then
//               company reserved right to take trail of your work for a day.
//               <br />
//               <br />- If you break the company rules & regulations means your id
//               is get terminate, company will not do any financial transaction
//               with you.
//               <br />
//               <br />
//               11. No modification of the terms of this AGREEMENT shall be valid
//               unless it is in writing and signed by all the parties.
//               <br />
//               <br />
//               12. Force Majeure: If the rendition of the Form Filling Services
//               is hampered due to earthquake, flood, tempest, civil riotsor Act
//               of God then the Business Associate shall be absolved of its
//               obligations hereunder till normalcy is restored after the
//               cessation of the aforementioned contingencies. The Business
//               Associate shall likewise be absolved if rendition of the services
//               is hampered due to a strike called by the date entry operators
//               engaged by the Business Associate, violence or political
//               turbulence or for any other reason of a similar nature, which is
//               beyond the control of the Business Associate.
//               <br />
//               <br />
//               13. Severability: Unenforceability of any provision of this
//               Agreement shall not affect any other provisions herein contained;
//               instead, this Agreement shall be construed as if such
//               unenforceable provision had not been contained herein.
//               <br />
//               <br />
//               14. Variation: Except as otherwise expressly provided in this
//               Agreement, this Agreement may not be changed or modified in any
//               way after it has been signed, except in writing signed by or on
//               behalf of both of the parties.
//               <br />
//               <br />
//               15. Dispute Resolution & Jurisdiction: In the event of any dispute
//               or difference arising between the parties hereto relating to or
//               arising out of this Agreement, including the implementation,
//               execution, interpretation, rectification, validity,
//               enforceability, termination or rescission thereof, including the
//               rights, obligations or liabilities of the parties hereto, the same
//               will be adjudicated and determined by arbitration. The Indian
//               Arbitration & Conciliation Act, 1996 or any statutory amendment or
//               re-enactment thereof in force in India, shall govern the
//               reference. Both parties shall appoint their respective arbitrator,
//               and both arbitrators thus appointed should appoint the third
//               Arbitrator who shall function as the presiding Arbitrator. The
//               venue of arbitration shall be Jodhpur, Rajasthan. The Courts in
//               the city of Rajasthan shall have exclusive jurisdiction to
//               entertain try and determine the same.
//               <br />
//               <br /> 16. Both the parties hereby agree neither to Circumvent or
//               nor to disclose the identities, Information as well as the essence
//               of the project etc of each otherPrincipals, clients etc. to any
//               other Third party and neither of us will approach each otherâ€™s
//               contracts as identified from time to time.
//             </Text>
//           </Box>

//           {/* Commencement Date and Term Section */}
//           <Box mt={["-1rem", "-5rem"]}>
//             <Heading padding={["1rem", "3rem"]} as="h2" mb={4}>
//               PRIMARY NOTE
//             </Heading>
//             <Text
//               fontSize={["0.8rem", "1.5rem"]}
//               mt={["-1rem", "-5rem"]}
//               fontWeight={"500"}
//               padding={["1rem", "3rem"]}
//             >
//               (A) In the matter of fact failure, not submitted or succeed
//               company is entitled to receive amount by any cost. If you achieve
//               the accuracy which mentioned above, then Utility charges will be
//               deduct from your work payment and if you fail to achieve accuracy
//               in given timeline, then also you have to pay as a liability which
//               describe above.
//               <br />
//               <br />
//               (B) This charges related to service, development and maintenance
//               cost of the platform where you working online.
//               <br />
//               <br /> (c) If you deny paying the said amount then company will
//               take this matter legally & all the legal expenses will be clear by
//               your side, company is not liable for the same.
//             </Text>
//           </Box>

//           <Box mt={["-1rem", "1rem"]}>
//             <Heading padding={["1rem", "3rem"]} as="h2" mb={4}>
//               Required Accuracy by the company:
//             </Heading>
//             <Text
//               fontSize={["0.8rem", "1.5rem"]}
//               mt={["-1rem", "-5rem"]}
//               fontWeight={"500"}
//               padding={["1rem", "3rem"]}
//             >
//               You must have to provide 90% accuracy in form filling work (400
//               Forms) in 5 Days. if you are fail to provide 90% accuracy, you
//               must have to pay registration amount
//               <br />
//               <br /> Registration Amount : 5500 (Per Month Basis) INR. Reg.
//               Amount Will Deduct From Your Salary per month Salary (Weekly) :
//               18240 INR
//               <br />
//               <br />
//               <p style={{ color: "red" }}>
//                 Below cut off - you are not qualified for payment & id will be
//                 terminating by server side.
//               </p>
//             </Text>
//           </Box>

//           <Box mt={["-1rem", "-5rem"]}>
//             <Text
//               fontSize={["0.8rem", "1.5rem"]}
//               fontWeight={"500"}
//               padding={["1rem", "3rem"]}
//               style={{
//                 fontWeight: "bold", // Add this line to make the text more bold
//               }}
//             >
//               IN WITNESS WHEREOF
//             </Text>
//             <Text
//               fontSize={["0.8rem", "1.5rem"]}
//               mt={["-1rem", "-5rem"]}
//               fontWeight={"500"}
//               padding={["1rem", "3rem"]}
//             >
//               the parties hereto have executed these presents on the date
//               hereinbefore written:
//             </Text>
//             <Text
//               fontSize={["0.8rem", "1.5rem"]}
//               mt={["-1rem", "-5rem"]}
//               fontWeight={"500"}
//               padding={["1rem", "3rem"]}
//               style={{
//                 fontWeight: "bold",
//               }}
//             >
//               testing I hereby affirm by my signature that I have read this Work
//               from Home Agreement, and understand and agree to all of its
//               provisions. The Work from Home Agreement itself is not a contract
//               of employment and may not be construed as one. I understand that I
//               am accountable to all previous confidentiality agreements,
//               policies and procedures of the company. I have read a copy of the
//               Work from Home Policy. I understand all the rules & regulations
//               which are mentioned in agreement and I am ready to do work with
//               Greenten Enterprise.
//             </Text>
//           </Box>

//           <Box>
//             <Text
//               mt={["-1rem", "1rem"]}
//               padding={["1rem", "3rem"]}
//               fontWeight={"900"}
//               fontSize={"1.5rem"}
//             >
//               Employer : -
//             </Text>
//             <Text
//               w={["400px", "700px"]}
//               mt={["-1rem", "-5rem"]}
//               fontWeight={"500"}
//               padding={["1rem", "3rem"]}
//             >
//               Name : Trickline  Enterprises <br />
//               Email : helplinessrvice156@gmail.com <br />
//               Address : block number: 23 Hanuman Nagar Ajmer Road
//               S.O, Jaipur, 302006
//             </Text>
//           </Box>
//           <Text
//             mt={["-1rem", "-5rem"]}
//             padding={["1rem", "3rem"]}
//             fontWeight={"900"}
//             fontSize={"1.5rem"}
//           >
//             Employee : -
//           </Text>
//           <Box mt={["-1rem", "-5rem"]} padding={["1rem", "3rem"]}>
//             <FormControl w={["200px", "300px"]}>
//               <Text fontSize="md">Name: {username}</Text>
//             </FormControl>

//             <FormControl w={["200px", "300px"]}>
//               <Text fontSize="md">Email: {inputField.email}</Text>
//             </FormControl>
//             <FormControl w={["200px", "300px"]}>
//               <Text fontSize="md">Address: {useraddress}</Text>
//             </FormControl>
//             <FormControl w={["200px", "300px"]}>
//               <Text fontSize="md">
//                 Start-Date: {moment(inputField.startdate).format("MM/DD/YYYY")}
//               </Text>

//             </FormControl>
//             <FormControl w={["200px", "300px"]}>
//               <Text fontSize="md">
//                 End-Date:{" "}
//                 {moment(inputField?.startdate)
//                   .add(4, "days")
//                   .format("MM/DD/YYYY")}
//               </Text>
//             </FormControl>
//           </Box>

//           {/* <Box width={["200px", "400px"]}>
//   <Image src={sign} alt="Stamp" />
// </Box>

//   <Box>

//             <Table
//             bg="red"
//             mt={"1rem"}   w={["350px", "700px"]} >
//               <Tr>
//                 <Td>
//                   <Box onChange={handleSignatureChange}>
//                     <Text mb={"10px"}>Signature</Text>
//                     {signaturePreview && (
//                       <Image
//                         src={signaturePreview}
//                         alt="Signature Preview"
//                         w="25%"
//                       />
//                     )}
//                   </Box>
//                 </Td>
//                 <Td>
//                   <Box  onChange={handlePhotoChange}>
//                     <Text mb={"10px"}>Photo</Text>
//                     {photoPreview && (
//                       <Image src={photoPreview} alt="Photo Preview" w="20%" />
//                     )}
//                   </Box>
//                 </Td>
//               </Tr>
//             </Table>
//           </Box> */}
//           <Box display="flex" justifyContent="center" mt="1rem">
//             <Box ml="2rem" w={["255%", "105%"]} h={["0%", "20%"]} mr="1rem">
//               <Image src={stamplogo} alt="Stamp" />
//             </Box>
//             <Box display="flex" flexDirection="row">
//               <Box onChange={handleSignatureChange}>
//                 <Text mb={"10px"}>Signature</Text>
//                 {/* <input type="file" onChange={handleSignatureChange} /> */}
//                 {signaturePreview && (
//                   <Image
//                     src={signaturePreview}
//                     alt="Signature Preview"
//                     w="45%"
//                   />
//                 )}
//               </Box>
//               <Box onChange={handlePhotoChange}>
//                 <Text mb={"10px"}>Photo</Text>

//                 {photoPreview && (
//                   <Image src={photoPreview} alt="Photo Preview" w="25%" />
//                 )}
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//         <Box>
//           <Button
//             ml={["3rem", "7rem"]}
//             onClick={() => toPDF()}
//             //downlodePDF(photoPreview, signaturePreview)}
//             colorScheme="teal"
//             variant="solid"
//             mt="4"
//             mb="1rem"
//           >
//             Download
//           </Button>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default StampPaperView;

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import moment from "moment";
import {
  Box,
  Heading,
  Text,
  Image,
  Table,
  Tr,
  Td,
  Input,
  Button,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
// import Front from "../../assets/Frontnew.jpg";
import stamplogo from "../../Images/Alfabet-stamp.svg";
import { useEffect, useRef, useState } from "react";
import { usePDF } from "react-to-pdf";
import notri from "../../Images/notriimages.jpg";
import image from "../../Images/SVG STAM.svg";
import front from "../../Images/alfabet legal.svg";

import axios from "axios";
import { useParams } from "react-router-dom";
// import sign from "../../assets/Stamp.jpg";
import LOGO from "../../Images/Alfabet circle.svg";
const StampPaperView = ({ onDownalodClick, rowData }) => {
  const { toPDF, targetRef } = usePDF({ filename: "Legal-Agreement.pdf" });
  const locationdata = useLocation();

  console.log(locationdata?.state?.data, "location date ");
  const { id } = useParams();
  const appUrl = import.meta.env.VITE_APP_API_URL;
  const [doc, setDoc] = useState(null);
  const [username, setusername] = useState("");
  const [useraddress, setuseraddress] = useState("");
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    startdate: "",
    address: "",
    photo: "",
    signature: "",
    enddate: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

  const userId = localStorage.getItem("userId");
  const coutnref = useRef(0);
  const [loader, setLoader] = useState(false);

  // const downlodePDF = async (photoPreview, signaturePreview) => {
  //   const capture = document.querySelector(".downLodeBox");
  //   setLoader(true);

  //   console.log("downloadPdf ");

  //   html2canvas(capture).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const doc = new jsPDF({
  //       orientation: "portrait",
  //       unit: "mm",
  //       // format: [canvas.width, canvas.height],
  //       format: window.innerWidth > 600 ? [canvas.width, canvas.height] : "a4",
  //     });

  //     // const marginLeft = 0;
  //     // const marginTop = 0;
  //     const marginLeft = 10; // Adjust as needed
  //     const marginRight = 10; // Adjust as needed
  //     const marginTop = 10; // Adjust as needed
  //     const marginBottom = 10; // Adjust as needed

  //     // const contentWidth = doc.internal.pageSize.getWidth() - 2 * marginLeft;
  //     // const contentHeight = doc.internal.pageSize.getHeight() - 2 * marginTop;

  //     const contentWidth =
  //       doc.internal.pageSize.getWidth() - marginLeft - marginRight;
  //     const contentHeight =
  //       doc.internal.pageSize.getHeight() - marginTop - marginBottom;

  //     const aspectRatio = canvas.width / canvas.height;
  //     let imgWidth = contentWidth;
  //     let imgHeight = contentWidth / aspectRatio;

  //     if (imgHeight > contentHeight) {
  //       imgHeight = contentHeight;
  //       imgWidth = contentHeight * aspectRatio;
  //     }

  //     const imgX = marginLeft + (contentWidth - imgWidth) / 2;
  //     const imgY = marginTop + (contentHeight - imgHeight) / 2;

  //     doc.addImage(imgData, "PNG", imgX, imgY, imgWidth, imgHeight);

  //     // const photoX = marginLeft + 420;
  //     // const photoY = doc.internal.pageSize.getHeight() - 400;
  //     // if (photoPreview) {
  //     //     doc.addImage(photoPreview, "JPEG", photoX, photoY, 35, 75);
  //     // }

  //     // const signatureX = marginLeft + 400;
  //     // const signatureY = doc.internal.pageSize.getHeight() - 400;
  //     // if (signaturePreview) {
  //     //     doc.addImage(signaturePreview, "PNG", signatureX, signatureY, 35, 75);
  //     // }

  //     const photoWidth = 0.05 * contentWidth;
  //     const photoHeight = photoWidth / aspectRatio / 3;
  //     const photoX = marginLeft + 0.2 * contentWidth;
  //     const photoTopMargin = 0.08 * contentHeight;
  //     const photoY =
  //       doc.internal.pageSize.getHeight() -
  //       0.05 * contentHeight -
  //       photoHeight -
  //       photoTopMargin;

  //     if (photoPreview) {
  //       doc.addImage(
  //         photoPreview,
  //         "JPEG",
  //         photoX,
  //         photoY,
  //         photoWidth,
  //         photoHeight
  //       );
  //     }

  //     const signatureWidth = 0.05 * contentWidth;
  //     const signatureHeight = signatureWidth / aspectRatio / 3;
  //     const signatureX = marginLeft + 0.2 * contentWidth;
  //     const signatureTopMargin = -0.09 * contentHeight;
  //     const signatureY =
  //       // doc.internal.pageSize.getHeight() -
  //       // 0.25 * contentHeight -
  //       // signatureHeight -
  //       // signatureTopMargin;
  //       marginTop + 0.05 * contentHeight + signatureHeight + signatureTopMargin;

  //     if (signaturePreview) {
  //       doc.addImage(
  //         signaturePreview,
  //         "PNG",
  //         signatureX,
  //         signatureY,
  //         signatureWidth,
  //         signatureHeight
  //       );
  //     }

  //     // Save the PDF and open it in a new tab
  //     doc.save("Agreement.pdf");
  //     setLoader(false);

  //     // Open the PDF in a new tab
  //     // const pdfBlob = doc.output('blob');
  //     // const pdfUrl = URL.createObjectURL(pdfBlob);
  //     // window.open(pdfUrl, '_blank');
  //   });
  // };
  console.log(rowData, "rowdata", onDownalodClick);
  //commenting to check only
  // const downlodePDF = async (photoPreview, signaturePreview) => {
  //   const capture = document.querySelector(".downLodeBox");
  //   if (!capture) {
  //     console.error("Element with class 'downLodeBox' not found.");
  //     return;
  //   }

  //   try {
  //     setLoader(true);
  //     const canvas = await html2canvas(capture);
  //     const imgData = canvas.toDataURL("image/png");
  //     const doc = new jsPDF({
  //       orientation: "portrait",
  //       unit: "mm",
  //       format: window.innerWidth > 600 ? [canvas.width, canvas.height] : "a4",
  //     });

  //     // Add the captured image to the PDF
  //     doc.addImage(imgData, "PNG", 10, 10, 180, 240);

  //     // Add photo preview if provided
  //     if (photoPreview) {
  //       doc.addImage(photoPreview, "JPEG", 50, 260, 40, 40); // Adjust dimensions
  //     }

  //     // Add signature preview if provided
  //     if (signaturePreview) {
  //       doc.addImage(signaturePreview, "PNG", 100, 260, 40, 40); // Adjust dimensions
  //     }

  //     // Save the PDF
  //     doc.save("Agreement.pdf");
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  useEffect(() => {
    setTimeout(() => {
      window.print();
    }, 2000);
  }, []);

  useEffect(() => {
    if (coutnref.current === 0) {
      // Call downloadPDF only once during the first render
      // downlodePDF(photoPreview, signaturePreview);
      coutnref.current++; // Increment the countRef to prevent re-calls
    }

    // If onDownalodClick is provided, call it
    if (onDownalodClick) {
      onDownalodClick();
    }
  }, [photoPreview, signaturePreview, onDownalodClick]);

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
    setPhotoPreview(URL.createObjectURL(selectedPhoto));
  };

  const handleSignatureChange = (e) => {
    const selectedSignature = e.target.files[0];
    setSignature(selectedSignature);
    setSignaturePreview(URL.createObjectURL(selectedSignature));
  };

  const getuserdetails = async () => {
    const locationid = locationdata?.state?.data?.email;
    const otherid = id;
    const idfromprops = rowData?.email;
    const emailid = locationid ? locationid : otherid ? otherid : idfromprops;
    console.log(emailid, "emailid");
    try {
      const response = await axios.post(
        // "http://localhost:5000/api/user/getuserdetailsbymail",
        `${appUrl}/user/getuserdetailsbymail`,

        {
          email: emailid,
        }
      );
      console.log(response.data.response, "email data ");

      setusername(response.data.response?.name);
      setuseraddress(response.data.response?.address);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const locationid = locationdata?.state?.data?.email;
      const otherid = id;
      const idfromprops = rowData?.email;
      const emailid = locationid ? locationid : otherid ? otherid : idfromprops;

      console.log(emailid, "id");
      try {
        const response = await axios.post(
          `${appUrl}/aggriment/getaggrimentdetails`,
          {
            email: emailid,
          }
        );
        const data = response.data;
        const startDate = response.data.data?.startdate
          ? new Date(response.data.data.startdate).toLocaleDateString()
          : "";
        console.log("$$$$", response.data.data);
        setInputField({
          // name: response.data.data?.name,
          email: response.data.data?.email,
          startdate: response.data.data?.startdate,
          // address: response.data.data?.address,
          signature: response.data.data?.signature,
          photo: response.data.data?.photo,
          enddate: response.data.data?.endDate,
        });
        console.log(inputField, "inputField");
        setPhotoPreview(response.data.data.photo);
        setSignaturePreview(response.data.data?.signature);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);
  useEffect(() => {
    getuserdetails();
  }, [id]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setInputField({
      ...prevValue,
      [name]: value,
    });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setInputField({
          ...inputField,
          [field]: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  // ... rest of the code

  return (
    <>
      <Box className="downLodeBox">
        <Box minWidth="100%" ref={targetRef}>
          <Box display="flex" flexDirection="column" textAlign="center">
            {/* <Box
            mx="auto"
            boxSize={{ base: "100%", md: "auto" }} // Adjusted to "auto" for non-base screen sizes
            objectFit="contain"
            mb={{ base: "2", lg: "0" }}
            maxWidth="100%" // Added maxWidth property
          >
            <Image src={image} alt="Description of the image" />
          </Box>


         <Box display="flex" justifyContent="space-evenly">
      <Box  mb={{ base: "2", lg: "0" }}>
        <Image
          w={{ base: '100%',md:"140px", lg: '150px' }}
          h={{ base: 'auto', md:"190px" ,lg: '270px' }}
          src={notri} alt="Dan Abramov"
        />
      </Box>
      <Box textAlign="center">
        <Heading as="h2" mb={{ base: "2", lg: "4" }}>
          Legal Employment Contract 2024
        </Heading>

        <Text>
          THIS DIGITAL EMPLOYMENT CONTRACT (this "Agreement") Valid Till
          Eleven Months From 2024-9-26 BETWEEN:
        </Text>

        <Text fontSize={"1.5rem"}>
          <strong>Alfabet Service of </strong>
        </Text>
        <Text>
        Block Number 128 Shivaji Nagar Post Office Jodhpur City SO (Sub-Office), Jodhpur, Rajasthan,\
         India (IN), Pin Code: 313001

        </Text>

        <Text fontSize={"1.5rem"}>
          <strong>(The "Employer")</strong>
        </Text>

        <Text ml={{ base: "0", lg: "10%" }}>OF THE FIRST PARTY </Text>

        <Text>-AND-</Text>
        <Text>
          S/O &nbsp;... &nbsp;... &nbsp;... &nbsp;... &nbsp;... &nbsp;...
          <strong>(The "Employee")</strong>
        </Text>
        <Text ml={{ base: "0", lg: "10%" }}>OF THE SECOND PARTY</Text>
      </Box>
    </Box> */}
            <Image src={front} alt="Description of the image" />
          </Box>

          <Box>
            <Text
              fontSize={["0.8rem", "1.5rem"]}
              mt={["rem", "-1rem"]}
              padding={["1rem", "3rem"]}
            >
              FREELANCING AGREEMENT
              <br />
              <br />
              THIS GENERAL Alfabet Service AGREEMENT (THE AGREEMENT) DATED THIS
              AS OF GOVERNMENT FOR 2024 To 2025.
              <br />
              <br />
              THE FIRST PART OF THIS AGREEMENT IS Alfabet Service. THAT 1
              SHIVNATH APARTMENT plot number 489 postmaster post office Jodhpur
              RAJASTHAN:- 342001
              <br />
              <br />
              THE SECOND PART OF THIS AGREEMENT SUBJECTED TO THE CLIENT WHICH
              HAS FOLLOWING DETAILS MENTIONED IN THE BOTTOM PART OF THE
              STAMPPAPER
              <br />
              <Text fontSize={["0.8rem", "1.5rem"]}>POINT'S TO BE NOTE: -</Text>
              <br />
              * YOUR AGREEMENT IS MADE FOR 11 MONTHS WITH Alfabet Service
              COMPANY.
              <br />
              <br />
              A) The client thinks that the contractor has the necessary
              qualifications, experience and abilities toprovide service to the
              client.
              <br />
              B) The contractor is agreeable to provide such service to the
              client on the terms and conditions setout in this agreement
              <br />
              <br />
              n consideration of the matters described above and of the mutual
              benefits and obligations outlined in this agreement the receipt
              and sufficiency of which consideration is hereby acknowledged the
              client and the contractor agree as follows.
              <br />
              <br />
              1. Job title and description
              <br />
              1.1 The job duties, the client will be accepted to perform will be
              consisting of filling the forms as perthe data given by the online
              portal.
              <br />
              1.2 The client will perform any duties as requested by the
              contractor that are reasonable and thatare customarily performed
              by a person held in a similar position like this business.
              <br />
              1.3 The client agrees to abide by the contractor's rules and
              regulations,
              <br />
              <br />
              <br />
              2. CLIENT REMUNERATION
              <br />
              <br />
              2.1 REMUNERATION: - - For the form filling service rendered by the
              client. The Clients shall beentitled to payments of price 43Rs.
              (INR) Max perform for the salary may vary from 22790/- INR Total
              Form will be 530 and per form willl be 43/- and the u dont have to
              correct more than 477 form The Client shall raise the invoice
              within 5 days after the successful completion of the project. The
              contractor will pay each project's amount within a maximum of 43
              HRS, from the date of issue of the quality check report. the
              invoice can be raised by Email and by a report on the working
              website. Q.C. Report will be provided within 24-72 Working hours
              from the date of submission
              <br />
              <br /> 2.2 Billing: - - contractor will provide a workload of
              Question Forms which the client shall complete thework within 5
              days under the given criteria of this agreement. This Agreement
              has been signed for one system. The contractor will make the
              payment for the billing within 1 INTERNATIONAL
              <br />
              <br /> WORKING DAY from the date of raising the project subject to
              the quality check report.
              <br />
              <br />
              2.3 Accuracy: - contractor will provide Adequate feedback within 4
              Working Days for the date andon completion of quality check shall
              issue a Quality report. Both parties agree to assure the highest
              Quality of End service. Following Cycle for accuracy will be
              followed. cut off - 43 (in total) below 90% @42/- INR perform. if
              below cut off or id is terminated then the client is supposed to
              clear the Registration Amount (5900/-) to the company.
              <br />
              <br />
              2.4 The Q.C. Department will Check the forms Randomly by the
              server. Until the submitted Slot isrejected above the cut-off
              criteria if the client makes any mistake, (Which includes but is
              not limited to spelling, Punctuation, Extra/Missing space, Extra/
              Missing Line, skip by time etc. ) in a form that form will be
              rejected, Likewise Client has to maintain cut off or accuracy.
              <br />
              <br />
            </Text>
            <Text
              fontSize={["0.8rem", "1.5rem"]}
              mt={["-4rem", "-8rem"]}
              padding={["1rem", "3rem"]}
            >
              <br />
              3. Conflict of interest
              <br />
              <br />
              3.1 Application Fee(S): The Registration Amount of 6700/- INR.
              Will be deducted from the salary ifgenerated, and if the salary is
              not generated
              <br />
              3.1.1If the client fails to complete the work. then he/she is
              liable to pay <br />
              <br />
              <br />
              3.1.2The same registration amount on their own. The client has to
              pay within 1 working days after The Q.C. Report. The client must
              start & complete his/her Work of form - filling Assigned to then
              by the contractor, the date of starting the project (selected by
              the client as per his/her convenience). In case of failure in
              starting of the work number of forms detected or incomplete
              submission of work is defined by the contractor then the
              Application fee(s), and NOC invoice needs to be cleared by the
              client. AS the contractor will have to face the Economic crisis in
              the business in case of failure of this project in any of the per
              this agreement
              <br />
              <br />
              3.2 ID ALLOCATION: - - Client will get a single ID to work on and
              the client can work 24*7 on this ID. If the software portal or the
              server of the company detects that there are multiple login
              Attempts/multiple IP Addresses of the account Modules .and The ID
              will get Terminated Without Any Intimation and the client needs to
              clear the server maintenance charge up to 6700/- INR. (Refundable
              Amount After Successfully done the work**) For That Particular
              Project As Per This Agreement.
              <br />
              <br />
              3.3 TAT (Turn Around Time): The Second Party Has 5 Days (Including
              Holidays) To Complete the New Work and Second Party Has to Send It
              To First Party Shall Give An Accuracy Report Within 1-2 Working
              days For The New Work, After Submission As Per Technical
              Specification Which Is Included In this Agreement With Accuracy
              Parameters.
              <br />
              <br />
              3.4 Client will Execute The data Processing Work provided by the
              contractor through experiencedpersons in such a manner to carry
              out the work efficiently at a minimum of 90% for our files.
              <br />
              <br />
              3.5 Contractor Agree to provide Formats and Other Information for
              Processing The job To Client Atthe time of Providing the Data and
              The Clint Agree with the format And Other information which is
              being processed to the particular.
              <br />
              <br />
              3.6 Client will Execute The data Processing Work provided by the
              contractor through experiencedpersons in such a manner to carry
              out the work efficiently at a minimum of 90% for our files.
              <br />
              <br />
              3.7 This Agreement Represent The business agreement and operation
              understanding between theparties and shall remain in effect for
              six months for the date of execution hereof
              <br />
              <br />
              <br />
              The Contractor's Specification in terms of quality and other
              parameters that shall be issued by the Contractor. This General
              Alfabet Service Agreement Stands and is valid for 11 months, if
              the client or contractor is willing to end this business
              relationship they need to proceed with the termination of this
              agreement-based contract.
              <br />
            </Text>
          </Box>

          <Box mt={["-1rem", "-5rem"]}>
            <Text
              fontSize={["1rem", "1.8rem"]}
              padding={["1rem", "3rem"]}
              mb={4}
            >
              4. Termination Employment.
            </Text>
            <Text
              fontSize={["0.8rem", "1.5rem"]}
              mt={["-1.5rem", "-5rem"]}
              padding={["1rem", "3rem"]}
            >
              4.1 Termination: - - If the Client fails to submit data on or If
              the client fails to give Accuracy in the Output file. The client
              reserves the right to terminate the agreement with immediate
              effect and Alfabet Service freelancing services will not be
              responsible for any future data and payment to the Client and the
              Client will be liable to pay the maintenance Amount to the client
              as mentioned in "clause-3.1" In this agreement and client will
              also be liable to pay contractors expenses for a legal proceeding.
              Where there is just cause for termination, the Contractor may
              terminate the client's employment without notice as permitted by
              law.
              <br />
              4.2 No modification of the term of this AGREEMENT shall be valid
              unless it is in writing and signedby both parties.
              <br />
              4.3 Force majeure: If the rendition of the form filling services
              is humoured.63 due to Earthquake,flood, Tempest, Civil Riots or
              Act of God then the Business Associate shall be absolved of its
              obligation hereunder till normally is restored after the cessation
              of the aforementioned
              <br /> contingencies. the client solves likewise be absolved if a
              rendition of the services is hampered due to a strike called by
              the data entry operators engaged by the client, violence or
              political turbulence or for any other reasons of a similar nature,
              which is beyond the control of the client. If you want to
              terminate your agreement after your first work, you need to pay
              6700*11 times the agreement amount as per company policies.
              <br />
            </Text>
          </Box>

          <Box mt={["-1rem", "1rem"]}>
            <Text
              fontSize={["1rem", "1.8rem"]}
              mt={["-1rem", "-6rem"]}
              padding={["1rem", "3rem"]}
            >
              5. Non - Solicitation
              <br />
              <p>
                5.1 The client understands and agreement that any attempt on the
                part of the client to induceanother client or contractor to
                leave the contractor employee, or any effort by the client to
                interfere with the contractor's relation with it other client
                and contractor would be harmful and damaging to the contractor.
              </p>
            </Text>
          </Box>

          <Box mt={["-1rem", "-5rem"]}>
            <Text
              fontSize={["0.8rem", "1.5rem"]}
              mt={["-1rem", "2rem"]}
              padding={["1rem", "3rem"]}
            >
              5.2 The client will not in any way, Directly or Indirectly: -
            </Text>
            <Text
              fontSize={["0.8rem", "1.5rem"]}
              mt={["-1rem", "-5rem"]}
              padding={["1rem", "3rem"]}
            >
              5.2.1 Induce or attempt to Induce any client or contractor of the
              Contractor to quit employment orretainer of the contractor.
            </Text>
            <Text
              fontSize={["0.8rem", "1.5rem"]}
              mt={["-1rem", "-5rem"]}
              padding={["1rem", "3rem"]}
            >
              5.2.2 Discuss Employment Opportunities or provide information
              about competitive employment toany of the Contractor's Clients or
              Contractors. This Non - solicitation obligation as described in
              this section will be limited to clients or contractors who were
              clients or contractors of the Contractor During The period that
              the Client was employed by the Contractor.
            </Text>
            <Text
              fontSize={["1rem", "1.8rem"]}
              mt={["-2rem", "-7rem"]}
              padding={["1rem", "3rem"]}
            >
              <br />
              {/* 5.2.2	Discuss Employment Opportunities or provide information about competitive employment toany of the Contractor's Clients or Contractors. This Non - solicitation obligation as described in this section will be limited to clients or contractors who were clients or contractors of the Contractor During The period that the Client was employed by the Contractor. */}
              6. Confidential Information
              <br />
              <br />
            </Text>
            <Text
              fontSize={["0.8rem", "1.5rem"]}
              mt={["-2rem", "-8rem"]}
              padding={["1rem", "3rem"]}
            >
              6.1 The Client Acknowledges that, in any position the Client may
              hold, in and as a result of theClient's employment which is
              confidential to the Contractor (the confidential information) and
              the confidential information is the exclusive property of the
              Contractor.
            </Text>
            <Text
              fontSize={["0.8rem", "1.5rem"]}
              mt={["-1rem", "-5rem"]}
              padding={["1rem", "3rem"]}
            >
              6.2 The Client agrees and acknowledges that the confidential
              information is of a proprietary andconfidential nature and that
              any disclosure of the confidential information of a proprietary
              and confidential nature and that any disclosure of the
              confidential information to a third party in breach of this
              agreement cannot be reasonably or adequately compensated for in
              money damages, would cause irreparable injury to Contractor, would
              gravely affect the effective and successful conduct of the
              Contractor's business and goodwill and would be a material breach
              of this agreement.
            </Text>
            <Text
              fontSize={["1rem", "1.8rem"]}
              mt={["-1rem", "-5rem"]}
              padding={["1rem", "3rem"]}
            >
              7. Severability
            </Text>
            <Text
              fontSize={["0.8rem", "1.5rem"]}
              mt={["-1rem", "-5rem"]}
              padding={["1rem", "3rem"]}
            >
              7.1 The Contractor and the Client acknowledge that this agreement
              is reasonable, valid andEnforceable .however, if any term,
              covenant or provision of this agreement is held by a court of
              competent jurisdiction to be invalid, void or unenforceable, the
              party intends that such provision be changed in scope by the court
              by only to the extent deemed necessary by that court to render the
              provision reasonable and enforceable and the remainder of the
              provision of this agreement will in no way be affected, impaired
              or invalidated as a result.
            </Text>
            <Text
              fontSize={["0.8rem", "1.5rem"]}
              mt={["-1rem", "-6rem"]}
              padding={["1rem", "3rem"]}
            >
              7.2 Variation: Except as otherwise Expressly Provided in this
              agreement, this agreement may not bechanged or modified in any way
              after it has been signed, except in writing signed by or on behalf
              of both of the parties.
            </Text>
            <Text
              fontSize={["0.8rem", "1.5rem"]}
              mt={["-1rem", "-5rem"]}
              padding={["1rem", "3rem"]}
            ></Text>
            <Text
              fontSize={["1rem", "1.8rem"]}
              mt={["-2rem", "1rem"]}
              padding={["1rem", "3rem"]}
            >
              LEGAL INFORMATION:-
            </Text>
            <Text
              fontSize={["0.8rem", "1.5rem"]}
              mt={["-1rem", "-5rem"]}
              padding={["1rem", "3rem"]}
            >
              7.3 Dispute resolution & jurisdiction: in the event of any dispute
              or difference arising between theparties hereto relating to or
              arising out of this agreement including the implementation,
              Execution, India, rights, obligations or liabilities of the
              parties hereto, the same will be adjudicated and determined by
              arbitration & conciliation Act, 1996 or any statutory amendment or
              re-enactment thereof in force in India, shall govern the
              reference. both parties shall appoint their respective arbitrator,
              and both arbitrators thus appointed should appoint the third
              arbitrator echo shall function as the presiding arbitrator. the
              venue of arbitration shall be Jodhpur Rajasthan 313001
            </Text>
            <Text
              fontSize={["0.8rem", "1.5rem"]}
              mt={["-1rem", "-5rem"]}
              padding={["1rem", "3rem"]}
            >
              7.4 Both the Parties hereby Agree Neither to circumvent nor
              disclose the identities, information aswell as the Essence Of the
              project Etc. IN WITNESS WHEREOF the Parties hereto Have Executed
              These Presents on The Data Herein Before WrittenA. Contractor: -
            </Text>
            <Text
              fontSize={["0.8rem", "1.5rem"]}
              mt={["-2rem", "-6rem"]}
              fontWeight={"500"}
              padding={["1rem", "3rem"]}
            >
              Note :Extension will be Provided But u Have to Pay the Extension
              Amount 8100/ Correction amount 8100
            </Text>
          </Box>

          <Box mt={["1rem", "-5rem"]}>
            <Text padding={["1rem", "3rem"]} fontSize={"1.5rem"}>
              Employer : -
            </Text>
            <Text
              w={["400px", "700px"]}
              mt={["-1rem", "-5rem"]}
              padding={["1rem", "3rem"]}
            >
              Name :Alfabet service <br />
              Email :servicealfabit79@gmail.com<br />
              Address ·  Mara Rani Apartment office 189 Janganana Bhawan, First and Second Floor, Plot No. 2B, Madhya Marg, Sector-19A Punjab Chandigarh, 160019. ·
            </Text>
          </Box>
          <Text
            mt={["-1rem", "-5rem"]}
            padding={["1rem", "3rem"]}
            fontSize={"1.5rem"}
          >
            Employee : -
          </Text>
          <Box display={"flex"}>
            <Box mt={["-1rem", "-5rem"]} padding={["1rem", "3rem"]}>
              <FormControl w={["200px", "300px"]}>
                <Text fontSize="md">Name: {username}</Text>
              </FormControl>

              <FormControl w={["260px", "300px"]}>
                <Text fontSize="md">Email: {inputField.email}</Text>
              </FormControl>
              <FormControl w={["200px", "300px"]}>
                <Text fontSize="md">Address: {useraddress}</Text>
              </FormControl>
              <FormControl w={["200px", "300px"]}>
                <Text fontSize="md">
                  Start-Date:{" "}
                  {moment(inputField.startdate).format("MM/DD/YYYY")}
                </Text>
              </FormControl>
              <FormControl w={["200px", "300px"]}>
                <Text fontSize="md">
                  End-Date:{" "}
                  {moment(inputField?.startdate)
                    .add(4, "days")
                    .format("MM/DD/YYYY")}
                </Text>
              </FormControl>
            </Box>
            <Box marginTop={["3rem", "-5rem"]} marginLeft={["0rem", "10rem"]}>
              <Image src={LOGO} alt="Description of the image" />
            </Box>
          </Box>
          {/* <Box width={["200px", "400px"]}>
  <Image src={sign} alt="Stamp" />
</Box>


  <Box>


            <Table
            bg="red"
            mt={"1rem"}   w={["350px", "700px"]} >
              <Tr>
                <Td>
                  <Box onChange={handleSignatureChange}>
                    <Text mb={"10px"}>Signature</Text>
                    {signaturePreview && (
                      <Image
                        src={signaturePreview}
                        alt="Signature Preview"
                        w="25%"
                      />
                    )}
                  </Box>
                </Td>
                <Td>
                  <Box  onChange={handlePhotoChange}>
                    <Text mb={"10px"}>Photo</Text>
                    {photoPreview && (
                      <Image src={photoPreview} alt="Photo Preview" w="20%" />
                    )}
                  </Box>
                </Td>
              </Tr>
            </Table>
          </Box> */}
          <Box display="flex" justifyContent="center" mt="1rem">
            <Box ml="2rem" w={["255%", "105%"]} h={["0%", "20%"]} mr="1rem">
              <Image src={stamplogo} alt="Stamp" />
            </Box>
            <Box display="flex" flexDirection="row">
              <Box onChange={handleSignatureChange}>
                <Text mb={"10px"}>Signature</Text>
                {/* <input type="file" onChange={handleSignatureChange} /> */}
                {signaturePreview && (
                  <Image
                    src={signaturePreview}
                    alt="Signature Preview"
                    w="25%"
                  />
                )}
              </Box>
              <Box onChange={handlePhotoChange}>
                <Text mb={"10px"}>Photo</Text>

                {photoPreview && (
                  <Image src={photoPreview} alt="Photo Preview" w="25%" />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          {/* <Button
            ml={["3rem", "7rem"]}
            onClick={() => toPDF()}
            //downlodePDF(photoPreview, signaturePreview)}
            bg={"#ff4dff"}
            color="black"
            variant="solid"
            mt="4"
            mb="1rem"
            _hover={{
              boxShadow: "lg", // You can adjust the shadow size
              transform: "scale(1.05)", // Optional: Add a slight scaling effect
              bg: "#e633e6", // Optional: Change background color on hover
            }}
          >
            Download Your Pdf
          </Button> */}
        </Box>
      </Box>
    </>
  );
};

export default StampPaperView;
