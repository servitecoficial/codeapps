// Mostrar nombre del cliente
document.getElementById("clientName").innerText = activeConfig.clientName || "";

function connect() {

  const inputCode = document.getElementById("codeInput").value.trim();
  const result = document.getElementById("result");

  // Validaciones duras
  if (!activeConfig.filePath || !activeConfig.code) {
    result.innerHTML = "<p style='color:red'>No hay archivo configurado</p>";
    return;
  }

  if (inputCode !== activeConfig.code) {
    result.innerHTML = "<p style='color:red'>Código incorrecto</p>";
    return;
  }

  // Descargar
  result.innerHTML = `
    <a href="${activeConfig.filePath}"
       class="btn btn-success btn-lg w-100"
       download>
       Descargar ${activeConfig.fileName}
    </a>
  `;
}
