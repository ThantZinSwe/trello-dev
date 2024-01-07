export interface BoardProps {
  id: string;
  title: string;
}

export interface BoardIdProps {
  params: {
    boardId: string;
  };
}

export interface InfoProps {
  isPro: boolean;
}
