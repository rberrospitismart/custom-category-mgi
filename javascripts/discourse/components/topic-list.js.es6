import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
  setupComponent(args, component) {
    withPluginApi("0.1", api => {

      api.onPageChange((url, title) => {
        console.log("this.site.categories",this.site.categories);
        component.setProperties({
          backgroundColor: `#FFC1B3`
        })
      })

    })
      
  }
}
