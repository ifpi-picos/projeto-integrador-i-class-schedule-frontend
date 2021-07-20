<template>
  <div>
    <h2>AutoComplete</h2>
    <!-- {{ keyword }} -->
    {{ arrowCounter }}
    <b-row>
      <b-col lg="11">
        <input
          type="text"
          :value="keyword"
          @input="onInput($event.target.value)"
          @keydown="onKeydown"
        />

        <button @click="onClear()">X</button>
      </b-col>
    </b-row>
    <div class="options" v-show="mutableOptions.length">
      <ul>
        <li
          v-for="(opt, index) in mutableOptions"
          :key="opt[valueKey]"
          :class="{ 'bg-success': arrowCounter === index }"
          @click="onSelect()"
          @mouseover="setArrowCounter(index)"
        >
          <span
            class="font-normal"
            v-html="opt[`${labelKey}_highlighted`] || opt[labelKey]"
          >
          </span>
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
      arrowCounter: 0,
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
      if (value.length >= this.searchMinLength) {
        if (!this.originalOptions.length) {
          this.$emit(`shouldSearch`, value)
        } else {
          this.searchInternally()
        }
      } else {
        this.resetOptions()
      }
    },

    searchInternally () {
      const search = this.keyword
      this.mutableOptions = this.originalOptions.filter(o => {
        // console.log(o[this.labelKey].toLowerCase())
        return o[this.labelKey].toLowerCase().search(search.toLowerCase()) >= 0
      })
      this.highlightOptions()
    },
    highlightOptions () {
      const search = this.keyword
      const query = new RegExp(search, 'i')

      this.mutableOptions.forEach(o => {
        this.$set(
          o,
          `${this.labelKey}_highlighted`,
          o[this.labelKey].replace(
            query,
            '<span class="font-weight-bold">$&</span>'
          )
        )
      })
    },
    cloneOptions () {
      this.originalOptions = JSON.parse(JSON.stringify(this.options)) //perder relação original do vuejs
      this.mutableOptions = JSON.parse(JSON.stringify(this.options))
      this.searchInternally()
    },
    resetOptions () {
      this.originalOptions = []
      this.mutableOptions = []
    },
    onKeydown (evt) {
      if (!this.mutableOptions.length) {
        return
      }
      switch (evt.code) {
        case 'ArrowDown':
          evt.preventDefault()
          this.onArrowDown()
          break
        case 'ArrowUp':
          evt.preventDefault()
          this.onArrowUp()
          break
        case 'Enter':
          evt.preventDefault()
          this.onSelect()
          break
      }
    },
    onArrowDown () {
      if (this.arrowCounter < this.mutableOptions.length - 1) {
        this.arrowCounter += 1
      }
    },
    onArrowUp () {
      if (this.arrowCounter > 0) {
        this.arrowCounter -= 1
      }
    },
    setArrowCounter (number) {
      this.arrowCounter = number
    },
    resetArrowCounter () {
      this.arrowCounter = 0
    },
    onSelect () {
      const selected = this.mutableOptions[this.arrowCounter]
      console.log(selected)
      const selectedOption = this.options.find(
        o => o[this.valueKey] == selected[this.valueKey]
      )

      if (selectedOption) {
        this.$emit('select', selectedOption)
        this.keyword = selectedOption[this.labelKey]
        this.emitInput()
        this.resetOptions()
        this.resetArrowCounter()
      }
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
