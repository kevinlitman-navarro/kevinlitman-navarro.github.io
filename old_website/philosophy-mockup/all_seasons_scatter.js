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
      return "<strong style='color:" + colorScale(d.dictionary_definition_tag) + "'>"  + d.title + "</strong>"
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
    .domain([141, 742])
    .range([7,70])

  var colorScale = d3.scaleOrdinal()
    .domain(['None','Knowledge','Reality','Existence'])
    .range(['#DCCCC9', '#D1A72A', '#EB5852', '#52BBB7'])



  // Read in some external data. When we're done, run the function 'ready'

  d3.queue()
    .defer(d3.csv, 'github-friendly-coordinates.csv')
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
      .enter().append('g')
      .attr('id','entry')
      .attr('x', function (d) {
        return xPositionScale(d.x_coord)
      })
      .attr('y', function (d) {
        return yPositionScale(d.y_coord)
      })
      //.attr("transform", function(d) { return "translate(" + xPositionScale(d.x_coord) + "," + yPositionScale(d.y_coord) + ")"})

    var entryLinks = entries.append('a')
      .attr("xlink:href", function(d) { return d.url})
      .attr('target', '_blank')
      

   var entryCircles = entryLinks.append('circle')
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
//       .on('click', function() {
        

//         d3.select(this)
//           .transition()
//           .duration(1000)
//           .attr('opacity',1)
//           .attr('z-index', 100)
//           .attr("r", 200);


//         d3.select(this.parentNode)
//           .append('text')
//           .attr('font-size', 14)
//           .attr('x', function (d) {
//               return xPositionScale(d.x_coord) - 200
//             })
//           .attr('y', function (d) {
//               return yPositionScale(d.y_coord)
//             })
//           .attr("dy", ".35em")
//           .attr('z-index', 101)
//           .text(function(d){ return d.abstract.slice(0,100)});
// })

      var existenceSize=d3.selectAll("#nameExistence").size()
      var knowledgeSize=d3.selectAll("#nameKnowledge").size()
      var noneSize=d3.selectAll("#nameNone").size()
      var realitySize=d3.selectAll("#nameReality").size()

      console.log(existenceSize)
      console.log(noneSize)
      console.log(knowledgeSize)
      console.log(realitySize)



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
  step12,
  step13
]

var currentStep = 0

var gs = d3.graphScroll()
      .graph(d3.selectAll('#graph'))
      .container(d3.select('#container'))
      .sections(d3.selectAll('#sections > div'))
      .offset(400)
      .on('active', function(i){
    currentStep = (i) % 14
    steps[currentStep].apply()})    

function step0() {

  entryCircles.transition()
    .duration(1000)
    .attr("fill", '#DCCCC9')
    .attr('r', 4)

}

function step1() {

  entryCircles.transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('.Aristotle ')
    .transition()
    .duration(1000)
    .attr('r', 8)
    .attr("fill", '#DCCCC9')
    .attr('stroke-width', 1)

  d3.selectAll('text')
    .transition()
    .attr('font-size', 0)
    .duration(1000)
    .remove()
 
}

function step2() {

  entryCircles.transition()
    .duration(1000)
    .attr('r', 0)


  d3.selectAll('.Feminism')
    .transition()
    .duration(1000)
    .attr('r', 8)
    .attr("fill", '#DCCCC9')
    .text('ooh yeah')
    

  d3.selectAll('.Feminist')
    .transition()
    .duration(1000)
    .attr('r', 8)
    .attr("fill", '#DCCCC9')

  
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
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })

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

}

function step5() {

  entryCircles.transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('.Sartre')
    .transition()
    .attr('r', 8)
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })
    .duration(1000)
    

  d3.selectAll('.Camus')
    .transition()
    .attr('r', 8)
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })
    .duration(1000)
    

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
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })

  d3.selectAll('#nameReality')
    .transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('#nameNone')
    .transition()
    .duration(1000)
    .attr('r', 0)

}

function step7() {

  entryCircles.transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('.Certainty')
    .filter('#nameKnowledge')
    .transition()
    .attr('r', 8)
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })
    .duration(1000)

  d3.selectAll('.Self-Deception')
    .filter('#nameKnowledge')
    .transition()
    .attr('r', 8)
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })
    .duration(1000)

  d3.selectAll('.The.Analysis.Of.Knowledge')
    .filter('#nameKnowledge')
    .transition()
    .attr('r', 8)
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })
    .duration(1000)


}

function step8() {

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
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })

  d3.selectAll('#nameNone')
    .transition()
    .duration(1000)
    .attr('r', 0)

}

function step9() {

  entryCircles.transition()
    .duration(1000)
    .attr('r', 0)

  d3.selectAll('.Time.Travel')
    .filter('#nameReality')
    .transition()
    .attr('r', 8)
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })
    .duration(1000)

  d3.selectAll('.Consciousness')
    .filter('#nameReality')
    .transition()
    .attr('r', 8)
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })
    .duration(1000)

  d3.selectAll('.The.Uncertainty.Principle')
    .filter('#nameReality')
    .transition()
    .attr('r', 8)
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })
    .duration(1000)


}

