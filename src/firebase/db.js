import { db } from './firebase';

// User API

export const doCreateUser = (id, {name, email}) =>
  db.ref(`agents/users/${id}`).set({
    name,
    email,
  });

export const onceGetUsers = () =>
  db.ref('agents/users').once('value');

// Other db APIs ...
