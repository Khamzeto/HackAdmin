import { useEffect, useState } from 'react';
import AddModal from '../AddModal/AddModal';
import Navbar from '../Navbar';
import getCroppedImg64 from '../getImage64';
import Cropper from 'react-easy-crop';

function AdminPage2({ setAddModal }) {
  const [students, setStudents] = useState([]);
  console.log(students);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4007/service/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Фильтрация пустых или неполных записей

        setStudents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    return () => {
      // Cancel the request here if needed
    };
  }, []);
  const [isChecked, setIsChecked] = useState(true);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  console.log(isChecked);
  return (
    <>
      <Navbar />

      <div className="App mx-[4%] my-6">
        <div className="text-left w-[100%] text-gray-900 text-[25px] font-extrabold font-['Manrope'] leading-[37.50px]">
          Админ-панель
        </div>
        <div className="flex">
          <div className="w-[100%] flex items-left my-8">
            <input
              className="w-[425px] h-[47px] p-2.5 bg-white rounded-[10px]   inline-flex pl-8"
              placeholder="Найти студента"
            />
            <button className="w-[99px] h-[47px] px-5 py-2.5 bg-blue-500 rounded-[10px] justify-center items-center gap-3 inline-flex mx-4">
              <div className="text-white text-xl font-normal font-['Manrope']">Поиск</div>
            </button>
            <button className="w-[188px] h-[47px] px-5 py-2.5 rounded-[10px] border border-blue-500 justify-start items-center gap-2 inline-flex">
              <div className="min-w-[15px] h-[15px] rounded-full border border-blue-500"></div>
              <div className="text-center w-[188px] text-blue-500 text-xl font-normal font-['Manrope']">
                Выбрать все
              </div>
            </button>
          </div>
          <div className="w-[100%] flex justify-end  my-8 ">
            <button class="w-[138px] h-[47px] px-[30px] py-2.5 bg-red-500 rounded-[10px] justify-start items-center gap-2 inline-flex">
              <div class="text-center text-white text-xl font-normal font-['Manrope']">
                Удалить
              </div>
            </button>
            <button
              onClick={() => setAddModal(true)}
              class="w-[153px] h-[47px] px-[30px] py-2.5 bg-blue-500 rounded-[10px] justify-start items-center gap-2 inline-flex mx-2"
            >
              <div class="text-center text-white text-xl font-normal font-['Manrope']">
                Добавить
              </div>
            </button>
          </div>
        </div>
        <div className="text-[50px] font-[700] my-5 mb-[5%]">Университеты</div>
        <div class="w-[100%] h-[30px]  justify-start items-start gap-[113px] inline-flex ml-[6%] my-2">
          <div class="w-[133px] text-gray-900 text-xl font-semibold font-['Manrope'] leading-[30px]">
            Фамилия Имя
          </div>
          <div class="w-[133px] text-gray-900 text-xl font-semibold font-['Manrope'] leading-[30px]">
            Направление
          </div>
          <div class="w-[169px] text-gray-900 text-xl font-semibold font-['Manrope'] leading-[30px]">
            Университет
          </div>
        </div>
        <div className="mt-8">
          {students?.students?.map((stundent, index) => (
            <div
              key={stundent._id}
              class="w-[100%] h-20 mb-4 px-5 py-2.5 bg-white rounded-[15px] justify-start items-center gap-[13px] inline-flex"
            >
              <div class="justify-start items-center gap-[13px] flex">
                <div class="justify-start items-start gap-2.5 flex">
                  <img
                    src={stundent.avatar}
                    class="w-[60px] h-[60px] bg-slate-50 rounded-full"
                  />
                </div>
              </div>
              <div class="grow shrink basis-0 h-10 justify-start items-center gap-[100px] flex">
                <div class="text-gray-900 text-[15px] font-medium font-['Manrope']">
                  {stundent.name}
                </div>
                <div class="text-gray-900 text-[15px] font-medium font-['Manrope']">
                  {stundent.directions}
                </div>
              </div>

              <div class="px-[30px] py-2.5 bg-blue-500 rounded-[10px] justify-start items-center gap-2 flex">
                <div class="text-center text-white text-xl font-normal font-['Manrope']">
                  Изменить
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminPage2;
