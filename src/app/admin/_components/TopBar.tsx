import React from "react";
import moment from 'moment';

export const TopBar = () => {
  const [currentTime, setCurrentTime] = React.useState(moment().format('MMMM Do YYYY, h:mm:ss a'));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000); // Updates every second

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">🚀 Hello Harman!</span>
          <span className="text-xs block text-stone-500">
           { currentTime }
          </span>
        </div>

        <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
          <span>Prev 6 Months</span>
        </button>
      </div>
    </div>
  );
};
