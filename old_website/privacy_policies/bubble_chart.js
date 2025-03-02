(function () {


 var margin = { top: 20, right: 40, bottom: 40, left: 80 }

  var width = 850 - margin.left - margin.right,
      height = 650 - margin.top - margin.bottom

  var ypadding = -10
  var xpadding = 10

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong class='tip-platform'>" + d.platform + "</strong>" + "<span class='super-font'>" + "<br>" + "&mdash;&mdash;&mdash;&mdash;" + "<br> Flesch Reading Ease Score: " + d.privacy_score + "<br>" + "&mdash;&mdash;&mdash;&mdash;" + "<br>Word Count: " + d.privacy_length + "<br>" + "&mdash;&mdash;&mdash;&mdash;" + "<br>Sample Sentence: " + d.worst_sentence +".</span>"
    })



var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var arrowDef = svg.append('defs')
var arrowMarker = arrowDef.append('marker')
    .attr('id','arrow')
    .attr('markerUnits','strokeWidth')
    .attr('markerWidth','40')
    .attr('markerHeight','40')
    .attr('viewBox','0 0 40 40')
    .attr('refX','6')
    .attr('refY','6')
    .attr('orient','auto')
var arrowPath = arrowMarker.append('path')
    .attr('d','M2,2 L10,6 L2,10 L6,6 L2,2')
    .style('fill','#333333')


svg.call(tip)

var format = d3.format(",d")

var colorScale = d3.scaleOrdinal()
  .domain(['True','False'])
  .range(['#006699','#333333'])

var yPositionScale = d3.scaleLinear()
    .domain([20,55])
    .range([height,0])

