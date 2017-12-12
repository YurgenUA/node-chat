'use explicit';

const expect = require('expect');

const { Users } = require('./users');

describe('User', () => {

    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'Mike',
                room: 'Node Course'
            },
            {
                id: '2',
                name: 'Julie',
                room: 'React Course'
            },
            {
                id: '3',
                name: 'Jane',
                room: 'Node Course'
            }
        ]
    });

    it('should add new user', () => {
        let users = new Users();
        var user = {
            id: '123',
            name: 'Andrew',
            room: 'The Office Fans'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return users for node course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Jane']);
    });

    it('should return users for React course', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Julie']);
    })

    it('should remove user', () => {
        users.removeUser('1');
        expect(users.users.length).toBe(2);
            
    });

    it('should not remove user', () => {
        users.removeUser('manchkind');
        expect(users.users.length).toEqual(3);

    });

    it('should return user', () => {
        let user = users.getUser('1');
        expect(user.name).toBe('Mike');

    });

    it('should not return user', () => {
        let user = users.getUser('1f f ');
        expect(user).toBe(undefined);

    });

})