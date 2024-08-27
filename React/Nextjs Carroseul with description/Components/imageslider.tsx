'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Dados das imagens
const images = [
  { src: '/images/first.jpg', alt: 'First', title: 'Title 1', description: 'Description for first image' },
  { src: '/images/second.jpg', alt: 'Second', title: 'Title 2', description: 'Description for second image' },
  { src: '/images/third.jpg', alt: 'Third', title: 'Title 3', description: 'Description for third image' },
  { src: '/images/fourth.jpg', alt: 'Fourth', title: 'Title 4', description: 'Description for fourth image' }
]

const SwiperComponent = () => {
  return (
    <>
      <section className="relative">
        <h1 className="absolute top-8 left-1/2 transform w-full -translate-x-1/2 -translate-y-1/2 text-3xl font-extrabold text-white bg-black bg-opacity-50 p-2 rounded-3xl text-center">
          Veja alguns de nossos projetos abaixo:
        </h1>
        <div className="container max-w-2xl pt-20">
          <Swiper
            navigation
            pagination={{ type: 'fraction' }}
            modules={[Navigation, Pagination]}
            onSwiper={(swiper) => console.log(swiper)}
            className="h-200 w-full rounded-lg"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className='relative'>
                <div className='flex h-full w-full items-center justify-center'>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1000}
                    height={1000}
                    className='block h-full w-full object-cover'
                  />
                </div>
                <div className='absolute inset-0 flex flex-col items-center justify-center p-4 text-white'>
                  <h2 style={{ padding: "8px", borderRadius: "10px" }} className='text-xl font-bold bg-opacity-60 bg-black'>{image.title}</h2>
                  <p style={{ padding: "10px" }} className='mt-2 text-sm bg-opacity-60 bg-black'>{image.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  )
}

export default SwiperComponent
