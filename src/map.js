// SET DOWNLOAD LINKS

// function setDownload(code, studysite, species, investigator, url) {

//     var climfile = './data/clim/' + code.toLowerCase() + '.csv';
//     var treefile = './data/tree/' + code.toLowerCase() + '.csv';
//     var respfile = './data/resp/' + code.toLowerCase() + '.csv';
    
//     d3.select("#light").html('<p>Download data for:</p>' + '<p>ITRDB-Code: ' + code + '<br>Study site: ' + studysite + '<br>Species: ' + species + '<br>Investigator: ' + investigator + '</p><p><a href=' + url + ' alt="Link to original data base entry" target="_blank"><img src="./img/glyphicons_316_tree_conifer.png" width = "15px"></a><span class="dlinfo">Original data from ITRDB</span></p><p><a href=' + treefile + ' alt="Download chronology" target="_blank"><img src="./img/glyphicons_036_file.png" width = "15px"></a><span class="dlinfo">Chronology (CSV)</span></p><p><a href=' + climfile + ' alt="Download climate" target="_blank"><img src="./img/glyphicons_036_file.png" width = "15px"></a><span class="dlinfo">Climate average (CSV)</span></p><p><a href=' + respfile + ' alt="Download response coefficients" target="_blank"><img src="./img/glyphicons_036_file.png" width = "15px"></a><span class="dlinfo">Response coefficients (CSV)</span></p><p><a href = "javascript:void(0)" onclick = "document.getElementById(\'light\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'">Close window</a></p>')
// }


// REFRESH CONTENT

// function refresh() {
//     window.location.reload(false);
//     document.getElementById("specselect").selectedIndex = 0;
//     document.getElementById("resselect").selectedIndex = 0;
// };

// FUNCTION TO HIGHLIGHT SELECTIONS

// function changeSelection() {
//     var e = document.getElementById("specselect");
//     var species = e.options[e.selectedIndex].value;
//     var f = document.getElementById("resselect");
//     var investigator = f.options[f.selectedIndex].value;
//     console.log(investigator);
//     console.log(species);
//     if (investigator === "all investigators" & species === "all species") {
//         d3.selectAll("circle")
//             .style("fill-opacity", 0)
//             .transition()
//             .duration(1000)
//             .style("fill-opacity", 1)
//             .style("fill", "steelblue")
//     }
//     if (investigator === "all investigators" & species !== "all species") {
//         d3.selectAll("circle")
//             .style("fill-opacity", 0)
//              .transition()
//             .duration(1000)
//             .style('fill-opacity', function(d, i) { 
//                 if (d.species === species) 
//                 {return 1}
//                 else {return 0}
//                 ;})
//             .style('fill', function(d, i) { 
//                 if (d.species === species) 
//                 {return "steelblue"}
//                 else {return "grey"}
//                 ;})
//     }
//     if (investigator !== "all investigators" & species === "all species") {
//         d3.selectAll("circle")
//             .style("fill-opacity", 0)
//             .transition()
//             .duration(1000)
//             .style('fill-opacity', function(d, i) { 
//                 if (d.investigator === investigator) 
//                 {return 1}
//                 else {return 0}
//                 ;})
//             .style('fill', function(d, i) { 
//                 if (d.investigator === investigator) 
//                 {return "steelblue"}
//                 else {return "grey"}
//                 ;})
//     }
//     if (investigator !== "all investigators" & species !== "all species") {
//         d3.selectAll("circle")
//             .style("fill-opacity", 0)
//             .transition()
//             .duration(1000)
//             .style('fill-opacity', function(d, i) { 
//                 if (d.investigator === investigator & d.species === species) 
//                 {return 1}
//                 else {return 0}
//                 ;})
//             .style('fill', function(d, i) { 
//                 if (d.investigator === investigator & d.species === species) 
//                 {return "steelblue"}
//                 else {return "grey"}
//                 ;})
//     }
// };

// MAP

// DRAW CLIMATOLOGY

// var drawClimate = function(code) {

//     var margin = {top: 10, right: 40, bottom: 20, left: 30},
//     width = 350 - margin.left - margin.right,
//     height = 210;

//     var x = d3.scale.ordinal()
//         .rangeRoundBands([0, width], .2);

//     var y1 = d3.scale.linear()
//         .range([height, 40]);

//     var y2 = d3.scale.linear()
//         .range([height, 40]);

