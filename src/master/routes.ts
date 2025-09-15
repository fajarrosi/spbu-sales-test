import { routes as employee } from './employee';
import { routes as product } from './product';


export const routes = [
  ...product,
  ...employee,
];
