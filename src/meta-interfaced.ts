// This can be directly added to any of your `.ts` files like `router.ts`
// It can also be added to a `.d.ts` file. Make sure it's included in
// project's tsconfig.json "files"
import 'vue-router'

// To ensure it is treated as a module, add at least one `export` statement
export {}

declare module 'vue-router' {
  /**
 * @param {boolean} requiresAuth - if route need authorize
 * @param {boolean} isSubmenu - if route is sub menu 
 * @param {string} subtitle - subtitle from that page
 * @param {string} parent - title dari parent from submenu
 */
  interface RouteMeta {
    /**
     * if route need authorize
     */
    requiresAuth?: boolean
    /**
     * if route is sub menu 
     */
    isSubmenu ?: boolean
    /**
     * subtitle from that page
     */
    subtitle?: string
    /**
     * title dari parent from submenu
     */
    parent?: string
  }
}