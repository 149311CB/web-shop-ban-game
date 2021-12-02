import { AlphaButton } from "../../AlphaButton";
import { ReactComponent as GoogleIcon } from "../../../../assets/google.svg";

const Google: React.FC<{ register?: boolean }> = ({ register = false }) => {
  const loginWithGoogle = () => {
    window.open("https://localhost:5000/api/users/login/google", "_self");
  };

  return (
    <AlphaButton
      onClick={loginWithGoogle}
      sx={{
        padding: "0.9rem 0",
        bgcolor: "hsl(100, 100%, 100%)",
        gap: "0.6rem",
        color: "background.default",
        "&:hover": {
          bgcolor: "hsl(100, 100%, 100%)",
          "&::after": {
            bgcolor: "background.paper",
            opacity: "0.1",
          },
        },
      }}
    >
      <span
        className={"login-facebook-icon"}
        style={{ display: "flex", alignItems: "center" }}
      >
        <GoogleIcon width={"25px"} />
      </span>
      {!register ? "Login" : "Register"} with google
    </AlphaButton>
  );
};

export default Google;
