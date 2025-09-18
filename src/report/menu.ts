import { MenuModel, SubMenuModel } from 'src/interface/Menu.interface';
export const menu: MenuModel[] = [
  {
    title: 'Report',
    icon: 'im-master',
    active: false,
    isSubmenu: true,
    expansion: false,
  },
];

export const subMenu: SubMenuModel[] = [
  { subtitle: 'Manage Shift', subactive: false, parent: 'Report', to: 'Manage Shift' },
];
