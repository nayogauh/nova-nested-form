<template>
  <div
    v-if="field.max === 0 || field.children.length < field.max"
    class="cursor-pointer inline-flex items-center gap-1 text-primary-500 hover:text-primary-400"
    @click="addChild"
  >
    <!-- Inline SVG (Heroicons "plus-circle") for Nova 4 & 5 compatibility. -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="h-5 w-5"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
        clip-rule="evenodd"
      />
    </svg>
    {{ __('Add') }}
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      required: true,
      schema: {},
      children: [],
    },
  },

  methods: {
    /**
     * Add a new child.
     */
    addChild() {
      let maxKey = 0;
      if (this.field.children && this.field.children.length) {
        maxKey =
          this.field.children[this.field.children.length - 1].key ||
          Math.max.apply(
            Math,
            this.field.children.map(({ id }) => id)
          );
      }
      if (!this.field.schema) {
        this.field.schema = {};
      }
      if (!this.field.children) {
        this.field.children = [];
      }
      this.field.schema.key = maxKey + 1;
      this.field.children.push(this.replaceIndexesInSchema(this.field));
    },

    /**
     * This replaces the "{{index}}" values of the schema to
     * their actual index.
     *
     */
    replaceIndexesInSchema(field) {
      const schema = JSON.parse(JSON.stringify(field.schema));

      schema.fields &&
        schema.fields.forEach((field) => {
          if (field.schema) {
            field.schema = this.replaceIndexesInSchema(field);
          }
          if (field.attribute) {
            field.attribute = field.attribute.replace(
              this.field.indexKey,
              this.field.children.length
            );
          }
          if (field.displayIf) {
            field.displayIf = JSON.parse(
              JSON.stringify(field.displayIf).replace(
                new RegExp(this.field.indexKey, "g"),
                this.field.children.length.toString()
              )
            );
          }
        });

      schema.heading =
        (schema.heading &&
          schema.heading.replace(
            this.field.indexKey,
            this.field.children.length + 1
          )) ||
        "";

      return schema;
    },
  },

  /**
   * On created.
   */
  created() {
    for (
      let i = (this.field.children && this.field.children.length) || 0;
      i < this.field.min;
      i++
    ) {
      this.addChild();
    }
  },
};
</script>
