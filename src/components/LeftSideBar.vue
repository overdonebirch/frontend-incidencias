<script setup>

</script>


<template>
    <v-navigation-drawer color="cyan-lighten-2" height="100vh" permanent class="py-10">
        <v-list nav class="d-flex flex-column align-center gap-5">
            <slot></slot>
        </v-list>
    </v-navigation-drawer>
</template>


<style lang="scss" scoped></style>