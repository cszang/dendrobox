// MAP

// DRAW CLIMATOLOGY

var drawClimate = function(code) {

    var margin = {top: 20, right: 40, bottom: 20, left: 30},
    width = 350 - margin.left - margin.right,
    height = 200;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .2);

    var y1 = d3.scale.linear()
        .range([height, 0]);

    var y2 = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(12)
        .orient("bottom")

    var yAxisLeft = d3.svg.axis()
        .scale(y1)
        .orient("left")
        .ticks(10, "mm");

    var yAxisRight = d3.svg.axis()
        .scale(y2)
        .ticks(10, "C")
        .orient("right");

    var line = d3.svg.line()
        .x(function(d) { return x(d.month); })
        .y(function(d) { return y2(d.temp); });

    var svg = d3.select("#climateinfo").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var climfile = './data/clim/' + code.toLowerCase() + '.csv';
    
    d3.csv(climfile, type, function(error, data) {
        x.domain(data.map(function(d) { return d.month; }));
        y1.domain([0, d3.max(data, function(d) { return d.prec; })]);
        y2.domain([d3.min(data, function(d) {return d.temp; }), d3.max(data, function(d) { return d.temp; })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis axisLeft")
            .call(yAxisLeft)
            .append("text")
            .attr("y", 6)
            .attr("dy", "-1.2em")
            .attr("dx", "1.2em")
            .style("text-anchor", "end")
            .text("mm");

        svg.append("g")
            .attr("class", "y axis axisRight")
            .attr("transform", "translate(" + (width) + ",0)")
            .call(yAxisRight)
            .append("text")
            .attr("y", 6)
            .attr("dy", "-1.2em")
            .attr("dx", "1.2em")
            .style("text-anchor", "end")
            .text("°C");

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.month); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y1(d.prec); })
            .attr("height", function(d) { return height - y1(d.prec); });

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("transform", "translate(15, 0)")
            .attr("d", line);

    });

    function type(d) {
        d.prec = +d.prec;
        d.temp = +d.temp;
        return d;
    }

};

// DRAW CHRONOLOGY

var drawChrono = function(code) {

    var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width =  800 - margin.left - margin.right,
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
            // .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", "-1em")
            .attr("dx", "1em")
            .style("text-anchor", "end")
            .text("RWI");

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
    });
};

// DRAW ONLY THE MAP IN THE BEGINNING, THE REST IS ADDED VIA FUNCTION CALLS

var width = 800;
var height = 500;

var projection = d3.geo.mercator()
    .center([50, 50])
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
                d3.select("#chronograph").html("<span class=\"chartinfo\">Chronology</span>")
                d3.select("#climateinfo").html("<span class=\"chartinfo\">Climate</span>")
                d3.select("#dendroclim").html("<span class=\"chartinfo\">Dendroclimatology</span>")
                drawChrono(d.code)
                drawClimate(d.code)
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

