import { Box } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../App";
import { AlphaContainer } from "../../../components/AlphaContainer";
import AccountInfo from "./AccountInfo";
import DeleteAccount from "./DeleteAccount";
import PersonalDetails from "./PersonalDetails";

const Profile = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [personalDetails, setPersonalDetails] = useState<any>(null);
  console.log(userDetails);
  const { loginToken } = useContext(GlobalContext);

  useEffect(() => {
    if (!loginToken) {
      return;
    }
    const fetchData = async () => {
      const { data } = await axios.post("/api/users/details", null, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
      const { email, first_name, last_name, phone_number, birthday } = data;
      setPersonalDetails({ first_name, last_name, phone_number, birthday });
      setAccountInfo({ email });
      setUserDetails(data);
    };
    fetchData();
  }, [loginToken]);

  return (
    <AlphaContainer
      className={"profile"}
      sx={{ backgroundColor: "background.paper" }}
    >
      {userDetails && (
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2.4rem",
            "& .MuiInputBase-input": { m: 0 },
            "& label": {
              fontFamily: "brutal-regular",
            },
          }}
          autoComplete="off"
        >
          <AccountInfo accountInfo={accountInfo} />
          <PersonalDetails personalDetails={personalDetails}/>
          <DeleteAccount/>
        </Box>
      )}
    </AlphaContainer>
  );
};

export default Profile;
