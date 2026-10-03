import { Collection, ObjectId } from "mongodb";

export const createRepo = (/**@type {Collection} */ collection) => {
    const get = async (filter) => {
        const cursor = collection.find(filter);
        const items = await cursor.toArray();
        return items.map(formatId);
    };

    const getItem = async ({ id, ...filter }) => {
        const finalFilter =
            id !== undefined
                ? { _id: new ObjectId(id), ...filter }
                : { ...filter };

        const item = await collection.findOne(finalFilter);
        if (!item) return;
        return formatId(item);
    };

    const insert = async (item) => {
        await collection.insertOne(item);
        return formatId(item);
    };

    const update = async ({ id, ...filter }, data) => {
        const finalFilter =
            id !== undefined
                ? { _id: new ObjectId(id), ...filter }
                : { ...filter };
        const item = await collection.findOneAndUpdate(
            finalFilter,
            { $set: data },
            {
                returnDocument: "after",
            },
        );
        if (!item) return;
        return formatId(item);
    };
    const remove = async ({ id, ...filter }) => {
        const finalFilter =
            id !== undefined
                ? { _id: new ObjectId(id), ...filter }
                : { ...filter };
        const item = await collection.findOneAndDelete(finalFilter);
        if (!item) return;
        return formatId(item);
    };

    return { get, getItem, insert, update, remove };
};

const formatId = ({ _id, ...rest }) => ({ id: _id.toString(), ...rest });
