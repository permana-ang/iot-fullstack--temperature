import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../features/theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box mt={1}>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100], fontSize: "25px"   }}
          >
            {title}
          </Typography>
        </Box>
        <Box mt={2}>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h6" sx={{ color: colors.greenAccent[500], fontSize: "20px" }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600]  }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;