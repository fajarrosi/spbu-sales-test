import { MenuModel, SubMenuModel } from 'src/interface/Menu.interface';
export const menu: MenuModel[] = [
  {
    title: 'Inventory',
    icon: 'im-master',
    active: false,
    isSubmenu: true,
    expansion: false,
  },
];

export const subMenu: SubMenuModel[] = [
  { subtitle: 'Manage Stock', subactive: false, parent: 'Inventory', to: 'Manage Stock' },
];
