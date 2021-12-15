<template>
	<router-view></router-view>
</template>

<script>
export default {
	name: 'APP'
	// async beforeRouteEnter() {
	//     const token = window.localStorage.getItem("token");
	//     const user = JSON.parse(window.localStorage.getItem("user"));
	//     let Response = "";
	//     if (user) {
	//         try {
	//             const { data } = await api.verifyToken({
	//                 email: user.email,
	//                 name: user.name,
	//                 token,
	//             });

	//             Response = data;
	//         } catch (e) {
	//             console.log(e)
	//             Response = e;
	//         }
	//     }
	//     // if (token && Response.auth) {
	//     //   credentials(Response)
	//     //   router.push({ name: 'dashboard' })
	//     // }
	//     credentials(Response)
	// },
}
</script>
