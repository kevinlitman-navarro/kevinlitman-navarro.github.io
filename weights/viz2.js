
  //filtering functions 
  function isYear(row, years) {
  return row.year == years[0] || row.year == years[1] || row.year == years[2] || row.year == years[3]
}
  
  function isIncome(row, incomes) {
  return row['income group'] == incomes[0] || row['income group'] == incomes[1] || row['income group'] == incomes[2]
}

  function isCountry(row, code) {
  return row.code == code
}

  const countryNames = { 
    'AUS':'Australia', 
    'AUT':'Austria', 
    'BEL': 'Belgium',
    'BRA': 'Brazil',  
    'CAN': 'Canada',
    'CHN': 'China',
    'DNK': 'Denmark',
    'FIN': 'Finland',
    'FRA': 'France',
    'DEU': 'Germany',
    'IND': 'India',
    'IRL': 'Ireland',
    'ISR': 'Israel',
    'ITA': 'Italy',
    'JPN':'Japan',
    'NLD':'Netherlands',
    'NOR':'Norway',
    'PRT':'Portugal',
    'RUS':'Russia',
    'SGP':'Singapore',
    'ZAF':'South Africa',
    'ESP':'Spain',
    'SWE':'Sweden',
    'CHE':'Switzerland',
    'ARE':'United Arab Emirates', 
    'GBR':'United Kingdom',
    'USA':'United States of America'
  }



  //naming features
  var conference_publications = ['Number of conference papers Percapita scaled','Count of conference citation scaled',
       'Count of citation references scaled']
  var journal_publications = ['Number of journal papers Percapita scaled','Count of journal references scaled', 'Count of journal citation scaled']
  var innovations_patents = ['Number of patents Percapita scaled','Count of patent citation scaled', 'Count of patent references scaled']
  var research = ['Number of Deep Learning papers Percapita scaled','Revealed Comparative Advantage - Deep Learning Papers scaled']
  var research_and_development = conference_publications.concat(journal_publications).concat(innovations_patents).concat(research)
  var skills = ['Percentile Rank scaled','Share of total enrollment scaled', 'Skill Penetration Index scaled','Number of AI occupational skills scaled']
  var labor = ['Total number of hires on LinkedIn scaled','AI hiring index scaled']
  var investment = ['Total Funding Amount Percapita scaled','Total Number of Startups Percapita scaled']
  var economy = (skills.concat(investment)).concat(labor)
  var gender_diversity = ['Proportion of female AI authors scaled','Proportion of female in AI workplace scaled']
  var inclusion = gender_diversity
  var features = (inclusion.reverse()).concat(economy.reverse()).concat(research_and_development.reverse())

  //taking inputs
  var selected = features
  var years = [2018]
  var incomes = ["High income", "Upper middle income", "Lower middle income"]

  var percentileRankWeight = +document.getElementsByName('percentile-rank-weight')[0].value
  var shareEnrollmentWeight = +document.getElementsByName('share-enrollment-weight')[0].value
  var skillPenetrationWeight = +document.getElementsByName('skill-penetration-weight')[0].value
  var numberOfOccupationsWeight = +document.getElementsByName('number-occupations-weight')[0].value
  var amountFundingWeight = +document.getElementsByName('funding-per-capita-weight')[0].value
  var startupsFundedWeight = +document.getElementsByName('startups-per-capita-weight')[0].value
  var numberOfHiresWeight = +document.getElementsByName('hires-per-capita-weight')[0].value
  var hiringIndexWeight = +document.getElementsByName('hiring-index-weight')[0].value
  var conferencePapersWeight = +document.getElementsByName('conference-papers-per-capita-weight')[0].value
  var conferenceCitationsWeight = +document.getElementsByName('conference-citation-weight')[0].value
  var citationReferencesWeight = +document.getElementsByName('citation-references-weight')[0].value
  var journalPapersWeight = +document.getElementsByName('journal-papers-per-capita-weight')[0].value
  var journalReferencesWeight = +document.getElementsByName('journal-references-weight')[0].value
  var journalCitationsWeight = +document.getElementsByName('journal-citations-weight')[0].value
  var patentsWeight = +document.getElementsByName('patents-per-capita-weight')[0].value
  var patentCitationsWeight = +document.getElementsByName('patent-citations-weight')[0].value
  var patentReferencesWeight = +document.getElementsByName('patents-references-weight')[0].value
  var numberDeepLearningPapersWeight = +document.getElementsByName('deep-learning-papers-per-capita-weight')[0].value
  var comparativeAdvantageDeepLearningPapersWeight = +document.getElementsByName('revealed-comparative-advantage-weight')[0].value
  var proportionFemaleAuthorsWeight = +document.getElementsByName('female-authors-weight')[0].value
  var proportionFemalesWorkplaceWeight = +document.getElementsByName('female-workplace-weight')[0].value

  var economyWeight = +document.getElementsByName('economy-weight')[0].value
  var researchAndDevelopmentWeight = +document.getElementsByName('research-and-development-weight')[0].value
  var inclusionWeight = +document.getElementsByName('inclusion-weight')[0].value

  function updateInputs () {
    //taking inputs
  var selected = features
  var years = [2018]
  var incomes = ["High income", "Upper middle income", "Lower middle income"]

  var percentileRankWeight = +document.getElementsByName('percentile-rank-weight')[0].value
  var shareEnrollmentWeight = +document.getElementsByName('share-enrollment-weight')[0].value
  var skillPenetrationWeight = +document.getElementsByName('skill-penetration-weight')[0].value
  var numberOfOccupationsWeight = +document.getElementsByName('number-occupations-weight')[0].value
  var amountFundingWeight = +document.getElementsByName('funding-per-capita-weight')[0].value
  var startupsFundedWeight = +document.getElementsByName('startups-per-capita-weight')[0].value
  var numberOfHiresWeight = +document.getElementsByName('hires-per-capita-weight')[0].value
  var hiringIndexWeight = +document.getElementsByName('hiring-index-weight')[0].value
  var conferencePapersWeight = +document.getElementsByName('conference-papers-per-capita-weight')[0].value
  var conferenceCitationsWeight = +document.getElementsByName('conference-citation-weight')[0].value
  var citationReferencesWeight = +document.getElementsByName('citation-references-weight')[0].value
  var journalPapersWeight = +document.getElementsByName('journal-papers-per-capita-weight')[0].value
  var journalReferencesWeight = +document.getElementsByName('journal-references-weight')[0].value
  var journalCitationsWeight = +document.getElementsByName('journal-citations-weight')[0].value
  var patentsWeight = +document.getElementsByName('patents-per-capita-weight')[0].value
  var patentCitationsWeight = +document.getElementsByName('patent-citations-weight')[0].value
  var patentReferencesWeight = +document.getElementsByName('patents-references-weight')[0].value
  var numberDeepLearningPapersWeight = +document.getElementsByName('deep-learning-papers-per-capita-weight')[0].value
  var comparativeAdvantageDeepLearningPapersWeight = +document.getElementsByName('revealed-comparative-advantage-weight')[0].value
  var proportionFemaleAuthorsWeight = +document.getElementsByName('female-authors-weight')[0].value
  var proportionFemalesWorkplaceWeight = +document.getElementsByName('female-workplace-weight')[0].value

  var economyWeight = +document.getElementsByName('economy-weight')[0].value
  var researchAndDevelopmentWeight = +document.getElementsByName('research-and-development-weight')[0].value
  var inclusionWeight = +document.getElementsByName('inclusion-weight')[0].value
  }



  //constructing charts
  function buildComparison(rawData) {
    //weights and filters
    var selected = features
  var years = [2018]
  var incomes = ["High income", "Upper middle income", "Lower middle income"]

  var percentileRankWeight = +document.getElementsByName('percentile-rank-weight')[0].value
  var shareEnrollmentWeight = +document.getElementsByName('share-enrollment-weight')[0].value
  var skillPenetrationWeight = +document.getElementsByName('skill-penetration-weight')[0].value
  var numberOfOccupationsWeight = +document.getElementsByName('number-occupations-weight')[0].value
  var amountFundingWeight = +document.getElementsByName('funding-per-capita-weight')[0].value
  var startupsFundedWeight = +document.getElementsByName('startups-per-capita-weight')[0].value
  var numberOfHiresWeight = +document.getElementsByName('hires-per-capita-weight')[0].value
  var hiringIndexWeight = +document.getElementsByName('hiring-index-weight')[0].value
  var conferencePapersWeight = +document.getElementsByName('conference-papers-per-capita-weight')[0].value
  var conferenceCitationsWeight = +document.getElementsByName('conference-citation-weight')[0].value
  var citationReferencesWeight = +document.getElementsByName('citation-references-weight')[0].value
  var journalPapersWeight = +document.getElementsByName('journal-papers-per-capita-weight')[0].value
  var journalReferencesWeight = +document.getElementsByName('journal-references-weight')[0].value
  var journalCitationsWeight = +document.getElementsByName('journal-citations-weight')[0].value
  var patentsWeight = +document.getElementsByName('patents-per-capita-weight')[0].value
  var patentCitationsWeight = +document.getElementsByName('patent-citations-weight')[0].value
  var patentReferencesWeight = +document.getElementsByName('patents-references-weight')[0].value
  var numberDeepLearningPapersWeight = +document.getElementsByName('deep-learning-papers-per-capita-weight')[0].value
  var comparativeAdvantageDeepLearningPapersWeight = +document.getElementsByName('revealed-comparative-advantage-weight')[0].value
  var proportionFemaleAuthorsWeight = +document.getElementsByName('female-authors-weight')[0].value
  var proportionFemalesWorkplaceWeight = +document.getElementsByName('female-workplace-weight')[0].value

  var economyWeight = +document.getElementsByName('economy-weight')[0].value
  var researchAndDevelopmentWeight = +document.getElementsByName('research-and-development-weight')[0].value
  var inclusionWeight = +document.getElementsByName('inclusion-weight')[0].value

  //make svg

  const height = 600 
  const width = 800
  const margin = ({top: 30, right: 10, bottom: 40, left: 60})

  const svg = d3.select('.chart.comparison').append('svg')
          .attr('height',height)
          .attr('width',width)    

  //define the data
  var filteredData = rawData.filter(row => isYear(row,years)).filter(row => isIncome(row,incomes))
  var sortedData = filteredData.sort((a, b) => d3.ascending(a.code,b.code))
  var x
  var y 
  var filteredNodes = []
  for (x of sortedData) {
    var newNode = {}
    newNode['code'] = x['code']
    for (y of selected) {
      newNode[y] = x[y] 
    }
    
   filteredNodes.push(newNode)
  }

  var x
  var y 
  var weightedNodes = []
  for (x of filteredNodes) {
    var newNode = {}
    
    newNode['code'] = x['code']
    for (y of selected) {
      
      if (y == "Percentile Rank scaled") {newNode[y] = x[y]*percentileRankWeight}
      if (y == "Share of total enrollment scaled") {newNode[y] = x[y]*shareEnrollmentWeight}
      if (y == "Skill Penetration Index scaled") {newNode[y] = x[y]*skillPenetrationWeight}
      if (y == "Number of AI occupational skills scaled") {newNode[y] = x[y]*numberOfOccupationsWeight}
      if (y == "Total Funding Amount Percapita scaled") {newNode[y] = x[y]*amountFundingWeight}
      if (y == "Total Number of Startups Percapita scaled") {newNode[y] = x[y]*startupsFundedWeight}
      if (y == "Total number of hires on LinkedIn scaled") {newNode[y] = x[y]*numberOfHiresWeight}
      if (y == "AI hiring index scaled") {newNode[y] = x[y]*hiringIndexWeight}
      if (y == "Number of conference papers Percapita scaled") {newNode[y] = x[y]*conferencePapersWeight}
      if (y == "Count of conference citation scaled") {newNode[y] = x[y]*conferenceCitationsWeight}
      if (y == "Count of citation references scaled") {newNode[y] = x[y]*citationReferencesWeight}
      if (y == "Number of journal papers Percapita scaled") {newNode[y] = x[y]*journalPapersWeight}
      if (y == "Count of journal references scaled") {newNode[y] = x[y]*journalReferencesWeight}
      if (y == "Count of journal citation scaled") {newNode[y] = x[y]*journalCitationsWeight}
      if (y == "Number of patents Percapita scaled") {newNode[y] = x[y]*patentsWeight}
      if (y == "Count of patent citation scaled") {newNode[y] = x[y]*patentCitationsWeight}
      if (y == "Count of patent references scaled") {newNode[y] = x[y]*patentReferencesWeight}
      if (y == "Number of Deep Learning papers Percapita scaled") {newNode[y] = x[y]*numberDeepLearningPapersWeight}
      if (y == "Revealed Comparative Advantage - Deep Learning Papers scaled") {newNode[y] = x[y]*comparativeAdvantageDeepLearningPapersWeight}
      if (y == "Proportion of female AI authors scaled") {newNode[y] = x[y]*proportionFemaleAuthorsWeight}
      if (y == "Proportion of female in AI workplace scaled") {newNode[y] = x[y]*proportionFemalesWorkplaceWeight}
      
    }
    var z
    var economyTotal = 0
    var researchTotal = 0
    var inclusionTotal = 0
    for (z of economy) {
      economyTotal = economyTotal + newNode[z]
    }
    for (z of research_and_development) {
      researchTotal = researchTotal + newNode[z]
    }
    for (z of inclusion) {
      inclusionTotal = inclusionTotal + newNode[z]
    }
    
    var inEconomy = 0
    var inResearch = 0
    var inInclusion = 0
    
    for (z of economy) {
      if (newNode[z] !== 'undefined') {inEconomy = inEconomy + 1}
    }
    for (z of research_and_development) {
      if (newNode[z] !== 'undefined') {inResearch = inResearch + 1}
    }
    for (z of inclusion) {
      if (newNode[z] !== 'undefined') {inInclusion = inInclusion + 1}
    }
    
   var  usedEconomy = false
   var  usedResearch = false
   var  usedInclusion = false
   if (inEconomy > 0) {usedEconomy = true}
   if (inResearch > 0) {usedResearch = true}
   if (inInclusion > 0) {usedInclusion = true}
    
    var pillarsUsed = 0 
    if (usedEconomy == true) {pillarsUsed = pillarsUsed + 1}
    if (usedResearch == true) {pillarsUsed = pillarsUsed + 1}
    if (usedInclusion == true) {pillarsUsed = pillarsUsed + 1}
    
    
    if (usedEconomy == true) {newNode['economy_mean'] = (economyTotal/inEconomy)*economyWeight}
    else {newNode['economy_mean'] = 0}
    if (usedResearch == true) {newNode['research_and_development_mean'] = (researchTotal/inResearch)* researchAndDevelopmentWeight}
    else {newNode['research_mean'] = 0}
    if (usedInclusion == true) {newNode['inclusion_mean'] = (inclusionTotal/inInclusion)*inclusionWeight}
    else {newNode['inclusion_mean'] = 0}
    newNode['weighted_mean'] = (newNode['economy_mean'] + newNode['research_and_development_mean'] + newNode['inclusion_mean']) / (pillarsUsed)
    
    
    newNode['research_and_development_mean_portion'] = newNode['research_and_development_mean'] / pillarsUsed
    newNode['economy_mean_portion'] = newNode['economy_mean'] / pillarsUsed
    newNode['inclusion_mean_portion'] = newNode['inclusion_mean'] / pillarsUsed
    
   weightedNodes.push(newNode)
  }
  

  var series = d3.stack().keys(['research_and_development_mean_portion','economy_mean_portion','inclusion_mean_portion'])(weightedNodes)

  console.log(series)
  
  var x = d3.scaleLinear()
    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
    .range([margin.left, width - margin.right])
  
  var y = d3.scaleBand() 
    .domain(weightedNodes.map(d => d.code))
    .range([0 + margin.top, height - margin.bottom])
    .padding(0.1)

  // var yScale = d3.scaleBand()
  //   .domain(singleCountry.map((d => d.metrics)))
  //   .range([0 + margin.top, height - margin.bottom])
  //   .padding(.05)

  var z = d3.scaleOrdinal()
    .domain(['economy_mean_portion','research_and_development_mean_portion','inclusion_mean_portion'])
    .range(['#2976A6','#38735D','#D98E32'])
  
  var xAxis = g => g
    .attr("transform", `translate(0,${margin.top})`)
    .call(d3.axisTop(x).ticks(width / 100, "s"))
    .call(g => g.selectAll(".domain").remove())
    .style("font", "10px sans-serif")
  
  var yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSizeOuter(0))
    .call(g => g.selectAll(".domain").remove())
    .style("font", "14px sans-serif")
  
  svg.append("g")
    .selectAll("g")
    .data(series)
    .join("g")
      .attr("fill", d => z(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", d => x(d[0]))
      .attr("y", (d, i) => y(d.data.code))
      .attr("width", d => x(d[1]) - x(d[0]))
      .attr("height", y.bandwidth());

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  
}

function buildHeatmap(rawData) {
  //make svg
  const width = 1000
  const height = 700
  const svg = d3.select('.chart.heatmap').append('svg')
          .attr('height',height)
          .attr('width',width)

  
  const margin = ({top: 50, right: 150, bottom: 50, left: 60})
  
  var codes = rawData.map(d => d.code)
  var columns = [...new Set(codes)]
  var rows = selected
  console.log(selected)
  
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      if (d.index_score > 0) {return "<strong class='trend-country-name'>" + countryNames[d.code] + "</strong>" + "<span class='super-font'>" + "<br>" + "&mdash;&mdash;&mdash;&mdash;<br>" + d.metrics  + ": " + (d.index_score*1).toFixed(2) + "</span>"}
      else {return "<strong class='trend-country-name'>" + countryNames[d.code] + "</strong>" + "<span class='super-font'>" + "<br>" + "&mdash;&mdash;&mdash;&mdash;<br>" + d.metrics  + ": No data available</span>"}
    }) 
  
  
  var yScale = d3.scaleBand()
    .domain(columns)
    .range([0 + margin.right, width - margin.left])
    .padding(.1)
  
  var xScale = d3.scaleBand() 
    .domain(rows)
    .range([height - margin.top, 0 + margin.bottom])
    .padding(.1)
  
  var colorScale = d3.scaleLinear()
    .domain([0.01,50,100])
    .range(["#FFFFDD", "#3E9583", "#1F2D86"])
   
  var xAxis = g => g
    .attr("transform", `translate(0,${margin.top})`)
    .call(d3.axisTop(yScale).ticks(width / 100, "s"))
    .call(g => g.selectAll(".domain").remove())
    .style("font", "10px sans-serif")
  
  var yAxis = g => g
    .attr("transform", `translate(${margin.top + 138},0)`)
    .call(d3.axisLeft(xScale).tickSizeOuter(0))
    .call(g => g.selectAll(".domain").remove())
    .style("font", "9px sans-serif")
  
  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);
  
  svg.call(tip)
  console.log('working')
  var heatmap = svg.selectAll('rect')
    .data(rawData)
    .enter().append('rect')
    .attr("y", function(d) { return xScale(d.metrics) })
    .attr("x", function(d) { return yScale(d.code) })
    .attr("width", yScale.bandwidth())
    .attr("height", xScale.bandwidth())
    .attr('opacity',1)
    .attr('fill',function (d) {
      if (d.index_score > 0) {return colorScale(d.index_score)}
      else {return '#333333'}
    })
    .on('mouseover',tip.show)
    .on('mouseout',tip.hide)

  
  //Extra scale since the color scale is interpolated
var countScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, width])

//Calculate the variables for the temp gradient
var numStops = 10;
var countRange = countScale.domain();
countRange[2] = countRange[1] - countRange[0];
var countPoint = [];
for(var i = 0; i < numStops; i++) {
  countPoint.push(i * countRange[2]/(numStops-1) + countRange[0]);
}

//Create the gradient
svg.append("defs")
  .append("linearGradient")
  .attr("id", "legend-traffic")
  .attr("x1", "0%").attr("y1", height-margin.bottom-30)
  .attr("x2", "100%").attr("y2", height-margin.bottom-30)
  .selectAll("stop") 
  .data(d3.range(numStops))                
  .enter().append("stop") 
  .attr("offset", function(d,i) { 
    return countScale( countPoint[i] )/width;
  })   
  .attr("stop-color", function(d,i) { 
    return colorScale( countPoint[i] ); 
  });

///////////////////////////////////////////////////////////////////////////
////////////////////////// Draw the legend ////////////////////////////////
///////////////////////////////////////////////////////////////////////////

var legendWidth = Math.min(width*0.8, 400);
//Color Legend container
var legendsvg = svg.append("g")
  .attr("class", "legendWrapper")
  .attr("transform", "translate(" + (width/2) + "," + (40) + ")");

//Draw the Rectangle
legendsvg.append("rect")
  .attr("class", "legendRect")
  .attr("x", -legendWidth/2)
  .attr("y", height-margin.bottom-30)
  //.attr("rx", hexRadius*1.25/2)
  .attr("width", legendWidth)
  .attr("height", 10)
  .style("fill", "url(#legend-traffic)");
  
