/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

d3.json("samples.json").then((importedData) => {
    console.log(importedData);
    });
    
// function getMonthlyData() {

  var button = d3.select("#filter-btn-id");

  button.on("click", function() {

    

    var inputElement = d3.select("#idnumb");
    // Get the value property of the input element
  var inputValue = inputElement.property("value");

d3.json("samples.json").then(function(data) {
    var name = data.samples;
  
    var filtered = name.filter(id => id.id === inputValue);
    console.log(filtered);
    console.log(name);

    var meta = data.metadata;
    var filteredmeta = meta.filter(idz => idz.id === parseInt(inputValue));
    console.log(filteredmeta);



    for (index = 0; index < filtered.length; index++) { 
        var sample_num = (filtered[index].sample_values);
        console.log(sample_num);
        var slice_samples = sample_num.slice(0, 10);
        console.log(slice_samples);
      
  
        }

        for (index = 0; index < filtered.length; index++) { 
          var ids = (filtered[index].otu_ids);
          console.log(ids);
          var slice_ids = ids.slice(0, 10);
          // zipping
          // var c = [];
          //   for (var i = 0; i < slice_ids.length; i++){
          //     c += "OTU," + slice_ids[i]

          //   // c.push([otu[i], slice_ids[i]]);
          //   }
            var c = ["OTU ID: " + slice_ids[0], "OTU ID: "  + slice_ids[1],
            "OTU ID: "  + slice_ids[2], "OTU ID: "  + slice_ids[3], "OTU ID: "  + slice_ids[4], "OTU ID: "  + slice_ids[5],
            "OTU ID: "  + slice_ids[6], "OTU ID: "  + slice_ids[7], "OTU ID: "  + slice_ids[8], "OTU ID: "  + slice_ids[9],
            ];
          console.log(c)

         
          for (index = 0; index < slice_ids.length; index++ ) {
            var arr = [];
            var newarr = arr.push(slice_ids[index].toString());
            console.log(newarr);
          }
          }

          for (index = 0; index < filtered.length; index++) { 
            var labels = (filtered[index].otu_labels);
            console.log(labels);
            var slice_otulabels = labels.slice(0, 10);
            
          
            }
            for (index = 0; index < filteredmeta.length; index++) { 
              var id_meta = (filteredmeta[index].id);
              var eth_meta = (filteredmeta[index].ethnicity);
              var gen_meta = (filteredmeta[index].gender);
              var age_meta = (filteredmeta[index].age);
              var loc_meta = (filteredmeta[index].location);
              var bb_meta = (filteredmeta[index].bbtype);
              var wfreq_meta = (filteredmeta[index].wfreq);

              var list = d3.select("#sample-metadata");
              list.html("");
              list.append("li").text(`ID: ${id_meta}`);
              list.append("li").text(`ETHNICITY: ${eth_meta}`);
              list.append("li").text(`GENDER: ${gen_meta}`);
              list.append("li").text(`AGE: ${age_meta}`);
              list.append("li").text(`LOCATION: ${loc_meta}`);
              list.append("li").text(`BBTYPE: ${bb_meta}`);
              list.append("li").text(`WFREQ: ${wfreq_meta}`);
            }


  var trace1 = {
    type: "bar",
    x: slice_samples,
    y: c,
    orientation: 'h',
    marker: {
      color: 'rgba(55,128,191,0.6)',
      width: 1
    },
    hovertext: slice_otulabels,
    // hovertext: slice_ids,
  };

  var data = [trace1];

  var layout = {
    yaxis: {
      showgrid: true,
      zeroline: true,
      showline: true,
      mirror: 'ticks',
      gridcolor: '#bdbdbd',
      gridwidth: 2,
      zerolinecolor: '#969696',
      zerolinewidth: 4,
      linecolor: '#636363',
      linewidth: 6
    },
  title: (`Top 10 OTUs Bar Chart for ID Number ${inputValue}`),
  xaxis: { title: "Sample Data"},
  // yaxis: { title: "OTU ID"}
};

  Plotly.newPlot("bar", data, layout);

  var trace2 = {
    x: ids,
    y: sample_num,
    text: labels,
    mode: 'markers',
    marker: {
      color: sample_num,
      size: sample_num
    }
  };
  
  var data = [trace2];
  
  var layout = {
 

    title: (`Top 10 OTUs Bubble Chart for ID Number ${inputValue}`),
    showlegend: false,
    height: 600,
    width: 600,
    yaxis: { title: "Sample Data"},
  xaxis: { title: "OTU ID"}
  };
  
  Plotly.newPlot('gauge', data, layout);

});
  });


