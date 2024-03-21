import { CardType, Status } from "./types";

export const normalizeCards = (cards: CardType[], title: string, boardId: string): CardType[] => {
  let filteredCards = cards.filter(c => c.boardId === boardId);

  if (title === 'To do') {
    filteredCards = filteredCards.filter(c => c.status === Status.ToDo);
  }

  if (title === 'In progress') {
    filteredCards = filteredCards.filter(c => c.status === Status.InProgress);
  }

  if (title === 'Done') {
    filteredCards = filteredCards.filter(c => c.status === Status.Done);
  }

  return filteredCards;
}

export const getDate = () => {
  return new Date().toLocaleDateString() + ', ' + new Date().toTimeString().split(' ')[0];
}