//Append title
legendsvg.append("text")
  .attr("class", "legendTitle")
  .attr("x", 0)
  .attr("y", height-margin.bottom)
  .style("text-anchor", "middle")
  .text("Index Score"); 
  
//Set scale for x-axis
var xScaleLegend = d3.scaleLinear()
   .range([-legendWidth/2, legendWidth/2])
   .domain([ 0, 100] );

//Define x-axis
var xAxis = d3.axisBottom()
    .ticks(1)
    //.tickFormat(formatPercent)
    .scale(xScaleLegend);

//Set up X axis
legendsvg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (height-margin.bottom-20) + ")")
  .call(xAxis);

//add in category annotations


}



function buildTrendline(rawData) {
  //make svg
  const width = 475
  const height = 300
  const margin = ({top: 10, right: 50, bottom: 20, left: 50})
  const svg = d3.select('.chart.trendline').append('svg')
          .attr('height',height)
          .attr('width',width)

  //define the data
  var x
  var y 
  var filteredNodes = []
  for (x of rawData) {
    var newNode = {}
    newNode['code'] = x['code']
    newNode['year'] = x['year']
    for (y of features) {
      newNode[y] = x[y] 
    }
    
   filteredNodes.push(newNode)
  }


  var x
  var y 
  var weightedNodes = []
  for (x of filteredNodes) {
    var newNode = {}
    
    newNode['code'] = x['code']
    newNode['year'] = x['year']
    for (y of features) {
      
      if (y == "Percentile Rank scaled") {newNode[y] = x[y]*percentileRankWeight}
      if (y == "Share of total enrollment scaled") {newNode[y] = x[y]*shareEnrollmentWeight}
      if (y == "Skill Penetration Index scaled") {newNode[y] = x[y]*skillPenetrationWeight}
      if (y == "Number of AI occupational skills scaled") {newNode[y] = x[y]*numberOfOccupationsWeight}
      if (y == "Total Funding Amount Percapita scaled") {newNode[y] = x[y]*amountFundingWeight}
      if (y == "Total Number of Startups Percapita scaled") {newNode[y] = x[y]*startupsFundedWeight}
      if (y == "Total number of hires on LinkedIn scaled") {newNode[y] = x[y]*numberOfHiresWeight}
      if (y == "AI hiring index scaled") {newNode[y] = x[y]*hiringIndexWeight}
      if (y == "Number of conference papers Percapita scaled") {newNode[y] = x[y]*conferencePapersWeight}
      if (y == "Count of conference citation scaled") {newNode[y] = x[y]*conferenceCitationsWeight}
      if (y == "Count of citation references scaled") {newNode[y] = x[y]*citationReferencesWeight}
      if (y == "Number of journal papers Percapita scaled") {newNode[y] = x[y]*journalPapersWeight}
      if (y == "Count of journal references scaled") {newNode[y] = x[y]*journalReferencesWeight}
      if (y == "Count of journal citation scaled") {newNode[y] = x[y]*journalCitationsWeight}
      if (y == "Number of patents Percapita scaled") {newNode[y] = x[y]*patentsWeight}
      if (y == "Count of patent citation scaled") {newNode[y] = x[y]*patentCitationsWeight}
      if (y == "Count of patent references scaled") {newNode[y] = x[y]*patentReferencesWeight}
      if (y == "Number of Deep Learning papers Percapita scaled") {newNode[y] = x[y]*numberDeepLearningPapersWeight}
      if (y == "Revealed Comparative Advantage - Deep Learning Papers scaled") {newNode[y] = x[y]*comparativeAdvantageDeepLearningPapersWeight}
      if (y == "Proportion of female AI authors scaled") {newNode[y] = x[y]*proportionFemaleAuthorsWeight}
      if (y == "Proportion of female in AI workplace scaled") {newNode[y] = x[y]*proportionFemalesWorkplaceWeight}
      
    }
    var z
    var economyTotal = 0
    var researchTotal = 0
    var inclusionTotal = 0
    for (z of economy) {
      economyTotal = economyTotal + newNode[z]
    }
    for (z of research_and_development) {
      researchTotal = researchTotal + newNode[z]
    }
    for (z of inclusion) {
      inclusionTotal = inclusionTotal + newNode[z]
    }
    
    var inEconomy = 0
    var inResearch = 0
    var inInclusion = 0
    
    for (z of economy) {
      if (newNode[z] !== 'undefined') {inEconomy = inEconomy + 1}
    }
    for (z of research_and_development) {
      if (newNode[z] !== 'undefined') {inResearch = inResearch + 1}
    }
    for (z of inclusion) {
      if (newNode[z] !== 'undefined') {inInclusion = inInclusion + 1}
    }
    
   var  usedEconomy = false
   var  usedResearch = false
   var  usedInclusion = false
   if (inEconomy > 0) {usedEconomy = true}
   if (inResearch > 0) {usedResearch = true}
   if (inInclusion > 0) {usedInclusion = true}
    
    var pillarsUsed = 0 
    if (usedEconomy == true) {pillarsUsed = pillarsUsed + 1}
    if (usedResearch == true) {pillarsUsed = pillarsUsed + 1}
    if (usedInclusion == true) {pillarsUsed = pillarsUsed + 1}
    
    
    if (usedEconomy == true) {newNode['economy_mean'] = (economyTotal/inEconomy)*economyWeight}
    else {newNode['economy_mean'] = 0}
    if (usedResearch == true) {newNode['research_and_development_mean'] = (researchTotal/inResearch)* researchAndDevelopmentWeight}
    else {newNode['research_mean'] = 0}
    if (usedInclusion == true) {newNode['inclusion_mean'] = (inclusionTotal/inInclusion)*inclusionWeight}
    else {newNode['inclusion_mean'] = 0}
    newNode['weighted_mean'] = (newNode['economy_mean'] + newNode['research_and_development_mean'] + newNode['inclusion_mean']) / (pillarsUsed)
    
    
   weightedNodes.push(newNode)
  }

  var selectedCountry = document.getElementsByClassName('country-select')[0].value
  var singleCountry = weightedNodes.filter(row => isCountry(row,selectedCountry))

  console.log(singleCountry)
  
  var xPositionScale = d3.scaleLinear()
    .domain([2015,2018])
    .range([0 + margin.left,width - margin.right])
  var yPositionScale = d3.scaleLinear()
    .domain([0,d3.max(singleCountry.map(d=>d.weighted_mean))])
    .range([height - margin.bottom,0 + margin.top])
  
  var circleGroups = svg.selectAll('g')
      .data(singleCountry)
      .enter().append('g')
      .attr("x", function(d) { return xPositionScale(d.year)} )
      .attr("y", function(d) { return yPositionScale(d.weighted_mean)} )

  var lineData = singleCountry.map( function (country) {
    return {year: +country.year,mean:country.weighted_mean}
  })
  console.log(lineData)

    
    var policyCircles = circleGroups.append('circle')
      .attr('stroke', 'slateblue')
      .attr('r', 6)
      .attr('cy', function (d) {
        return d3.select(this.parentNode).attr('y')
      })
      .attr('cx', function (d) {
        return d3.select(this.parentNode).attr('x')
      })
      .attr('opacity', 1)

    // var circleLabels = circleGroups.append('text')
    //   .attr('y', function (d) {
    //     return d3.select(this.parentNode).attr('y')
    //   })
    //   .attr('x', function (d) {
    //     return d3.select(this.parentNode).attr('x')
    //   })
    //   .text(function (d) {return d.weighted_mean.toFixed(2)})

    svg.append("path")
      .datum(lineData)
        .attr("d", d3.line()
          .x(function(d) { return xPositionScale(+d.year) } )
          .y(function(d) { return yPositionScale(+d.mean) } ))
        .attr("stroke", "#006699")
        .attr('fill','none')
        .style("stroke-width", 2)
        .attr('class','trend-line')
  

  var yAxis = d3.axisLeft(yPositionScale)
      .tickSize(0)
      .ticks(8)
    svg.append("g")
      .attr("class", "axis y-axis")
      .style('fill', '#333333')
      .style("font-weight", "light")  
      .style("font-size", "12px")
      .attr('id','tick-label')
      .call(yAxis)
      .attr("transform", "translate(" + margin.right + "," + 0 + ")")

    svg.selectAll(".y-axis text")
     .attr("transform", "translate(0,0)")
     .attr('font-size',12)
  
var xAxis = d3.axisBottom(xPositionScale)
      .tickSize(0)
      .ticks(4)
      .tickFormat(d3.format("d"))
    svg.append("g")
      .attr("class", "axis x-axis")
      .style('fill', '#333333')
      .style("font-weight", "light")  
      .style("font-size", "12px")
      .attr('id','tick-label')
      .attr("transform", "translate(0," + (height - margin.bottom) + ")")
      .call(xAxis)

    svg.selectAll(".x-axis text")
     .attr("transform", "translate(0,0)")
     .attr('font-size',12)

}



