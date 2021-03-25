import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text1'
  },
  {
    title: 'Principal',
    path: '/principal',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text1'
  },
  {
    title: 'Distributor',
    path: '/distributor',
    icon: <FaIcons.FaTruckMoving />,
    cName: 'nav-text1'
  },
  {
    title: 'Customer',
    path: '/customer',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text1'
  },
  {
    title: 'Database',
    path: '/backdata',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text1'
  }
];
