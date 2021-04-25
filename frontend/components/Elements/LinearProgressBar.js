import { LinearProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const ProgressBar = withStyles({
  root:{
    backgroundColor: "white"
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "black",
    height: "5px",
    margin:"0",
  },
})(LinearProgress);

export const LinearProgressBar = ({ ...props }) => {
  return <ProgressBar variant="determinate" color="primary" {...props} />;
};
