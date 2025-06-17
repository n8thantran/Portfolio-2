import React from 'react';

interface ProjectLink {
  icon: string;
  label: string;
  url: string;
}

interface HackathonItemProps {
  logoUrl: string;
  hackathonName: string;
  title: string;
  date: string;
  location: string;
  description: string[];
  links: ProjectLink[];
  isWinner?: boolean;
}

const HackathonItem: React.FC<HackathonItemProps> = ({
  logoUrl,
  hackathonName,
  title,
  date,
  location,
  description,
  links,
  isWinner = false,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-colors group mb-8 border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
      <div className="w-12 h-12 flex-shrink-0">
        <img src={logoUrl} alt={`${hackathonName} logo`} className="w-full h-full object-contain rounded-md" />
      </div>
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title} {isWinner && '👑'}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 mt-1 sm:mt-0 sm:ml-4">{date}</span>
        </div>
        <p className="text-md text-gray-700 dark:text-gray-300 mt-1">{location}</p>
        <ul className="mt-2 space-y-1">
          {description.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-gray-500 dark:text-gray-400 mr-2">–</span>
              <span className="text-gray-600 dark:text-gray-400 font-light flex-1">{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-4">
          {links.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <i className={link.icon}></i>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HackathonItem; 