import { Dexie, type Table } from 'npm:dexie'

export interface Friend {
  id?: number;
  name: string;
  age: number;
}

export class Db extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  friends!: Table<Friend>; 

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      friends: '++id, name, age' // Primary key and indexed props
    });
  }
}

export const db = new Db();
db.friends.each((item) => {
  item.id

})