function step10() {

  entryCircles.transition()
      .duration(1000)
      .attr('r', 0)
      // .attr('cy', function (d) {
      //     return yPositionScale(d.y_coord)
      //   })
      // .attr('cx', function (d) {
      //     return xPositionScale(d.x_coord)
      //   })

 // d3.selectAll('#nameExistence')
 //    .transition()
 //    .duration(1000)
 //    .attr('r', 0)
 //    .attr('cy', function (d) {
 //        return yPositionScale(d.y_coord)
 //      })
 //    .attr('cx', function (d) {
 //        return xPositionScale(d.x_coord)
 //      })

 //  d3.selectAll('#nameKnowledge')
 //    .transition()
 //    .duration(1000)
 //    .attr('r', 0)
 //    .attr('cy', function (d) {
 //        return yPositionScale(d.y_coord)
 //      })
 //    .attr('cx', function (d) {
 //        return xPositionScale(d.x_coord)
 //      })

  d3.selectAll('#nameNone')
    .transition()
    .duration(1000)
    .attr('r', 4)
    .attr('cy', function (d) {
        return yPositionScale(d.y_coord)
      })
    .attr('cx', function (d) {
        return xPositionScale(d.x_coord)
      })

}

function step11() {

   d3.selectAll('text')
    .transition()
    .duration(1000)
    .attr('font-size', 0)
    .remove()

  entryCircles.transition()
    .duration(1000)
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })
    .attr('r', 0)
    .attr('cy', function (d) {
        return yPositionScale(d.y_coord)
      })
    .attr('cx', function (d) {
        return xPositionScale(d.x_coord)
      })


  d3.selectAll('.Personal.Identity')
    .filter('#nameNone')
    .transition()
    .duration(1000)
    .attr('r', 8)
    .attr('cy', function (d) {
        return yPositionScale(d.y_coord)
      })
    .attr('cx', function (d) {
        return xPositionScale(d.x_coord)
      })
    

  d3.selectAll('.Law')
    .filter('#nameNone')
    .transition()
    .duration(1000)
    .attr('r', 8)
    .attr('cy', function (d) {
        return yPositionScale(d.y_coord)
      })
    .attr('cx', function (d) {
        return xPositionScale(d.x_coord)
      })
    

  d3.selectAll('.Political')
    .filter('#nameNone')
    .transition()
    .duration(1000)
    .attr('r', 8)
    .attr('cy', function (d) {
        return yPositionScale(d.y_coord)
      })
    .attr('cx', function (d) {
        return xPositionScale(d.x_coord)
      })
    


}

function step12() {

  entryCircles.transition()
    .duration(1700)
    .attr('r', 4)
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })

  d3.selectAll('#nameExistence')
    .transition()
    .duration(1700)
    .attr('cx',width*.6)
    .attr('cy',height/2)
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })
    .attr('opacity',1)
    .attr('r', function (d) {
      return radiusScale(existenceSize)
    })
    .filter(function (d) {
      return d.title != 'Albert Camus'
    })
      .attr('r',0)

  d3.selectAll('#nameKnowledge')
    .transition()
    .duration(1700)
    .attr('cx',width*.4)
    .attr('cy',height/2)
    .attr('opacity',1)
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })
    .attr('r', function (d) {
      return radiusScale(knowledgeSize)
    })
    .filter(function (d) {
      return d.title != 'Certainty'
    })
      .attr('r',0)

  d3.selectAll('#nameReality')
    .transition()
    .duration(1700)
    .attr('cx',width*.8)
    .attr('cy',height/2)
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })
    .attr('opacity',1)
    .attr('r', function (d) {
      return radiusScale(realitySize)
    })
    .filter(function (d) {
      return d.title != 'Consciousness'
    })
      .attr('r',0)


  d3.selectAll('#nameNone')
    .transition()
    .duration(1700)
    .attr('cx',width*.2)
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })
    .attr('opacity',1)
    .attr('cy',height/2)
    .attr('r', function (d) {
      return radiusScale(noneSize)
    })
    .filter(function (d) {
      return d.title != 'Feminist Political Philosophy'
    })
      .attr('r',0)

}

function step13() {

  d3.selectAll('circle')
    .transition()
    .duration(1700)
    .attr('r',4)

  entryCircles.transition()
    .duration(1700)
    .attr('r', 4)
    .attr("fill", function (d) {
        return colorScale(d.dictionary_definition_tag)
      })
    .attr('cy', function (d) {
        return yPositionScale(d.y_coord)
      })
    .attr('cx', function (d) {
        return xPositionScale(d.x_coord)
      })
}

      
      



  }

})()