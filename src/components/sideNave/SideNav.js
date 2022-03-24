import {Box, Button, Drawer, List, Paper, Stack} from "@mui/material";
import {makeStyles} from "@mui/styles";
import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../redux/userSlice";
import Links from "./Links";
import Spinning from "../Spinning";
import {useNavigate} from "react-router-dom";

export default function SideNav() {
  const [linkes, setLinkes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.userReducer.data);
  const dispath = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    switch (user.profile) {
      case "pdg":
        setLinkes(["branches", "responsables", "compte"]);

        break;
      case "res":
        setLinkes([
          "interventions",
          "techniciens",
          "machines",
          "compte",
          "admin",
        ]);
        break;
      default:
        setLinkes(["interventions", "machines", "compte"]);
    }
    setLoading(false);
  }, []);
  const handelLogout = () => {
    dispath(logout());
    navigate("/");
  };
  return (
    <>
      <Box sx={{display: "flex"}}>
        <Drawer
          sx={{
            background: "#8aa8ff",
            width: 300,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left">
          {loading && (
            <h1>
              {" "}
              <Spinning />{" "}
            </h1>
          )}
          {!loading && linkes && (
            <Box
              sx={{
                margin: "30px",
                display: "flex",
                flexDirection: "column",
                height: "50%",
                justifyContent: "start",
              }}>
              <Paper sx={{flexGrow: 1}}>{user.nom}</Paper>
              <Stack spacing={2}>
                <List>
                  {linkes.map(row => (
                    <Links key={row} link={row} />
                  ))}
                </List>
                <Button onClick={handelLogout} variant="contained">
                  logout
                </Button>
              </Stack>
            </Box>
          )}
        </Drawer>
      </Box>
    </>
  );
}
