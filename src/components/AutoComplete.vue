<template>
  <div>
    <h2>AutoComplete</h2>
    <!-- {{ keyword }} -->
    <input type="text" :value="keyword" @input="onInput($event.target.value)" />

    <button @click="onClear()">X</button>

    <div class="options" v-show="mutableOptions.length">
      <ul>
        <li
          v-for="opt in mutableOptions"
          :key="opt[valueKey]"
          @click="onSelect(opt)"
        >
          {{ opt[labelKey] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AutoComplete',
  props: {
    value: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      default: ''
    },

    options: {
      type: Array,
      default: () => []
    },

    labelKey: {
      type: String,
      default: 'label'
    },

    valueKey: {
      type: String,
      default: 'id'
    },

    searchMinLength: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      keyword: '',
      originalOptions: [],
      mutableOptions: []
    }
  },
  created () {
    this.keyword = this.value

    if (this.options.length) {
      this.cloneOptions()
    }
  },
  watch: {
    value (value) {
      this.keyword = value
    },
    options () {
      this.cloneOptions()
    }
  },
  methods: {
    onInput (value) {
      this.keyword = value
      this.emitInput()
      this.$emit(`shouldSearch`, value)
    },
    cloneOptions () {
      this.originalOptions = JSON.parse(JSON.stringify(this.options)) //perder relação original do vuejs
      this.mutableOptions = JSON.parse(JSON.stringify(this.options))
    },
    resetOptions () {
      this.originalOptions = []
      this.mutableOptions = []
    },
    onSelect (opt) {
      this.$emit('select', opt)
      this.keyword = opt[this.labelKey]
      this.emitInput()
      this.resetOptions()
    },
    emitInput () {
      this.$emit('input', this.keyword)
    },
    resetKeyword () {
      this.keyword = ''
      this.emitInput()
    },
    onClear () {
      this.$emit('select', null)
      this.resetKeyword()
      this.resetOptions()
    }
  }
}
</script>

<style scoped>
.options {
  border: 1px solid rgba(0, 0, 0, 0.555);
  background: rgb(231, 227, 227);
  width: 206px;
  display: flex;
  padding: 10px 0 0 0;
}
.options ul li {
  list-style: none;
  list-style-position: outside;
}
</style>
