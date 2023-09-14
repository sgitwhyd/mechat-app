import React from "react";

type TopBarNavigationProps = {
  title?: String;
  icon?: React.ReactNode;
  customClass?: string;
};

const TopBarNavigation = ({
  title,
  icon,
  customClass,
}: TopBarNavigationProps) => {
  const renderIcon = () => {
    if (icon) {
      return icon;
    }
  };

  return (
    <div className={`w-full ${customClass}`}>
      <div className="flex items-center justify-center relative h-20 max-w-lg mx-auto">
        <div className="absolute left-5">{renderIcon()}</div>
        <h3 className="text-brand-xl leading-brand-xl font-bold text-brand-blue-500">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default TopBarNavigation;
