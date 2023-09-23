import React from 'react';
import '../styles/globals.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  href: string;
  title: string;
  text: string;
  icon: IconProp;
}

const Card: React.FC<Props> = ({ href, title, text, icon }) => {
  return (
      <a href={href} className="card w-full sm:w-auto bg-neutral hover:bg-secondary hover:text-base-100 transition-colors duration-300">
        <div className="card-body flex flex-row items-start">
          <div className="w-3/4 sm:w-4/5 pr-3">
            <h1 className="card-title text-xl font-semibold">
              {title}
            </h1>
            <p>{text}</p>
          </div>
          <div className="flex-shrink-0 flex-grow-0 flex items-center ml-auto">
            <div className="flex justify-end">
              <FontAwesomeIcon icon={icon} size="5x" />
            </div>
          </div>
        </div>
      </a>
  );

};

export default Card;