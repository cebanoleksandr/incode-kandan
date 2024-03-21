import React, { ChangeEvent, FormEvent, useState } from 'react';
import './UpdateBoardModal.scss';
import { useAppDispatch } from '../../redux/hooks';
import { clearInfo, setInfo } from '../../redux/notificationReducer';
import { Board } from '../../utils/types';
import { updateBoardAC } from '../../redux/boardsReducer';

type Props = {
  onClose: () => void;
  board: Board;
}

export const UpdateBoardModal: React.FC<Props> = ({ onClose, board }) => {
  const [title, setTitle] = useState(board.title);
  const [titleError, setTitleError] = useState('');
  const [isTitleTouched, setIsTitleTouched] = useState(false);
  const dispatch = useAppDispatch();

  const validateTitle = () => {
    if (!title.length) {
      setTitleError('Title shoud not be empty');
      return true;
    }

    setTitleError('');
    return false;
  }

  const touchTitleHandler = () => {
    setIsTitleTouched(true);
    validateTitle();
  }

  const changeTitleValue = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (isTitleTouched) {
      validateTitle();
    }
  }

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsTitleTouched(true);
    const hasTitleError = validateTitle();

    if (hasTitleError) {
      return;
    }

    const updatedBoard = {
      ...board,
      title
    }

    dispatch(updateBoardAC(updatedBoard));

    setTimeout(() => {
      setTitle('');
      onClose();
      dispatch(setInfo('You successfully updated a board title'));
    }, 0);

    setTimeout(() => {
      dispatch(clearInfo());
    }, 4000);
  }

  return (
    <div className="modal">
      <form className="form-control" onSubmit={onSubmitHandler}>
        <h2 className="text-primary text-center">Update a board title</h2>

        <input
          type="text"
          placeholder="New title..."
          value={title}
          onChange={changeTitleValue}
          onBlur={touchTitleHandler}
        />

        <div className="validation text-left mb10">
          <small>{ titleError }</small>
        </div>

        <button type="submit" className="btn btn-success btn-block mb10">
          Update board title
        </button>

        <button
          type="button"
          className="btn btn-danger btn-block"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>

      <i className="fas fa-times-circle fa-lg close-icon" onClick={onClose}></i>
    </div>
  );
}
