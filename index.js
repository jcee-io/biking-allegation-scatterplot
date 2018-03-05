d3.json(url, (err, data) => {
	initializeY(data);

	const xExtent = d3.extent(data, d => d.secondsBehind).reverse();
	const yExtent = d3.extent(data, d => d.Place).reverse();

	const yScale = d3.scaleLinear()
	  .domain(yExtent)
	  .range([height - padding, padding]);

	const xScale = d3.scaleLinear()
	  .domain(xExtent)
	  .range([padding, width - padding]);

  axisConfig(xScale, yScale);

	svg.selectAll('circle')
	  .data(data)
	  .enter()
	  .append('circle')
	    .attr('cx',d => xScale(d.secondsBehind))
	    .attr('cy', d => yScale(d.Place))
	    .attr('r', 10)
	    .attr('fill', d => d.Doping ? 'blue' : 'grey')
	    .attr('stroke', 'white');

	circleConfig();
	setHeaders();
	setLegend();
});