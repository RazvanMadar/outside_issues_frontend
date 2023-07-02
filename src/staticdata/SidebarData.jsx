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
  },
  {
    title: "Profil",
    path: "/profile",
    icon: <AccountCircleIcon />,
  },
  {
    title: "Harta sesizărilor",
    path: "/map",
    icon: <AddLocationAltIcon />,
  },
  {
    title: "Sesizări",
    path: "/issues",
    icon: <PlagiarismIcon />,
  },
  {
    title: "Cetățeni",
    path: "/citizens",
    icon: <PeopleAltIcon />,
  },
  {
    title: "Chat",
    path: "/chat",
    icon: <MessageIcon />,
  },
  {
    title: "Autentificare",
    path: "/login",
    icon: <VpnKeyIcon />,
  },
  {
    title: "Deconectare",
    path: "/login",
    icon: <VpnKeyIcon />,
  }
];
