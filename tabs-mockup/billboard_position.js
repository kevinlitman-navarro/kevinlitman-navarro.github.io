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
      return "<strong class='super-font'>" + d.title + "</strong>" + "<span class='super-font'>" + "<br>" + "&mdash;&mdash;&mdash;&mdash;" + "<br> Peak Chart Position: " + d.tip_peak_rank + "<br>" + "&mdash;&mdash;&mdash;&mdash;" + "<br>Tab Views: " + d.hits + "</span>"
    })

  var svg = d3.select("#chart1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  svg.call(tip)

  billboard_titles = ['Hey Jude', 'Come Together', 'I Want To Hold Your Hand', 'She Loves You', 'Let It Be', 'Love Me Do', 'Get Back', 'Yesterday', 'All You Need Is Love', 'Ticket To Ride', 'I Feel Fine', 'Eight Days A Week', 'Twist And Shout', 'Yellow Submarine', 'Nowhere Man', 'Something', 'Day Tripper', 'Strawberry Fields Forever', 'Eleanor Rigby', 'Revolution', 'And I Love Her', 'I Saw Her Standing There', 'All My Loving', 'If I Fell', 'I Am The Walrus', 'With A Little Help From My Friends', 'Blackbird', 'While My Guitar Gently Weeps', 'Here Comes The Sun', 'In My Life', 'Help', 'Across The Universe', 'Michelle', 'A Day In The Life', 'Norwegian Wood', 'Girl', 'Dont Let Me Down', 'Youve Got To Hide Your Love Away', 'A Hard Days Night', 'Ive Just Seen A Face', 'Lucy In The Sky With Diamonds', 'I Will', 'Oh Darling', 'Cant Buy Me Love', 'Till There Was You', 'Dear Prudence', 'Sgt Peppers Lonely Hearts Club Band', 'Here There And Everywhere', 'Helter Skelter', 'Ob-La-Di Ob-La-Da']
  tab_titles = ['Let It Be', 'Yesterday', 'Hey Jude', 'Blackbird', 'If I Fell', 'While My Guitar Gently Weeps', 'Here Comes The Sun', 'Come Together', 'All My Loving', 'In My Life', 'Something', 'I Want To Hold Your Hand', 'Help', 'Twist And Shout', 'Get Back', 'Across The Universe', 'Michelle', 'And I Love Her', 'A Day In The Life', 'Day Tripper', 'Norwegian Wood', 'Girl', 'Dont Let Me Down', 'All You Need Is Love', 'Youve Got To Hide Your Love Away', 'Strawberry Fields Forever', 'A Hard Days Night', 'I Saw Her Standing There', 'Ive Just Seen A Face', 'Lucy In The Sky With Diamonds', 'With A Little Help From My Friends', 'I Will', 'Oh Darling', 'Yellow Submarine', 'Eight Days A Week', 'Revolution', 'Ticket To Ride', 'Love Me Do', 'Cant Buy Me Love', 'Till There Was You', 'She Loves You', 'Eleanor Rigby', 'I Feel Fine', 'Dear Prudence', 'Sgt Peppers Lonely Hearts Club Band', 'Nowhere Man', 'I Am The Walrus', 'Here There And Everywhere', 'Helter Skelter', 'Ob-La-Di Ob-La-Da']
  
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
    .domain([1,100])
    .range(['#EB5852', '#f3d69b'])


  // Read in some external data. When we're done, run the function 'ready'

  d3.queue()
    .defer(d3.csv, 'beatles-d3-billboards-50-most-hits.csv')
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
      return widthScale(d.hits)
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