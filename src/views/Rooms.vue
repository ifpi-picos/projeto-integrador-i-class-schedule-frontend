<template>
  <skeleton>
    <room-form idModal="modalAdd" title="Nova Sala" />
    <b-card>
      <b-card-header class="pt-0 pl-0 pr-0">
        <b-row align-h="between">
          <b-col>
            <!-- <h3>Salas de aula</h3> -->
            <b-form
              class="navbar-search form-inline mr-sm-3"
              id="navbar-search-main"
            >
              <b-form-group class="mb-0">
                <b-input-group
                  class="input-group-alternative input-group-merge"
                >
                  <b-form-input
                    type="text"
                    id="search"
                    name="search"
                    v-model="busca"
                    placeholder="Buscar..."
                  >
                  </b-form-input>

                  <div class="input-group-append">
                    <span class="input-group-text">
                      <button
                        @click.prevent="search"
                        :disabled="disabled"
                        class="fas fa-search"
                        style="background:transparent;border:none"
                      ></button>
                    </span>
                  </div>
                </b-input-group>
              </b-form-group>
            </b-form>
          </b-col>
          <b-col class="text-right">
            <b-button variant="success" v-b-modal.modalAdd>
              <i class="ni ni-fat-add"></i>
              Adcionar</b-button
            >
          </b-col>
        </b-row>
      </b-card-header>
      <b-card-body class="p-0">
        <room-list />
      </b-card-body>
    </b-card>
  </skeleton>
</template>

<script>
import RoomForm from '../components/RoomForm.vue'
import RoomList from '../components/RoomList.vue'

export default {
  components: {
    RoomList,
    RoomForm
  },
  name: 'Rooms',
  data () {
    return {
      busca: '',
      disabled: false
    }
  },
  methods: {
    search () {
      this.disabled = true
      this.$router.push({ query: { q: this.busca } })
    }
  },
  watch: {
    busca () {
      this.disabled = false
    }
  },

  props: {
    // type: {
    //   type: String,
    //   default: 'default', // default|light
    //   description:
    //     'Look of the dashboard navbar. Default (Green) or light (gray)'
    // }
  }
}
</script>

<style></style>
