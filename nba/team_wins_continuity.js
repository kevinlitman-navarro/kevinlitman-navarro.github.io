(function () {

  var margin = { top: 20, right: 40, bottom: 20, left: 60 }

  var width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom


  var svg = d3.select("#chart1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr('fill', '#111111')

  seasons = [2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017]

  var xPositionScale = d3.scalePoint()
    .domain(seasons)
    .range([0,width])

  var heightScale = d3.scaleLinear()
    .domain([0,100])
    .range([0, height])

   var yPositionScale = d3.scaleLinear()
    .domain([0,100])
    .range([height,0])

  var line = d3.line()
    .x(function(d) { return xPositionScale(d.season); })
    .y(function(d) { return yPositionScale(d.continuity); })

  var team_names = ['ATL', 'BOS', 'CHA', 'CHI', 'CLE', 'DAL', 'DEN', 'DET', 'GSW',
       'HOU', 'IND', 'LAC', 'LAL', 'MEM', 'MIA', 'MIL', 'MIN', 'NJN', 'NOH',
       'NYK', 'OKC', 'ORL', 'PHI', 'PHO', 'POR', 'SAC', 'SAS', 'TOR', 'UTA',
       'WAS']


  // Read in some external data. When we're done, run the function 'ready'

  d3.queue()
    .defer(d3.csv, 'GSW_continuity.csv')
    .defer(d3.csv, 'GSW_wins.csv')
    .await(ready)

  // This is 'ready':
  // it receives an error (if there is one)
  // and datapoints, our newly-read-in data
  function ready(error, continuity, wins) {
    console.log("Data is", continuity)
    console.log("Data is", wins)
    // d3 code goes here

    svg.select('rect')
      .append('rect')
      .attr('fill', '#111111')
      .attr('height', height)
      .attr('width', width)
    
    svg.selectAll('rect')
      .data(wins)
      .enter()
      .append('rect')
      .attr('width', 14)
      .attr('height', function (d) {
        return heightScale(d.wins)
      })
      .attr('x', function (d) {
        return xPositionScale(d.season) - 6
      })
      .attr('y', function (d) {
        return yPositionScale(d.wins)
      })
      .attr('fill', '#D1A72A')

    svg.append('path')
      .datum(continuity)
      .attr("fill", "none")
      .attr("stroke", "#EB5852")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 4.5)
      .attr("d", line)

    //svg.append('text')
      //.data(wins)
      //.attr("x", (width / 2))             
      //.attr("y", 0 - (margin.top / 4))
      //.attr("text-anchor", "middle")  
      //.style("font-size", "20px") 
      //.style("font-weight", "bold") 
      //.style('fill', '#DDDDC9') 
      //.text(function (d) {
      //  return (d.team + " wins and roster continuity")
      //})
    
    var yAxis = d3.axisLeft(yPositionScale)
      .tickSize(0)
      .ticks(4)
    svg.append("g")
      .attr("class", "axis y-axis")
      .attr("transform", "translate(-20,0)")
      .style('stroke', '#DDDDC9')
      .style("font-size", "14px")
      .call(yAxis)

    var xAxis = d3.axisBottom(xPositionScale)
      .tickSize(0)
    svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + height + ")")
      .style('stroke', '#DDDDC9')
      .style("font-size", "14px")
      .call(xAxis)
      


    // Always cut and paste the code for the axes!


  }

})()