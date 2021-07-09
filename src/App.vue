<template>
    <router-view></router-view>
</template>

<script>
import { api } from "./services/api";

export default {
    name: "APP",
    async beforeRouteEnter() {
        const token = window.localStorage.getItem("token");
        const user = JSON.parse(window.localStorage.getItem("user"));
        let Response = "";
        if (user) {
            try {
                const { data } = await api.verifyToken({
                    email: user.email,
                    name: user.name,
                    token,
                });

                Response = data;
            } catch (e) {
                console.log(e)
                Response = e;
            }
        }
        // if (token && Response.auth) {
        //   store.commit('UPDATE_LOGIN', Response)
        //   router.push({ name: 'dashboard' })
        // }
        this.$store.commit("UPDATE_LOGIN", Response);
    },
};
</script>
