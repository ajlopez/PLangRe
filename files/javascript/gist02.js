
$(function() {
  	$("a.rjs").click( function() {
		alert("TEST");
		$.ajax({
		          url: this.href+'.js',
		          dataType: "script",
		          beforeSend: function(xhr) {xhr.setRequestHeader("Accept", "text/javascript");}
		      });
		      return false;
		  });