import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { PUBLIC_IMAGE_FOLDER, DEFAULT_BANNER_IMAGE } from '../../configs/constants';
import { getRandomNumber, getNextRoundRobin } from '../../libs/utils/math';
import './style.css';

const Slider = (props) => {
  const {
    altText, banners, defaultBanner, duration, height, random,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageSrc, setImageSrc] = useState((banners && banners.length) ? `${PUBLIC_IMAGE_FOLDER}${banners[currentIndex]}` : defaultBanner);
  useEffect(() => {
    let imageIndex;
    const intervalId = setInterval(() => {
      if (banners && banners.length) {
        if (random) {
          imageIndex = getRandomNumber(banners.length);
        } else {
          imageIndex = getNextRoundRobin(banners.length, currentIndex);
        }
        setImageSrc(`${PUBLIC_IMAGE_FOLDER}${banners[imageIndex]}`);
        setCurrentIndex(imageIndex);
      }
    }, duration);
    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  return (
    <div className="banner" style={{ height }}>
      <img src={imageSrc} alt={altText} />
    </div>
  );
};

Slider.defaultProps = {
  altText: 'Default Banner',
  defaultBanner: DEFAULT_BANNER_IMAGE,
  duration: 2000,
  height: 200,
  random: false,
};

Slider.propTypes = {
  altText: PropTypes.string,
  banners: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};

export default Slider;
