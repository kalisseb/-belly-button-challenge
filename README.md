# belly-button-challenge

This exercise was designed to show the use of JavaScript and Plotly to build an interactive dashboard. The dashboard includes a drop down filter, a listed summary of the sample information, a bar chart, and a bubble chart.

## Summary

Using samples.json I created an array of the data. This metadata is displayed, depending on the filtered sample, in the Demographic Info object. 

While creating the bar and bubble chart, I gathered the OTU ID's, OTU Labels, and sample values in separate lists. 

I also mapped the tick marks on the y-axees of both charts to reflect the numerical value of the OTU ID.

The sizes of each bubble in the bubble chart were mapped to correspond with the sample values and colored by OTU ID. 

To create a list accessible to the filter/dropdown a list of the names field values was created.
