<template>
    <div class="box">
        <!-- 年月日选择视图 -->
        <div class="calendar" v-if="!isYearView" :class="[scaleDraw]">
            <div class="header clearfix">
                <span class="left font-20" @click.stop="closePanel">×</span>
                <span class="title font-16">{{currentDate.split('/')[0]}}年{{currentDate.split('/')[1]}}月</span>
                <span>
                    <div class="tab-card font-16">
                        <span class="tab-item" :class="{monthSelected: 'day' === monthSelected}" @click.stop="handleMonthSwitch('day')">日</span>
                        <span class="tab-item" :class="{monthSelected: 'month' === monthSelected}" @click.stop="handleMonthSwitch('month')">月</span>
                        <span class="tab-item" :class="{monthSelected: 'year' === monthSelected}" @click.stop="handleMonthSwitch('year')">年</span>
                    </div>
                    <span class="today font-16" @click.stop="handleToday">今天</span>
                </span>
            </div>
            <component :is="monthSelected" @changeDate="handleChangeDate" @changeMonthSelected="handleMonthSwitch" :currentDate="currentDate"></component>
            <div class="year-view">
                <span class="button font-16" @click.stop="changeYearView(true)">年视图</span>
            </div>
        </div>
        <!-- 年视图 -->
        <year-view v-if="isYearView" @changeYearView="changeYearView(false)" @selectMonth="handleSelectMonth"></year-view>
    </div>
</template>

<script>
import day from './components/day';
import month from './components/month';
import year from './components/year';
import yearView from './components/yearView';
export default {
    name: 'calendarBox',
    components: {
        day: day,
        month: month,
        year: year,
        yearView: yearView,
    },
    data: function() {
        return {
            monthSelected: 'day',
            currentDate: '',
            isYearView: false,
            scaleDraw: null,
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
        handleMonthSwitch: function(flag) {
            this.monthSelected = flag;
        },
        handleChangeDate: function(date) {
            this.currentDate = date;
        },
        handleToday: function() {
            this.monthSelected = 'day';
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let currentDate = date.getDate();
            this.currentDate = `${year}/${month}/${currentDate}`;
        },
        changeYearView: function(flag) {
            this.isYearView = flag;
        },
        handleSelectMonth: function(date) {
            this.currentDate = `${date}/1`;
            this.monthSelected = "day";
            this.isYearView = false;
            this.scaleDraw = `scaleDraw${date.split('/')[1]}`;
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
.calendar {
    height: 100%;
}
.header {
    height: 75px;
    line-height: 75px;
    border-bottom: 1px solid #e7e7e7;/*no*/
}
.header .left {
    color: #1890ff;
    margin-right: 30px;
}
.header .today {
    float: right;
    margin-right: 20px;
    color: #1890ff;
}
.header .tab-card {
    float: right;
    width: 240px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}
.header .tab-card .tab-item {
    flex-grow: 1;
    text-align: center;
    height: 60px;
    line-height: 60px;
    border: 1px solid #c7c7c7;/*no*/
}
.monthSelected {
    border: 1px solid #1890ff !important;/*no*/
}
.header .tab-card .tab-item:nth-child(2) {
    border-left: none;
    border-right: none;
}
.year-view {
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    width: 100%;
    height: 80px;
    line-height: 80px;
    border-top: 1px solid #e7e7e7;/*no*/
}
.year-view .button {
    padding: 5px 10px;
    color: #1890ff;
    box-sizing: border-box;
    border: 1px solid #1890ff;/*no*/
}
@keyframes myScale {
    0%{
        transform: scale(0.2);
    }
    100%{
        transform: scale(1);
    }
}
.scaleDraw1 {
    transform-origin:15% 12.5%;
    animation: myScale 400ms ease-in;
}
.scaleDraw2 {
    transform-origin:50% 12.5%;
    animation: myScale 400ms ease-in;
}
.scaleDraw3 {
    transform-origin:85% 12.5%;
    animation: myScale 400ms ease-in;
}
.scaleDraw4 {
    transform-origin:15% 37.5%;
    animation: myScale 400ms ease-in;
}
.scaleDraw5 {
    transform-origin:50% 37.5%;
    animation: myScale 400ms ease-in;
}
.scaleDraw6 {
    transform-origin:85% 37.5%;
    animation: myScale 400ms ease-in;
}
.scaleDraw7 {
    transform-origin:15% 62.5%;
    animation: myScale 400ms ease-in;
}
.scaleDraw8 {
    transform-origin:50% 62.5%;
    animation: myScale 400ms ease-in;
}
.scaleDraw9 {
    transform-origin:85% 62.5%;
    animation: myScale 400ms ease-in;
}
.scaleDraw10 {
    transform-origin:15% 87.5%;
    animation: myScale 400ms ease-in;
}
.scaleDraw11 {
    transform-origin:50% 87.5%;
    animation: myScale 400ms ease-in;
}
.scaleDraw12 {
    transform-origin:85% 87.5%;
    animation: myScale 400ms ease-in;
}
</style>
