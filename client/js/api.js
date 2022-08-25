// Забираем информацию с сервера
export async function loadClients () {
    const response = await fetch(`http://localhost:3000/api/clients`);
    const result = await response.json();
    console.log(result);
    return result
}
// Добавляем информацию на сервер
export async function postClients(client) {
    const response = await fetch(`http://localhost:3000/api/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client),
    });
    const result = await response.json();
    console.log(result);
}

export async function loadClient (id) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`)
    const result = await response.json();
    return result
}
// Изменяем информацию на сервере
export async function pathcClients(id, client) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client)
    })
    const result = await response.json();
    console.log(result);
    return result;
}
// Удаляем инфформацию с сервера
export async function deleteClient(id) {
    await fetch(`http://localhost:3000/api/clients/${id}`,{
        method: 'DELETE'
    })
}