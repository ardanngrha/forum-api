const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const LikeCommentUseCase = require('../LikeCommentUseCase');
const LikeComment = require('../../../Domains/comments/entities/LikeComment');

describe('LikeCommentUseCase', () => {
  it('should orchestrating like comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      owner: 'user-123',
      threadId: 'thread-123',
      commentId: 'comment-123',
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.isThreadExist = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.isCommentExist = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyLike = jest.fn()
      .mockImplementation(() => Promise.resolve(false));
    mockCommentRepository.likeComment = jest.fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const likeCommentUseCase = new LikeCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    await likeCommentUseCase.execute(
      useCasePayload.owner,
      useCasePayload.threadId,
      useCasePayload.commentId,
    );

    // Assert
    expect(mockThreadRepository.isThreadExist)
      .toHaveBeenCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.isCommentExist)
      .toHaveBeenCalledWith(useCasePayload.commentId);
    expect(mockCommentRepository.verifyLike)
      .toHaveBeenCalledWith(useCasePayload.owner, useCasePayload.commentId);
    expect(mockCommentRepository.likeComment)
      .toHaveBeenCalledWith(new LikeComment(
        useCasePayload.owner,
        useCasePayload.threadId,
        useCasePayload.commentId,
      ));
  });

  it('should orchestrating unlike comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      owner: 'user-123',
      threadId: 'thread-123',
      commentId: 'comment-123',
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.isThreadExist = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.isCommentExist = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyLike = jest.fn()
      .mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.unlikeComment = jest.fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const likeCommentUseCase = new LikeCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    await likeCommentUseCase.execute(
      useCasePayload.owner,
      useCasePayload.threadId,
      useCasePayload.commentId,
    );

    // Assert
    expect(mockThreadRepository.isThreadExist)
      .toHaveBeenCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.isCommentExist)
      .toHaveBeenCalledWith(useCasePayload.commentId);
    expect(mockCommentRepository.verifyLike)
      .toHaveBeenCalledWith(useCasePayload.owner, useCasePayload.commentId);
    expect(mockCommentRepository.unlikeComment)
      .toHaveBeenCalledWith(useCasePayload.owner, useCasePayload.commentId);
  });
});
