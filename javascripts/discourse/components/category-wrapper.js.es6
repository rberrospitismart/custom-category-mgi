import Component from "@ember/component";
import { computed } from "@ember/object";
import { readOnly } from "@ember/object/computed";
import { afterRender } from "discourse-common/utils/decorators";

export default Component.extend({
  classNames: ["custom-category"],
  topicCount: readOnly("c.topic_count"),
  name: readOnly("c.name"),
  
  didInsertElement() {
    this._super(...arguments);
    
    const name = `${ this.name }`;
    if(name == 'Anuncios & Eventos'){
      this.set("description", "Enterate de nuestros webinars y próximos lanzamientos.")
    } else if(name == 'Reglas del Foro'){
      this.set("description", "¿Eres nuevo en la comunidad? Conoce nuestros principios de comportamiento.")
    } else if(name == 'Foros de Discusión'){
      this.set("description", "Conoce y comparte comentarios con nuestra comunidad de inversionistas.")
    } else if(name == 'Articulos y Noticias'){
      this.set("description", "Publicaciones de interés para ti.")
    } else if(name == 'Preguntas & respuestas'){
      this.set("description", "Resuelve tus dudas y obtén ayuda de otros usuarios de la comunidad.")
    } else if(name == 'Glosario de términos'){
      this.set("description", "Términos de inversión utilizados en Magi y su significado.")
    }
  },

})