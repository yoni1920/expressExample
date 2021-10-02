const postRepository = require('../Repositories/postRepository');
// const { sendAllWords } = require('../Services/wordService');

// Sending count of posts by id from last week
exports.countPostsLastWeek = async (profileSSN) => {
    const rows = await postRepository.getCountPostsLastWeek(profileSSN);

    return {
        postCountLastWeek: rows[0].post_count
    };
};

// Sending posts with blacklisted words
exports.postsWithBadWords = async () => {
    return await postRepository.getPostsWithBadWords();
}