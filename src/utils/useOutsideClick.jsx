import React from 'react';

const useOutsideClick = (ref, onClick) => {
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref?.current) return;
      if (!ref.current.contains(e.target)) {
        onClick?.(e);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClick]);
};

export default useOutsideClick;
