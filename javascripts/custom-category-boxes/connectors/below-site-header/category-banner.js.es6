import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
  setupComponent(args, component) {
    withPluginApi("0.1", api => {

      api.onPageChange((url, title) => {
        let show_banner = settings.show_banner;
        let splitURL = url.split("/")
        let html = document.getElementsByTagName("html")[0];

        let thead = document.getElementsByClassName("topic-list-header")[0]

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
          let description = "", abreviation = "";
          if(name == 'Anuncios & Eventos'){
            description ="Enterate de nuestros webinars y próximos lanzamientos.";
            abreviation = "A&E";
          } else if(name == 'Reglas del Foro'){
            description = "¿Eres nuevo en la comunidad? Conoce nuestros principios de comportamiento.";
            abreviation = "Reglas";
          } else if(name == 'Foros de Discusión'){
            description = "Conoce y comparte comentarios con nuestra comunidad de inversionistas.";
            abreviation = "Foros";
          } else if(name == 'Articulos y Noticias'){
            description = "Publicaciones de interés para ti.";
            abreviation = "Noticias";
          } else if(name == 'Preguntas & respuestas'){
            description = "Resuelve tus dudas y obtén ayuda de otros usuarios de la comunidad.";
            abreviation = "P&R";
          } else if(name == 'Glosario de términos'){
            description = "Términos de inversión utilizados en Magi y su significado.";
            abreviation = "Glosario";
          }
          
          html.classList.add("category-page-custom-banner")
          if(thead ) thead.style.backgroundColor = `#${ c.color }`

          component.setProperties({
            show_banner,
            title: c.name.replace(/^\w/, c => c.toUpperCase()),
            description: description,
            backgroundColor: `#${ c.color }`,
            abreviation: abreviation,
          })

        } else {

          // let anuncio = document.getElementsByClassName("anuncio");
          // bienvenido 
          console.log(splitURL[1].includes('preview_theme_id'))
          if(splitURL[1] === '' || splitURL[1].includes('preview_theme_id')){

            const name = `Te damos la bienvenida a la comunidad de Magi`,
            description = "¡Haz preguntas, resuelve tus dudas, comparte comentarios y conéctate con la comunidad de Magi!", 
            abreviation = "Hola!", 
            color = "FFC1B3";

            html.classList.add("category-page-custom-banner");
            if(thead ) thead.style.backgroundColor = ""
            
            // anuncio.classList.remove("d-none");

            component.setProperties({
              show_banner,
              title: name,
              description: description,
              backgroundColor: `#${ color }`,
              abreviation: abreviation,
            })
            return;
          } 
        
          html.classList.remove("category-page-custom-banner");
          // anuncio.classList.add("d-none");
          component.setProperties({
            show_banner: false
          })
        }
      })

    })
      
  }
}
