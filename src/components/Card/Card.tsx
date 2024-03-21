import React, { useState } from 'react';
import './Card.scss';
import { BackDrop } from '../BackDrop/BackDrop';
import { UpdateCardModal } from '../UpdateCardModal/UpdateCardModal';
import { DeleteCardModal } from '../DeleteCardModal/DeleteCardModal';
import { CardType } from '../../utils/types';
import { Link } from 'react-router-dom';

type Props = {
  card: CardType;
}

export const Card: React.FC<Props> = ({ card }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onCloseUpdateModal = () => {
    setIsUpdating(false);
  }

  const onCloseDeleteModal = () => {
    setIsDeleting(false);
  }

  return (
    <div className="card mb10">
      <h3>
        <Link to={`/cards/${card.id}`} className="link">{ card.title }</Link>
      </h3>

      <p>{ card.description }</p>

      <small>Autor: { card.author.fullname }</small>

      <div className="text-right">
        <i className="fas fa-edit mr10 icon-edit" onClick={() => setIsUpdating(true)}></i>

        <i className="fas fa-trash-alt icon-trash" onClick={() => setIsDeleting(true)}></i>
      </div>

      {isUpdating && (
        <>
          <UpdateCardModal onClose={onCloseUpdateModal} card={card} />
          <BackDrop onClick={onCloseUpdateModal} />
        </>
      )}
      {isDeleting && (
        <>
          <DeleteCardModal onClose={onCloseDeleteModal} card={card} />
          <BackDrop onClick={onCloseDeleteModal} />
        </>
      )}
    </div>
  );
}
