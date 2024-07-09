import "./listcard.scss";
import { BiChevronLeft, BiChevronRight, BiTrash } from "react-icons/bi";
import { arrowClick, deleteItem } from "../../redux/taskSlice";
import { useDispatch } from "react-redux";

const ListCard = (items) => {
  const dispatch = useDispatch();

  const ArrowClick = (item, string) => {
    dispatch(arrowClick(item, string));
  };

  const handleDelete = () => {
    dispatch(deleteItem(item._id));
  }

  const { item } = items;
  return (
    <div>
      <ul className={`${item.status === 'done'? 'completed menu' : 'menu'}`}>
        <li>
          <p>{item._id}</p>
          </li>
        <li>
          <p>{item.task}</p>
        </li>
        <li>
          <p>{item.status}</p>
        </li>
        <li>
          <button
            disabled={item.status === "backlog"}
            onClick={() => ArrowClick(item, "left")}
          >
            <BiChevronLeft />
          </button>
          <button
            disabled={item.status === "done"}
            onClick={() => ArrowClick(item, "right")}
          >
            <BiChevronRight />
          </button>
          <button
            onClick={handleDelete}
          >
            <BiTrash/>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ListCard;