//     var xAxis = d3.svg.axis()
//         .scale(x)
//         .ticks(12)
//         .orient("bottom")

//     var yAxisLeft = d3.svg.axis()
//         .scale(y1)
//         .orient("left");

//     var yAxisRight = d3.svg.axis()
//         .scale(y2)
//         .ticks(10, "C")
//         .orient("right");

//     var line = d3.svg.line()
//         .x(function(d) { return x(d.month); })
//         .y(function(d) { return y2(d.temp); });

//     var svg = d3.select("#climateinfo").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     var climfile = './data/clim/' + code.toLowerCase() + '.csv';

//     d3.csv(climfile, type, function(error, data) {
//         x.domain(data.map(function(d) { return d.month; }));
//         y1.domain([0, d3.max(data, function(d) { return d.prec; })]);
//         y2.domain([d3.min(data, function(d) {return d.temp; }), d3.max(data, function(d) { return d.temp; })]);

//         svg.append("g")
//             .attr("class", "x axis")
//             .attr("transform", "translate(0," + height + ")")
//             .call(xAxis);

//         svg.append("g")
//             .attr("class", "y axis axisLeft")
//             .call(yAxisLeft)
//             .append("text")
//             .attr("y", 6)
//             .attr("dy", "28px")
//             .attr("dx", "1.2em")
//             .style("text-anchor", "end")
//             .text("mm");

//         svg.append("g")
//             .attr("class", "y axis axisRight")
//             .attr("transform", "translate(" + (width) + ",0)")
//             .call(yAxisRight)
//             .append("text")
//             .attr("y", 6)
//             .attr("dy", "28px")
//             .attr("dx", "1.2em")
//             .style("text-anchor", "end")
//             .text("°C");

//         svg.selectAll(".bar")
//             .data(data)
//             .enter().append("rect")
//             .attr("class", "bar")
//             .attr("x", function(d) { return x(d.month); })
//             .attr("width", x.rangeBand())
//             .attr("y", function(d) { return y1(d.prec); })
//             .attr("height", function(d) { return height - y1(d.prec); });

//         svg.append("path")
//             .datum(data)
//             .attr("class", "line")
//             .attr("transform", "translate(10, 0)")
//             .attr("d", line);

//     });

//     function type(d) {
//         d.prec = +d.prec;
//         d.temp = +d.temp;
//         return d;
//     }

//     svg.append('line')
//         .attr({x1: 150, y1: 7, x2: 165, y2: 7, 'stroke': 'red', 'stroke-width': 3});

//     svg.append('rect')
//         .attr({x: 60, y: 0, width: 13, height: 13, 'fill': 'steelblue'});
    
//     svg.append('text')
//         .text("Temperature")
//         .attr({x: 170, y: 10, 'text-anchor' : 'start'})
//         .style({'font-size': '10px'});

//     svg.append('text')
//         .text("Precipitation")
//         .attr({x: 78, y: 10, 'text-anchor' : 'start'})
//         .style({'font-size': '10px'});

// };

// DRAW RESPONSE

// var drawDendroclim = function(code) {

//     var margin = {top: 20, right: 20, bottom: 20, left: 30},
//     width = 430 - margin.left - margin.right,
//     height = 200;

//     var x = d3.scale.ordinal()
//         .rangeRoundBands([0, width], .2);

//     var y1 = d3.scale.linear()
//         .range([height, 40]);

//     var y2 = d3.scale.linear()
//         .range([height, 40]);

//     var xAxis = d3.svg.axis()
//         .scale(x)
//         .ticks(12)
//         .orient("bottom")

//     var yAxis = d3.svg.axis()
//         .scale(y1)
//         .orient("left");

//     var line = d3.svg.line()
//         .x(function(d) { return x(d.month); })
//         .y(function(d) { return y2(d.temp); });

//     var svg = d3.select("#dendroclim").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     var respfile = './data/resp/' + code.toLowerCase() + '.csv';

//     d3.csv(respfile, type, function(error, data) {
//         x.domain(data.map(function(d) { return d.month; }));
//         var allprec = data.map(function(d) { return d.prec; });
//         var alltemp = data.map(function(d) { return d.temp; });
//         var allcoef = allprec.concat(alltemp);
//         y1.domain(d3.extent(allcoef));
//         y2.domain(d3.extent(allcoef));

