import React from "react";
import './DeleteBoardModal.scss';
import { useAppDispatch } from "../../redux/hooks";
import { clearInfo, setInfo } from "../../redux/notificationReducer";
import { removeBoardAC } from "../../redux/boardsReducer";

type Props = {
  onClose: () => void;
  boardId: string;
}

export const DeleteBoardModal: React.FC<Props> = ({ onClose, boardId }) => {
  const dispatch = useAppDispatch();

  const removeBoard = () => {
    dispatch(removeBoardAC(boardId));

    setTimeout(() => {
      onClose();
      dispatch(setInfo(`Board with ID "${boardId}" is deleted`));
    }, 0);

    setTimeout(() => {
      dispatch(clearInfo());
    }, 4000);
  }

  return (
    <div className="modal">
      <h2 className="text-center text-primary">
        Are you sure that you want to delete this board?
      </h2>

      <div className="btns">
        <button className="btn btn-success btn-block mr10" onClick={removeBoard}>
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
