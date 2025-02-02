class CommentDetails {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id, username, date, replies, content, likeCount = 0,
    } = payload;

    this.id = id;
    this.username = username;
    this.date = date;
    this.replies = replies;
    this.content = content;
    this.likeCount = likeCount;
  }

  _verifyPayload({
    id, username, date, replies, content, likeCount,
  }) {
    if (!id || !username || !date || !replies || !content) {
      throw new Error('COMMENT_DETAILS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof username !== 'string'
      || typeof date !== 'string'
      || !Array.isArray(replies)
      || typeof content !== 'string'
      || (likeCount !== undefined && typeof likeCount !== 'number')
    ) {
      throw new Error('COMMENT_DETAILS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = CommentDetails;
