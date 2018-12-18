<template>
    <div class="day-content">
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
                    <div class="font-12 lightGray" :class="{gray: item.gray, whiteFont: item.selected}">{{item.lunarDate}}</div>
                </span>
            </div>
        </v-touch>
    </div>
</template>

<script>
import calendar from '../calendar.js';
export default {
    name: 'day',
    mixins: [calendar],
    props: ['currentDate'],
    data: function() {
        return {
            clickeDate: '',
        }
    },
    computed: {
        days: function() {
            return this.currentDate && this.getShowDays(this.currentDate);
        },
    },
    methods: {
        handleClicked: function(date) {
            this.clickeDate = date;
        },
    }
}
</script>

<style lang="css">
.day-content .flex-week {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    height: 80px;
    align-items: center;
}
.day-content .flex-week .week-item {
    width: 14%;
    text-align: center;
}
.day-content .flex-day {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
.day-content .flex-day .day-item {
    text-align: center;
    width: 14%;
    padding: 15px 0;
    height: 105px;
}
.lightGray {
    color: #888;
}
.gray {
    color: #ccc;
}
.currentDay {
    background: #1890ff;
    color: #fff;
}
.whiteFont {
    color: #fff;
}
.clicked {
    border: 1px solid #1890ff;/*no*/
}
</style>