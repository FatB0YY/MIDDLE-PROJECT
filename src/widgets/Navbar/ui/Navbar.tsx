import React, { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";
import { AppLink } from "shared/ui/AppLink/AppLink";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.links}>
        <AppLink to={"/"} className={cls.mainLink}>
          Главная
        </AppLink>
        <AppLink to={"/about"}>О сайте</AppLink>
      </div>
    </div>
  );
};
