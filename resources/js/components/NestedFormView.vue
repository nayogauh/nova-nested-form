<template>
    <nested-form-icon hover-color="info" @click="toggleVisibility">
        <!-- Inline SVG (Heroicons "eye") for Nova 4 & 5 compatibility. -->
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="cursor-pointer h-5 w-5"
            aria-hidden="true"
        >
            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path
                fill-rule="evenodd"
                d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clip-rule="evenodd"
            />
        </svg>
    </nested-form-icon>
</template>

<script>
import NestedFormIcon from "./NestedFormIcon.vue";

export default {
    components: {NestedFormIcon},

    props: {
        field: {
            type: Object,
        },

        child: {
            type: Object,
        },
    },

    methods: {
        /**
         * Toggle the visibility.
         */
        toggleVisibility() {
            if (this.child) {
                this.child.opened = !this.child.opened;
            } else if (this.field) {
                this.field.children.forEach((child) => (child.opened = !child.opened));
            }
        },
    },
};
</script>
