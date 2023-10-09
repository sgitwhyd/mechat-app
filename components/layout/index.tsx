import React, { ReactNode } from "react";
import TopBarNavigation from "../navigation/TopBarNavigation";
import { NextSeo, NextSeoProps } from "next-seo";

type LayoutProps = {
  children: ReactNode;
  withTopBar: boolean;
  topBarElement?: ReactNode;
  title?: ReactNode | string;
  icon?: ReactNode;
  customClass?: string;
  seoProps: NextSeoProps;
};

const Layout = ({
  children,
  withTopBar,
  topBarElement,
  title,
  icon,
  customClass,
  seoProps,
}: LayoutProps) => {
  const renderTopBar = () => {
    if (withTopBar) {
      if (!topBarElement) {
        return (
          <TopBarNavigation
            title={title}
            icon={icon}
            customClass={customClass}
          />
        );
      }
      return (
        <div
          className={`flex w-full h-20 items-center justify-center relative`}
        >
          {topBarElement}
        </div>
      );
    }
  };

  return (
    <div
      className={`w-full sm:max-w-lg  mx-auto min-h-screen pb-10 flex items-center justify-between flex-col relative `}
    >
      <NextSeo {...seoProps} key="next-seo" />
      {renderTopBar()}
      {children}
    </div>
  );
};

export default Layout;