//         svg.append("g")
//             .attr("class", "x axis")
//             .attr("transform", "translate(0," + height + ")")
//             .call(xAxis);

//         svg.append("g")
//             .attr("class", "y axis")
//             .call(yAxis)
//             .append("text")
//             .attr("y", 6)
//             .attr("dy", "28px")
//             .attr("dx", "1.2em")
//             .style("text-anchor", "end")
//             .text("Coef");

//         svg.selectAll(".bar")
//             .data(data)
//             .enter().append("rect")
//             .attr("class", "bar")
//             .attr("x", function(d) {
//                 return x(d.month); })
//             .attr("width", x.rangeBand())
//             .attr("y", function(d) {
//                 return y1(Math.max(d.prec, 0)); })
//             .attr("height", function(d) {
//                 return Math.abs(y1(d.prec) - y1(0)); });

//         svg.append("path")
//             .datum(data)
//             .attr("class", "line")
//             .attr("transform", "translate(10, 0)")
//             .attr("d", line);

//     });

//     function type(d) {
//         d.temp = +d.temp;
//         d.prec = +d.prec;
//         return d;
//     }

//     svg.append('line')
//         .attr({x1: 190, y1: 7, x2: 205, y2: 7, 'stroke': 'red', 'stroke-width': 3});

//     svg.append('rect')
//         .attr({x: 100, y: 0, width: 13, height: 13, 'fill': 'steelblue'});
    
//     svg.append('text')
//         .text("Temperature")
//         .attr({x: 210, y: 10, 'text-anchor' : 'start'})
//         .style({'font-size': '10px'});

//     svg.append('text')
//         .text("Precipitation")
//         .attr({x: 118, y: 10, 'text-anchor' : 'start'})
//         .style({'font-size': '10px'});
    
// };

// DRAW CHRONOLOGY

// var drawChrono = function(code) {

//     var margin = {top: 20, right: 20, bottom: 20, left: 30},
//     width =  800 - margin.left - margin.right,
//     height = 200 - margin.top - margin.bottom;

//     var parseDate = d3.time.format("%Y").parse,
//     bisectDate = d3.bisector(function(d) { return d.year; }).left,
//     formatInfo = function(d) { return d.rawyear; };

//     var x = d3.time.scale()
//         .range([0, width]);

//     var y = d3.scale.linear()
//         .range([height, 0]);

//     var xAxis = d3.svg.axis()
//         .scale(x)
//         .orient("bottom")
//         .ticks(10);

//     var yAxis = d3.svg.axis()
//         .scale(y)
//         .orient("left")
//         .ticks(4);

//     var line = d3.svg.line()
//         .x(function(d) { return x(d.year); })
//         .y(function(d) { return y(d.rwi); });

//     var svg = d3.select("#chronograph").insert("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     var crnfile = './data/tree/' + code.toLowerCase() + '.csv';

//     d3.csv(crnfile, function(error, data) {
//         data.forEach(function(d) {
//             d.rawyear = d.year;
//             d.year = parseDate(d.year);
//             d.rwi = +d.rwi;
//         });

//         x.domain(d3.extent(data, function(d) { return d.year; }));
//         y.domain(d3.extent(data, function(d) { return d.rwi; }));

//         svg.append("g")
//             .attr("class", "x axis")
//             .attr("transform", "translate(0," + height + ")")
//             .call(xAxis);

//         svg.append("g")
//             .attr("class", "y axis")
//             .call(yAxis)
//             .append("text")
//         // .attr("transform", "rotate(-90)")
//             .attr("y", 5)
//             .attr("dy", "-1em")
//             .attr("dx", "1em")
//             .style("text-anchor", "end")
//             .text("RWI");

//         svg.append("path")
//             .datum(data)
//             .attr("class", "line")
//             .attr("d", line);

//         var focus = svg.append("g")
//             .attr("class", "focus")
//             .style("display", "none");

//         focus.append("circle")
//             .attr("r", 4.5);

//         focus.append("text")
//             .attr("x", 9)
//             .attr("dy", ".35em");

//         svg.append("rect")
//             .attr("class", "overlay")
//             .attr("width", width)
//             .attr("height", height)
//             .on("mouseover", function() { focus.style("display", null); })
//             .on("mouseout", function() { focus.style("display", "none"); })
//             .on("mousemove", mousemove);

