import React, { useState } from "react";
import './Comment.scss';
import { Comment as CommentType } from "../../utils/types";
import { useAppDispatch } from "../../redux/hooks";
import { removeCommentAC, updateCommentAC } from "../../redux/commentsReducer";
import { getDate } from "../../utils/helpers";

type Props = {
  comment: CommentType
}

export const Comment: React.FC<Props> = ({ comment }) => {
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment.text);

  const onClose = () => {
    setIsUpdating(false);
  }

  const removeComment = () => {
    dispatch(removeCommentAC(comment.id));
  }

  const save = () => {
    if (!updatedComment) {
      dispatch(removeCommentAC(comment.id));
    }

    const newComment: CommentType = {
      ...comment,
      text: updatedComment,
      date: getDate()
    }

    onClose();
    dispatch(updateCommentAC(newComment));
  }

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      save();
    }
    
    if (event.key === 'Escape') {
      setUpdatedComment(comment.text);
      save();
    }
  }

  return (
    <div className="comment mb20">
      <div className="comment-author">
        <strong>{comment.author.fullname}</strong>
      </div>

      <div className="comment-text space-between">
        {isUpdating ? (
          <input
            type="text"
            autoFocus
            value={updatedComment}
            className="mr10"
            onChange={e => setUpdatedComment(e.target.value)}
            onBlur={save}
            onKeyDown={keyDownHandler}
          />
        ) : (
          <div className="comment-text-background">{comment.text}</div>
        )}

        <div>
          <span className="mr10">{comment.date}</span>

          <i className="fas fa-edit mr10 icon-edit" onClick={() => setIsUpdating(true)}></i>

          <i className="fas fa-trash-alt icon-trash" onClick={removeComment}></i>
        </div>
      </div>
    </div>
  );
}
