(function () {


 var margin = { top: 20, right: 40, bottom: 40, left: 40 }

  var width = 1050 - margin.left - margin.right,
      height = 750 - margin.top - margin.bottom

  var ypadding = -10
  var xpadding = 10

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong class='super-font'>" + d.platform + "</strong>" + "<span class='super-font'>" + "<br>" + "&mdash;&mdash;&mdash;&mdash;" + "<br> Flesch Reading Ease Score: " + d.privacy_score + "<br>" + "&mdash;&mdash;&mdash;&mdash;" + "<br>Word Count: " + d.privacy_length + "</span>"
    })



var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

svg.call(tip)

var format = d3.format(",d")

var yPositionScale = d3.scaleLinear()
    .domain([20,80])
    .range([height,0])

var radiusScale = d3.scaleSqrt()
    .domain([0, 4574])
    .range([0,20])

 d3.queue()
    .defer(d3.csv, 'privacy_policies_d3.csv')
    .await(ready)

  // This is 'ready':
  // it receives an error (if there is one)
  // and datapoints, our newly-read-in data
  function ready(error, datapoints) {
    console.log("Data is", datapoints)

// d3.csv("song_counts.csv", function(d) {
//   d.tab_count = +d.tab_count
//   if (d.tab_count) return d
// }, function(error, classes) {
//   if (error) throw error

 var artist_tab_circles = svg.selectAll('circle')
      .data(datapoints)
      .enter().append('circle')
      .attr('fill', '#333333')
      .attr('r', function (d) {
        return radiusScale(d.privacy_length)
      })
      .attr('cy', function (d) {
        return yPositionScale(d.privacy_score)
      })
      .attr('cx', width/2)
      .attr('opacity', 1)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

  var thresholdLine = svg.append("line")          // attach a line
      .style("stroke", "blue")  // colour the line
      .attr('width',8)
      .attr('stroke-dasharray', '4')
      .attr('opacity', .7)
      .attr("x1", 0)     // x position of the first end of the line
      .attr("y1", yPositionScale(50))      // y position of the first end of the line
      .attr("x2", width)     // x position of the second end of the line
      .attr("y2", yPositionScale(50))    // y position of the second end of the line

  var band_labels = svg.selectAll('text')
    .data(datapoints)
    .enter().append('text')
    .attr('y', function (d) {
        return yPositionScale(d.privacy_score)
      })
    .attr('x', width/2 - 60)
    .attr('stroke', '#333333')
    .attr('text-anchor', 'middle')
    .attr('font-size', 14)
    .text(function(d) {
      return  d.platform
    })

  var other_labels = svg.selectAll('text')
    .data(datapoints)
    .enter().append('text')
    .attr('y', function (d) {
        return yPositionScale(d.privacy_score)
      })
    .attr('x', width/2 + 60)
    .attr('stroke', '#DCCCC9')
    .attr('text-anchor', 'middle')
    .attr('font-size', 14)
    .text(function(d) {
      return  d.worst_sentence
    })

var yAxis = d3.axisLeft(yPositionScale)
      .tickSize(0)
      .ticks(6)
    svg.append("g")
      .attr("class", "axis y-axis")
      .style('stroke', '#333333')
      .style("font-weight", "light")  
      .style("font-size", "14px")
      .call(yAxis)

    svg.selectAll(".y-axis text")
     .attr("transform", "translate(" + ypadding + ",0)")


}

})()