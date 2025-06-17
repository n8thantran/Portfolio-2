import React from 'react';

interface ExperienceItemProps {
  logoUrl: string;
  companyName: string;
  link: string;
  title: string;
  date: string;
  position: string;
  responsibilities: string[];
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ 
  logoUrl, 
  companyName, 
  link, 
  title, 
  date, 
  position, 
  responsibilities 
}) => {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-colors group mb-8 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
    >
      <div className="w-12 h-12 flex-shrink-0">
        <img src={logoUrl} alt={`${companyName} logo`} className="w-full h-full object-contain rounded-md" />
      </div>
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 mt-1 sm:mt-0 sm:ml-4">{date}</span>
        </div>
        <p className="text-md text-gray-700 dark:text-gray-300 mt-1">{position}</p>
        <ul className="mt-2 space-y-1">
          {responsibilities.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-gray-500 dark:text-gray-400 mr-2">–</span>
              <span className="text-gray-600 dark:text-gray-400 font-light flex-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
};

export default ExperienceItem; 