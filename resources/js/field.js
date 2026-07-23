import NestedFormField from './components/NestedFormField.vue'
import NestedFormBelongsToField from './components/CustomFields/BelongsToField.vue'
import NestedFormFileField from './components/CustomFields/FileField.vue'
import NestedFormMorphToField from './components/CustomFields/MorphToField.vue'

Nova.booting(Vue => {
    Vue.component('form-nested-form', NestedFormField)
    Vue.component('form-nested-form-belongs-to-field', NestedFormBelongsToField)
    Vue.component('form-nested-form-morph-to-field', NestedFormMorphToField)
    Vue.component('form-nested-form-file-field', NestedFormFileField)
})
