<template>
    <div>
        <div class="header clearfix">
            <span class="left font-20" @click.stop="closePanel">←</span>
            <span class="title font-16">{{currentYear}}年</span>
        </div>
        <v-touch @swipeleft="handleYearSwiperLeft" @swiperight="handleYearSwiperRight">
            <div class="yearView">
                <div class="view-flex" v-for="(days, index) in dataList" :key="index" @click.stop="handleMonthSelect(index)">
                    <div class="month-title">
                        <span class="font-18">{{index + 1}}</span>
                        <span class="up">月</span>
                    </div>
                    <div class="month-day">
                        <div class="flex-week">
                            <span class="week-item">日</span>
                            <span class="week-item">一</span>
                            <span class="week-item">二</span>
                            <span class="week-item">三</span>
                            <span class="week-item">四</span>
                            <span class="week-item">五</span>
                            <span class="week-item">六</span>
                        </div>
                        <div class="flex-day">
                            <span class="day-item" v-for="item in days" :key="item.date">{{item.day}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </v-touch>
    </div>
</template>

<script>
import calendar from '../calendar.js';
export default {
    name: 'yearView',
    mixins: [calendar],
    data: function() {
        return {
            currentYear: new Date().getFullYear(),
            dataList: [],
        }
    },
    mounted: function() {
        this.dataList = this.handleYearDate(this.currentYear);
    },
    watch: {
        currentYear: function(val) {
            this.dataList = this.handleYearDate(val);
        }
    },
    methods: {
        closePanel: function() {
            this.$emit("changeYearView");  
        },
        // 组装一年的月份数据
        handleYearDate: function(year) {
            let arr = [];
            for (let i = 1; i <= 12; i++) {
                arr.push(this.getShowDays(`${year}/${i}/1`, true));
            }
            return arr;
        },
        // 手势左滑
        handleYearSwiperLeft: function() {
            this.currentYear += 1;
        },
        // 手势右滑
        handleYearSwiperRight: function() {
            this.currentYear -= 1;
        },
        // 选中某月，切换到具体月展示
        handleMonthSelect: function(index) {
            this.$emit("selectMonth", `${this.currentYear}/${index + 1}`);
        }
    },
}
</script>

<style lang="css">
.yearView {
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: auto;
}
.month-title .up {
    vertical-align: super;
}
.yearView .view-flex {
    width: 32%;
}
.yearView .view-flex:last-child {
    margin-bottom: 0;
}
.month-day .flex-week {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    height: 33px;
    align-items: center;
}
.month-day .flex-week .week-item {
    width: 14%;
    text-align: center;
    color: #888;
}
.month-day .flex-day {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
.month-day .flex-day .day-item {
    text-align: center;
    width: 14%;
    height: 33px;
}
</style>