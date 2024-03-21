import React, { useState } from "react";
import './BoardCard.scss';
import { Link } from "react-router-dom";
import { BackDrop } from "../BackDrop/BackDrop";
import { UpdateBoardModal } from "../UpdateBoardModal/UpdateBoardModal";
import { DeleteBoardModal } from "../DeleteBoardModal/DeleteBoardModal";
import { Board } from "../../utils/types";

type Props = {
  board: Board;
}

export const BoardCard: React.FC<Props> = ({ board }) => {
  const [isUpdatingBoardTitle, setIsUpdatingBoardTitle] = useState(false);
  const [isDeletingBoard, setIsDeletingBoard] = useState(false);

  const onCloseUpdate = () => {
    setIsUpdatingBoardTitle(false);
  }

  const onCloseDelete = () => {
    setIsDeletingBoard(false);
  }

  return (
    <div className="board-card mr10 mb10 text-center">
      <img
        src="https://www.board.com/sites/default/files/homepage-opengraph_1.jpg"
        className="board-img"
        alt=""
      />

      <h2>
        <Link to={`/boards/${board.id}`} className="link">
          {board.title}
        </Link>
      </h2>

      <small>{board.author.fullname}</small>

      <div className="text-right">
        <i className="fas fa-edit mr10 icon-edit" onClick={() => setIsUpdatingBoardTitle(true)}></i>

        <i className="fas fa-trash-alt icon-trash" onClick={() => setIsDeletingBoard(true)}></i>
      </div>

      {isUpdatingBoardTitle && (
        <>
          <UpdateBoardModal onClose={onCloseUpdate} board={board} />
          <BackDrop onClick={onCloseUpdate} />
        </>
      )}
      {isDeletingBoard && (
        <>
          <DeleteBoardModal onClose={onCloseDelete} boardId={board.id} />
          <BackDrop onClick={onCloseDelete} />
        </>
      )}
    </div>
  );
}
