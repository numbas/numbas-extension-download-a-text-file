Numbas.addExtension('download-text-file',['jme'],function(extension) {
  var scope = extension.scope;
  var TString = Numbas.jme.types.TString;
  var THTML = Numbas.jme.types.THTML;
  var funcObj = Numbas.jme.funcObj;
  
  function guess_mimetype(filename) {
    var extension = filename.match(/\.(.*)$/)[1];
    var known_extensions = {
      'txt': 'text/plain',
      'csv': 'text/csv',
      'html': 'text/html'
    }
    return known_extensions[extension] || 'text/plain';
  }

  scope.addFunction(new funcObj('download_link', ['string', 'string', '[string]', '[string]'], THTML, function(filename,content,link_text,mimetype) {
    var element = document.createElement('a');
    mimetype = mimetype || guess_mimetype(filename);
    var blob = new Blob([content],{type: mimetype});
    element.setAttribute('href', URL.createObjectURL(blob));
    element.setAttribute('target','_blank');
    element.setAttribute('download', filename);
    if(!link_text) {
      link_text = 'Download <code>'+filename+'</code>';
    }
    element.innerHTML = link_text;

    return element;
  }));
  
  function escape_csv_cell(c) {
    c = c + '';
    if(c.match(/[,"']/)) {
      c = '"'+c.replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'"';
    }
    return c;
  }
  
  function make_csv_row(cells) {
     return cells.map(escape_csv_cell).join(','); 
  }
  
  function make_csv(rows) {
  	return rows.map(make_csv_row).join('\n');
  }
  
  scope.addFunction(new funcObj('csv',['list of dict'], TString, function(rows) {
    var columns = {};
    rows.forEach(function(row,i) {
      Object.keys(row).forEach(function(k) {
        if(columns[k]==undefined) {
          columns[k] = [];
        }
        columns[k][i] = row[k];
      });
    });
    var column_data = Object.values(columns).map(function(col) {
      for(var i=0;i<rows.length;i++) {
        col[i] = col[i] || '';
      }
      return col;
    })
    rows = [Object.keys(columns)].concat(Numbas.util.zip(column_data));
    console.log(rows);
    return make_csv(rows);
  },{unwrapValues:true}));
  
  scope.addFunction(new funcObj('csv',['list','[list of string]'], TString, function(rows,headers) {
    if(headers) {
      rows = [headers].concat(rows);
    }
    return make_csv(rows);
  },{unwrapValues:true}));
  scope.addFunction(new funcObj('csv',['dict'], TString, function(dict) {
	var headers = Object.keys(dict);
  	var rows = Numbas.util.zip(Object.values(dict));
    return make_csv([headers].concat(rows));
  },{unwrapValues:true}));
});