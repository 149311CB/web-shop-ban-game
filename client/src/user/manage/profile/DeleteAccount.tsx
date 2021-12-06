import { Box, darken, Divider, Typography } from "@mui/material";
import { PrimaryButton } from "../../../components/PrimaryButton";

const DeleteAccount = () => {
  return (
    <Box>
      <Typography
        variant={"h2"}
        sx={{ fontFamily: "brutal-medium !important" }}
      >
      Delete Account
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <PrimaryButton
        sx={{
          bgcolor: "error.main",
          width: "100%",
          "&:hover": {
            bgcolor: (theme) => darken(theme.palette.error.main, 0.1),
          },
        }}
      >
        Delete account
      </PrimaryButton>
    </Box>
  );
};

export default DeleteAccount;
