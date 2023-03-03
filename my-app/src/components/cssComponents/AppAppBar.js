import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "./AppBar";
import Toolbar from "./Toolbar";
import { useNavigate } from "react-router-dom";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function AppAppBar() {
  const [sessionPk, setSessionPk] = React.useState("");
  React.useEffect(() => {
    setSessionPk(sessionStorage.getItem("loggedInPK"));
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {"KustomDesign"}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {!sessionPk && (
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                href="/login"
                sx={rightLink}
              >
                {"Sign In"}
              </Link>
            )}
            {!sessionPk && (
              <Link
                variant="h6"
                underline="none"
                href="/register"
                sx={{ ...rightLink, color: "secondary.main" }}
              >
                {"Sign Up"}
              </Link>
            )}
            {sessionPk && (
              <Link
                variant="h6"
                underline="none"
                href="/home"
                sx={{ ...rightLink }}
              >
                {"Home"}
              </Link>
            )}
            {sessionPk && (
              <Link
                variant="h6"
                underline="none"
                href="/"
                onClick={() => sessionStorage.removeItem("loggedInPK")}
                sx={{ ...rightLink, color: "secondary.main" }}
              >
                {"Logout"}
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
