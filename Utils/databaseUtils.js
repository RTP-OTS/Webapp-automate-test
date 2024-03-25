const { Client } = require('pg');

async function queryDatabase(user) {
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'staff_management',
  password: '123456',
  port: 5432,
});
    await client.connect();
    const query = `
    select u.username , s.username , s.first_name , s.last_name from users u 
    inner join staff s 
    on s.username = u.username 
    where s.first_name = $1
    `;
    
    const res = await client.query(query , [user]);

    await client.end();
    return res.rows;

}
module.exports = { queryDatabase }

queryDatabase().then((data) => {
  console.log('Data:', data);
}).catch((error) => {
  console.error('Failed to query database:', error);
});

