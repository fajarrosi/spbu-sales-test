import { boot } from 'quasar/wrappers';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { VMoney } from 'v-money';

export default boot(({ app }) => {
  app.directive('money', VMoney);
});
