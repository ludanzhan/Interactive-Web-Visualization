d3.json("samples.json").then(function(data){ 
    // extract sample values
    let sample_values = data.samples[0].sample_values;

    // slicing the first ten in descending order
    sampleSlice = sample_values.slice(0,10);
    sampleSlice = sampleSlice.reverse();

    //extract "otu id", slicing the first ten in descending order
    let otu_ids = data.samples[0].otu_ids
    idSlice = otu_ids.slice(0,10);
    idSlice = idSlice.reverse();

    //extract "otu labels"
    let otu_labels = data.samples[0].otu_labels;

    //console.log("sample values: ",sample_values);
    //console.log("otu id: ", otu_ids);
    //console.log("label: " , otu_labels);

    const yAxis = idSlice.map(item => 'OTU' + " " + item);

    // create bar chart with layout
    let trace = {
        x: sampleSlice,
        y: yAxis,
        type: "bar",
        orientation: "h",
        text: otu_labels
    };

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

    // grab the dropdown menu
    const metadata = data.metadata;
    console.log(metadata);
    const selData = d3.select("#selDataset");

    for (let i =0; i<metadata.length; i++){
        selData.append("option").text(metadata[i].id);
    }


    let sample_metadata = d3.select("#sample-metadata");

    
    
  


});


