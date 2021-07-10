<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Demostração Ajax</title>
<script type="text/javascript" src="js/jquery-1.6.2.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		$('#bttHello').click(function(){
			var fullname = $('#fullname').val();
			$.ajax({
				type: 'POST',
				data: {fullname: fullname},
				url: 'AjaxController',
				success: function(result){
					$('#result1').html(result);
				}
				
			});
		});
	});

</script>
</head>
<body>

<form>
	<!-- Fonte: https://www.youtube.com/watch?v=P4eOHI6OGks -->
	Nome: <input type="text" id="fullname">
	<input type="button" value="Hello" id="bttHello">
	<br>
	<span id="result1"></span>
</form>

</body>
</html>