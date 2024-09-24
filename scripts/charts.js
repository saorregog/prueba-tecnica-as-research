const url =
  "https://natural-connection-0f2ac61546.strapiapp.com/api/formato2-complementos";

const fetchDataAndDisplayCharts = async (url) => {
  try {
    const response = await fetch(url);

    if (response.status !== 200) {
      throw new Error(response.status);
    }

    const { data } = await response.json();

    // Bar chart
    let barChartLabels = [];
    let barChartData = [];

    for (let i = 0; i < data.length; i++) {
      barChartLabels.push(data[i].attributes.Especie);
      barChartData.push(
        data[i].attributes.Supervivencia > 100
          ? 100
          : data[i].attributes.Supervivencia
      );
    }

    const chartContainer1 = document.getElementById("chart-container-1");

    new Chart(chartContainer1, {
      type: "bar",
      data: {
        labels: barChartLabels,
        datasets: [
          {
            label: "Porcentaje de supervivencia",
            data: barChartData,
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
      },
    });

    // Doughnut chart
    let totalSeedsPlanted = 0;
    let totalSeedsGerminated = 0;

    for (let i = 0; i < data.length; i++) {
      totalSeedsPlanted += data[i].attributes.TotalSembradas;
      totalSeedsGerminated += data[i].attributes.CantidadGerminadas;
    }

    let doughnutChartLabels = ["Semillas plantadas", "Semillas germinadas"];
    let doughnutChartData = [totalSeedsPlanted, totalSeedsGerminated];

    const chartContainer2 = document.getElementById("chart-container-2");

    new Chart(chartContainer2, {
      type: "doughnut",
      data: {
        labels: doughnutChartLabels,
        datasets: [
          {
            label: "Número de semillas",
            data: doughnutChartData,
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchDataAndDisplayCharts(url);
