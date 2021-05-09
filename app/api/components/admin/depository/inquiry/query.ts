const collection = 'admin';

export default class Query {
  db: any;

  constructor(db: any) {
    this.db = db;
  }

  async findOne(payload: any) {
    this.db.setCollection(collection);
    return this.db.findOne(payload);
  }

  async findMany(payload: any) {
    this.db.setCollection(collection);
    return this.db.findMany(payload);
  }
}
