import { InputBase, withStyles } from "@material-ui/core";

const Input = withStyles(() => ({
  input: {
    borderRadius: 4,
    position: "relative",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    "&:focus": {
      borderColor: "black",
    },
  },
}))(InputBase);

export const InputField = ({ error, inputProps, ...props }) => {
  return (
    <Input
      error={error}
      inputProps={{...inputProps, min: 0 }}
      {...props}
      id="outlined-textarea"
      variant="outlined"
    />
  );
};
