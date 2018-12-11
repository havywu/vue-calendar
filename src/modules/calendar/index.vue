<template>
    <div class="box">
        <div class="header clearfix">
            <span class="title font-16">{{currentDate.split('/')[0]}}年{{currentDate.split('/')[1]}}月</span>
            <span class="left font-16" @click.stop="closePanel">×</span>
        </div>
        <div class="content">
            <div class="flex-week">
                <span class="week-item font-14">日</span>
                <span class="week-item font-14">一</span>
                <span class="week-item font-14">二</span>
                <span class="week-item font-14">三</span>
                <span class="week-item font-14">四</span>
                <span class="week-item font-14">五</span>
                <span class="week-item font-14">六</span>
            </div>
            <v-touch @swipeleft="handleSwiperLeft" @swiperight="handleSwiperRight">
                <div class="flex-day">
                    <span class="day-item font-16" :class="{gray: item.gray, currentDay: item.selected, clicked: item.date === clickeDate}" v-for="item in days" :key="item.date" @click.stop="handleClicked(item.date)">
                        <div>{{item.day}}</div>
                        <div class="font-12 lightGray">{{item.lunarDate}}</div>
                    </span>
                </div>
            </v-touch>
        </div>
    </div>
</template>

<script>
import calendar from './calendar.js';
export default {
    name: 'calendarBox',
    mixins: [calendar],
    data: function() {
        return {
            days: [],
            currentDate: '',
            clickeDate: '',
        }
    },
    watch: {
        currentDate: function(val) {
            this.days = this.getShowDays(val);
        }
    },
    mounted() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let currentDate = date.getDate();
        this.currentDate = `${year}/${month}/${currentDate}`;
    },
    methods: {
        closePanel: function() {
            this.$emit("changePanel", false);  
        },
        handleClicked: function(date) {
            this.clickeDate = date;
        }
    }
}
</script>

<style lang="css">
.box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: #fff;
    padding: 0 20px;
    box-sizing: border-box;
}
.header {
    text-align: center;
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #e7e7e7;/*no*/
}
.header .left {
    float: left;
    color: rgba(16,142,233,.7);
}
.flex-week {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    height: 80px;
    align-items: center;
}
.flex-week .week-item {
    width: 14%;
    text-align: center;
}
.flex-day {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
.flex-day .day-item {
    text-align: center;
    width: 14%;
    padding: 15px 0;
}
.lightGray {
    color: #666;
}
.gray {
    color: #888;
}
.currentDay {
    background: rgba(16,142,233,.2);
}
.clicked {
    border: 1px solid rgba(16,142,233,1);/*no*/
}
</style>
