function sendData() {
    const xhr = new XMLHttpRequest();
    const url = 'http://127.0.0.1:5000/data';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    const data = JSON.stringify({ key: 'value' });

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            document.getElementById('response').innerText = JSON.stringify(response);
        }
    };
    xhr.send(data);
}