//         function mousemove() {
//             var x0 = x.invert(d3.mouse(this)[0]),
//             i = bisectDate(data, x0, 1),
//             d0 = data[i - 1],
//             d1 = data[i],
//             d = x0 - d0.year > d1.year - x0 ? d1 : d0;
//             focus.attr("transform", "translate(" + x(d.year) + "," + y(d.rwi) + ")");
//             focus.select("text").text(formatInfo(d));
//         }
//     });
// };

// DRAW ONLY THE MAP IN THE BEGINNING, THE REST IS ADDED VIA FUNCTION CALLS

// var width = 800;
// var height = 500;

var map = L.map('itrdbmap').setView([50, -30], 2);
// var map = L.map('itrdbmap').setView([-41.2858, 174.7868], 13);
mapLink = 
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
    }).addTo(map);

map._initPathRoot()

var svg = d3.select("#itrdbmap").select("svg"),
    g = svg.append("g");

d3.json("./data/itrdb_clean.json", function(collection) {
    /* Add a LatLng object to each item in the dataset */
    collection.objects.forEach(function(d) {
	d.LatLng = new L.LatLng(d.site.lon,
				d.site.lat)
    })
    
    var feature = g.selectAll("circle")
	.data(collection.objects)
	.enter().append("circle")
	.style("stroke", "black")  
	.style("opacity", .6) 
	.style("fill", "red")
	.attr("r", 20);  
    
    map.on("viewreset", update);
    update();
    
    function update() {
	feature.attr("transform", 
		     function(d) { 
			 return "translate("+ 
			     map.latLngToLayerPoint(d.LatLng).x +","+ 
			     map.latLngToLayerPoint(d.LatLng).y +")";
		     }
		    )
    }
})


// d3.json("./data/world_statesus2.json", function(error, topology) {

//     d3.csv("./data/itrdb_clean.csv", function(error, data) {

//         g.selectAll("circle")
//             .data(data)
//             .enter()
//             .append("svg:circle")
//             .attr("r", 3)
//             .attr("cx", function(d) {
//                 return projection([d.lon, d.lat])[0];
//             })
//             .attr("cy", function(d) {
//                 return projection([d.lon, d.lat])[1];
//             })
//             .style("fill-opacity", 0)
//             .style("cursor", "pointer")
//             .on("click", function(d) {
//                 d3.select("#itrdbinfo").html('ITRDB-Code: ' + d.code + '<br>Study site: ' + d.studysite + '<br>Species: ' + d.species + '<br>Investigator: ' + d.investigator + '<br><a href = "javascript:void(0)" onclick = "document.getElementById(\'light\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">&rarr; get data</a>')
//                 d3.selectAll("circle")
//                     .style("fill", "steelblue")
//                 d3.select(this)
//                     .style("fill", "red")
//                 d3.select("#chronograph").html("<span class=\"chartinfo\">Chronology</span>")
//                 d3.select("#climateinfo").html('<span class="chartinfo">Climate</span>')
//                 d3.select("#dendroclim").html("<span class=\"chartinfo\">Climate-growth relationships</span>")
//                 drawChrono(d.code)
//                 drawClimate(d.code)
//                 drawDendroclim(d.code)
//                 setDownload(d.code, d.studysite, d.species, d.investigator, d.url)
//             })
//             .transition()
//             .duration(1000)
//             .style("fill-opacity", 1)
//             .style('fill', 'steelblue')
//             // .append("svg:title")
//             // .text(function(d) {
//             //     return d.studysite;
//             // });
//     });

//     var states = topojson.object(topology, topology.objects.states);

//     g.selectAll("path")
//         .data(topojson.object(topology, topology.objects.countries )
//               .geometries)
//         .enter()
//         .append("path")
//         .attr("class", "countries")
//         .attr("d", path)

//     g.append("path")
//         .datum(states)
//         .attr("d", path);
    
// });

// var zoom = d3.behavior.zoom()
//     .on("zoom",function() {
//         g.attr("transform","translate("+ 
//                d3.event.translate.join(",")+")scale("+d3.event.scale+")");
//         g.selectAll("circle")
//             .attr("d", path.projection(projection))
//             .attr("r", 3/d3.event.scale);
//         g.selectAll("path")  
//             .attr("d", path.projection(projection))
//             .attr("", 1/d3.event.scale); 
//     });

// imap.call(zoom)

