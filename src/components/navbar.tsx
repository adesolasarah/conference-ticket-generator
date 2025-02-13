'use client';

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-[#08343C] text-white">
      <div className="flex items-center space-x-2">
        <span className="text-2xl">⌘</span>
        <span className="text-xl font-light">tiez</span>
      </div>
      <div className="flex space-x-4">
        <a href="#" className="hover:text-teal-300">
          Events
        </a>
        <a href="#" className="hover:text-teal-300">
          My Tickets
        </a>
        <a href="#" className="hover:text-teal-300">
          About Project
        </a>
      </div>
      <button className="bg-white text-[#08343C] px-4 py-2 rounded-md hover:bg-teal-100">
        MY TICKETS →
      </button>
    </nav>
  );
};
