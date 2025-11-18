
import React from 'react'
import { Box, useTheme } from "@mui/material";
import GeographyChart from "../dashcom/GeographyChart";
import Header from "../dashcom/Header";
import { tokens } from "../features/theme";


function EupDashboard() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <section className="section">
      
    <Box m="20px">
      <h1 className="title is-1">Geography</h1>

      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        <GeographyChart />
      </Box>
    </Box>
    
    </section>
  )
}

export default EupDashboard
