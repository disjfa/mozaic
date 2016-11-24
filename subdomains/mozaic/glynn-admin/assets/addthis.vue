<template>
    <div class="addthis_inline_share_toolbox"></div>
</template>
<style>

</style>
<script>
    export default{
        mounted() {
            if(typeof addthis != 'undefined') {
                addthis.toolbox();
            }
        }
    }
</script>
