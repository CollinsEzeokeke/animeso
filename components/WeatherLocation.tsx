
import IconBox from './IconBox';
import Image from 'next/image';

export default function WeatherLocation () {
  return (
    <div className="animate-fade-in delay-200 text-6xl font-bold text-slate-100/90 flex flex-wrap items-center justify-center">
      <div className="flex items-center mx-1">
        <p className="px-2">in</p>
        <IconBox className="mx-3">
          <Image src="/0024aa48-3ae3-47ad-8bc2-a870128d0a23.png" alt='location' height={70} width={70} className='rounded-lg'/>
        </IconBox>
        Paris.
      </div>
    </div>
  );
};
