import { loadClient } from "./api.js";
import { createUserCard } from "./user.js";

(async () => {
    const userContainer = document.getElementById('user')
    const userId = document.location.search

if (userId) {
    const id = userId.substring(1)
    const client = await loadClient(id);
    
    const user = createUserCard(client);
    userContainer.append(user.userContent)
}
})()