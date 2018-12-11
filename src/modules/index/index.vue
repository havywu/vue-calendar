<template>
    <div class="body">
        <button @click.stop="changePanel(true)">日历选择</button>
        <transition name="fade">
            <calendar-box v-if="isShow" @changePanel="changePanel"></calendar-box>
        </transition>
    </div>
</template>

<script>
import calendarBox from '../calendar/index';
export default {
    name: 'index',
    data: function() {
        return {
            isShow: false,
        };
    },
    components: {
        calendarBox,
    }, 
    methods: {
        changePanel: function(flag) {
            this.isShow = flag;
        }
    }
}
</script>

<style lang="css">
.body button {
    background-color: #fff;
    width: 200px;
    height: 80px;
    line-height: 80px;
    margin: 10px;
}
</style>