import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { v4 as uuid } from 'uuid';
import './CardDetailPage.scss';
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addCommentAC } from "../../redux/commentsReducer";
import { Comment as CommentType, Status } from "../../utils/types";
import { getDate } from "../../utils/helpers";
import { Comment } from "../../components/Comment/Comment";
import classNames from "classnames";

export const CardDetailPage = () => {
  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const commentsFieldRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();

  if (!id) {
    navigate('/error');
  }

  const card = useAppSelector(state => state.cards.items.find(c => c.id === id))!;
  const comments = useAppSelector(state => state.comments.items.filter(c => c.cardId === card.id));

  useEffect(() => {
    if (commentsFieldRef.current) {
      commentsFieldRef.current.scrollTo({
        top: commentsFieldRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [comments.length]);

  if (!card) {
    navigate('/error');
  }

  const changeCommentText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
  }

  const sendComment = () => {
    if (!commentText) {
      return;
    }

    const newComment: CommentType = {
      id: uuid(),
      cardId: card.id,
      text: commentText,
      author: {fullname: 'Alex Cheban', email: 'alex@gmail.com', password: '12345678'},
      date: getDate()
    }

    setCommentText('');
    dispatch(addCommentAC(newComment));
  }

  return (
    <div className="card-detail">
      <div className="card-detail-field">
        <h1>{card?.title}</h1>

        <div className="space-between mb20">
          <small>{card?.author.fullname}</small>

          <small>{card.date || getDate()}</small>
        </div>

        <div className="mb20">
          Status: <strong className={classNames({
            'text-primary': card.status === Status.ToDo,
            'text-warning': card.status === Status.InProgress,
            'text-success': card.status === Status.Done
          })}>{card?.status}</strong>
        </div>

        <div className="mb20">{ card?.description }</div>

        <textarea
          placeholder="Add comment"
          className="mb10"
          value={commentText}
          onChange={changeCommentText}
        ></textarea>

        <div className="text-right mb20">
          <button className="btn btn-primary" onClick={sendComment}>Add comment</button>
        </div>

        <div className="mb20 comments-field" ref={commentsFieldRef}>
          {!comments.length && (
            <h2 className="text-center text-primary">
              There are no comments yet. Please, add some
            </h2>
          )}
          {comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}
