class User {
    static canSendMessage = true;
    name = 'Unknown';
    password = 'Password';

    constructor(name, password) {
        this.name = name;
        this.password = password;
    }

    sendMessage(msg) {
        console.log(`[${this.name}]: ${msg}`);
    }
}

class SuperUser extends User {
    static canCreateUsers = true;
    static createdUsers = [];

    constructor(name, password) {
        super(name, password);
    }

    getCreatedUsers() {
        return SuperUser.createdUsers;
    }

    createUser(name, pass) {
        if (!SuperUser.canCreateUsers) return;

        const newUser = new User(name, pass);
        SuperUser.createdUsers.push(name);

        this.sendMessage(`Creating user ${newUser.name}...`);

        return newUser;
    }
}

class Admin extends SuperUser {
    static canDeleteUsers = true;
    static deletedUsers = [];

    deleteUser(name) {
        if (!Admin.canDeleteUsers) return;

        const index = SuperUser.createdUsers.findIndex(userName => userName === name);
        if (index != - 1) return;
        const [deletedUser] = SuperUser.createdUsers.splice(index, 1);
        Admin.deletedUsers.push(deletedUser);

        this.sendMessage(`Deleting user ${deletedUser}...`);
    }

    getDeletedUsers() {
        return Admin.deletedUsers;
    }
}

const superUser = new SuperUser('Vasya', '777');

const createdUser = superUser.createUser('Petya', '123');
createdUser.sendMessage('Hello');

const admin = new Admin('Nikita', '12345');
admin.deleteUser(createdUser.name);
admin.getDeletedUsers();