import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const ButtonPrimary = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontWeight: "bold",
    fontSize: 16,
    padding: "6px 12px",
    lineHeight: 1.5,
    border: "1px solid",
    color: "black",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
      borderColor: "black",
    },
    "&:active": {
      backgroundColor: "black",
      borderColor: "black",
    },
    "&:focus": {
      boxShadow: "none",
    },
  },
})(Button);

const PrimaryButton = ({ text, ...props }) => {
  return (
    <ButtonPrimary
      className="w-32 self-center"
      variant="contained"
      color="primary"
      {...props}
    >
      {text}
    </ButtonPrimary>
  );
};

export { PrimaryButton };
