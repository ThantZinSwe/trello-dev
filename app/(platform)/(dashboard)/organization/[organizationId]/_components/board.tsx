import destroy from "@/actions/board/destroy";
import FormButton from "@/components/form/button";
import { BoardProps } from "@/interfaces/props/board";

const Board = ({ id, title }: BoardProps) => {
  const destroyBoard = destroy.bind(null, id);

  return (
    <form action={destroyBoard} className="flex items-center gap-2">
      <p>Board title: {title}</p>
      <FormButton type="submit" variant="destructive" size="sm" text="Delete" />
    </form>
  );
};

export default Board;
