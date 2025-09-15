import { MenuModel, SubMenuModel } from 'src/interface/Menu.interface';
export const menu: MenuModel[] = [
  {
    title: 'Master',
    icon: 'im-master',
    active: false,
    isSubmenu: true,
    expansion: false,
  },
];

export const subMenu: SubMenuModel[] = [
  { subtitle: 'Employee', subactive: false, parent: 'Master', to: 'Employee' },
  { subtitle: 'Product', subactive: false, parent: 'Master', to: 'Product' },
];
