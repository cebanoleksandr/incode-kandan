import React from "react";
import './DeleteCardModal.scss';
import { useAppDispatch } from "../../redux/hooks";
import { clearInfo, setInfo } from "../../redux/notificationReducer";
import { CardType } from "../../utils/types";
import { removeCardAC } from "../../redux/cardsReducer";

type Props = {
  onClose: () => void;
  card: CardType;
}

export const DeleteCardModal: React.FC<Props> = ({ onClose, card }) => {
  const dispatch = useAppDispatch();

  const removeCard = () => {
    dispatch(removeCardAC(card.id));

    setTimeout(() => {
      onClose();
      dispatch(setInfo(`Card with ID "${card.id}" is deleted`));
    }, 0);

    setTimeout(() => {
      dispatch(clearInfo());
    }, 4000);
  }

  return (
    <div className="modal">
      <h2 className="text-center text-primary">
        Are you sure that you want to delete this card?
      </h2>

      <div className="btns">
        <button className="btn btn-success btn-block mr10" onClick={removeCard}>
          Yes
        </button>

        <button className="btn btn-danger btn-block" onClick={onClose}>
          Cancel
        </button>
      </div>

      <i className="fas fa-times-circle fa-lg close-icon" onClick={onClose}></i>
    </div>
  );
}
