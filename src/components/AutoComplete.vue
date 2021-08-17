<template>
  <div id="autocomplete">
    {{ keyword }}
    {{ originalOptions }}
    <!-- {{ arrowCounter }} -->

    <!-- <base-input
      type="text"
      label="Nome do responsável"
      placeholder="Nome do responsável"
      name="Nome do responsável"
      required
    >
    </base-input> -->

    <label class="form-control-label">
      Responsável
      <span class="text-red">*</span>
    </label>
    <div class="input-group">
      <input
        :class="{
          'form-control': true,
          'border-radius-none': mutableOptions.length,
          'is-invalid': !keyword && digitou,
        }"
        required
        type="text"
        ref="input"
        :value="keyword"
        :placeholder="placeholder"
        @input="onInput($event.target.value)"
        @blur="onBlur"
        @keydown="onKeydown"
      />
      <span v-if="keyword" class="input-group-append">
        <div
          :class="{
            'input-group-text bg-transparent': true,
            'border-radius-none': mutableOptions.length,
          }"
        >
          <i @click="onClear()" class="fa fa-times"></i>
        </div>
      </span>
      <!-- <button v-if="keyword" type="button" @click="onClear()">X</button> -->
    </div>

    <div class="options " v-show="mutableOptions.length">
      <ul>
        <li
          v-for="(opt, index) in mutableOptions"
          :key="opt[valueKey]"
          :ref="`option_${index}`"
          :class="{
            'bg-li': arrowCounter === index,
            'autocomplete-item': true,
          }"
          tabindex="0"
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
  name: "AutoComplete",
  props: {
    value: {
      type: String,
      default: "",
    },

    placeholder: {
      type: String,
      default: "",
    },

    options: {
      type: Array,
      default: () => [],
    },

    labelKey: {
      type: String,
      default: "label",
    },

    valueKey: {
      type: String,
      default: "id",
    },

    searchMinLength: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      keyword: "",
      arrowCounter: 0,
      originalOptions: [],
      mutableOptions: [],
      digitou: false,
    };
  },
  created() {
    this.keyword = this.value;

    if (this.options.length) {
      this.cloneOptions();
    }
  },
  watch: {
    value(value) {
      this.keyword = value;
      this.digitou = true;
    },
    options() {
      this.cloneOptions();
    },
  },
  methods: {
    onInput(value) {
      this.keyword = value;
      this.emitInput();
      if (value.length >= this.searchMinLength) {
        if (!this.originalOptions.length) {
          this.$emit(`shouldSearch`, value);
        } else {
          this.searchInternally();
        }
      } else {
        this.resetOptions();
      }
    },

    searchInternally() {
      const search = this.keyword;
      this.mutableOptions = this.originalOptions.filter((o) => {
        // console.log(o[this.labelKey].toLowerCase())
        return o[this.labelKey].toLowerCase().search(search.toLowerCase()) >= 0;
      });
      this.highlightOptions();
    },
    highlightOptions() {
      const search = this.keyword;
      const query = new RegExp(search, "i");

      this.mutableOptions.forEach((o) => {
        this.$set(
          o,
          `${this.labelKey}_highlighted`,
          o[this.labelKey].replace(
            query,
            '<span class="font-weight-bold">$&</span>'
          )
        );
      });
    },
    cloneOptions() {
      this.originalOptions = JSON.parse(JSON.stringify(this.options)); //perder relação original do vuejs
      this.mutableOptions = JSON.parse(JSON.stringify(this.options));
      this.searchInternally();
    },
    resetOptions() {
      this.originalOptions = [];
      this.mutableOptions = [];
    },
    onKeydown(evt) {
      if (!this.mutableOptions.length) {
        return;
      }
      switch (evt.code) {
        case "ArrowDown":
          evt.preventDefault();
          this.onArrowDown();
          break;
        case "ArrowUp":
          evt.preventDefault();
          this.onArrowUp();
          break;
        case "Enter":
          evt.preventDefault();
          this.onSelect();
          break;
        case "Escape":
          // evt.preventDefault()
          this.onEsc();
          break;
      }
    },
    onEsc() {
      this.$refs.input.blur();
      this.resetArrowCounter();

      this.resetOptions();
    },
    onArrowDown() {
      if (this.arrowCounter < this.mutableOptions.length - 1) {
        this.arrowCounter += 1;
      }
      this.fixScrolling();
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter -= 1;
      }
      this.fixScrolling();
    },
    onBlur(evt) {
      const tgt = evt.relatedTarget;
      if (tgt && tgt.classList.contains("autocomplete-item")) {
        return;
      }
      this.resetOptions();
      this.resetArrowCounter();
    },
    setArrowCounter(number) {
      this.arrowCounter = number;
    },
    fixScrolling() {
      this.$refs[`option_${this.arrowCounter}`][0].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    },
    resetArrowCounter() {
      this.arrowCounter = 0;
    },
    onSelect() {
      const selected = this.mutableOptions[this.arrowCounter];
      // console.log(selected)
      const selectedOption = this.options.find(
        (o) => o[this.valueKey] == selected[this.valueKey]
      );

      if (selectedOption) {
        this.$emit("select", selectedOption);
        this.keyword = selectedOption[this.labelKey];
        this.emitInput();
        this.resetOptions();
        this.resetArrowCounter();
      }
    },
    emitInput() {
      this.$emit("input", this.keyword);
    },
    resetKeyword() {
      this.keyword = "";
      this.emitInput();
    },
    onClear() {
      // this.$emit('select', null)
      this.$emit("select", "");
      this.resetKeyword();
      this.resetOptions();
      this.resetArrowCounter();
    },
  },
};
</script>

<style scoped>
.input-group span {
  cursor: pointer;
}

.border-radius-none {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}

.options {
  border: 1px solid #cad1d7;
  border-top: none;
  /* border-radius: 0.375rem; */
  width: 100%;
  max-height: 170px;
  overflow: auto;
  display: flex;
  padding: 10px 0 0 0;
  margin-bottom: 20px;
}

.options::-webkit-scrollbar-track {
  background-color: #f4f4f4;
}

.options::-webkit-scrollbar {
  width: 6px;
  background: #f4f4f4;
}
.options::-webkit-scrollbar-thumb {
  background: #2dce89;
}

.options ul {
  margin: 0;
  padding: 0;
}

.options ul li {
  list-style: none;
  display: inline-block;
  width: 100%;
  /* list-style-position: outside; */
  margin: 0;
  padding: 0;
  padding: 5px 10px;
}

.bg-li {
  background: #41f1a5;
}
</style>
