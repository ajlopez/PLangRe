
requireFileOnce = function( checkType, js_name ){
  if(typeof(checkType) == 'undefined'){
    if( typeof(js_name) == 'string'){
      document.write('<script type="text/javascript" src="/javascripts/' + js_name + '.js"></script>');
    }else{
	    for( var i=0; i<js_name.length; i++ ){
        document.write('<script type="text/javascript" src="/javascripts/' + js_name[i] + '.js"></script>');
	    }
	  }
  }
}

