import { CardItemProps } from "@/interfaces/props/card";

const CardItem = ({ index, card }: CardItemProps) => {
  return (
    <div
      role="button"
      className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
    >
      {card.title}
    </div>
  );
};

export default CardItem;
