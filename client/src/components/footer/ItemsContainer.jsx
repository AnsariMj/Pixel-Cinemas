import { FilmIcon } from "@heroicons/react/24/solid";
import Item from "./Item.jsx";
import { LINKS, SUPPORT } from "./Menus";
const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1  sm:grid-cols-3 lg:grid-cols-3 gap-6 sm:px-8 px-5 py-16">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="font-bold text-3xl cursor-pointer text-white flex items-center gap-1"
      >
        <FilmIcon className="w-20 h-20 text-orange-500" />
        <span>Pixel Cinemas</span>
      </div>
      <Item Links={LINKS} title="LINKS" />
      <Item Links={SUPPORT} title="CONTACT INFO" />
    </div>
  );
};

export default ItemsContainer;
