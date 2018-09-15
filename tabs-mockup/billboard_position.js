(function () {

  var margin = { top: 20, right: 40, bottom: 40, left: 210 }

  var width = 1320 - margin.left - margin.right,
      height = 1300 - margin.top - margin.bottom

  var ypadding = -10
  var xpadding = 10

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong class='super-font'>" + d.title + "</strong>" + "<span class='super-font'>" + "<br>" + "&mdash;&mdash;&mdash;&mdash;" + "<br> Peak Chart Position: " + d.peak_rank + "<br>" + "&mdash;&mdash;&mdash;&mdash;" + "<br>Tab Views: " + d.tab_hits + "</span>"
    })

  var svg = d3.select("#chart1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  svg.call(tip)

  billboard_titles = ['Hey Jude', 'Come Together', 'I Want To Hold Your Hand', 'She Loves You', 'Let It Be', 'Love Me Do', 'Get Back', 'We Can Work It Out', 'Yesterday', 'All You Need Is Love', 'Ticket To Ride', 'I Feel Fine', 'Hello Goodbye', 'Eight Days A Week', 'Penny Lane', 'The Long And Winding Road', 'Paperback Writer', 'For You Blue', 'Twist And Shout', 'Do You Want To Know A Secret', 'Yellow Submarine', 'Please Please Me', 'Nowhere Man', 'Something', 'Lady Madonna', 'Day Tripper', 'Free As A Bird', 'Got To Get You Into My Life', 'Strawberry Fields Forever', 'The Ballad Of John And Yoko', 'Eleanor Rigby', 'Real Love', 'Revolution', 'And I Love Her', 'I Saw Her Standing There', 'Matchbox', 'Rain', 'Slow Down', 'Thank You Girl', 'From Me To You', 'All My Loving', 'Yes It Is', 'Act Naturally', 'If I Fell', 'I Should Have Known Better', 'I Am The Walrus', 'Roll Over Beethoven', 'With A Little Help From My Friends', 'What Goes On', 'Why', 'The Inner Light']
  tab_titles = ['Let It Be', 'Yesterday', 'Hey Jude', 'If I Fell', 'Come Together', 'All My Loving', 'Something', 'I Want To Hold Your Hand', 'Twist And Shout', 'Get Back', 'And I Love Her', 'Day Tripper', 'All You Need Is Love', 'Strawberry Fields Forever', 'I Saw Her Standing There', 'With A Little Help From My Friends', 'Yellow Submarine', 'Eight Days A Week', 'Revolution', 'Ticket To Ride', 'Love Me Do', 'She Loves You', 'Eleanor Rigby', 'I Feel Fine', 'Nowhere Man', 'I Am The Walrus', 'From Me To You', 'Hello Goodbye', 'Do You Want To Know A Secret', 'Penny Lane', 'We Can Work It Out', 'Please Please Me', 'Lady Madonna', 'I Should Have Known Better', 'The Long And Winding Road', 'Real Love', 'Paperback Writer', 'Free As A Bird', 'Act Naturally', 'Rain', 'Got To Get You Into My Life', 'Roll Over Beethoven', 'Yes It Is', 'The Ballad Of John And Yoko', 'For You Blue', 'What Goes On', 'Slow Down', 'Thank You Girl', 'Matchbox', 'The Inner Light', 'Why']
  
  var xPositionScale = d3.scaleLinear()
    .domain([0,100])
    .range([0,width])

  var widthScale = d3.scaleLinear()
    .domain([0,17193034])
    .range([0,width])

  var yPositionScaleBillboard = d3.scalePoint()
    .domain(billboard_titles)
    .range([0, height])

  var yPositionScaleTab = d3.scalePoint()
    .domain(tab_titles)
    .range([0, height])

  var colorScale = d3.scaleLinear()
    .domain([1,47])
    .range(['#EB5852', '#f3d69b'])


  // Read in some external data. When we're done, run the function 'ready'

  d3.queue()
    .defer(d3.csv, 'beatles_d3_billboards.csv')
    .await(ready)

  // This is 'ready':
  // it receives an error (if there is one)
  // and datapoints, our newly-read-in data
  function ready(error, datapoints) {
    console.log("Data is", datapoints)
    // d3 code goes here

    var songs = svg.selectAll('rect')
      .data(datapoints)
      .enter().append('rect')
      .attr('height', 20)
      .attr('width', width - 100)
      .attr('fill', '#111111')
      .attr('r', 5)
      .attr('x', 2)
      .attr('y', function (d) {
        return yPositionScaleBillboard(d.title) - 16
      })
      .attr('opacity', .8)
      .attr('fill', function (d) {
        return colorScale(d.peak_rank)
      })
      .on('mouseover', function(d, i) {
        var currentState = this
          d3.select(this).style('opacity', 1);
          tip.show(d)
      })
      .on('mouseout', function(d, i) {
        var currentState = this
          d3.select(this).style('opacity', .8);
          tip.hide(d)
      })
    
    // var more_info = svg.selectAll('text')
    //   .data(datapoints)
    //   .enter().append('text')
    //   .attr('x', width-240)
    //   .attr('y', function (d) {
    //     return yPositionScaleBillboard(d.title)
    //   })
    //   .text(function(d) {
    //   return  "Peak chart position: #" +  d.peak_rank 
    // })
    //   .attr('stroke', '#111111')


    var yAxisBillboard = d3.axisLeft(yPositionScaleBillboard)
      .tickSize(0)
      //.ticks(6)
    song_labels = svg.append("g")
      .attr("class", "axis y-axis")
      .style('stroke', '#DDDDC9')
      .style("font-weight", "light")  
      .style("font-size", "14px")
      .call(yAxisBillboard)

    svg.selectAll(".y-axis text")
     .attr("transform", "translate(" + ypadding + ",-6)")

    var yAxisTab = d3.axisLeft(yPositionScaleTab)
      .tickSize(0)
      //.ticks(6)



    // var xAxis = d3.axisBottom(xPositionScale)
    //   .tickSize(0)
    //   .ticks(5)
    // svg.append("g")
    //   .attr("class", "axis x-axis")
    //   .attr("transform", "translate(0," + height + ")")
    //   .style('stroke', '#DDDDC9')
    //   .style("font-weight", "light")  
    //   .style("font-size", "14px")
    //   .call(xAxis)

    // svg.selectAll(".x-axis text")
    //   .attr("transform", "translate(0," + xpadding + ")")

    // Always cut and paste the code for the axes!

      var steps = [
  step0,
  step1
]

var currentStep = 0

d3.select("html").on("keyup", function() {
  console.log(d3.event.code)
  if(d3.event.code === "Space" || d3.event.code === "ArrowRight") {
    currentStep = (currentStep + 1) % 2
    steps[currentStep].apply()
  }
  if(d3.event.code === "ArrowLeft") {
    currentStep = currentStep < 1 ? 2 : currentStep - 1
    steps[currentStep].apply()
  }
})

function makeTranslate(x, y) {
  return "translate(" + x + " " + y + ")"
}

function step0() {

  songs.transition()
    .duration(1000)
    .attr("y", function (d) {
        return yPositionScaleBillboard(d.title) - 16
      })
    .attr('width', width - 100)

  // more_info.transition()
  //   .duration(1000)
  //   .attr("y", function (d) {
  //       return yPositionScaleBillboard(d.title)
  //     })
  //   .text(function(d) {
  //     return  "Peak chart position: " +  d.peak_rank + " for " + d.weeks_on_chart + " weeks"
  //   })
  //   .attr('x', width-300)

  song_labels.transition()
    .duration(1500)
    .call(yAxisBillboard)

}

function step1() {
  
  songs.transition()
    .duration(1000)
    .attr("y", function (d) {
        return yPositionScaleTab(d.title) - 16
      })
    .attr('width', function (d){
      return widthScale(d.tab_hits)
    })

  // more_info.transition()
  //   .duration(1000)
  //   .attr("y", function (d) {
  //       return yPositionScaleTab(d.title)
  //     })
  //   .attr('x', 10)
  //   .text(function(d) {
  //     return  
  //   })

  song_labels.transition()
    .duration(1500)
    .call(yAxisTab)
}



  }

})()