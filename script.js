function calculatePrice() {
        try {
          const data = JSON.parse(document.getElementById("dataInput").value);
          const area = parseFloat(document.getElementById("areaInput").value);

          if (isNaN(area)) {
            alert("Please enter a valid area.");
            return;
          }

          // Extract areas and prices
          const areas = data.map((item) => item.area);
          const prices = data.map((item) => item.price);

          // Mean function
          const mean = (arr) => arr.reduce((sum, val) => sum + val, 0) / arr.length;

          const meanX = mean(areas);
          const meanY = mean(prices);

          // Calculate B1 and B0
          let numerator = 0;
          let denominator = 0;

          for (let i = 0; i < areas.length; i++) {
            numerator += (areas[i] - meanX) * (prices[i] - meanY);
            denominator += Math.pow(areas[i] - meanX, 2);
          }

          const B1 = numerator / denominator;
          const B0 = meanY - B1 * meanX;

          // Prediction function
          const predict = (x) => B0 + B1 * x;

          const predictedPrice = predict(area);

          const resultElement = document.getElementById("result");
          resultElement.textContent = `Predicted Price for Area ${area} m²: ${predictedPrice.toLocaleString()} UZS`;
          resultElement.classList.remove("d-none");
        } catch (error) {
          alert("Invalid input: Please ensure the dataset is in correct JSON format.");
        }
      }
