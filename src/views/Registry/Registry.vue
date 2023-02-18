<script setup>
import LoginRegistry from "@/components/LoginRegistry.vue";
import RegistryCover from "@/views/Registry/components/RegistryCover/RegistryCover.vue"
import RegistryInfo from "@/views/Registry/components/RegistryInfo/RegistryInfo.vue"

</script>

<template>
    <LoginRegistry>
        <template #left>
            <RegistryCover />
        </template>
        <template #right>
            <RegistryInfo />
        </template>
    </LoginRegistry>
</template>
