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
		let contador = 1;
		$('#tabla').html(tabla);
		for (i = 1; i <= 10; i++) {
			for (j = 1; j <= 10; j++) {
				(async function () {
					let maxdelay = 5000 - i * j * 40;
					const url = `http://localhost:8081/sermiller/control?op1=${i}&op2=${j}&maxdelay=${maxdelay}`;
					const options = { mode: 'cors', credentials: 'include' };

					const response = await fetch(url, options);
					if (!response.ok)
						console.log(`An Error has occured: ${response.status}`);
					const data = await response.json();
					console.log(data);
					let cell = document.getElementById(`${data.op1}x${data.op2}`);
					cell.classList.remove('spinner-border', 'spinner-border-sm');
					cell.innerHTML = data.result;

					contador++;
					if (contador == 100) {
						document.getElementById('advertisement').innerHTML =
							'SE HAN CARGADO TODOS LOS VALORES DEL SERVIDOR';
					}
				})();
			}
		}
		return false;
	});

	$('#borrar').click(function () {
		$('#tabla').empty();
		return false;
	});

	// async function asynCall(i, j) {
	// 	let maxdelay = 5000 - i * j * 40;
	// 	const url = `http://localhost:8081/sermiller/control?op1=${i}&op2=${j}&maxdelay=${maxdelay}`;
	// 	const options = { mode: 'cors', credentials: 'include' };

	// 	const response = await fetch(url, options);
	// 	if (!response.ok) console.log(`An Error has occured: ${response.status}`);
	// 	const data = await response.json();
	// 	let cell = document.getElementById(`${data.op1}x${data.op2}`);
	// 	cell.classList.remove('spinner-border', 'spinner-border-sm');
	// 	cell.innerHTML = data.result;
	// }
});
