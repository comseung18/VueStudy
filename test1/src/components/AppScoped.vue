<template>
    <div class="parent">
        <child>
            <template v-slot:type1="p1">
                <div>{{p1.cx}} + {{p1.cy}} =
                    {{ parseInt(p1.cx) + parseInt(p1.cy)}}
                </div>
            </template>

            <template v-slot:type2="p2">
                <div>{{p2.cx}} 더하기 {{p2.cy}} 는
                    {{ parseInt(p2.cx) + parseInt(p2.cy)}}
                </div>
            </template>
        </child>
    </div>
</template>

<script>
import Child from './ScopedSlot.vue'
export default {
    components : { Child }
}
</script>

<style>
    .parent { border:dashed 2px black; padding : 5px}
</style>>