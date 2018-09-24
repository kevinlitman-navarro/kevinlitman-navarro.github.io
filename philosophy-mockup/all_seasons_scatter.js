(function () {

  var margin = { top: 20, right: 40, bottom: 40, left: 40 }

  var width = 1000 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom

  var ypadding = -10
  var xpadding = 10

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<font style='color:" + colorScale(d.dictionary_definition_tag) + "'>"  + "<strong>" + d.title + "</strong>" + "</font>"
    })

  var svg = d3.select("#graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  svg.call(tip)

  var xPositionScale = d3.scaleLinear()
    .domain([0.3,1])
    .range([0,width])

  var yPositionScale = d3.scaleLinear()
    .domain([0,1])
    .range([height,0])

  var radiusScale = d3.scaleSqrt()
    .domain([1952, 2017])
    .range([1,5])

  var colorScale = d3.scaleOrdinal()
    .domain(['None','Knowledge','Reality','Existence'])
    .range(['#DCCCC9', '#D1A72A', '#EB5852', '#52BBB7'])



  // Read in some external data. When we're done, run the function 'ready'

  d3.queue()
    .defer(d3.csv, 'coordinates-with-all-info.csv')
    .defer(d3.csv, 'connection_lines_coordinates.csv')
    .await(ready)

  // This is 'ready':
  // it receives an error (if there is one)
  // and datapoints, our newly-read-in data
  function ready(error, datapoints, connections) {
    console.log("Data is", datapoints, connections)
    // d3 code goes here

    var entries = svg.selectAll('g')
      .data(datapoints)
      .enter()
      .append('g')
      //.attr("transform", function(d) { return "translate(" + xPositionScale(d.x_coord) + "," + yPositionScale(d.y_coord) + ")"})

   var entryCircles = entries.append('circle')
      .attr('r', 4)
      .attr('cx', function (d) {
        return xPositionScale(d.x_coord)
      })
      .attr('cy', function (d) {
        return yPositionScale(d.y_coord)
      })
      //.attr('r', function (d) {
       // return radiusScale(d.season)
      //})
      .attr('fill', '#DCCCC9')
      .attr('opacity', .7)
      .attr('id', function(d){ return 'name' + d.dictionary_definition_tag })
      .attr('class', function(d){ return d.title})
      .attr('z-index', -1)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .on('click', function() {
        

        d3.select(this)
          .transition()
          .duration(1000)
          .attr('opacity',1)
          .attr('z-index', 100)
          .attr("r", 200);

        d3.select(this.parentNode)
          .append('text')
          .attr('font-size', 14)
          .attr('x', function (d) {
              return xPositionScale(d.x_coord) - 200
            })
          .attr('y', function (d) {
              return yPositionScale(d.y_coord)
            })
          .attr("dy", ".35em")
          .attr('z-index', 101)
          .text(function(d){ return d.abstract.slice(0,100)});
})



    // connectionLines = svg.selectAll('line')
    //   .data(connections)
    //   .enter()
    //   .append('line')
    //   .attr('class', function(d){ return d.primary_article})
    //   .attr('stroke','#DCCCC9')
    //   .attr("stroke-width",1)
    //   .attr('opacity',.05)
    //   .attr('x1', function(d) { return xPositionScale(d.start_x) })
    //   .attr('y1', function(d) { return yPositionScale(d.start_y) })
    //   .attr('x2', function(d) { return xPositionScale(d.finish_x) })
    //   .attr('y2', function(d) { return yPositionScale(d.finish_y) })
      
  

    //svg.append('text')
    // .data(datapoints)
    //  .attr("x", (width / 2))             
    //  .attr("y", 0 - (margin.top / 4))
    //  .attr("text-anchor", "middle")  
    //  .style("font-size", "20px") 
    //  .style("font-weight", "bold")  
    //  .style('fill', '#DDDDC9')
    //  .text("How team roster continuity is related to wins")

    // var yAxis = d3.axisLeft(yPositionScale)
    //   .tickSize(0)
    //   .ticks(6)
    // svg.append("g")
    //   .attr("class", "axis y-axis")
    //   .style('stroke', '#DDDDC9')
    //   .style("font-weight", "light")  
    //   .style("font-size", "14px")
    //   .call(yAxis)

    // svg.selectAll(".y-axis text")
    //  .attr("transform", "translate(" + ypadding + ",0)")


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
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
  step7,
  step8,
  step9,
  step10,
  step11,
  step12
]

var currentStep = 0

var gs = d3.graphScroll()
      .graph(d3.selectAll('#graph'))
      .container(d3.select('#container'))
      .sections(d3.selectAll('#sections > div'))
      .offset(400)
      .on('active', function(i){
    currentStep = (i) % 13
    steps[currentStep].apply()})    

function step0() {

  entryCircles.transition()
    .duration(1000)
    .attr("fill", '#DCCCC9')
    .attr('r', 4)

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()

  // more_info.transition()
  //   .duration(1000)
  //   .attr("y", function (d) {
  //       return yPositionScaleBillboard(d.title)
  //     })
  //   .text(function(d) {
  //     return  "Peak chart position: " +  d.peak_rank + " for " + d.weeks_on_chart + " weeks"
  //   })
  //   .attr('x', width-300)

  
}

function step1() {

  entryCircles.transition()
    .duration(1000)
    .attr('r', 0)

  // connectionLines.transition()
  //   .duration(1000)
  //   .attr('stroke-width', 0)

  d3.selectAll('.Aristotle ')
    .transition()
    .duration(1000)
    .attr('r', 8)
    .attr('stroke-width', 1)

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()

  // entries.filter(function(d) { return d.class ='Plato'})
  //   .transition()
  //   .duration(1000)
  //   .attr('r', 8)

  // more_info.transition()
  //   .duration(1000)
  //   .attr("y", function (d) {
  //       return yPositionScaleBillboard(d.title)
  //     })
  //   .text(function(d) {
  //     return  "Peak chart position: " +  d.peak_rank + " for " + d.weeks_on_chart + " weeks"
  //   })
  //   .attr('x', width-300)

  
}

function step2() {

  entryCircles.transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()

  d3.selectAll('.Feminism')
    .transition()
    .duration(1000)
    .attr('r', 8)
    .text('ooh yeah')
    

  d3.selectAll('.Feminist')
    .transition()
    .duration(1000)
    .attr('r', 8)

  // entries.filter(function(d) { return d.class ='Plato'})
  //   .transition()
  //   .duration(1000)
  //   .attr('r', 8)

  // more_info.transition()
  //   .duration(1000)
  //   .attr("y", function (d) {
  //       return yPositionScaleBillboard(d.title)
  //     })
  //   .text(function(d) {
  //     return  "Peak chart position: " +  d.peak_rank + " for " + d.weeks_on_chart + " weeks"
  //   })
  //   .attr('x', width-300)

  
}

function step3() {

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()

  entryCircles.transition()
    .duration(1000)
    .attr('r', 4)
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()

  // more_info.transition()
  //   .duration(1000)
  //   .attr("y", function (d) {
  //       return yPositionScaleBillboard(d.title)
  //     })
  //   .text(function(d) {
  //     return  "Peak chart position: " +  d.peak_rank + " for " + d.weeks_on_chart + " weeks"
  //   })
  //   .attr('x', width-300)

  
}

function step4() {

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()

  d3.selectAll('#nameExistence')
    .transition()
    .duration(1000)
    .attr('r', 4)

  d3.selectAll('#nameKnowledge')
    .transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('#nameReality')
    .transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('#nameNone')
    .transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()

  // more_info.transition()
  //   .duration(1000)
  //   .attr("y", function (d) {
  //       return yPositionScaleTab(d.title)
  //     })
  //   .attr('x', 10)
  //   .text(function(d) {
  //     return  
  //   })

}

function step5() {

  entryCircles.transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('.Sartre')
    .transition()
    .attr('r', 8)
    .duration(1000)
    

  d3.selectAll('.Camus')
    .transition()
    .attr('r', 8)
    .duration(1000)

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()
    
  

  // more_info.transition()
  //   .duration(1000)
  //   .attr("y", function (d) {
  //       return yPositionScaleTab(d.title)
  //     })
  //   .attr('x', 10)
  //   .text(function(d) {
  //     return  
  //   })

}

function step6() {

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()
  
   d3.selectAll('#nameExistence')
    .transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('#nameKnowledge')
    .transition()
    .duration(1000)
    .attr('r', 4)

  d3.selectAll('#nameReality')
    .transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('#nameNone')
    .transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()

}

function step7() {

  entryCircles.transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('.Certainty')
    .filter('#nameKnowledge')
    .transition()
    .attr('r', 8)
    .duration(1000)

  d3.selectAll('.Self-Deception')
    .filter('#nameKnowledge')
    .transition()
    .attr('r', 8)
    .duration(1000)

  d3.selectAll('.The.Analysis.Of.Knowledge')
    .filter('#nameKnowledge')
    .transition()
    .attr('r', 8)
    .duration(1000)

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()


}

function step8() {

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()

 d3.selectAll('#nameExistence')
    .transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('#nameKnowledge')
    .transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('#nameReality')
    .transition()
    .duration(1000)
    .attr('r', 4)

  d3.selectAll('#nameNone')
    .transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()

}

function step9() {

  entryCircles.transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('.Time.Travel')
    .filter('#nameReality')
    .transition()
    .attr('r', 8)
    .duration(1000)

  d3.selectAll('.Consciousness')
    .filter('#nameReality')
    .transition()
    .attr('r', 8)
    .duration(1000)

  d3.selectAll('.The.Uncertainty.Principle')
    .filter('#nameReality')
    .transition()
    .attr('r', 8)
    .duration(1000)

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()


}

function step10() {

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()

 d3.selectAll('#nameExistence')
    .transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('#nameKnowledge')
    .transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('#nameReality')
    .transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('#nameNone')
    .transition()
    .duration(1000)
    .attr('r', 4)

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()

}

function step11() {

   d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()

  entryCircles.transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('.Personal.Identity')
    .filter('#nameNone')
    .transition()
    .attr('r', 8)
    .duration(1000)

  d3.selectAll('.Law')
    .filter('#nameNone')
    .transition()
    .attr('r', 8)
    .duration(1000)

  d3.selectAll('.Political')
    .filter('#nameNone')
    .transition()
    .attr('r', 8)
    .duration(1000)


}

function step12() {

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()

  entryCircles.transition()
    .duration(1000)
    .attr('r', 4)
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()

}

      
      



  }

})()