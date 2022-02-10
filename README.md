# Interactive-Web-Visualization
This project builds an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.
## Bar Chart
  - Create **bar chart**
    - Use sample_values as the values for the bar chart.
      ```js
        const sample_values = data.samples[id].sample_values;
        const top10Sample = sample_values.slice(0,10).reverse();
      ```
    - Use otu_ids as the labels for the bar chart.
       ```js
        const otu_ids =  data.samples[id].otu_ids;  
        const top10Id = otu_ids.slice(0,10).reverse();
      ```
    - Use otu_labels as the hovertext for the chart.
      ```js
        const otu_labels =  data.samples[0].otu_labels.slice(0,10).reverse();;
        const yAxis = top10Id.map(item => 'OTU' + " " + item).reverse();
      ```
      ![image](https://github.com/ludanzhan/Interactive-Web-Visualization/blob/main/image/bar%20chart.png)
   - Create **bubble chart**
      ```js
       let bubbleTrace = {
              x : otu_ids,
              y : sample_values,
              mode: 'markers',
              marker:{
                  size: sample_values,
                  color: otu_ids
              },
              text: otu_labels
          }

          let bubbleLayout = {    
              showlegend: true,
              xaxis: {title:'OTU ID'},
              yaxis: {title:'Sample Value'},
              height: 600,
              width: 1200
          };

          let bubbleData = [bubbleTrace];

          Plotly.newPlot("bubble", bubbleData, bubbleLayout);
      ```
      ![image](https://github.com/ludanzhan/Interactive-Web-Visualization/blob/main/image/bubble%20chart.png)
   - Display the sample metadata, i.e., an individual's demographic information.
   ```js
       // grab the dropdown menu
      const selectBox = d3.select("#selDataset");

      // adding ids to the dropdown menu
      for(let i =0; i< id.length; i++){
          selectBox.append("option").text(id[i]);
      }
   ```
   - Display each key-value pair from the metadata JSON object somewhere on the page.
   ```js
      let keys = Object.keys(data.metadata[id]);
      let values = Object.values(data.metadata[id]) 
      let sample_metadata = d3.select("#sample-metadata");

      sample_metadata.html("");

      for(let i =0; i< keys.length; i++){
          sample_metadata.append("p").text(keys[i] + ": " + values[i]);
      }
   ```
   ![image](https://github.com/ludanzhan/Interactive-Web-Visualization/blob/main/image/panel.png)
   - Create **gauge chart**
   ```js
      let wfreq = data.metadata[id].wfreq;
          console.log("wfreq",wfreq);

          let gaugeTrace = [
              {   domain: { x: [0, 1], y: [0, 1] },
                  value: wfreq,
                  title: { text: "Belly Button Washes Per Week" },
                  delta: { reference: 0, increasing: { color: "#8eab80"} },
                  type: "indicator",
                  mode: "gauge+number+delta",
                  gauge: {
                      axis: { range: [0, 9],
                              tickwidth: 0.5, 
                              tickcolor: "black"},
                      bar: { color: "#e0b6bb" },
                      borderwidth: 5,
                      bordercolor: "transparent",
                      steps: [
                          { range: [0, 1], color: "#f5f5ef"  },
                          { range: [1, 2], color: "#ebebe0" },
                          { range: [2, 3], color: "#d3d6ba" },
                          { range: [3, 4], color: "#e3e8ba"},
                          { range: [4, 5], color: "#cee3aa" },
                          { range: [5, 6], color: "#adc28d" },
                          { range: [6, 7], color: "#98c28d" },
                          { range: [7, 8], color: "#88ba8a" },
                          { range: [8, 9], color: "#7eab80" }
                      ],
                  }
              }
           ];

          let gaugeLayout = 
          { width: 600, height: 450, margin: { t: 0, b: 0 } }

          Plotly.newPlot('gauge', gaugeTrace, gaugeLayout);
   ```
   ![image](https://github.com/ludanzhan/Interactive-Web-Visualization/blob/main/image/gauge%20chart.png)
