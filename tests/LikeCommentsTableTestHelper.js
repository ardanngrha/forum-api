const pool = require('../src/Infrastructures/database/postgres/pool');

const LikeCommentsTableTestHelper = {
  async addLikeComment({
    id = 'like-123',
    commentId = 'comment-123',
    owner = 'user-123',
  }) {
    const query = {
      text: 'INSERT INTO like_comments VALUES($1, $2, $3)',
      values: [id, commentId, owner],
    };

    await pool.query(query);
  },

  async findLikeComment({ commentId, owner }) {
    const query = {
      text: 'SELECT * FROM like_comments WHERE comment_id = $1 AND owner = $2',
      values: [commentId, owner],
    };

    const result = await pool.query(query);
    return result.rows;
  },
};

module.exports = LikeCommentsTableTestHelper;
