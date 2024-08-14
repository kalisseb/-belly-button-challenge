// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use the filtered result to populate the metadata panel
    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (key in result){
      PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
        }
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.map(otuID =>  `OTU ${otuID} `);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let barData = [
      {
        y: yticks.slice(0, 10),
        x: sample_values.slice(0, 10),
        text: otu_labels.slice(0, 10),
        type: "bar",
        orientation: "h"
      }
    ];

    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {t: 25, l: 150},
      xaxis: {'title': "Number of Bacteria"}
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout)

    // Build a Bubble Chart
    let bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        // customizing the size of the marker to correspond with the size of the sample
        // and the color by the otu_id
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "RdBu"
        }
      }
    ];

    let bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      hovermode: "closest",
      xaxis: {title: "OTU ID"},
      yaxis: {'title': "Number of Bacteria"},
      margin: {t:40}
    };


    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let namesList = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropDown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < namesList.Length; i++){
      dropDown
        .append("option")
        .text(namesList[i])
        .property("value", namesList[i]);
    };

    // Get the first sample from the list
    let firstSample = namesList[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
