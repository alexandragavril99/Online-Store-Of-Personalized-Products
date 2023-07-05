import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import NavbarMenu from "../components/NavbarMenu";
import Typography from "@mui/material/Typography";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Montserrat', sans-serif",
  },

  header: {
    fontFamily: "'Montserrat', sans-serif",
    paddingTop: "30px",
    paddingBottom: "50px",
    fontSize: "x-large",
    fontWeight: "500",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  alignContent: {
    display: "flex",
    justifyContent: "space-evenly",
  },
};

function Statistics() {
  const chartRefFeature = useRef(null);
  const chartRefOrder = useRef(null);

  const [dataFeature, setDataFeature] = useState([70, 100]);
  const [dataOrders, setDataOrders] = useState([20, 45, 30]);

  useEffect(() => {
    const ctx = chartRefOrder.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["April", "May", "June"],
        datasets: [
          {
            label: "The number of orders placed in the last three months",
            data: [dataOrders[0], dataOrders[1], dataOrders[2]],
            backgroundColor: ["#d98bad", "#9a044c", "#802c80"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            labels: {
              // This more specific font property overrides the global property
              font: {
                family: "Montserrat",
                size: 14,
              },
            },
          },
        },
      },
    });

    const ctx2 = chartRefFeature.current.getContext("2d");
    const myChart2 = new Chart(ctx2, {
      type: "pie",
      data: {
        labels: ["Custom text", "Picture"],
        datasets: [
          {
            label: "Ordered products by category",
            data: [dataFeature[0], dataFeature[1]],
            backgroundColor: ["#d98bad", "#9a044c"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            l9abels: {
              font: {
                family: "Montserrat",
                size: 14,
              },
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
      myChart2.destroy();
    };
  }, []);
  return (
    <>
      <NavbarMenu />
      <Typography style={styles.header}>Overview of Statistics</Typography>
      <div style={styles.alignContent}>
        <div style={{ width: "750px", background: "white" }}>
          <canvas ref={chartRefOrder} />
        </div>
        <div style={{ width: "360px", background: "white" }}>
          <canvas ref={chartRefFeature} />
        </div>
      </div>
    </>
  );
}

export default Statistics;
