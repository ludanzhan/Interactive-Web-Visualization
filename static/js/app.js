// read in the json files
d3.json("samples.json").then(function(sampledata){
    const data = sampledata;

    let id = data.names;
    console.log(id);

    // grab the dropdown menu
    const selectBox = d3.select("#selDataset");

    // adding ids to the dropdown menu
    for(let i =0; i< id.length; i++){
        selectBox.append("option").text(id[i]);
    }

    unpdateChart(0);

    // function to create real-time chart based on the dropdown value
    function unpdateChart(id){
        // extract and store each value needed
        const sample_values = data.samples[id].sample_values;
        const otu_ids =  data.samples[id].otu_ids;  

        // slicing the value in descending order
        const otu_labels =  data.samples[0].otu_labels.slice(0,10).reverse();;
        const top10Sample = sample_values.slice(0,10).reverse();
        const top10Id = otu_ids.slice(0,10).reverse();

        // create labels in correct  format
        const yAxis = top10Id.map(item => 'OTU' + " " + item).reverse();

        // create bar chart
        let trace = {
            x: top10Sample,
            y: yAxis,
            type: "bar",
            orientation: "h",
            text: otu_labels
        };

        // bar chart layout
        let layout = {
            width: 350,
            height: 550
        };

        let traceData = [trace];
        Plotly.newPlot("bar", traceData, layout);


            // create bubble chart
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

        let keys = Object.keys(data.metadata[id]);
        let values = Object.values(data.metadata[id]) 
        let sample_metadata = d3.select("#sample-metadata");

        sample_metadata.html("");

        for(let i =0; i< keys.length; i++){
            sample_metadata.append("p").text(keys[i] + ": " + values[i]);
        }  
    }

    d3.selectAll("#selDataset").on("change", updateData);

    function updateData(){
        let dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        let dataset = dropdownMenu.property("value");
        console.log("value", dataset);

        for(let i =0; i< data.names.length; i++){
            if(dataset === data.names[i]){
                unpdateChart(i);
            }
        }
    }

});   



