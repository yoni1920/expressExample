const pool = require('../DBConnection/db');

exports.getAllWords = async () => {
    const wordQuery = "SELECT word_id as wordId, content as word FROM words";

    return (await pool.query(wordQuery)).rows;
};

exports.insertNewWord = async (newWord) => {
    const wordQuery = `INSERT INTO words(content)
                       VALUES($1)`;
    const values = [newWord];

    await pool.query(wordQuery, values);
};

exports.deleteWordById = async (wordId) => {
    const wordQuery = `DELETE FROM words
                       WHERE word_id = $1;`;
    const values = [wordId];

    await pool.query(wordQuery, values);
};

exports.deleteWordLinksById = async (wordId) => {
    const postLinkQuery = `DELETE FROM post_word_links
                            WHERE word_id = $1`;
    const values = [wordId];

    await pool.query(postLinkQuery, values);
}

exports.updateWordById = async (wordId, newWord) => {
    const wordQuery = `UPDATE words
                       SET content = $1
                       WHERE word_id = $2;`;
    const values = [newWord, wordId];
    
    await pool.query(wordQuery, values);
};

exports.deleteOldWordLinksById = async (wordId, newWord) => {
    const wordQuery = `DELETE FROM post_word_links
                        WHERE (word_id = $1) AND
                        (content <> $2);`;
    const values = [wordId, newWord];

    await pool.query(wordQuery, values);
}

exports.getAllWordStats = async () => {
    const wordQuery =  `SELECT word.content, 
                        count(*) as post_count, 
                        trunc(((count(*)*100.0)/(SELECT count(*) FROM posts)), 0) as percentage
                        FROM post_word_links as postlink
                        INNER JOIN words as word
                        ON word.word_id = postlink.word_id
                        GROUP BY word.content;`;
    const output = await pool.query(wordQuery);

    return output.rows;
};