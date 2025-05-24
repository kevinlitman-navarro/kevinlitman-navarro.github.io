(function () {

  var margin = { top: 20, right: 10, bottom: 20, left: 60 }

  var width = 800 - margin.left - margin.right
  var height = 400 - margin.top - margin.bottom


  var svg = d3.select("#chart8").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  widthScale = d3.scaleLinear()
    .domain([0,2.5])
    .range([0,width])

  xPositionScale = d3.scaleLinear()
    .domain([0,2.5])
    .range([0,width])



  // Read in some external data. When we're done, run the function 'ready'

  d3.queue()
    .defer(d3.csv, 'coffee-correlations.csv')
    .await(ready)

  // This is 'ready':
  // it receives an error (if there is one)
  // and datapoints, our newly-read-in data
  function ready(error, datapoints) {
    console.log("Data is", datapoints)
    // d3 code goes here

    characteristics = datapoints.map(function(d) {
      return d.characteristic
    })

    yPositionScale = d3.scalePoint()
      .domain(characteristics)
      .range([0, height])

    svg.selectAll("rect")
      .data(datapoints)
      .enter().append("rect")
      .attr('y', function (d) {
        return yPositionScale(d.characteristic)
      })
      .attr('width', function (d) {
        return widthScale(d.score)
      })
      .attr('height', 20)
      .attr('fill', 'purple')

    svg.selectAll("text")
      .data(datapoints)
      .enter().append("text")
      .attr('y', function (d) {
        return yPositionScale(d.characteristic)
      })
      .attr('x', function (d) {
        return xPositionScale(d.score)
      })
      .text(function (d) {
        return d.score
      })

    var yAxis = d3.axisLeft(yPositionScale);
    svg.append("g")
      .attr("class", "axis y-axis super-font")
      .call(yAxis)

    var xAxis = d3.axisBottom(widthScale)
    svg.append("g")
      .attr("class", "axis x-axis super-font")
      .attr("transform", "translate(0," + (height + margin.bottom) + ")")
      .call(xAxis)



    // Always cut and paste the code for the axes!


  }

})()