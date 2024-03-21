import React from 'react';
import './BoardPage.scss';
import { BoardColumn } from '../../components/BoardColumn/BoardColumn';
import { Search } from '../../components/Search/Search';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

export const BoardPage = () => {
  const { id } = useParams();
  const boards = useAppSelector(state => state.boards.items);
  const board = boards.find(b => b.id === id);

  return (
    <div className="board-page">
      <h1>{board?.title}</h1>

      <Search />

      <div className="board">
        <BoardColumn title="To do" boardId={board?.id!} />
        <BoardColumn title="In progress" boardId={board?.id!} />
        <BoardColumn title="Done" boardId={board?.id!} />
      </div>
    </div>
  );
}
