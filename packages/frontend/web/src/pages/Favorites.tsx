import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import type { Cocktail } from '@app/types';

import Stars from '@/components/favorite/Stars';
import Title from '@/components/favorite/Title';
import useFetch from '@/hooks/use-fetch';

const url = `${import.meta.env.VITE_API_URL}/favorite/`;

const image = (image: string, total_degree: number) => {
  if (image === null) {
    return total_degree > 0
      ? '/placeholder-cocktail.webp'
      : '/placeholder-cocktail-virgin.webp';
  } else {
    return `${import.meta.env.VITE_BACKEND_URL}/${image}`;
  }
};

const removeFavorites = async (id: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/favorite/add/${id}}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );
    await response.json();
  } catch (error) {
    console.error(error);
  }
};

export default function Favorite() {
  const [clickedCocktails, setClickedCocktails] = useState<
    Record<number, boolean>
  >({});

  const navigate = useNavigate();

  const { data } =
    useFetch<
      Pick<
        Cocktail,
        'name' | 'id' | 'image' | 'ratings_average' | 'total_degree'
      >[]
    >(url);

  if (
    data &&
    'message' in data &&
    'ok' in data &&
    data.ok === false &&
    data.message === 'not connected'
  ) {
    navigate('/login');
  }

  return (
    <div
      className='h-screen w-screen overflow-x-hidden overflow-y-scroll bg-cover bg-center bg-no-repeat pt-16'
      style={{ backgroundImage: `url('favorites-bg.webp')` }}
    >
      <Title />
      <div className='px-10'>
        <div className=' flex flex-col items-center justify-center gap-y-10 md:my-5 md:grid md:grid-cols-2 md:flex-row lg:grid-cols-3 xl:grid-cols-4 2xl:px-20'>
          {data === undefined
            ? null
            : data.map((cocktail) => (
                <div key={cocktail.id} className='m-6'>
                  <Link to={`/details/${cocktail.id}`}>
                    <div className='border-dark b-6 me-[28px] h-[336px] w-[288px] rounded-sm border-[3px] bg-[#F575D1]'>
                      <div className='relative'>
                        <div className='border-dark absolute left-[11px] top-[11px] h-[336px] w-[288px] rounded-sm border-[3px] bg-[#F57575]'>
                          <div className='border-dark relative left-[12px] top-[12px] h-[336px] w-[288px] rounded-sm border-[3px] bg-[#EA2879]'>
                            <img
                              src={'/heart.png'}
                              alt='heart'
                              className={`${
                                clickedCocktails[cocktail.id]
                                  ? 'grayscale'
                                  : 'grayscale-0'
                              } absolute bottom-[0px] right-[5px] h-[40px] w-[40px]`}
                              onClick={async (event) => {
                                event.preventDefault();
                                setClickedCocktails({
                                  ...clickedCocktails,
                                  [cocktail.id]: !clickedCocktails[cocktail.id],
                                });
                                await removeFavorites(cocktail.id);
                              }}
                            />
                            <img
                              src={image(cocktail.image, cocktail.total_degree)}
                              alt='Cocktail picture'
                              className='border-dark mx-auto mt-8 h-[13rem] w-[14rem] rounded-sm border-[3px] object-cover'
                            />
                            <div>
                              <div className='mx-4 mt-3 text-center'>
                                <h1 className='font-stroke text-light text-md mb-2'>
                                  {cocktail.name}
                                </h1>
                              </div>
                              <Stars
                                ratings_average={cocktail.ratings_average}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
