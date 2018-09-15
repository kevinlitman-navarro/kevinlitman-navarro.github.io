(function () {


 var margin = { top: 20, right: 40, bottom: 40, left: 40 }

  var width = 1350 - margin.left - margin.right,
      height = 750 - margin.top - margin.bottom

  var ypadding = -10
  var xpadding = 10

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong class='super-font'>" + d.song_name + "</strong>" + "<span class='super-font'>" + "<br>" + "&mdash;&mdash;&mdash;&mdash;" + "<br>" + d.artist_name + "<br>" + "&mdash;&mdash;&mdash;&mdash;" + "<br>Number of Tabs: " + d.tab_count + "</span>"
    })



var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

svg.call(tip)

var band_names = ['The Beatles', 'Green Day', 'Red Hot Chili Peppers', 'Blink-182', 'Radiohead', 'Pink Floyd', 'Taylor Swift', 'Fall Out Boy', 'My Chemical Romance', 'Ed Sheeran', 'Death Cab for Cutie']

var format = d3.format(",d")

var colorScale = d3.scaleOrdinal()
  .domain(band_names)
  .range(['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99'])

var xPositionScale = d3.scalePoint()
    .domain(band_names)
    .range([0,width])

var yPositionScale = d3.scalePoint()
    .domain(band_names)
    .range([50,height])

var radiusScale = d3.scaleSqrt()
    .domain([724, 4574])
    .range([5,42])

var pack = d3.pack()
    .size([width, height])
    .padding(1.5)

 d3.queue()
    .defer(d3.csv, 'song_counts.csv')
    .defer(d3.csv, 'artist_tab_count.csv')
    .await(ready)

  // This is 'ready':
  // it receives an error (if there is one)
  // and datapoints, our newly-read-in data
  function ready(error, datapoints, artist_tab_count) {
    console.log("Data is", datapoints, artist_tab_count)

// d3.csv("song_counts.csv", function(d) {
//   d.tab_count = +d.tab_count
//   if (d.tab_count) return d
// }, function(error, classes) {
//   if (error) throw error

  var root = d3.hierarchy({children: datapoints})
      .sum(function(d) { return d.tab_count; })
      .each(function(d) {
        if (song_name = d.data.song_name) {
          var song_name, i = song_name.lastIndexOf(".")
          d.song_name = song_name
          d.package = song_name.slice(0, i)
          d.class = song_name.slice(i + 1)
        }
      })
      .each(function(d) {
        if (artist_name = d.data.artist_name) {
          var artist_name, i = artist_name.lastIndexOf(".")
          d.artist_name = artist_name
          d.package = artist_name.slice(0, i)
          d.class = artist_name.slice(i + 1)
        }
      })
      .each(function(d) {
        if (tab_count = d.data.tab_count) {
          var tab_count, i = tab_count.lastIndexOf(".")
          d.tab_count = tab_count
          d.package = tab_count.slice(0, i)
          d.class = tab_count.slice(i + 1)
        }
      })

 var artist_tab_circles = svg.selectAll('circle')
      .data(artist_tab_count)
      .enter().append('circle')
      .attr('fill', function (d) {
        return colorScale(d.artist_name)
      })
      .attr('r', function (d) {
        return radiusScale(d.tab_count)
      })
      .attr('cx', function (d) {
        return xPositionScale(d.artist_name)
      })
      .attr('cy', 100)
      .attr('opacity', 1)
      .text(function(d) {
        return d.artist_name
      })

  var band_labels = svg.selectAll('text')
    .data(artist_tab_count)
    .enter().append('text')
    .attr('x', function (d) {
        return xPositionScale(d.artist_name)
      })
    .attr('y', 40)
    .attr('stroke', '#DCCCC9')
    .attr('text-anchor', 'middle')
    .attr('font-size', 14)
    .text(function(d) {
      return  d.artist_name
    })



  var node = svg.selectAll(".node")
    .data(pack(root).leaves())
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

  var circles = node.append("circle")
      .attr("id", function(d) { return d.song_name; })
      .attr("r", 0)
      .style("fill", function(d) { 
        return colorScale(d.artist_name); 
      })
      .attr('opacity', .7)
      .on('mouseover', function(d, i) {
        var currentState = this
          d3.select(this).style('opacity', 1);
          tip.show(d)
      })
      .on('mouseout', function(d, i) {
        var currentState = this
        d3.select(this).style('opacity', .7);
        tip.hide(d)
      })


  var steps = [
  step0,
]

var currentStep = 0

d3.select("body").on("keyup", function() {
  console.log(d3.event.code)
  if(d3.event.code === "Enter") {
    currentStep = (currentStep + 1) % 1
    steps[currentStep].apply()
  }
})

function step0() {

  artist_tab_circles.transition()
    .attr('cy', function(d) {
      return yPositionScale(d.artist_name)
    })
    .attr('cx', 100)
    .duration(2000)

  band_labels.transition()
    .duration(2000)
    .attr('y', function(d) {
      return yPositionScale(d.artist_name) + 5
    })
    .attr('x', 220)
    
    

  circles.transition()
    .attr("r", function(d) { 
        return d.r; })
    .duration(2000)
  
}

}

})()