function buildRadar(rawData) {
  //make svg
  const width = 400
  const height = 400
  const svg = d3.select('.chart.radar').append('svg')
          .attr('height',height)
          .attr('width',width)
          .style('background-color','#ffffff')

  var axesDomain = ['Research','Inclusion','Economy']
  var mean_names = ['economy_mean','research_and_development_mean','inclusion_mean']
  var axesLength = 3
  var formatPercent = d3.format(',.0%')
  var wrapWidth = 60
  var axisLabelFactor = 1.12
  var dotRadius = 4
  var margin = 30
  var radius = (height-(margin*2)) / 2
  var axisCircles = 5
  var maxValue =  100
  var angleSlice = Math.PI * 2 / axesLength

  const containerWidth = width-(margin*2);
  const containerHeight = height-(margin*2);
  const container = svg.append('g')
    .attr("width", containerWidth)
    .attr("height", containerHeight)
    .attr('transform', `translate(${(containerWidth/2)+margin}, ${(containerHeight/2)+margin+margin/2})`);


  var radarLine = d3.lineRadial()
      .curve(d3["curveCardinalClosed"])
      .radius(d => rScale(d))
      .angle((d, i) => i * angleSlice)
  

  var rScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([0, radius])

  var color = d3.scaleOrdinal()
    .range(["#b08500","#00A0B0"])

  
  //define the data
  var filteredData = rawData.filter(row => isYear(row,[2018]))
  var sortedData = filteredData.sort((a, b) => d3.ascending(a.code,b.code))
  var x
  var y 
  var filteredNodes = []
  for (x of sortedData) {
    var newNode = {}
    newNode['code'] = x['code']
    newNode['income group'] = x['income group']
    for (y of features) {
      newNode[y] = x[y] 
    }
    
   filteredNodes.push(newNode)
  }

  var x
  var y 
  for (x of filteredNodes) {
    
    var z
    var economyTotal = 0
    var researchTotal = 0
    var inclusionTotal = 0
    for (z of economy) {
      economyTotal = economyTotal + (x[z])*1
    }
    for (z of research_and_development) {
      researchTotal = researchTotal + x[z]*1
    }
    for (z of inclusion) {
      inclusionTotal = inclusionTotal + x[z]*1
    }
    
    
    var inEconomy = 0
    var inResearch = 0
    var inInclusion = 0
    
    for (z of economy) {
      if (x[z] !== 'undefined') {inEconomy = inEconomy + 1}
    }
    for (z of research_and_development) {
      if (x[z] !== 'undefined') {inResearch = inResearch + 1}
    }
    for (z of inclusion) {
      if (x[z] !== 'undefined') {inInclusion = inInclusion + 1}
    }
    
   var  usedEconomy = false
   var  usedResearch = false
   var  usedInclusion = false
   if (inEconomy > 0) {usedEconomy = true}
   if (inResearch > 0) {usedResearch = true}
   if (inInclusion > 0) {usedInclusion = true}
    
    
    if (usedEconomy == true) {x['economy_mean'] = (economyTotal/inEconomy)}
    else {x['economy_mean'] = 0}
    if (usedResearch == true) {x['research_and_development_mean'] = (researchTotal/inResearch)}
    else {x['research_mean'] = 0}
    if (usedInclusion == true) {x['inclusion_mean'] = (inclusionTotal/inInclusion)}
    else {x['inclusion_mean'] = 0}    

  }

  var selectedCountry = document.getElementsByClassName('country-select')[0].value


  var singleCountry = filteredNodes.filter(row => isCountry(row,selectedCountry))
  console.log(singleCountry[0]['income group'])

//set title 
  var headline = d3.select('#radar-title')
    .html('AI Vibrancy in '+ "<font style=color:#00A0B0>" + countryNames[selectedCountry]  + '</font> vs. Average AI Vibrancy Scores in <font style=color:#b08500;text-transform:capitalize>' + singleCountry[0]['income group'] + '</font>' + ' Countries')

  var sameIncome = filteredNodes.filter(row => isIncome(row,[singleCountry[0]['income group']]))
  console.log(d3.mean(sameIncome.map(d=>d.economy_mean)))
  

   var countryValues = mean_names.map(function (meanName) {
    return {
        axis:meanName,
        value: singleCountry[0][meanName]
   }
 })

   var incomeValues = mean_names.map(function (meanName) {
    return {
        axis:meanName,
        value: d3.mean(sameIncome.map(d=>d[meanName]))
   }
 })

  var values = [incomeValues].concat([countryValues])
  
    //Container for the gradients
  var defs = svg.append("defs");

  var filter = defs.append("filter")
    .attr("id","glow");

  filter.append("feGaussianBlur")
    .attr("class", "blur")
    .attr("stdDeviation","4.5")
    .attr("result","coloredBlur");

  var feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode")
    .attr("in","coloredBlur");
  feMerge.append("feMergeNode")
    .attr("in","SourceGraphic");
  
  var axisGrid = container.append("g")
    .attr("class", "axisWrapper");
  
  levels = axisGrid.selectAll(".levels")
     .data(d3.range(1,(axisCircles+1)).reverse())
     .enter()
      .append("g")

  levelCircles = levels.append('circle')
      .attr("class", "gridCircle")
      .attr("r", (d, i) => radius/axisCircles*d)
      .style("fill", "#CDCDCD")
      .style("stroke", "#CDCDCD")
      .style("fill-opacity", 0.1)

  labels = [100,80,60,40,20]

  levelText = levels.append('text')
      .text(function (d,i) {return labels[i]})
      .attr("y", (d, i) => radius/axisCircles*d)
      .attr('class','radar-axis-labels')

  const axis = axisGrid.selectAll(".axis")
    .data(axesDomain)
    .enter()
      .append("g")
      .attr("class", "axis");

  axis.append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", (d, i) => rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2))
    .attr("y2", (d, i) => rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2))
    .attr("class", "line")
    .style("stroke", "white")
    .style("stroke-width", "2px");

  axis.append("text")
    .attr("class", "legend")
    .style("font-size", "14px")
    .attr("text-anchor", "middle")
    .attr("font-family", "georgia")
    .attr("dy", "0.35em")
    .attr("x", (d, i) => rScale(maxValue * axisLabelFactor) * Math.cos(angleSlice*i - Math.PI/2))
    .attr("y", (d, i) => rScale(maxValue * axisLabelFactor) * Math.sin(angleSlice*i - Math.PI/2))
    .text(d => d);
  
  const plots = container.append('g')
    .selectAll('g')
    .data(values)
    .join('g')
      .attr("fill", "none")
      .attr("stroke", "steelblue");

  plots.append('path')
    .attr("d", d => radarLine(d.map(v => v.value)))
    .attr("fill", (d, i) => color(i))
    .attr("fill-opacity", 0.5)
    .attr("stroke", (d, i) => color(i))
    .attr("stroke-width", 2);

  plots.selectAll("circle")
    .data(d => d)
    .join("circle")
      .attr("r", dotRadius)
      .attr("cx", (d,i) => rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2))
      .attr("cy", (d,i) => rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2))
      .style("fill-opacity", 0.8);
}

