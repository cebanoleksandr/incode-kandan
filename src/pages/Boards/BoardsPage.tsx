import React, { useState } from 'react';
import './BoardsPage.scss';
import { BoardCard } from '../../components/BoardCard/BoardCard';
import { AddBoardModal } from '../../components/AddBoardModal/AddBoardModal';
import { BackDrop } from '../../components/BackDrop/BackDrop';
import { useAppSelector } from '../../redux/hooks';

export const BoardsPage = () => {
  const [isAddBoardModal, setIsAddBoardModal] = useState(false);
  const boadrs = useAppSelector(state => state.boards.items);

  const onClose = () => {
    setIsAddBoardModal(false);
  }

  return (
    <div className="boards-page">
      <h1>Boards</h1>

      <div className="boards-list">
        {!boadrs.length && (
          <h2>
            There are no boards yet. You can <button className="btn-link" onClick={() => setIsAddBoardModal(true)}>
              add a board
            </button>
          </h2>
        )}
        {boadrs.map(board => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>

      <div className="add-btn">
        <i className="fas fa-plus fa-lg add-icon" onClick={() => setIsAddBoardModal(true)}></i>
      </div>

      {isAddBoardModal && (
        <>
          <AddBoardModal onClose={onClose} />
          <BackDrop onClick={onClose} />
        </>
      )}
    </div>
  );
}
