<template>
    <div class="box">
        <div class="header clearfix">
            <span class="left font-20" @click.stop="closePanel">×</span>
            <span class="title font-16">{{currentDate.split('/')[0]}}年{{currentDate.split('/')[1]}}月</span>
            <div class="tab-card font-16">
                <span class="tab-item" :class="{monthSelected: 'day' === monthSelected}" @click.stop="handleMonthSwitch('day')">日</span>
                <span class="tab-item" :class="{monthSelected: 'month' === monthSelected}" @click.stop="handleMonthSwitch('month')">月</span>
                <span class="tab-item" :class="{monthSelected: 'year' === monthSelected}" @click.stop="handleMonthSwitch('year')">年</span>
            </div>
            <span class="today font-16" @click.stop="handleToday">今天</span>
        </div>
        <component :is="monthSelected" @changeDate="handleChangeDate" @changeMonthSelected="handleMonthSwitch" :currentDate="currentDate"></component>
    </div>
</template>

<script>
import day from './day';
import month from './month';
import year from './year';
export default {
    name: 'calendarBox',
    components: {
        day: day,
        month: month,
        year: year,
    },
    data: function() {
        return {
            monthSelected: 'day',
            currentDate: '',
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
    height: 80px;
    line-height: 80px;
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
</style>
