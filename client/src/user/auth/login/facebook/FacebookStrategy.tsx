import { AlphaButton } from "../../AlphaButton";
import { ReactComponent as FacebookIcon } from "../../../../assets/facebook-rounded-logo.svg";

const FacebookStrategy: React.FC<{ register?: boolean }> = ({
  register = false,
}) => {
  const loginWithFacebook = () => {
    window.open("https://localhost:5000/api/users/login/facebook", "_self");
  };

  return (
    <AlphaButton
      onClick={loginWithFacebook}
      sx={{
        padding: "0.9rem 0",
        bgcolor: "hsl(214, 89%, 52%)",
        gap: "0.6rem",
        "&:hover": {
          bgcolor: "hsl(214, 89%, 52%)",
          "&::after": {
            opacity: "0.1",
          },
        },
      }}
    >
      <span
        className={"login-facebook-icon"}
        style={{ display: "flex", alignItems: "center" }}
      >
        <FacebookIcon />
      </span>
      {!register ? "Login" : "Register"} with facebook
    </AlphaButton>
  );
};

export default FacebookStrategy;