function buildPriorities(rawData) {
  //make svg
  const width = 800
  const height = 600
  const margin = ({top: 20, right: 20, bottom: 20, left: 280})
  const svg = d3.select('.chart.priorities').append('svg')
          .attr('height',height)
          .attr('width',width)
  

  var codes = rawData.map(d => d.code)
  var columns = [...new Set(codes)]
  var rows = selected


  var selectedCountry = document.getElementsByClassName('country-select')[0].value
  var singleCountry = rawData.filter(row => isCountry(row,selectedCountry)).sort((b, a) => d3.ascending(+a.index_score,+b.index_score))

  var headline = d3.select('#priorities-title')
    .html(countryNames[selectedCountry] + "'s Policy Priorities: AI Vibrancy in <font style='color:#38735D'>Research and Development</font>, <font style='color:#2976A6'>Economy</font>, and <font style='color:#F28F38'>Inclusion</font>")

  
  var yScale = d3.scaleBand()
    .domain(singleCountry.map((d => d.metrics)))
    .range([0 + margin.top, height - margin.bottom])
    .padding(.05)
  
  var xScale = d3.scaleLinear() 
    .domain([0,100])
    .range([0 + margin.left,width - margin.right])

  var colorScale = d3.scaleOrdinal()
    .domain(['economy','research_and_development','inclusion'])
    .range(['#2976A6','#38735D','#D98E32'])

  var bars = svg.selectAll('rect')
    .data(singleCountry)
    .enter().append('rect')
    .attr("y", function(d) { return yScale(d.metrics)})
    .attr('x',margin.left)
    .attr("width", function(d) { return xScale(+d.index_score) - margin.left })
    .attr("height", yScale.bandwidth())
    .attr('opacity',1)
    .attr('fill',function (d) {

      if (economy.indexOf(d.metrics) >= 0) {var category = 'economy'}
      if (research_and_development.indexOf(d.metrics) >= 0) {var category = 'research_and_development'}
      if (inclusion.indexOf(d.metrics) >= 0) {var category = 'inclusion'}
      return(colorScale(category))

    })

  var yAxis = d3.axisLeft(yScale)
      .tickSize(0)
      .ticks(8)
    svg.append("g")
      .attr("class", "axis y-axis")
      .style('fill', '#333333')
      .style("font-weight", "light")  
      .style("font-size", "11px")
      .attr('id','tick-label')
      .call(yAxis)
      .attr("transform", "translate(" + margin.left + "," + 0 + ")")
  
var xAxis = d3.axisTop(xScale)
      .tickSize(0)
      .ticks(8)
    svg.append("g")
      .attr("class", "axis")
      .style('fill', '#333333')
      .style("font-weight", "light")  
      .style("font-size", "14px")
      .attr('id','tick-label')
      .attr("transform", "translate(0," + margin.top + ")")
      .call(xAxis)

  console.log(singleCountry)
  
}

