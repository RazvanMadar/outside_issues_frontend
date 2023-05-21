import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const SidebarData = [
  {
    title: "Acasă",
    path: "/",
    icon: <HomeIcon />,
    cName: "nav-text",
  },
  {
    title: "Profil",
    path: "/profile",
    icon: <AccountCircleIcon />,
    cName: "nav-text",
  },
  {
    title: "Harta sesizărilor",
    path: "/map",
    icon: <AddLocationAltIcon />,
    cName: "nav-text",
  },
  {
    title: "Sesizări",
    path: "/issues",
    icon: <PlagiarismIcon />,
    cName: "nav-text",
  },
  {
    title: "Cetățeni",
    path: "/citizens",
    icon: <PeopleAltIcon />,
    cName: "nav-text",
  },
  {
    title: "Chat",
    path: "/chat",
    icon: <MessageIcon />,
    cName: "nav-text",
  },
  {
    title: "Autentificare",
    path: "/login",
    icon: <VpnKeyIcon />,
    cName: "nav-text",
  },
  {
    title: "Deconectare",
    path: "/login",
    icon: <VpnKeyIcon />,
    cName: "nav-text",
  }
];
