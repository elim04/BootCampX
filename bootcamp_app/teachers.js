const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.connect();

const cohortName = process.argv[2] || 'JUL02';
const queryString = `SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id 
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1 
ORDER BY teacher;
`
const values = [`%${cohortName}%`];

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.teacher}: ${user.cohort}`);
  })
}).catch(err => console.error('query error', err.stack));
