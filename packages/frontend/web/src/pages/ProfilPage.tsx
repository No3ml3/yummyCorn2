export default function ProfilPage() {
  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-scroll bg-[url('profil-page/bg-profil-page.png')] bg-cover ">
      <h1 className='font-stroke-profil-main text-light mx-10 pt-10 text-center text-[2rem] font-extrabold uppercase sm:pt-16 sm:text-start sm:text-[2.5rem]'>
        {'Welcome Justin'}
      </h1>
      <div className="gb-center relative right-[48%] flex h-[75%] w-[200%] items-center justify-center bg-[url('profil-page/profil-header.png')] bg-contain bg-no-repeat sm:right-[0%] sm:m-2 sm:w-[97%] lg:m-6">
        <img
          className='absolute left-[41%] top-[7%] w-[20%] sm:top-[6%] md:top-[8%] lg:top-[10%] '
          src='profil-page/avatar.png'
          alt=''
        />
        <p className='rotate relative right-[12%] top-[-25%] w-[50px] rotate-[40deg] text-sm'>
          {'change your avatar'}
        </p>
        <img
          src='profil-page/bubble.png'
          alt=''
          className='absolute right-[24%] top-[25%] h-[90%] w-[50%] rotate-[80deg] sm:right-[-6%] sm:top-[-5%] sm:h-[60%] sm:w-[60%] sm:rotate-0 md:right-[-6%] md:top-[-7%] md:h-[65%] md:w-[55%] lg:right-[1%] lg:h-[70%] lg:w-[45%]'
        />
        <div className='absolute right-[40%] top-[62%] flex rotate-[17deg] flex-col gap-1 sm:right-[7%] sm:top-[15%] sm:rotate-[30deg] lg:right-[14%] lg:top-[20%] lg:rotate-[25deg]'>
          <h2 className='uppercase'>{'email:'}</h2>
          <p>{'email.fake@gmail.com'}</p>
          <p className='text-xs'>{'change your email'}</p>
          <h2 className='uppercase'>{'password:'}</h2>
          <p>{'*********'}</p>
          <p className='text-xs'>{'change your password'}</p>
        </div>
      </div>
      <div className='relative top-[50px] flex w-screen flex-col items-center sm:top-[-400px] md:top-[-300px] lg:top-[-100px]'>
        <h1 className='font-stroke-profile-h2 text-light mb-10 mt-5 text-xl font-extrabold uppercase sm:absolute sm:right-[75%] sm:top-[17%] sm:w-[160px] md:right-[80%] md:top-[20%] lg:top-[22%] lg:w-[200px] lg:text-2xl '>
          {'your recipes'}
        </h1>
        <div className="z-20 h-[240px] w-[350px] bg-[url('profil-page/miss-hold-it.png')] bg-cover sm:h-[400px] sm:w-[600px]" />
        <div className='bg-light border-dark relative top-[-40px] z-10 h-[400px] w-full overflow-y-visible border-y-[6px] sm:top-[-60px] sm:h-[800px] sm:w-[80%] sm:border-[6px]'>
          {' '}
        </div>
      </div>
      <div>
        <h1 className='font-stroke-profile-h2 text-light text-xl font-extrabold uppercase lg:text-2xl'>
          {'your comments'}
        </h1>
      </div>
    </div>
  );
}
