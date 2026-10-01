import { Collection } from "mongodb";

export const createRepo = (/**@type {Collection} */ collection) => {
    const get = async (filter) => {
        const cursor = collection.find(filter);
        const items = await cursor.toArray();
        return items.map(formatId);
    };

    const getItem = async (filter) => {
        const item = await collection.findOne(filter);
        if (!item) return;
        return formatId(item);
    };

    const insert = async (item) => {
        const { insertedId } = await collection.insertOne(item);
        return insertedId.toString();
    };

    const update = async (filter, data) => {
        const item = await collection.findOneAndUpdate(filter, data, {
            returnDocument: "after",
        });
        if (!item) return;
        return formatId(item);
    };
    const remove = async (filter) => {
        const item = await collection.findOneAndDelete(filter);
        if (!item) return;
        return formatId(item);
    };

    return { get, getItem, insert, update, remove };
};

const formatId = ({ _id, ...rest }) => ({ id: _id.toString(), ...rest });
