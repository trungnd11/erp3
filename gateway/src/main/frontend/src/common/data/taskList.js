// Import Images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";
import avatar9 from "../../assets/images/users/avatar-9.jpg";
import avatar10 from "../../assets/images/users/avatar-10.jpg";
import bgImage1 from "../../assets/images/small/img-7.jpg";
import bgImage2 from "../../assets/images/small/img-4.jpg";

const taskWidgets = [
  {
    id: 1,
    label: "Total Tasks",
    counter: "234",
    badge: "ri-arrow-up-line",
    badgeClass: "success",
    percentage: "17.32 %",
    icon: "ri-ticket-2-line",
    iconBg: "info",
    iconColor: "white",
    decimals: 1,
    prefix: "",
    suffix: "k",
  },
  {
    id: 2,
    label: "Pending Tasks",
    counter: "64.5",
    badge: "ri-arrow-down-line",
    badgeClass: "danger",
    percentage: "0.87 %",
    icon: "mdi mdi-timer-sand",
    iconBg: "warning",
    iconColor: "white",
    decimals: 1,
    prefix: "",
    suffix: "k",
  },
  {
    id: 3,
    label: "Completed Tasks",
    counter: "116.21",
    badge: "ri-arrow-down-line",
    badgeClass: "danger",
    percentage: "2.52 %",
    icon: "ri-checkbox-circle-line",
    iconBg: "success",
    iconColor: "white",
    decimals: 2,
    prefix: "",
    suffix: "K",
  },
  {
    id: 4,
    label: "Deleted Tasks",
    counter: "14.84",
    badge: "ri-arrow-up-line",
    badgeClass: "success",
    percentage: "0.63 %",
    icon: "ri-delete-bin-line",
    iconBg: "danger",
    iconColor: "white",
    decimals: 2,
    prefix: "$",
    suffix: "%",
  },
];

const allTask = [
  {
    id: 1,
    taskId: "#VLZ632",
    project: "Velzon - v1.0.0",
    task: "Error message when placing an orders?",
    creater: "Robert McMahon",
    subItem: [
      { id: 1, img: avatar3 },
      { id: 2, img: avatar1 },
    ],
    dueDate: "25 Jan, 2022",
    status: "Inprogress",
    statusClass: "secondary",
    priority: "High",
    priorityClass: "danger",
  },
  {
    id: 2,
    taskId: "#VLZ453",
    project: "Skote - v1.0.0",
    task: "Profile Page Satructure",
    creater: "Mary Cousar",
    subItem: [
      { id: 1, img: avatar10 },
      { id: 2, img: avatar9 },
      { id: 3, img: avatar5 },
    ],
    dueDate: "20 Dec, 2021",
    status: "New",
    statusClass: "info",
    priority: "Low",
    priorityClass: "success",
  },
  {
    id: 3,
    taskId: "#VLZ454",
    project: "Skote - v2.3.0",
    task: "Apologize for shopping Error!",
    creater: "Nathan Cole",
    subItem: [
      { id: 1, img: avatar5 },
      { id: 2, img: avatar6 },
      { id: 3, img: avatar7 },
      { id: 4, img: avatar8 },
    ],
    dueDate: "23 Oct, 2021",
    status: "Completed",
    statusClass: "success",
    priority: "Medium",
    priorityClass: "warning",
  },
  {
    id: 4,
    taskId: "#VLZ455",
    project: "Minia - v1.4.0",
    task: "Post launch reminder/ post list",
    creater: "Joseph Parker",
    subItem: [{ id: 1, img: avatar2 }],
    dueDate: "05 Oct, 2021",
    status: "Pending",
    statusClass: "warning",
    priority: "High",
    priorityClass: "danger",
  },
  {
    id: 5,
    taskId: "#VLZ456",
    project: "Minia - v1.2.0",
    task: "Make a creating an account profile",
    creater: "Henry Baird",
    subItem: [
      { id: 1, img: avatar3 },
      { id: 2, img: avatar10 },
      { id: 3, img: avatar9 },
    ],
    dueDate: "17 Oct, 2021",
    status: "Inprogress",
    statusClass: "secondary",
    priority: "Medium",
    priorityClass: "warning",
  },
  {
    id: 6,
    taskId: "#VLZ657",
    project: "Minimal - v2.1.0",
    task: "Change email option process",
    creater: "Tonya Noble",
    subItem: [
      { id: 1, img: avatar6 },
      { id: 2, img: avatar7 },
    ],
    dueDate: "04 Dec, 2021",
    status: "Completed",
    statusClass: "success",
    priority: "High",
    priorityClass: "danger",
  },
  {
    id: 7,
    taskId: "#VLZ458",
    project: "Dason - v1.1.0",
    task: "User research",
    creater: "Donald Palmer",
    subItem: [
      { id: 1, img: avatar10 },
      { id: 2, img: avatar9 },
      { id: 3, img: avatar8 },
      { id: 4, img: avatar1 },
    ],
    dueDate: "11 Oct, 2021",
    status: "New",
    statusClass: "info",
    priority: "Low",
    priorityClass: "success",
  },
  {
    id: 8,
    taskId: "#VLZ459",
    project: "Dorsin - Landing Page",
    task: "Benner design for FB & Twitter",
    creater: "Carter",
    subItem: [
      { id: 1, img: avatar5 },
      { id: 2, img: avatar4 },
    ],
    dueDate: "16 Dec, 2021",
    status: "Pending",
    statusClass: "warning",
    priority: "Medium",
    priorityClass: "warning",
  },
  {
    id: 9,
    taskId: "#VLZ460",
    project: "Qexal - Landing Page",
    task: "Brand logo design",
    creater: "David Nichols",
    subItem: [
      { id: 1, img: avatar6 },
      { id: 2, img: avatar7 },
      { id: 3, img: avatar8 },
    ],
    dueDate: "29 Dec, 2021",
    status: "Pending",
    statusClass: "warning",
    priority: "High",
    priorityClass: "danger",
  },
  {
    id: 10,
    taskId: "#VLZ461",
    project: "Doot - Chat App Template",
    task: "Additional Calendar",
    creater: "Diana Kohler",
    subItem: [{ id: 1, img: avatar4 }],
    dueDate: "13 Oct, 2021",
    status: "New",
    statusClass: "info",
    priority: "Low",
    priorityClass: "success",
  },
  {
    id: 11,
    taskId: "#VLZ462",
    project: "Skote - v2.1.0",
    task: "Edit customer testimonial",
    creater: "Nathan Cole",
    subItem: [
      { id: 1, img: avatar7 },
      { id: 2, img: avatar8 },
    ],
    dueDate: "02 Jan, 2021",
    status: "Inprogress",
    statusClass: "secondary",
    priority: "Medium",
    priorityClass: "warning",
  },
];

