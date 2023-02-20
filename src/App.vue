<script setup>
import { KeepAlive, Suspense } from "vue"
import { RouterView } from "vue-router"
import Loading from "@/components/Loading.vue"

</script>

<template>
	<RouterView v-slot="{ Component }">
		<template v-if="Component">
			<KeepAlive>
				<Suspense>
					<template #default>
						<component :is="Component"></component>
					</template>
					<template #fallback>
						<Loading />
					</template>
				</Suspense>
			</KeepAlive>
		</template>
</RouterView>
</template>
