import { boot } from 'quasar/wrappers'
import * as components from '../components';
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
const componentsList = components?.default;
export default boot(async ({ app }) => {
  Object.keys(componentsList).forEach(name => {
    app.component(name, componentsList[name as keyof typeof componentsList]);
  })
})
