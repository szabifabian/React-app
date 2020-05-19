const promisify = fn => (...args) => {
    return new Promise((resolve, reject) => {
        fn(...args, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        });
    });
}

const promisifyNedb = (nedb) => {
    const db = {}
    const methods = ['find', 'findOne', 'insert', 'update', 'remove']
    methods.forEach(method => db[method] = promisify(nedb[method].bind(nedb)))
    return db
}

export class NedbStorage {
    constructor(nedb) {
        this.db = promisifyNedb(nedb)
    }
    async create(obj) {
        if (obj.id) {
            obj._id = obj.id
        }
        const newObj = await this.db.insert(obj)
        newObj.id = newObj._id
        return newObj
    }
    async fill(objects) {
        await this.db.remove({}, { multi: true })
        const newObjects = await Promise.all(objects.map(playlist => this.create(playlist)))
        return newObjects
    }
    async getAll() {
        const objects = await this.db.find({})
        return objects.map(playlist => ({ ...playlist, id: playlist._id }))
    }
    async update(obj) {
        if (!obj.id) return
        obj._id = obj.id
        await this.db.update({ _id: obj._id }, obj, {})
        return obj
    }
    async delete(id) {
        await this.db.remove({ _id: id })
    }
}