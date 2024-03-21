import React, { useState } from 'react';
import './BoardColumn.scss';
import { Card } from '../Card/Card';
import { AddCardModal } from '../AddCardModal/AddCardModal';
import { BackDrop } from '../BackDrop/BackDrop';
import { useAppSelector } from '../../redux/hooks';
import { normalizeCards } from '../../utils/helpers';

type Props = {
  title: string;
  boardId: string;
}

export const BoardColumn: React.FC<Props> = ({ title, boardId }) => {
  const isBackLog = title === 'To do';
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const cards = normalizeCards(useAppSelector(state => state.cards.items), title, boardId);

  const onClose = () => {
    setIsCreatingCard(false);
  }

  return (
    <div className="board-column">
      <h2 className="text-center">{title}</h2>

      <div className="board-field">
        {!cards.length && (
          <h3 className="text-center text-primary">There are no tasks</h3>
        )}
        {cards.map(card => (
          <Card key={card.id} card={card} />
        ))}

        {isBackLog && (
          <button className="btn btn-success btn-block" onClick={() => setIsCreatingCard(true)}>
            Add card
          </button>
        )}
      </div>

      {isCreatingCard && (
        <>
          <AddCardModal onClose={onClose} boardId={boardId} />
          <BackDrop onClick={onClose} />
        </>
      )}
    </div>
  );
}
