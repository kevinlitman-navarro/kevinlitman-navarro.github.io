(function () {

  var margin = { top: 20, right: 40, bottom: 40, left: 40 }

  var width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom

  var ypadding = -10
  var xpadding = 10

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>" + d.season + " " + d.team_name + ":</strong> <span>" + d.wins + " wins, " + d.continuity + " percent continuity</span>";
    })


  var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  svg.call(tip)

  var xPositionScale = d3.scaleLinear()
    .domain([0,100])
    .range([0,width])

  var yPositionScale = d3.scaleLinear()
    .domain([0,75])
    .range([height,0])

  var radiusScale = d3.scaleSqrt()
    .domain([1952, 2017])
    .range([1,5])

  var team_names = ['ATL', 'BOS', 'CHA', 'CHI', 'CLE', 'DAL', 'DEN', 'DET', 'GSW',
       'HOU', 'IND', 'LAC', 'LAL', 'MEM', 'MIA', 'MIL', 'MIN', 'NJN', 'NOH',
       'NYK', 'OKC', 'ORL', 'PHI', 'PHO', 'POR', 'SAC', 'SAS', 'TOR', 'UTA',
       'WAS']


  // Read in some external data. When we're done, run the function 'ready'

  d3.queue()
    .defer(d3.csv, 'all-teams-seasons.csv')
    .await(ready)

  // This is 'ready':
  // it receives an error (if there is one)
  // and datapoints, our newly-read-in data
  function ready(error, datapoints) {
    console.log("Data is", datapoints)
    // d3 code goes here

    svg.selectAll('circle')
      .data(datapoints)
      .enter().append('circle')
      .attr('r', 5)
      .attr('cx', function (d) {
        return xPositionScale(d.continuity)
      })
      .attr('cy', function (d) {
        return yPositionScale(d.wins)
      })
      //.attr('r', function (d) {
       // return radiusScale(d.season)
      //})
      .attr('fill', '#EB5852')
      .attr('opacity', .7)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

    //svg.append('text')
    // .data(datapoints)
    //  .attr("x", (width / 2))             
    //  .attr("y", 0 - (margin.top / 4))
    //  .attr("text-anchor", "middle")  
    //  .style("font-size", "20px") 
    //  .style("font-weight", "bold")  
    //  .style('fill', '#DDDDC9')
    //  .text("How team roster continuity is related to wins")

    var yAxis = d3.axisLeft(yPositionScale)
      .tickSize(0)
      .ticks(6)
    svg.append("g")
      .attr("class", "axis y-axis")
      .style('stroke', '#DDDDC9')
      .style("font-weight", "light")  
      .style("font-size", "14px")
      .call(yAxis)

    svg.selectAll(".y-axis text")
     .attr("transform", "translate(" + ypadding + ",0)")


    var xAxis = d3.axisBottom(xPositionScale)
      .tickSize(0)
      .ticks(5)
    svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + height + ")")
      .style('stroke', '#DDDDC9')
      .style("font-weight", "light")  
      .style("font-size", "14px")
      .call(xAxis)

    svg.selectAll(".x-axis text")
      .attr("transform", "translate(0," + xpadding + ")")

    // Always cut and paste the code for the axes!


  }

})()