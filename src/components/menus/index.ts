import { ref } from 'vue';
import { MenuModel, SubMenuModel } from 'src/models/menu';
import { menu as menuMaster, subMenu as subMenuMaster } from 'src/master';
import { menu as menuReport, subMenu as subMenuReport } from 'src/report';
import { menu as menuinventory, subMenu as subMenuinventory } from 'src/inventory';

export const Menus = ref<MenuModel[]>([...menuMaster, ...menuReport, ...menuinventory]);

export const SubMenus = ref<SubMenuModel[]>([...subMenuMaster, ...subMenuReport, ...subMenuinventory]);
