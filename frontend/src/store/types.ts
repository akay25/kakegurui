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

export interface RoomState {
  id: String;
  players: [PlayerState];
  status: String;
  name: String;
}