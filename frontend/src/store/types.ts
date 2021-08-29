export interface PlayerState {
  id: String | undefined;
  name: string;
  profilePic: string;
  score: Number;
  owner: Boolean;
  token: String | null;
}

export interface RootState {
  strict: Boolean;
  version: string;
  isSidebarMinimized: Boolean;
  isLoading: Boolean;
  token: String | null;
  playerId: String;
}

export interface RoomState {
  id: String | undefined;
  players: any;
  status: String;
  name: String;
  totalCards: Number;
  currentPlayer: PlayerState | null;
  deckCardsCount: Number;
  nextTurnTime: Date | null;
  selectedCard: Number;
  prevSelectedCard: Number;
  removedCardIndices: [Number] | [];
}