const kanbanBoardData = [
    {
        id: 1,
        name: "Unassigned",
        badge: "2",
        badgeClass: "success",
        tasks: [
            {
                id: 11,
                taskId: "#VL2436",
                title: "Profile Page Satructure",
                desc: "Profile Page means a web page accessible to the public or to guests.",
                progressBar: "15%",
                date: "03 Jan, 2022",
                progressBarColor: "danger",
                progressBarText: "secondary",
                tags: [
                    { tag: "Admin" }
                ],
                members: [
                    { id: 1, img: avatar6 },
                    { id: 2, img: avatar5 },
                ],
                view: "04",
                message: "19",
                file: "02",
                isTaskId: true,
            },
            {
                id: 12,
                taskId: "#VL2436",
                title: "Velzon - Admin Layout Design",
                desc: "The dashboard is the front page of the Administration UI.",
                date: "07 Jan, 2022",
                tags: [
                    { tag: "Layout" },
                    { tag: "Admin" },
                    { tag: "Dashboard" }
                ],
                members: [
                    { id: 1, img: avatar7 },
                    { id: 2, img: avatar6 },
                    { id: 2, img: avatar1 },
                ],
                view: "14",
                message: "32",
                file: "05",
            }
        ]
    },
    {
        id: 2,
        name: "To Do",
        badge: "2",
        badgeClass: "secondary",
        tasks: [
            {
                id: 21,
                taskId: "#VL2436",
                title: "Admin Layout Design",
                desc: "Landing page template with clean, minimal and modern design.",
                date: "07 Jan, 2022",
                tags: [
                    { tag: "Design" },
                    { tag: "Website" },
                ],
                members: [
                    { id: 1, img: avatar10 },
                    { id: 2, img: avatar3 },
                    { id: 3, img: avatar2 },
                ],
                view: "13",
                message: "52",
                file: "17",
            },
            {
                id: 22,
                taskId: "#VL2436",
                title: "Marketing & Sales",
                desc: "Sales and marketing are two business functions within an organization.",
                date: "27 Dec, 2021",
                tags: [
                    { tag: "Marketing" },
                    { tag: "Business" },
                ],
                members: [
                    { id: 1, img: avatar9 },
                    { id: 2, img: avatar8 },
                ],
                view: "24",
                message: "10",
                file: "10",
            }
        ]
    },
];

export { taskWidgets, allTask, kanbanBoardData };
