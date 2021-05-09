const collection = 'document';

export default class Command {
  db: any;

  constructor(db: any) {
    this.db = db;
  }

  async insertOne(payload: any) {
    this.db.setCollection(collection);
    return this.db.insertOne(payload);
  }

  async updateOne(params: any, payload: any) {
    this.db.setCollection(collection);
    return this.db.updateOne(params, payload);
  }

  async deleteOne(params: any, payload: any) {
    this.db.setCollection(collection);
    return this.db.deleteOne(params, payload);
  }
}
