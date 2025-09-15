import { ref } from 'vue';
import { MenuModel, SubMenuModel } from 'src/models/menu';
import { menu as menuMaster, subMenu as subMenuMaster } from 'src/master';
// import { menu as menuParameterSetup, subMenu as subMenuParameterSetup } from 'src/parametersetup';
// import { menu as menuParameterSetupMobile, subMenu as subMenuParameterSetupMobile } from 'src/parametersetupMobile';
// import { menu as menuJourneyPlan, subMenu as subMenuJourneyPlan } from 'src/journeyplan';
// import { menu as menuSales, subMenu as subMenuSales } from 'src/sales';
// import { menu as menuAR, subMenu as subMenuAR } from 'src/accountreceivable';
// import { menu as menuPromotion, subMenu as subMenuOperation } from 'src/operation';
// import { menu as accountPayableMenu, subMenu as accountPayableSubMenu } from 'src/accountPayable/index';
// import { menu as menuInventory, subMenu as subMenuInventory } from 'src/inventory';
// import { menu as menuCashBank, subMenu as subMenuCashBank } from 'src/cashBank';
// import { menu as menuRetun, subMenu as subMenuReturn } from 'src/return';
// import { menu as menushipment, subMenu as subMenushipment } from 'src/shipment';
// import { menu as menuGamification, subMenu as subMenuGamification } from 'src/gamification';
// import { menu as menuManageTaxNumber, subMenu as subMenuManageTaxNumber } from 'src/manageTax';
// import { menu as menuManagePrice, subMenu as subMenuManagePrice } from 'src/price';


export const Menus = ref<MenuModel[]>([
  // ...menuParameterSetup,
  // ...menuParameterSetupMobile,
  ...menuMaster,
  // ...menuManagePrice,
  // ...menuPromotion,
  // ...menuJourneyPlan,
  // ...menuSales,
  // ...menuAR,
  // ...menuInventory,
  // ...accountPayableMenu,
  // ...menuCashBank,
  // ...menuRetun,
  // ...menushipment,
  // ...menuGamification,
  // ...menuManageTaxNumber,
]);

export const SubMenus = ref<SubMenuModel[]>([
  // ...subMenuParameterSetup,
  // ...subMenuParameterSetupMobile,
  ...subMenuMaster,
  // ...subMenuJourneyPlan,
  // ...subMenuSales,
  // ...subMenuAR,
  // ...subMenuInventory,
  // ...subMenuOperation,
  // ...accountPayableSubMenu,
  // ...subMenuCashBank,
  // ...subMenuReturn,
  // ...subMenushipment,
  // ...subMenuGamification,
  // ...subMenuManageTaxNumber,
  // ...subMenuManagePrice,
]);
