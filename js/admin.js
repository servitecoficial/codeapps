function generate() {

  const client = document.getElementById("client").value;
  const code = document.getElementById("code").value;
  const file = document.getElementById("file").value;

  if (!client || !code || !file) {
    alert("Completá todo");
    return;
  }

  document.getElementById("output").value =
`var activeConfig = {
  clientName: "${client}",
  code: "${code}",
  filePath: "${file}",
  fileName: "${file.split("/").pop()}"
};`;
}
