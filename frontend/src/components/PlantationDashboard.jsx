import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import download from "downloadjs";

import { tokens } from "../features/theme";
import { mockTransactions } from "../data/mockData";

import LineChart from "../dashcom/LineChart";
import GeographyChart from "../dashcom/GeographyChart";
import BarChart from "../dashcom/BarChart";
import StatBox from "../dashcom/StatBox";
import ProgressCircle from "../dashcom/ProgressCircle";

function PlantationDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // === EKSPOR CHART ===
  const chartRef = useRef(null);
  const [fileType, setFileType] = useState("png");

  const getFormattedDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleExportChart = () => {
    if (!chartRef.current) return;

    toPng(chartRef.current, {
      backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
    }).then((dataUrl) => {
      const fileName = `sensor-${getFormattedDate()}`;
      if (fileType === "png") {
        download(dataUrl, `${fileName}.png`);
      } else {
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "pt",
          format: [900, 500],
        });
        pdf.addImage(dataUrl, "PNG", 20, 40, 860, 400);
        pdf.save(`${fileName}.pdf`);
      }
    });
  };

  return (
    <section className="section">
      <div className="container">
        <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
          <h1 className="title is-1">Monitoring Plantation</h1>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </div>

        <Box m="20px">
          {/* ROW 1 - Responsive Grid Stat Box */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap="20px"
            justifyContent="center"
            mt={2}
          >
            {[
              {
                title: "3 Sensors",
                subtitle: "Temperatur",
                progress: "0.60",
                increase: "+14%",
                icon: (
                  <ThermostatAutoIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
                  />
                ),
              },
              {
                title: "3 Sensors",
                subtitle: "Humidity",
                progress: "0.50",
                increase: "+21%",
                icon: (
                  <AcUnitIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
                  />
                ),
              },
              {
                title: "3 Sensors",
                subtitle: "Air Quality",
                progress: "0.30",
                increase: "+5%",
                icon: (
                  <AcUnitIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
                  />
                ),
              },
              {
                title: "3 Sensors",
                subtitle: "Dust",
                progress: "0.80",
                increase: "+43%",
                icon: (
                  <TrafficIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
                  />
                ),
              },
            ].map((item, index) => (
              <Box
                key={index}
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                <StatBox {...item} />
              </Box>
            ))}
          </Box>

          {/* ROW 2 - Line Chart + Schedule */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
            mt="20px"
          >
            {/* CHART */}
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Monitoring Temperatur Sensor
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  <Select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    size="small"
                    
                  >
                    <MenuItem value="png">PNG</MenuItem>
                    <MenuItem value="pdf">PDF</MenuItem>
                  </Select>

                  <IconButton onClick={handleExportChart}>
                    <DownloadOutlinedIcon
                      sx={{
                        fontSize: "26px",
                        color: colors.greenAccent[500],
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box ref={chartRef} height="245px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>

            {/* Schedule Box */}
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                position="sticky"
                top={0}
                zIndex={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                backgroundColor={colors.primary[400]}
                p="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  Jadwal Petugas
                </Typography>
              </Box>
              {mockTransactions.map((transaction, i) => (
                <Box
                  key={`${transaction.txId}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography color={colors.grey[100]}>
                      {transaction.user}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.date}</Box>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                    color="black"
                  >
                    {transaction.cost}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* ROW 3 - Campaign, Sales, Geography */}
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              p="30px"
            >
              <Typography variant="h5" fontWeight="600">
                Campaign
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <ProgressCircle size="125" />
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  sx={{ mt: "15px" }}
                >
                  $48,352 revenue generated
                </Typography>
                <Typography>
                  Includes extra misc expenditures and costs
                </Typography>
              </Box>
            </Box>

            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
              >
                Quantity
              </Typography>
              <Box height="250px" mt="-20px">
                <BarChart isDashboard={true} />
              </Box>
            </Box>

            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              padding="30px"
            >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ marginBottom: "15px" }}
              >
                Geography Based Traffic
              </Typography>
              <Box height="200px">
                <GeographyChart isDashboard={true} />
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </section>
  );
}

export default PlantationDashboard;
