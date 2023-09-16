// -------------------------
// Variables
// -------------------------

//input y select
const inputMonedaChilena = document.querySelector("input");
const selectMoneda = document.getElementById("selectMoneda");

// botón y resultado
const button = document.getElementById("button");
const resultP = document.getElementById("resultP");
// -------------------------

document.addEventListener("DOMContentLoaded", function () {
// reset input y select
inputMonedaChilena.value = '';
selectMoneda.selectedIndex = 0;

    button.addEventListener("click", async () => {
      const monedaChilena = parseFloat(inputMonedaChilena.value);
      const monedaSeleccionada = selectMoneda.value;
  
      if (!monedaChilena || !monedaSeleccionada) {
        alert("Por favor, complete todos los campos");
        return;
      }
// sacando la ULR de acuerdo a moneda seleccionada
      let url = "";
      if (monedaSeleccionada === "1") {
        url = "https://mindicador.cl/api/dolar";
      } else if (monedaSeleccionada === "2") {
        url = "https://mindicador.cl/api/uf";
      }
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        const valorMoneda = data.serie[0].valor;
        const montoConvertido = monedaChilena / valorMoneda;
  
        resultP.innerHTML = `El monto es: ${montoConvertido.toFixed(2)} ${data.nombre}`;
  
// Gráfico
        const labels = data.serie.slice(0, 10).map((item) => item.fecha);
        const values = data.serie.slice(0, 10).map((item) => item.valor);
        const ctx = document.getElementById("chart").getContext("2d");
        const chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: `Valor de ${data.nombre} en los últimos 10 días`,
                data: values,
                borderColor: "rgba(75, 192, 192, 1)",
                fill: false,
              },
            ],
          },
        });
      } catch (error) {
        resultP.innerHTML = `¡PUM! Se rompió: ${error}`;
      }
    });
  });
  