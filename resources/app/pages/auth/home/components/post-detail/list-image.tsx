// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

import './list-image.scss';

// import required modules
import { Navigation, Keyboard, EffectFade } from 'swiper/modules';
import { usePostContext, usePostDetailContext } from '../../contexts';
import { formatImagesToRender } from '../../constants';

export const ListImage = () => {
  const { post } = usePostDetailContext();

  const { originalImages } = formatImagesToRender(post.image);

  return (
    <div className="wrapSwiper">
      <Swiper
        effect={'fade'}
        keyboard
        navigation={true}
        modules={[EffectFade, Navigation, Keyboard]}
        className="mySwiper"
      >
        {originalImages.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
