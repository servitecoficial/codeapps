// Usamos una base de datos de texto plano gratuita para conectar Admin con TV
const STORAGE_API = "https://jsonblob.com/api/jsonBlob"; 
let blobUrl = "https://jsonblob.com/api/jsonBlob/1340915159020961792"; // ID de ejemplo, el código lo actualizará

async function uploadToCloud() {
    const file = document.getElementById('fileSelector').files[0];
    const name = document.getElementById('progName').value;
    const code = document.getElementById('token').value;
    const statusText = document.getElementById('statusText');
    const statusArea = document.getElementById('statusArea');

    if (!file || !name || !code) return alert("Por favor rellena todos los campos.");

    statusArea.classList.remove('d-none');
    statusText.innerText = "Subiendo archivo a Servitec Cloud...";

    // 1. Subida del archivo usando un servicio abierto (Catbox)
    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('fileToUpload', file);

    try {
        // Usamos un proxy para evitar el error de CORS
        const response = await fetch('https://corsproxy.io/?' + encodeURIComponent('https://catbox.moe/user/api.php'), {
            method: 'POST',
            body: formData
        });

        const fileUrl = await response.text();
        
        if (fileUrl.includes("https")) {
            statusText.innerText = "Sincronizando con la TV...";
            
            // 2. Guardamos la relación código -> link en la nube
            const dataToSave = { [code]: { name: name, url: fileUrl } };
            
            await fetch(blobUrl, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSave)
            });

            statusText.innerHTML = `<b class="text-success">¡ACTIVO!</b><br>Dile al cliente que use el código: ${code}`;
        } else {
            throw new Error("Error en el servidor");
        }
    } catch (err) {
        statusText.innerText = "Error de conexión. Intenta de nuevo.";
        console.error(err);
    }
}

async function checkAccess() {
    const code = document.getElementById('clientToken').value;
    const title = document.getElementById('dynamicTitle');
    
    title.innerText = "Buscando acceso...";

    try {
        const response = await fetch(blobUrl);
        const data = await response.json();

        if (data[code]) {
            document.getElementById('inputZone').classList.add('d-none');
            document.getElementById('downloadZone').classList.remove('d-none');
            document.getElementById('fileLabel').innerText = data[code].name;
            document.getElementById('linkAction').href = data[code].url;
            document.getElementById('dynamicTitle').innerText = "CONEXIÓN EXITOSA";
            document.getElementById('linkAction').focus(); // Importante para control remoto
        } else {
            title.innerText = "CÓDIGO NO ENCONTRADO";
            title.classList.add('text-danger');
        }
    } catch (err) {
        alert("Error al conectar con Servitec Cloud");
    }
}