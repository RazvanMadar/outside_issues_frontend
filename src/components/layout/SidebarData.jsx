import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export const SidebarData = [
  {
    title: "Acasă",
    path: "/",
    icon: <HomeIcon />,
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
