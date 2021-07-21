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
        console.log(splitURL);
        console.log(settings);
        console.log(this.site.categories);

        if (splitURL[1] === "c") {
          let categoryTitle = splitURL[2];
          let c;

          this.site.categories.forEach((cat) => {
            let slug = cat.slug.toLowerCase();
            if (slug === categoryTitle.toLowerCase()) {
              c = cat;
            }
          })

          const name = `${ c.name }`;
          let description = "", abreviation = "", backgroundColor = "";
          if(name == 'Anuncios & Eventos'){
            description ="Enterate de nuestros webinars y próximos lanzamientos.";
            abreviation = "A&E";
            backgroundColor = "FFC1B3";
          } else if(name == 'Reglas del Foro'){
            description = "¿Eres nuevo en la comunidad? Conoce nuestros principios de comportamiento.";
            abreviation = "Reglas";
            backgroundColor = "D0D0D0";
          } else if(name == 'Foros de Discusión'){
            description = "Conoce y comparte comentarios con nuestra comunidad de inversionistas.";
            abreviation = "Foros";
            backgroundColor = "AFAFE1";
          } else if(name == 'Articulos y Noticias'){
            description = "Publicaciones de interés para ti.";
            abreviation = "Noticias";
            backgroundColor = "E1D7F0";
          } else if(name == 'Preguntas & respuestas'){
            description = "Resuelve tus dudas y obtén ayuda de otros usuarios de la comunidad.";
            abreviation = "P&R";
            backgroundColor = "D2EBEB";
          } else if(name == 'Glosario de términos'){
            description = "Términos de inversión utilizados en Magi y su significado.";
            abreviation = "Glosario";
            backgroundColor = "90DEDE";
          }
          
          html.classList.add("category-page-custom-banner")

          component.setProperties({
            show_banner,
            title: c.name.replace(/^\w/, c => c.toUpperCase()),
            description: description,
            backgroundColor: `#${ backgroundColor }`,
            abreviation: abreviation,
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
