const LikeComment = require('../../Domains/comments/entities/LikeComment');

class LikeCommentUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(owner, threadId, commentId) {
    const likeComment = new LikeComment(owner, threadId, commentId);
    await this._threadRepository.isThreadExist(threadId);
    await this._commentRepository.isCommentExist(commentId);

    const isLiked = await this._commentRepository.verifyLike(owner, commentId);

    if (isLiked) {
      await this._commentRepository.unlikeComment(owner, commentId);
    } else {
      await this._commentRepository.likeComment(likeComment);
    }
  }
}

module.exports = LikeCommentUseCase;
