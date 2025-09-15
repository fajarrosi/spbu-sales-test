import { boot } from 'quasar/wrappers';
import { vFormatInput } from 'src/directives/inputMask';

export default boot(({ app }) => {
  app.directive('mask-input', vFormatInput);
});
