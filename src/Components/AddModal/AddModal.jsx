import { useState } from 'react';
import getCroppedImg64 from '../getImage64';
import Cropper from 'react-easy-crop';

function AddModal({ setAddModal }) {
  const [rotation, setRotation] = useState(0);
  const [rotation1, setRotation1] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageSrc1, setImageSrc1] = useState(null);
  const [cover, setCover] = useState('');
  const [cover1, setCover1] = useState('');
  const [avatarModal, setAvatarModal] = useState(false);
  const [avatarModal1, setAvatarModal1] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [crop1, setCrop1] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [zoom1, setZoom1] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedAreaPixels1, setCroppedAreaPixels1] = useState(null);
  console.log(cover);
  const onFileChange1 = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(file);
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };
  const onFileChange2 = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(file);
      let imageDataUrl = await readFile(file);
      setImageSrc1(imageDataUrl);
    }
  };
  const handleSubm = async () => {
    if (imageSrc && croppedAreaPixels) {
      const croppedImage = await getCroppedImg64(imageSrc, croppedAreaPixels, rotation);
      setCover(croppedImage);
    }
    setAvatarModal(false);
  };
  const onZoomChange = zoom => {
    setZoom(zoom);
  };
  const handleSubm1 = async () => {
    if (imageSrc1 && croppedAreaPixels1) {
      const croppedImage = await getCroppedImg64(
        imageSrc1,
        croppedAreaPixels1,
        rotation1
      );
      setCover1(croppedImage);
    }
    setAvatarModal1(false);
  };
  const onZoomChange1 = zoom => {
    setZoom1(zoom);
  };

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    try {
      if (imageSrc) {
        setCroppedAreaPixels(croppedAreaPixels);
      }
    } catch (error) {
      console.error('Ошибка при обрезке изображения:', error);
    }
  };
  const onCropComplete1 = async (croppedArea, croppedAreaPixels1) => {
    try {
      if (imageSrc1) {
        setCroppedAreaPixels1(croppedAreaPixels1);
      }
    } catch (error) {
      console.error('Ошибка при обрезке изображения:', error);
    }
  };
  const handleRotation = () => {
    if (rotation === 0) {
      setRotation(90);
    }
    if (rotation === 90) {
      setRotation(180);
    }
    if (rotation === 180) {
      setRotation(270);
    }
    if (rotation === 270) {
      setRotation(0);
    }
  };

  const options = [
    'Агрономия',
    'Ветеринарно-санитарная экспертиза',
    'Зоотехния',
    'Садоводство',
    'Технология производства и переработки сельскохозяйственной продукции',
    'Биология',
    'Химия',
    'География',
    'Гидрометеорология',
    'Дизайн архитектурной среды',
    'Картография и геоинформатика',
    'Нефтегазовое дело',
    'Сервис',
    'Туризм',
    'Экология и природопользование',
    'Лингвистика',
    'Журналистика',
    'Психология',
    'Психолого-педагогическое образование',
    'Филология',
    'Зарубежное регионоведение',
    'История',
    'Культурология',
    'Музеология и охрана объектов культурного и природного наследия',
    'Лечебное дело',
    'Медико-профилактическое дело',
    'Медицинская биофизика',
    'Медицинская биохимия',
    'Педиатрия',
    'Стоматология',
    'Фармация',
    'Государственное и муниципальное управление',
    'Менеджмент',
    'Управление персоналом',
    'Бизнес-информатика',
    'Инфокоммуникационные технологии и системы связи',
    'Информатика и вычислительная техника',
    'Информационная безопасность',
    'Математика',
    'Прикладная математика и информатика',
    'Программная инженерия',
    'Радиофизика',
    'Физика',
    'Торговое дело',
    'Финансы и кредит',
    'Экономика',
    'Социальная работа',
    'Юриспруденция',
  ];
  const [inputValue, setInputValue] = useState('');
  const [skills, setSkills] = useState([]);

  const handleChangeSkills = e => {
    setInputValue(e.target.value);
  };

  const handleSkills = e => {
    e.preventDefault();
    // Добавляем новый навык в массив
    setSkills([...skills, inputValue]);
    // Очищаем поле ввода
    setInputValue('');
  };
  const [formData, setFormData] = useState({
    fullName: '',
    description: '',
    teachers: '',
    doctors: '',
    candidate: '',
    science: '',
    people: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const formSend = new FormData();
      formSend.append('avatar', cover);
      formSend.append('banner', cover1);
      formSend.append('name', formData.fullName);
      formSend.append('description', formData.description);
      formSend.append('teachers', formData.teachers);
      formSend.append('doctors', formData.doctors);
      formSend.append('candidate', formData.candidate);
      formSend.append('science', formData.science);
      formSend.append('people', formData.people);

      // Загрузка скиллов
      formSend.append('skills', JSON.stringify(skills));

      const response = await fetch('http://localhost:4007/service/create', {
        method: 'POST',
        body: formSend,
      });
      setAddModal(false);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log('Данные успешно отправлены:', data);
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error.message);
    }
  };

  return (
    <>
      {imageSrc && avatarModal && (
        <div className="h-[100%] z-[9999]  ">
          <div className="w-[100%]  h-[1200px] crop_cont  absolute left-0">
            <div
              className="max-w-[500px] rounded-[24px] h-[600px] top-[5%] absolute left-0 bg-white z-[9999]"
              style={{ left: '50%', transform: 'translateX(-50%)' }}
            >
              <h1 className="relative text-center top-[2.4%] font-[500] text-[18px]">
                Обрежьте фото
              </h1>
              <div className="flex justify-center w-[100%] my-6 text-center">
                <span className="text-[14px] max-w-[90%]   relative inline-block">
                  Кадрируйте изображения как вам удобно и сохраните его как обложку вашей
                  страницы
                </span>
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '28%',
                  left: '50%',
                  width: '94%',
                  height: '30%',
                  transform: 'translateX(-50%)',
                }}
              >
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={4 / 4}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={onZoomChange}
                  cropShape="round"
                  rotation={rotation}
                />
              </div>
              <button
                className="absolute  text-primary text-[16px] font-[500]   z-[99999] rounded-[20px] flex justify-center items-center underline"
                style={{
                  top: '65%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={handleRotation}
              >
                Перевернуть на 90°
              </button>
              <button
                className="absolute bg-primary text-[18px] font-[500] text-white  z-[99999] rounded-[10px] w-[80%] h-[55px] flex justify-center items-center"
                style={{
                  top: '74%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={handleSubm}
              >
                Сохранить изменения
              </button>
              <button
                className="absolute bg-white text-[18px] font-[500] text-primary border-[2px]  z-[99999] rounded-[10px] w-[80%] h-[55px] flex justify-center items-center"
                style={{
                  top: '86%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={handleSubm}
              >
                Отменить изменения
              </button>
            </div>
          </div>
        </div>
      )}
      {imageSrc1 && avatarModal1 && (
        <div className="h-[100%] z-[9999]  ">
          <div className="w-[100%]  h-[1200px] crop_cont  absolute left-0">
            <div
              className="max-w-[500px] rounded-[24px] h-[600px] top-[5%] absolute left-0 bg-white z-[9999]"
              style={{ left: '50%', transform: 'translateX(-50%)' }}
            >
              <h1 className="relative text-center top-[2.4%] font-[500] text-[18px]">
                Обрежьте фото
              </h1>
              <div className="flex justify-center w-[100%] my-6 text-center">
                <span className="text-[14px] max-w-[90%]   relative inline-block">
                  Кадрируйте изображения как вам удобно и сохраните его как обложку вашей
                  страницы
                </span>
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '28%',
                  left: '50%',
                  width: '94%',
                  height: '30%',
                  transform: 'translateX(-50%)',
                }}
              >
                <Cropper
                  image={imageSrc1}
                  crop={crop1}
                  zoom={zoom1}
                  aspect={16 / 5.92}
                  onCropChange={setCrop1}
                  onCropComplete={onCropComplete1}
                  onZoomChange={onZoomChange1}
                  rotation={rotation1}
                />
              </div>
              <button
                className="absolute  text-primary text-[16px] font-[500]   z-[99999] rounded-[20px] flex justify-center items-center underline"
                style={{
                  top: '65%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={handleRotation}
              >
                Перевернуть на 90°
              </button>
              <button
                className="absolute bg-primary text-[18px] font-[500] text-white  z-[99999] rounded-[10px] w-[80%] h-[55px] flex justify-center items-center"
                style={{
                  top: '74%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={handleSubm1}
              >
                Сохранить изменения
              </button>
              <button
                className="absolute bg-white text-[18px] font-[500] text-primary border-[2px]  z-[99999] rounded-[10px] w-[80%] h-[55px] flex justify-center items-center"
                style={{
                  top: '86%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={handleSubm1}
              >
                Отменить изменения
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="App min-h-[100%]   w-[100%] absolute left-0 right-0  mx-auto "
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={() => setAddModal(false)}
      >
        <div
          className="w-[851px] h-[1500px] my-8 p-[30px] bg-white rounded-[25px]  flex-col justify-start items-start gap-2.5 inline-flex"
          onClick={e => e.stopPropagation()}
        >
          <div className="h-[988px] max-w-[790px] flex-col justify-start items-start gap-5 flex">
            <div className="self-stretch h-[988px] flex-col justify-start items-start gap-[30px] flex">
              <div className="self-stretch h-[908px] flex-col justify-start items-start gap-[22px] flex">
                <div className="flex-col justify-center items-center gap-[22px] flex">
                  <div className="self-stretch h-[34px] flex-col justify-start items-start gap-[22px] flex">
                    <div className="w-[791px] justify-between items-center inline-flex">
                      <div className="grow shrink basis-0 text-black text-[25px] font-semibold font-['Manrope']">
                        Добавление университета
                      </div>
                      <button
                        onClick={() => setAddModal(false)}
                        className="h-[27px] justify-end items-center gap-2.5 flex"
                      >
                        <div className="grow shrink basis-0 text-right text-blue-500 text-xl font-normal font-['Manrope']">
                          Закрыть
                        </div>
                      </button>
                    </div>
                  </div>
                  {imageSrc1 ? (
                    <div className="w-[800px] h-[200px] relative flex-grow">
                      <img className="w-full h-full object-cover " src={cover1} />
                    </div>
                  ) : (
                    <div className="p-14 bg-slate-50 rounded-[100px] justify-start items-start gap-2.5 inline-flex">
                      <div className="w-9 h-9 relative">
                        <img src="Layer.svg" />
                      </div>
                    </div>
                  )}
                  <div className="flex-col justify-center items-center gap-2.5 flex">
                    <div className="px-5 py-2.5  bg-blue-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex">
                      <label htmlFor="avatarFileInput1" style={{ cursor: 'pointer' }}>
                        <div className="text-white text-[15px] font-normal font-['Manrope']">
                          Добавить обложку
                        </div>
                      </label>
                    </div>
                    {imageSrc ? (
                      <div className="w-[148px] h-[148px] rounded-[5000px] relative flex-grow">
                        <img
                          className="w-full h-full object-cover rounded-[5000px]"
                          src={cover}
                        />
                      </div>
                    ) : (
                      <div className="p-14 bg-slate-50 rounded-[100px] justify-start items-start gap-2.5 inline-flex">
                        <div className="w-9 h-9 relative">
                          <img src="Layer.svg" />
                        </div>
                      </div>
                    )}

                    <input
                      id="avatarFileInput1"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none', cursor: 'pointer' }}
                      className="z-[9999]"
                      onChange={onFileChange2}
                      onClick={() => setAvatarModal1(true)}
                    />

                    <div className="px-5 py-2.5 mt-3 bg-blue-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex">
                      <label htmlFor="avatarFileInput" style={{ cursor: 'pointer' }}>
                        <div className="text-white text-[15px] font-normal font-['Manrope']">
                          Добавить фото
                        </div>
                      </label>
                    </div>
                    <input
                      id="avatarFileInput"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none', cursor: 'pointer' }}
                      className="z-[9999]"
                      onChange={onFileChange1}
                      onClick={() => setAvatarModal(true)}
                    />
                  </div>
                </div>
                <div className="self-stretch opacity-80 justify-start items-start gap-2.5 inline-flex">
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                    <div className="self-stretch text-left text-black text-xl font-semibold font-['Manrope']">
                      Название университета
                    </div>
                    <input
                      placeholder="Название университета"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="self-stretch px-5 py-[15px] bg-slate-50 rounded-[10px] border border-neutral-400 justify-start items-center gap-2.5 inline-flex"
                    />
                  </div>
                </div>
                <div className="w-[100%]">
                  <div className="grow shrink min-w-[100%] basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                    <div className="self-stretch text-left text-black text-xl font-semibold font-['Manrope']">
                      Описание
                    </div>
                    <input
                      name="description"
                      placeholder="Описание"
                      value={formData.description}
                      onChange={handleChange}
                      className="self-stretch  max-w-[100%] px-5 py-[15px] bg-slate-50 rounded-[10px] border border-neutral-400 justify-start items-center gap-2.5 inline-flex"
                    />
                  </div>
                </div>
                <div className="grow shrink basis-0 w-[100%] flex-col justify-start items-start gap-2.5 inline-flex">
                  <div className="self-stretch text-left text-black text-xl font-semibold font-['Manrope']">
                    Кол-во людей
                  </div>
                  <input
                    placeholder="2000"
                    name="people"
                    value={formData.people}
                    onChange={handleChange}
                    className="self-stretch px-5 py-[15px] bg-slate-50 rounded-[10px] border border-neutral-400 justify-start items-center gap-2.5 inline-flex"
                  />
                </div>
                <div className="grow shrink w-[100%] basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                  <div className="self-stretch text-black text-xl text-left font-semibold font-['Manrope']">
                    Кол-во преподавателей
                  </div>
                  <input
                    placeholder="4"
                    name="teachers"
                    value={formData.teachers}
                    onChange={handleChange}
                    className="self-stretch px-5 py-[15px] bg-slate-50 rounded-[10px] border border-neutral-400 justify-start items-center gap-2.5 inline-flex"
                  />
                </div>
                <div className="grow shrink  w-[100%] basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                  <div className="self-stretch text-black text-xl  text-left font-semibold font-['Manrope']">
                    Кол-во докторов наук
                  </div>
                  <input
                    placeholder="4"
                    name="doctors"
                    value={formData.doctors}
                    onChange={handleChange}
                    className="self-stretch px-5 py-[15px] bg-slate-50 rounded-[10px] border border-neutral-400 justify-start items-center gap-2.5 inline-flex"
                  />
                </div>
                <div className="grow shrink  w-[100%] basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                  <div className="self-stretch text-black text-xl  text-left font-semibold font-['Manrope']">
                    Кол-во кандидатов наук
                  </div>
                  <input
                    placeholder="4"
                    name="candidate"
                    value={formData.candidate}
                    onChange={handleChange}
                    className="self-stretch px-5 py-[15px] bg-slate-50 rounded-[10px] border border-neutral-400 justify-start items-center gap-2.5 inline-flex"
                  />
                </div>
                <div className="grow shrink  w-[100%] basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                  <div className="self-stretch text-black text-xl  text-left font-semibold font-['Manrope']">
                    Кол-во научных сотрудников
                  </div>
                  <input
                    placeholder="4"
                    name="science"
                    value={formData.science}
                    onChange={handleChange}
                    className="self-stretch px-5 py-[15px] bg-slate-50 rounded-[10px] border border-neutral-400 justify-start items-center gap-2.5 inline-flex"
                  />
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="self-stretch px-[30px] mt-[56%] py-[15px] bg-blue-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex"
              >
                <div className="text-white text-[15px] font-normal font-['Manrope']">
                  Добавить университет
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export default AddModal;
