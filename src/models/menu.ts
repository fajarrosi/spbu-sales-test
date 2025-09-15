/**
 * @param {string} title - Title menu disamping
 * @param {string} icon - source icon untuk menu
 * @param {boolean} active - kondisi menunya sedang aktif / tidak
 * @param {boolean} isSubmenu - apakah punya sub menu /tidak
 * @param {boolean} expansion - ketika issubmenu true dan untuk membantu kondisi sub menu sedang aktif/ tidak
 */
export declare interface MenuModel {
  title: string
  icon: string
  active: boolean
  isSubmenu: boolean
  expansion: boolean
}

/**
 * @param {string} subtitle : subtitle di submenu
 * @param {boolean} subactive : kondisi untuk active dan tidak active di sub menu tersebut
 * @param {string} parent : isi dengan yang sama dengan title di menuModel
 * @param {string} to: : isi dengan route name yang ada di route masing masing menu
 */
export declare interface SubMenuModel {
  subtitle: string;
  subactive: boolean;
  parent: string;
  to: string
  children?: SubMenuModel[]
}
