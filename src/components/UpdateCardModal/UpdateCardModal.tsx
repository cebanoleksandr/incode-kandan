import React, { ChangeEvent, FormEvent, useState } from "react";
import './UpdateCardModal.scss';
import { useAppDispatch } from "../../redux/hooks";
import { clearInfo, setInfo } from "../../redux/notificationReducer";
import { CardType, Status } from "../../utils/types";
import { updateCardAC } from "../../redux/cardsReducer";
import { getDate } from "../../utils/helpers";

type Props = {
  onClose: () => void;
  card: CardType;
}

export const UpdateCardModal: React.FC<Props> = ({ onClose, card }) => {
  const [status, setStatus] = useState(card.status);
  const [title, setTitle] = useState(card.title);
  const [titleError, setTitleError] = useState('');
  const [isTitleTouched, setIsTitleTouched] = useState(false);
  const [description, setDescription] = useState(card.description);
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

  const changeStatusHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as Status);
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

    const updatedCard: CardType = {
      ...card,
      title,
      date: getDate(),
      status,
      description
    }

    dispatch(updateCardAC(updatedCard));

    setTimeout(() => {
      reset();
      onClose();
      dispatch(setInfo(`The card with ID "${card.id}" is successfully updated`));
    }, 0);

    setTimeout(() => {
      dispatch(clearInfo());
    }, 4000);
  }

  return (
    <div className="modal">
      <form className="form-control" onSubmit={onSubmitHandler}>
        <h2 className="text-primary text-center">Update the card</h2>

        <input
          type="text"
          placeholder="New title..."
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

        <select
          value={status}
          onChange={changeStatusHandler}
          className="mb20"
        >
          <option value={Status.ToDo}>To do</option>
          <option value={Status.InProgress}>In progress</option>
          <option value={Status.Done}>Done</option>
        </select>

        <button type="submit" className="btn btn-success btn-block mb10">
          Update the card
        </button>

        <button type="button" className="btn btn-danger btn-block" onClick={onClose}>
          Cancel
        </button>
      </form>

      <i className="fas fa-times-circle fa-lg close-icon" onClick={onClose}></i>
    </div>
  );
}
