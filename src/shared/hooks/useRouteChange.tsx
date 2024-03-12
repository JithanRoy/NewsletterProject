import React from 'react';
import {useAtom} from 'jotai';
import {sideBarActiveItem} from "../../app/configs/constants";

const UseRouteChange = () => {
  const [activeRoute, setActiveRoute] = useAtom(sideBarActiveItem);
  return { activeRoute, setActiveRoute };
};

export default UseRouteChange;
