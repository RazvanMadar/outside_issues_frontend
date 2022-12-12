import axios from "axios";
import { useEffect, useState } from "react";
import CardItem from "../components/ui/CardItem";

const issues_url = "http://localhost:8080/api/issues";

const Home = () => {
  const dummy_issues = [
    {
      id: 1,
      photo:
        "https://s13emagst.akamaized.net/products/32062/32061915/images/res_c8f2a36c481e36b74671e10f6213f833.jpg?width=450&height=450&hash=81E3CFA3AFAB14A22A17C3B6BDC670D3",
      issueType: "ROAD",
      address: "Oradea, Bihor, Romania",
      state: "REGISTERED",
      notificationDate: "2022-09-25",
      likesNumber: 1,
      dislikesNumber: 2,
      description: "Broken road",
    },
    {
      id: 2,
      photo:
        "https://s13emagst.akamaized.net/products/32062/32061915/images/res_c8f2a36c481e36b74671e10f6213f833.jpg?width=450&height=450&hash=81E3CFA3AFAB14A22A17C3B6BDC670D3",
      issueType: "ROAD",
      address: "Oradea, Bihor, Romania",
      state: "SOLVED",
      notificationDate: "2022-09-25",
      likesNumber: 2,
      dislikesNumber: 3,
      description: "Broken road",
    },
    {
      id: 3,
      photo:
        "https://s13emagst.akamaized.net/products/32062/32061915/images/res_c8f2a36c481e36b74671e10f6213f833.jpg?width=450&height=450&hash=81E3CFA3AFAB14A22A17C3B6BDC670D3",
      issueType: "ROAD",
      address: "Oradea, Bihor, Romania",
      state: "REGISTERED",
      notificationDate: "2022-09-25",
      likesNumber: 1,
      dislikesNumber: 2,
      description: "Broken road",
    },
  ];

  const [issues, setIssues] = useState([]);

  const getAllIssues = async () => {
    try {
      const response = await axios.get(issues_url);
      setIssues(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllIssues();
  }, []);

  return (
    <div>
      {issues && issues.map((elem) => <CardItem issue={elem} key={elem.id} />)}
    </div>
  );
};

export default Home;
