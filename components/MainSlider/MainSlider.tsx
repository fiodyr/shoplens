// components/MainSlider/MainSlider.tsx
"use client";
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './MainSlider.module.css';
import { SlideData, MainSliderProps } from '@/interfaces/types';

export default function MainSlider({ slides }: MainSliderProps) {
  const swiperRef = useRef<SwiperType>();

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.navigationButtons}>
        <div className={styles.pagination}>
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={5}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            navigation={false}
            pagination={{ clickable: false }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1600: {
                slidesPerView: 8,
                spaceBetween: 20,
              },
            }}
            className={styles.swiper}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className={styles.slide}>
                <Link href={slide.linkUrl} className={styles.slideLink}>
                  <div className={styles.slideImageWrapper}>
                    <Image
                      src={slide.imageUrl}
                      alt={slide.linkText}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.slideImage}
                      priority={index < 5}
                    />
                  </div>
                  <div className={styles.slideName}>{slide.linkText}</div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}