import { withPluginApi } from 'discourse/lib/plugin-api';
import Component from "@ember/component";
import { afterRender } from "discourse-common/utils/decorators";

export default {
  setupComponent(args, component) {
    withPluginApi("0.1", api => {

      api.onPageChange((url, title) => {
        let show_banner = settings.show_banner;
        let splitURL = url.split("/")
        let html = document.getElementsByTagName("html")[0];

        console.log(url);
        console.log(settings);
        console.log(this.site.categories);

        if (splitURL[1] === "c") {
          let categoryTitle = splitURL[2];
          let c;

          console.log(categoryTitle);
          this.site.categories.forEach((cat) => {
            let name = cat.name.toLowerCase().replace(" ","-");
            console.log(name);
            console.log(cat.slug);
            if (name === cat.slug) {
              c = cat;
            }
          })

          html.classList.add("category-page-custom-banner")

          component.setProperties({
            show_banner,
            title: c.name.replace(/^\w/, c => c.toUpperCase()),
            backgroundColor: `#${c.color}65`,
            backgroundImage: `url(${settings.theme_uploads[bg]})`,
            border: `1px solid #${c.color}`,
            boxShadow: `8px 8px 0 #${c.color}32`,
          })

        } else {
          html.classList.remove("category-page-custom-banner")
          component.setProperties({
            show_banner: false
          })
        }
      })

    })
  }
}
