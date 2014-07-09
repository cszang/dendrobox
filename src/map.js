// MAP

// DRAW CHRONOLOGY

var drawChrono = function(code) {

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;
    
    var parseDate = d3.time.format("%Y").parse;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(10);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(4);

    var line = d3.svg.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.rwi); });

    var svg = d3.select("#chronograph").insert("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var crnfile = './data/tree/' + code.toLowerCase() + '.csv';

    console.log(crnfile);

    d3.csv(crnfile, function(error, data) {
        data.forEach(function(d) {
            d.year = parseDate(d.year);
            d.rwi = +d.rwi;
        });

        x.domain(d3.extent(data, function(d) { return d.year; }));
        y.domain(d3.extent(data, function(d) { return d.rwi; }));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("RWI");

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
    });
};

var width = 960;
var height = 500;

var projection = d3.geo.mercator()
    .center([0, 50])
    .scale(110)
    .rotate([0, 0]);

var imap = d3.select("#itrdbmap").append("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geo.path()
    .projection(projection);

var g = imap.append("g");

d3.json("./data/world-110m2.json", function(error, topology) {
    
    d3.csv("./data/itrdb_clean.csv", function(error, data) {
        g.selectAll("circle")
            .data(data)
            .enter()
            .append("svg:circle")
            .attr("r", 3)
            .attr("cx", function(d) {
                return projection([d.lon, d.lat])[0];
            })
            .attr("cy", function(d) {
                return projection([d.lon, d.lat])[1];
            })
            .style("fill", "steelblue")
            .style("cursor", "pointer")
            .on("click", function(d) {
                d3.select("#itrdbinfo").html('ITRDB-Code: ' + d.code + '<br>Study site: ' + d.studysite + '<br>Species: ' + d.species + '<br>Investigator: ' + d.investigator + '<br><a href=' + d.url + ' alt="Link to original data base entry" target="_blank">&rarr; get data</a>')
                d3.selectAll("circle").style("fill", "steelblue")
                d3.select(this).style("fill", "red")
                d3.select("#chronograph").html("")
                drawChrono(d.code)
            })
            .append("svg:title")
            .text(function(d) {
                return d.studysite;
            });
    });
    
    
    g.selectAll("path")
        .data(topojson.object(topology, topology.objects.countries)
              .geometries)
        .enter()
        .append("path")
        .attr("d", path)
});

var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        g.attr("transform","translate("+ 
               d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("circle")
            .attr("d", path.projection(projection));
        g.selectAll("path")  
            .attr("d", path.projection(projection)); 
        
    });

imap.call(zoom)

