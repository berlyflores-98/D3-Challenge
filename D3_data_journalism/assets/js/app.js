// @TODO: YOUR CODE HERE!

// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 50
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // circle properties
  var circleRadius = 5;


// Load data from data.csv
d3.csv("assets/data/data.csv").then(function(data) {
    // parse data

    console.log(data.poverty);

//     data.forEach(function(stateData) {
//         stateData.poverty = +stateData.poverty;
//         stateData.healthcare = +stateData.healthcare;
//   });

  // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([ 8,d3.max(data, d => d.poverty)*2.4])
      .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.healthcare)*2.95])
      .range([chartHeight, 0]);


  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 10)
    .attr("fill", "teal")
    .attr("opacity", ".75")
    .classed("stateCircle", true);

  // Create group for  2 x- axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);

  labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .text("In Poverty (%)");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Lacks HealthCare (%)");

    // Exit data
    //circlesGroup.exit().remove();

    //Add the SVG Text Element to the group
    var circlesLabel = chartGroup.selectAll("circles");

    //Add SVG Text Element Attributes
    circlesLabel
    .data(data)
    .enter()
    .append("text")
    .classed("stateText", true)
    .attr("text-anchor", "middle")
    .attr("x", d => xScale(d.poverty))
    .attr("y", d => yScale(d.healthcare))
    .text(d => `${d.abbr}`)
    .attr("font-size", `${circleRadius}px`);


  });