var radiusScale = d3.scaleSqrt()
    .domain([0, 4574])
    .range([1,10])

 d3.queue()
    .defer(d3.csv, 'privacy_policies_d3.csv')
    .await(ready)

  // This is 'ready':
  // it receives an error (if there is one)
  // and datapoints, our newly-read-in data
  function ready(error, datapoints) {
    console.log("Data is", datapoints)

  var nodes = datapoints.map(function(node, index) {
    return {
      index: index,
      privacy_score: node.privacy_score,
      privacy_length: node.privacy_length,
      worst_sentence: node.worst_sentence,
      platform: node.platform
    };
  });

  var simulation = d3.forceSimulation(nodes)
    .force("y", d3.forceY(function(d) { return yPositionScale(d.privacy_score); }).strength(1))
    .force("x", d3.forceX(width*.3))
    .force("collide", d3.forceCollide().radius(function(d){ return 8 + 20 }))
    .force("manyBody", d3.forceManyBody().strength(-10))
    .stop();

  for (var i = 0; i < 150; ++i) simulation.tick();

  var circleGroups = svg.selectAll('g')
    .data(nodes)
    .enter().append('g')
    .filter(function(d) { return (d.platform != 'harry_potter') & (d.platform != 'constitution')  })
    // .attr('y', function (d) {
    //     return yPositionScale(d.privacy_score)
    //   })
    // .attr('x', (function (d) {
    //     return (width * .6) - Math.random()*350 }))
    .attr("x", function(d) { return d.x} )
    .attr("y", function(d) { return d.y} )
    

 var policyCircles = circleGroups.append('circle')
      .filter(function(d) { return (d.platform != 'harry_potter') & (d.platform != 'constitution')  })
      .attr('fill', '#333333')
      .attr('r', 8)
      .attr('cy', function (d) {
        return d3.select(this.parentNode).attr('y')
      })
      .attr('cx', function (d) {
        return d3.select(this.parentNode).attr('x')
      })
      .attr('opacity', 1)
      .attr('id','policy-circle')
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

   var platformLabels = circleGroups.append('text')
    .filter(function(d) { return (d.platform != 'harry_potter') & (d.platform != 'constitution')  })
    .attr('text-length', function (d) {
      return d.platform.length
    })
    .attr('x', function (d) { 
      return d3.select(this.parentNode).attr('x')
    })
    .attr('y', function (d) { 
      return d3.select(this.parentNode).attr('y')
    })
    .attr('dy', -12)
    .attr('id','platform_label')
    .attr('fill', '#333333')
    .attr('text-anchor', 'middle')
    .attr('font-size', 14)
    .text(function(d) {
      return  d.platform
    })

  var thresholdLine = svg.append("line")          // attach a line
      .style("stroke", "#006699")  // colour the line
      .attr('stroke-dasharray', '4')
      .attr('opacity', 1)
      .attr("x1", 0)     // x position of the first end of the line
      .attr("y1", yPositionScale(50))      // y position of the first end of the line
      .attr("x2", width)     // x position of the second end of the line
      .attr("y2", yPositionScale(50))    // y position of the second end of the line
      
  var thresholdAnnotation = svg.append('text')
    .text('High School Graduate Reading Level')
    .attr('id','chart-annotation')
    .attr('x',522)
    .attr('y',yPositionScale(50.5))
    .attr('font-size',14)

  var thresholdLine2 = svg.append("line")          // attach a line
      .style("stroke", "#006699")  // colour the line
      .attr('stroke-dasharray', '4')
      .attr('opacity', 1)
      .attr("x1", 0)     // x position of the first end of the line
      .attr("y1", yPositionScale(30))      // y position of the first end of the line
      .attr("x2", width)     // x position of the second end of the line
      .attr("y2", yPositionScale(30))    // y position of the second end of the line
      
  var thresholdAnnotation2 = svg.append('text')
    .text('College Graduate Reading Level')
    .attr('id','chart-annotation')
    .attr('x',550)
    .attr('y',yPositionScale(29))
    .attr('font-size',14)

  var thresholdAnnotation3 = svg.append('text')
    .text('43 percent of Americans don\'t meet this literacy threshold')
    .attr('id','chart-annotation')
    .attr('x',407)
    .attr('y',yPositionScale(49))
    .attr('font-size',14)

  var thresholdAnnotation4 = svg.append('text')
    .text('87 percent of Americans don\'t meet this literacy threshold')
    .attr('id','chart-annotation')
    .attr('x',407)
    .attr('y',yPositionScale(30.5))
    .attr('font-size',14)

var readabilityLine1 = svg.append("line")          // attach a line
      .style("stroke", "#333333")  // colour the line
      .attr("x1", width * 7/8)     // x position of the first end of the line
      .attr("y1", yPositionScale(43))      // y position of the first end of the line
      .attr("x2", width * 7/8)     // x position of the second end of the line
      .attr("y2", yPositionScale(45))    // y position of the second end of the line
      .attr("marker-end","url(#arrow)")

var readabilityAnnotation1 = svg.append('text')
    .text('More readable')
    .attr('id','chart-annotation')
    .attr('x',width * 7/8)
    .attr('y',yPositionScale(42.3))
    .attr('text-anchor','middle')
    .attr('font-size',14)

var readabilityAnnotation2 = svg.append('text')
    .text('Less readable')
    .attr('id','chart-annotation')
    .attr('x',width * 7/8)
    .attr('y',yPositionScale(37.7))
    .attr('text-anchor','middle')
    .attr('font-size',14)

var readabilityLine2 = svg.append("line")          // attach a line
      .style("stroke", "#333333")  // colour the line
      .attr("x1", width * 7/8)     // x position of the first end of the line
      .attr("y1", yPositionScale(37))      // y position of the first end of the line
      .attr("x2", width * 7/8)     // x position of the second end of the line
      .attr("y2", yPositionScale(35))    // y position of the second end of the line
      .attr("marker-end","url(#arrow)")

var yAxis = d3.axisLeft(yPositionScale)
      .tickSize(0)
      .ticks(6)
    svg.append("g")
      .attr("class", "axis y-axis")
      .style('fill', '#333333')
      .style("font-weight", "light")  
      .style("font-size", "14px")
      .attr('id','tick-label')
      .call(yAxis)

    svg.selectAll(".y-axis text")
     .attr("transform", "translate(" + ypadding + ",0)")


var yAxisAnnotation = svg.append('text')
    .text('Flesch')
    .attr('id','axis-annotation')
    .attr('width',2)
    .attr('x',0 - margin.left / 2)
    .attr('y',height / 2 -15)
    .attr('dy', '0em')
    .attr('font-size',17)
    .attr('text-anchor','middle')

var yAxisAnnotation = svg.append('text')
    .text('Reading')
    .attr('id','axis-annotation')
    .attr('width',2)
    .attr('x',0 - margin.left / 2)
    .attr('y',height / 2 -15)
    .attr('dy', '1em')
    .attr('font-size',17)
    .attr('text-anchor','middle')

var yAxisAnnotation = svg.append('text')
    .text('Ease')
    .attr('id','axis-annotation')
    .attr('width',2)
    .attr('x',0 - margin.left / 2)
    .attr('y',height / 2 -15)
    .attr('dy', '2em')
    .attr('font-size',17)
    .attr('text-anchor','middle')

var yAxisAnnotation = svg.append('text')
    .text('Score')
    .attr('id','axis-annotation')
    .attr('width',2)
    .attr('x',0 - margin.left / 2)
    .attr('y',height / 2 -15) 
    .attr('dy', '3em')
    .attr('font-size',17)
    .attr('text-anchor','middle')

}

})()