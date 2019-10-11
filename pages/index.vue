<template>
   <div class="container">
        <!-- 幻灯片 -->
        <el-carousel 
        :interval="5000" 
        arrow="always">
            <el-carousel-item 
            v-for="(item, index) in banners" 
            :key="index">
                <div class="banner-image" 
                :style="`
                background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
                background-size:contain contain;
                `">
                </div>
            </el-carousel-item>
        </el-carousel>

        <div class="banner-content">
            <div class="search-bar">
                
                <!-- tab栏 -->
                <el-row 
                type="flex" 
                class="search-tab">
                    <span 
                    v-for="(item, index) in options" 
                    :key="index" 
                    :class="{active: index === currentOption}"
                    @click="handleOption(index)">
                        <i>{{item.name}}</i>
                    </span>
                </el-row>
                
                <!-- 输入框 -->
                <el-row 
                type="flex" 
                align="middle" 
                class="search-input">
                    <input 
                    :placeholder="options[currentOption].placeholder" 
                    v-model="searchValue"
                    @keyup.enter="handleSearch"/>
                    <i class="el-icon-search" @click="handleSearch"></i>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>

import config from './index.js'
export default config
</script>

<style scoped lang="less">
@import url('./index.less');
</style>
