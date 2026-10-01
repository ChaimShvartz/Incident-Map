export const createRepo = (collection) => {
    const get = async (filter) => {
        const cursor = collection.find(filter);
        const items = await cursor.toArray();
        return items.map(formatId);
    };

    const insert = async (item) => {
        const { insertedId } = await collection.insertOne(item);
        return insertedId.toString();
    };

    const update = async (filter, data) => {
        const item = await collection.findOneAndUpdate(filter, data, {
            returnDocument: "after",
        });
        return formatId(item);
    };
    const remove = async (filter) => {
        const item = await collection.findOneAndDelete(filter);
        return formatId(item);
    };

    return { get, insert, update, remove };
};

const formatId = ({ _id, ...rest }) => ({ id: _id.toString, ...rest });
