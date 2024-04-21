import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const handleRemoveToken = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  return (
    <div className="App">
      <header className="bg-white h-[80px] w-[100%] flex  items-center px-4">
        <div className="flex w-[80%] justify-around ml-[16%]">
          <Link to="/university" className="flex justify-center items-center flex-grow">
            <span className="text-black font-manrope font-[800]">
              go.<span className="text-blueText ">Университеты</span>
            </span>
          </Link>
          <Link to="/profile" className="flex justify-center items-center flex-grow">
            <span className="text-black font-manrope font-[800]">
              go.<span className="text-blueText ">Студенты</span>
            </span>
          </Link>
          <Link to="/panorama" className="flex justify-center items-center flex-grow">
            <span className="text-black font-manrope font-[800]">
              go.<span className="text-blueText ">Панорама</span>
            </span>
          </Link>
          <button
            onClick={handleRemoveToken}
            className="flex justify-end items-center w-1/5"
          >
            <div className="w-[104px] h-10 px-[30px] py-2.5 bg-red-500 rounded-[10px] justify-start items-center gap-2 inline-flex">
              <div className="text-center text-white text-[15px] font-normal font-['Manrope']">
                Выйти
              </div>
            </div>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
