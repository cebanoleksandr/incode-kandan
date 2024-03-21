import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuid } from 'uuid';
import './AddCardModal.scss';
import { useAppDispatch } from "../../redux/hooks";
import { clearInfo, setInfo } from "../../redux/notificationReducer";
import { CardType, Status } from "../../utils/types";
import { addCardAC } from "../../redux/cardsReducer";
import { getDate } from "../../utils/helpers";

type Props = {
  onClose: () => void;
  boardId: string;
}

export const AddCardModal: React.FC<Props> = ({ onClose, boardId }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [isTitleTouched, setIsTitleTouched] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [isDescriptionTouched, setIsDescriptionTouched] = useState(false);
  const dispatch = useAppDispatch();

  const validateTitle = () => {
    if (!title.length) {
      setTitleError('Title shoud not be empty');
      return true;
    }

    setTitleError('');
    return false;
  }

  const validateDescription = () => {
    if (!description.length) {
      setDescriptionError('Description shoud not be empty');
      return true;
    }

    setDescriptionError('');
    return false;
  }

  const touchTitleHandler = () => {
    setIsTitleTouched(true);
    validateTitle();
  }

  const touchDescriptionHandler = () => {
    setIsDescriptionTouched(true);
    validateDescription();
  }

  const changeTitleValue = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (isTitleTouched) {
      validateTitle();
    }
  }

  const changeDescriptionValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);

    if (isDescriptionTouched) {
      validateDescription();
    }
  }

  const reset = () => {
    setTitle('');
    setDescription('');
  }

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsTitleTouched(true);
    setIsDescriptionTouched(true);
    const hasTitleError = validateTitle();
    const hasDescriptionError = validateDescription();

    if (hasTitleError || hasDescriptionError) {
      return;
    }

    const newCard: CardType = {
      id: uuid(),
      boardId,
      status: Status.ToDo,
      title,
      description,
      date: getDate(),
      author: {
        fullname: 'Alex Cheban', // implement real user
        email: 'alex@gmail.com',
        password: '12345678'
      }
    }

    dispatch(addCardAC(newCard));

    setTimeout(() => {
      reset();
      onClose();
      dispatch(setInfo('You successfully created a card'));
    }, 0);

    setTimeout(() => {
      dispatch(clearInfo());
    }, 4000);
  }

  return (
    <div className="modal">
      <form className="form-control" onSubmit={onSubmitHandler}>
        <h2 className="text-primary text-center">Create a card</h2>

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

        <textarea
          placeholder="Description..."
          value={description}
          onChange={changeDescriptionValue}
          onBlur={touchDescriptionHandler}
        ></textarea>

        <div className="validation">
          <small>{ descriptionError }</small>
        </div>

        <button className="btn btn-success btn-block">
          Create a card
        </button>
      </form>

      <i className="fas fa-times-circle fa-lg close-icon" onClick={onClose}></i>
    </div>
  );
}
