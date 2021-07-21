import Component from "@ember/component";
import { computed } from "@ember/object";
import { readOnly } from "@ember/object/computed";
import { afterRender } from "discourse-common/utils/decorators";

export default Component.extend({
  classNames: ["custom-category"],
  topicCount: readOnly("c.topic_count"),
  
  didInsertElement() {
    this._super(...arguments);

    if (this.topicCount) {
      this.set("hasTopics", true);
    } else {
      this.element.style.display = "none";
    }
  },

  hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

})