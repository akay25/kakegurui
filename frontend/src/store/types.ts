enum RoomStatus {
  Suspend = 0,
  Playing
}

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
}

interface RoomState {
  id: String | undefined;
  players: any;
  status: String;
  name: String;
  totalCards: Number;
  deckCardsCount: Number;
  currentPlayer: PlayerState | null;
  selectedCard: Number;
  prevSelectedCard: Number;
  removedCardIndices: [Number] | [];
}
