import LOGO from '../assets/SHOP.CO.png';
import searchIcon from '../assets/search.png';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaChevronUp } from 'react-icons/fa';
import { LuShoppingCart } from 'react-icons/lu';
import { FaRegCircleUser } from 'react-icons/fa6';
import { CiSearch } from 'react-icons/ci';
import { HiMiniBars3 } from 'react-icons/hi2';
import { setOption } from '../Store/optionShow';
import { setBarShow } from '../Store/barShow';

const MobileHeader = () => {
  const barShow = useSelector((store) => store.barShow);
  const optionsShow = useSelector((store) => store.optionShow);
  const options = useSelector((store) => store.pages);
  const dispatch = useDispatch();

  const AllProduct = useSelector((store) => store.CART.arr);

  let countProduct = 0;
  for (let i = 0; i < AllProduct.length; i++) {
    countProduct += AllProduct[i].count;
  }

  return (
    <>
      <div className="flex h-7 m-3 items-center justify-between md:hidden relative">
        <div className="flex gap-4 relative">
          <div onClick={() => dispatch(setOption())} className="cursor-pointer">
            {!optionsShow ? (
              <HiMiniBars3 />
            ) : (
              <RxCross2 className="w-[24px] h-[24px]" />
            )}
          </div>

          {optionsShow && (
            <ul className="absolute top-8 left-0 z-50 w-[150px] p-4 rounded-2xl shadow-md shadow-gray-300 bg-white text-gray-800 space-y-2">
              {options.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-2 py-2 rounded-md cursor-pointer transition-colors duration-200 text-sm text-center hover:bg-gray-100 ${
                      isActive ? 'font-semibold text-black' : ''
                    }`
                  }
                  onClick={() => dispatch(setOption())}
                >
                  {({ isActive }) => (
                    <li className="list-none flex justify-center items-center gap-1">
                      {item.layout}
                      {isActive && <FaChevronUp className="ml-1" />}
                    </li>
                  )}
                </NavLink>
              ))}
            </ul>
          )}

          <img src={LOGO} alt="Logo" className="w-[120px] cursor-pointer" />
        </div>

        <div className="flex gap-4 h-1.5">
          <CiSearch
            onClick={() => dispatch(setBarShow())}
            className="cursor-pointer"
          />
          <div className="relative inline-block">
            <NavLink to="/cart" className="text-gray-800">
              <LuShoppingCart size={20} />
              {countProduct > 0 && (
                <span className="absolute -top-2.5 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {countProduct}
                </span>
              )}
            </NavLink>
          </div>
          <FaRegCircleUser className="cursor-pointer" />
        </div>
      </div>

      {barShow && (
        <div className="relative w-[80%] mx-auto mt-3 md:hidden mb-3 z-40">
          <img
            src={searchIcon}
            alt="Search Icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-pointer"
          />
          <input
            type="text"
            placeholder="Search For Products..."
            className="w-full h-9 rounded-3xl bg-gray-100 pl-10 pr-4 py-[6px] text-sm placeholder-gray-500 outline-none"
          />
        </div>
      )}
    </>
  );
};

export default MobileHeader;
