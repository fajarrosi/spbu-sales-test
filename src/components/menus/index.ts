import { ref } from 'vue';
import { MenuModel, SubMenuModel } from 'src/models/menu';
import { menu as menuMaster, subMenu as subMenuMaster } from 'src/master';
import { menu as menuReport, subMenu as subMenuReport } from 'src/report';

export const Menus = ref<MenuModel[]>([...menuMaster, ...menuReport]);

export const SubMenus = ref<SubMenuModel[]>([...subMenuMaster, ...subMenuReport]);
