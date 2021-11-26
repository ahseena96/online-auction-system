const Pool  = require("pg").Pool;

const pool = new Pool({
    user: "aneeshad",
    database: "onlineauctionsystem",
    host: "localhost",
    port: 5432
});

module.exports = pool;