//access the data
function initComparison() {
  d3.csv('assets/data/full_index_scores.csv').then(
    function buildChartsComparison(rawData) {
      while (document.getElementsByClassName('chart comparison')[0].firstChild) {
    document.getElementsByClassName('chart comparison')[0].removeChild(document.getElementsByClassName('chart comparison')[0].firstChild);
}
      buildComparison(rawData)
    }
  //end of script function
).catch(function(error){
     // handle error   
  })
  
}

function initRadar() {
  d3.csv('assets/data/full_index_scores.csv').then(
    function buildChartsRadar(rawData) {
      while (document.getElementsByClassName('chart radar')[0].firstChild) {
    document.getElementsByClassName('chart radar')[0].removeChild(document.getElementsByClassName('chart radar')[0].firstChild);
}
      buildRadar(rawData)

    }
  //end of script function
).catch(function(error){
     // handle error   
  })
  
}

function initHeatmap () {
d3.csv('assets/data/2018_heatmap.csv').then(
    function buildChartsHeatmap(rawData) {
      while (document.getElementsByClassName('chart heatmap')[0].firstChild) {
    document.getElementsByClassName('chart heatmap')[0].removeChild(document.getElementsByClassName('chart heatmap')[0].firstChild);
}
      buildHeatmap(rawData)
    }
  //end of script function
).catch(function(error){
     // handle error   
  })
}

function initTrendline () {
d3.csv('assets/data/full_index_scores.csv').then(
    function buildChartsTrendline(rawData) {
      while (document.getElementsByClassName('chart trendline')[0].firstChild) {
    document.getElementsByClassName('chart trendline')[0].removeChild(document.getElementsByClassName('chart trendline')[0].firstChild);
}
      buildTrendline(rawData)
    }
  //end of script function
).catch(function(error){
     // handle error   
  })
}

function initPriorities () {
d3.csv('assets/data/2018_heatmap.csv').then(
    function buildChartsPriorities(rawData) {

      while (document.getElementsByClassName('chart priorities')[0].firstChild) {
    document.getElementsByClassName('chart priorities')[0].removeChild(document.getElementsByClassName('chart priorities')[0].firstChild);
}
      buildPriorities(rawData)
    }
  //end of script function
).catch(function(error){
     // handle error   
  })
}

function updateSingleCountry () {
  initRadar()
  initPriorities()
  initTrendline()
}

function updateCrossCountry () {
  initComparison()
  initHeatmap()
}


  


