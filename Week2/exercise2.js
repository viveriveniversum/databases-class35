const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  const CREATE_RESEARCH_PAPERS_TABLE = `
        CREATE TABLE IF NOT EXISTS research_papers(
            paper_id INT PRIMARY KEY,
            paper_title VARCHAR(50),
            conference VARCHAR(50),
            publish_date DATE
        );`;
  const CREATE_RESEARCH_PAPERS_AUTHORS_TABLE = `
            CREATE TABLE IF NOT EXISTS research_papers_authors(
                id INT PRIMARY KEY,
                author_no INT,
                paper_id INT,
                FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id),
                FOREIGN KEY(author_no) REFERENCES authors(author_no)
            );`;
  const CANCEL_FK_CHECK = `SET FOREIGN_KEY_CHECKS = 0;`;

  const INSERT_VALUES_AUTHORS = `
    INSERT INTO 
            authors(author_no,author_name,university,date_of_birth,h_index,gender,mentor)
    VALUES
        (101, 'Asiye', 'University of Istanbul', '1980-04-07', 24, 'f', 101),
        (102, 'Onur', 'University of Ankara', '1977-10-05', 30, 'm', 102),
        (103, 'Ahmet', 'University of Istanbul', '1990-12-22', 22, 'm', 103),
        (104, 'Kudret', 'University of Istanbul', '1969-10-10', 40, 'f', 104),
        (105, 'Merve', 'University of Ankara', '1993-02-12', 32, 'f', 105),
        (106, 'Ertugrul', 'Leiden University', '1991-05-30', 37, 'm', 106),
        (107, 'Huseyin', 'Leiden University', '1964-09-18', 60, 'm', 107),
        (108, 'Sevgi', 'MIT', '1994-04-15', 29, 'f', 108),
        (109, 'Aykut', 'MIT', '1978-11-24', 49, 'm', 110),
        (110, 'Andrea', 'Milano University', '1989-01-29', 33, 'f', 111),
        (111, 'Martin', 'Milano University', '1992-08-14', 38, 'm', 112),
        (112, 'Marie', 'Utrecht University', '1990-09-23', 40, 'f', 113),
        (113, 'Elizabeth', 'MIT', '1979-04-10', 56, 'f', 114),
        (114, 'Mike', 'University of Amsterdam', '1988-03-02', 52, 'm', 108),
        (115, 'Elena', 'University of Amsterdam', '1993-06-21', 28, 'f', 102)
  `;

  const INSERT_RESEARCH_PAPERS = `
        INSERT INTO
            research_papers(paper_id, paper_title, conference, publish_date)
        VALUES
            (101, 'Intro to Vue', 'Vue Conference', '2000-05-03'),
            (102, 'Intro to React', 'React Conference', '2010-11-10'),
            (103, 'Intro to Angular', 'Angular Conference', '2005-10-20'),
            (104, 'Intro to Go', 'Go Conference', '1999-11-10'),
            (105, 'Intro to Java', 'Java Conference', '2010-06-07'),
            (106, 'Intro to JS', 'Js Conference', '2018-04-22'),
            (107, 'Intro to Python', 'Python Conference', '2000-10-28'),
            (108, 'Intro to C', 'C Conference', '2009-04-12'),
            (109, 'Intro to MongoDB', 'MongoDB Conference', '2010-08-20'),
            (110, 'Intro to Mysql', 'Mysql Conference', '2020-01-27'),
            (111, 'Intro to PostGred', 'PostGred Conference', '2021-05-10'),
            (112, 'Intro to Ruby', 'Ruby Conference', '2022-01-25'),
            (113, 'Intro to Pascal', 'Pascal Conference', '2021-04-11'),
            (114, 'Intro to TS', 'TS Conference', '2022-06-04'),
            (115, 'Intro to Swift', 'Swift Conference', '2017-05-30'), 
            (116, 'Intro to Scala', 'Scala Conference', '2010-05-03'),
            (117, 'Intro to HTML', 'HTML Conference', '1992-11-10'),
            (118, 'Intro to CSS', 'CSS Conference', '2006-10-20'),
            (119, 'Intro to PHP', 'PHP Conference', '2000-11-10'),
            (120, 'Intro to Word', 'Word Conference', '2017-06-07'),
            (121, 'Intro to Powerpoint', 'Powerpoint Conference', '2018-04-22'),
            (122, 'Intro to Excel', 'Excel Conference', '2003-10-28'),
            (123, 'Intro to Safari', 'Safari Conference', '2020-04-12'),
            (124, 'Intro to Chrome', 'Chrome Conference', '2019-08-20'),
            (125, 'Intro to Firefox', 'Firefox Conference', '2021-01-27'),
            (126, 'Intro to CLI', 'CLI Conference', '2022-03-10'),
            (127, 'Intro to GUI', 'GUI Conference', '2022-02-25'),
            (128, 'Intro to Github', 'Github Conference', '2021-08-11'),
            (129, 'Intro to Linkedin', 'Linkedin Conference', '2020-06-04'),
            (130, 'Intro to Gmail', 'Gmail Conference', '2016-05-30')
  `;

  const INSERT_RESEARCH_PAPERS_AUTHORS = `
        INSERT INTO
            research_papers_authors(id,author_no,paper_id)
        VALUES
        (3, 102, 103),
        (1, 101, 101),
        (4, 102, 126),
        (5, 101, 129),
        (6, 101, 103),
        (7, 101, 112),
        (8, 101, 113),
        (9, 103, 102),
        (10, 103, 124),
        (11, 103, 125),
        (12, 104, 104),
        (13, 105, 105),
        (14, 105, 119),
        (15, 105, 120),
        (16, 106, 105),
        (17, 106, 107),
        (18, 108, 108),
        (19, 108, 109),
        (20, 108, 127),
        (21, 108, 128),
        (22, 109, 110),
        (23, 110, 111),
        (24, 111, 112), 
        (25, 111, 130),
        (26, 111, 113),
        (27, 112, 113),
        (28, 112, 114),
        (29, 112, 115),
        (30, 112, 116),
        (31, 113, 117),
        (32, 113, 123),
        (33, 114, 118),
        (34, 114, 121),
        (35, 115, 122)
  `;
  connection.connect();

  try {
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(CREATE_RESEARCH_PAPERS_AUTHORS_TABLE);
    await execQuery(CANCEL_FK_CHECK);
    await execQuery(INSERT_VALUES_AUTHORS);
    await execQuery(INSERT_RESEARCH_PAPERS);
    await execQuery(INSERT_RESEARCH_PAPERS_AUTHORS);
  } catch (err) {
    console.log(err);
    connection.end();
  }
  connection.end();
};
seedDatabase();
