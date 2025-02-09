require("dotenv").config({ path: `${process.cwd()}/.env` });
const { Pool } = require("pg");
const { dbConnection } = require("../config/keys");
const pool = new Pool(dbConnection);

exports.fetch = async (query, ...values) => {
    const client = await pool.connect();
    try {
        const {
            rows: [row],
        } = await client.query(query, values.length ? values : null);
        return row;
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
};

exports.fetchAll = async (query, ...values) => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query(
            query,
            values.length ? values : null
        );
        return rows;
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
};
