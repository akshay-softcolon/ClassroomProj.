export const typeDefs = `#graphql
    `;

interface User {
    id: string;
    name: string;
    email: string;
}

const users: User[] = [];

// Create a new user
function createUser(user: User): User {
    users.push(user);
    return user;
}

// Read all users
function getUsers(): User[] {
    return users;
}

// Read a specific user by ID
function getUserById(id: string): User | undefined {
    return users.find(user => user.id === id);
}

// Update a user by ID
function updateUser(id: string, updatedUser: User): User | undefined {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        return users[userIndex];
    }
    return undefined;
}

// Delete a user by ID
function deleteUser(id: string): boolean {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return true;
    }
    return false;
}
