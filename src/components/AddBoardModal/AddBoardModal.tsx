import React, { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import './AddBoardModal.scss';
import { useAppDispatch } from '../../redux/hooks';
import { clearInfo, setInfo } from '../../redux/notificationReducer';
import { Board } from '../../utils/types';
import { addBoardAC } from '../../redux/boardsReducer';

type Props = {
  onClose: () => void;
}

export const AddBoardModal: React.FC<Props> = ({ onClose }) => {
  const [title, setTitle] = useState('');
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

    const newBoard: Board = {
      id: uuid(),
      title,
      author: {
        fullname: 'Alex Cheban', // to do real user
        email: 'alex@gmail.com',
        password: '12345678'
      }
    }

    dispatch(addBoardAC(newBoard));

    setTimeout(() => {
      setTitle('');
      onClose();
      dispatch(setInfo('You successfully created a board'));
    }, 0);

    setTimeout(() => {
      dispatch(clearInfo());
    }, 4000);
  }

  return (
    <div className="modal">
      <form className="form-control" onSubmit={onSubmitHandler}>
        <h2 className="text-primary text-center">Create a board</h2>

        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={changeTitleValue}
          onBlur={touchTitleHandler}
        />

        <div className="validation">
          <small>{ titleError }</small>
        </div>

        <button className="btn btn-success btn-block">
          Create a board
        </button>
      </form>

      <i className="fas fa-times-circle fa-lg close-icon" onClick={onClose}></i>
    </div>
  );
}
