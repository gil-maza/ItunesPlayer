const Query = require('../models/Query');
const TopQuery = require('../models/TopQuery');

const insertNewQuery = async query => {
    query.term = query.term.toLowerCase();
    queryToFind = await Query.find({ term: query.term }).findOne();
    if (queryToFind) {
        await Query.updateOne(
            { term: query.term }, { $inc: { amount: 1 } }
        );
        const newQuery = await Query.find({ term: query.term }).findOne();
        query.amount = newQuery.amount;
    } else {
        const queryToInsert = new Query({
            term: query.term
        });
        query = await queryToInsert.save();
    }
    updateTopQueries(query);
}

const updateTopQueries = async query => {
    const topQuery = await TopQuery.find({ term: query.term }).findOne();
    if (topQuery) {
        await TopQuery.updateOne(
            { _id: topQuery._id }, { $inc: { amount: 1 } }
        );
        return;
    }

    const topQueries = await TopQuery.find();
    const topQueriesLimit = process.env.TOP_QUERIES_LIMIT;
    if (topQueries && topQueries.length < topQueriesLimit) {
        const queryToInsert = new TopQuery({
            term: query.term,
            amount: query.amount
        });
        await queryToInsert.save();
        return;
    }

    const bottomQuery = topQueries.find(topQuery => topQuery.amount < query.amount);
    if (bottomQuery) {
        await TopQuery.updateOne({ _id: bottomQuery._id }, {
            $set: {
                term: query.term,
                amount: query.amount
            }
        });
        return;
    }
}

module.exports = insertNewQuery;