// const words = require('../data/words');
const wordRepository = require('../Repositories/wordRepository')

// send all words - basic data
exports.sendAllWords = async () => {
    return await wordRepository.getAllWords(); 
};

// add new word
exports.addNewWord = async (newWord) => {
    await wordRepository.insertNewWord(newWord);
};

// Deletes word and its post content links
exports.deleteWord = async (wordId) => {
    await wordRepository.deleteWordLinksById(wordId);

    await wordRepository.deleteWordById(wordId);
};

// Updates word and deletes old word post links
exports.updateWord = async (wordId, newWord) => {
    await wordRepository.updateWordById(wordId, newWord);

    await wordRepository.deleteOldWordLinksById(wordId, newWord);
};

// Returns word stats - word, post count, and percentage compared to all word use
exports.sendWordStats = async () => {
    const allWords = await wordRepository.getAllWordStats();

    const wordsStatsToSend = allWords.map(word => {
        return {
            word: word.content,
            postCount: word.post_count,
            percentage: word.percentage
        };
    });

    return wordsStatsToSend;
};