$(document).ready(function () {
	$('#enviar').click(function () {
		$('#tabla').empty();
		var tabla =
			'<table class="table table-bordered table-success table-striped mx-auto mt-5">';
		for (var i = 1; i <= 10; i++) {
			tabla += '<tr>';
			for (var j = 1; j <= 10; j++) {
				tabla += '<td class="text-center">';
				tabla +=
					'<div class="spinner-border spinner-border-sm" role="status" id="' +
					i +
					'x' +
					j +
					'"></div>';
				tabla += '</td>\n';
			}
			tabla += '</tr>';
		}
		tabla += '</table>';
		$('#tabla').html(tabla);
		for (i = 1; i <= 10; i++) {
			for (j = 1; j <= 10; j++) {
				(function (i, j) {
					$.ajax({
						type: 'GET',
						dataType: 'json',
						xhrFields: {
							withCredentials: true,
						},
						success: function (source) {
							$('#' + i + 'x' + j).removeClass(
								'spinner-border spinner-border-sm'
							);
							//$("#" + i + 'x' + j).html(source.result);
							document.getElementById(i + 'x' + j).innerHTML = source.result;
							//console.log("valores de i y de j: ",i,j);
						},
					});
				})(i, j);
			}
		}
		return false;
	});

	$('#borrar').click(function () {
		$('#tabla').empty();
		return false;
	});

	async function asynCall(i, j) {
		let maxdelay = 5000 - i * j * 40;
		const url = `http://localhost:8081/sermiller/control?op1=${i}&op2=${j}&maxdelay=${maxdelay}`;
		const options = { credentials: true };

		const response = await fetch(url, options);
		const data = response.json();

		return data;
	}
});
