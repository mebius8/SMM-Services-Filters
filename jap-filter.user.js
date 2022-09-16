// ==UserScript==
// @name         jap- service数据筛选
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       小付
// @match        https://justanotherpanel.com/services
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      https://cdn.staticfile.org/jquery/3.5.0/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    function func() {

        //instagram 的列表修改
        const ins_view_list = [
            'Instagram Views'
        ]

        const ins_like_list = [
            'Instagram Likes',
            'Instagram Likes [Targeted]'
        ]

        const ins_follow_list = [
            'Instagram Followers [Guaranteed]',
            'Instagram Followers [Not Guaranteed]'
        ]

        //Instagram 的价格修改
        const ins_view_mix = 0;
        const ins_view_max = 0.06;

        const ins_like_mix = 0;
        const ins_like_max = 0.3;

        const ins_follow_mix = 0;
        const ins_follow_max = 0.3;



        //tiktok 的列表修改
        const tik_view_list = [
            'Tiktok Views'
        ]
        const tik_like_list = [
            'Tiktok Likes'
        ]
        const tik_follow_list = [
            'Tiktok Followers'
        ]

        //tiktok 的价格价格
        const tik_view_mix = 0;
        const tik_view_max = 0.06;

        const tik_like_mix = 0;
        const tik_like_max = 0.3;

        const tik_follow_mix = 0;
        const tik_follow_max = 0.3;


        const csv_data = []
        let csv_row = 'id,type,rate,mix,max,time(minutes),title\n'

        //ins view 方法
        for(let service_name of ins_view_list){
            $(".service[data-category = '"+service_name+"']").each(function (index,element){
                let item = item_post(element,'ins-view')
                if(ins_view_mix <= parseFloat(item.rate.substr(1)) && parseFloat(item.rate.substr(1)) <= ins_view_max  && (item.time.includes('hour') == false)){
                    item.time = parseInt(item.time)
                    console.log(JSON.stringify(item))
                    csv_data.push(item)
                }
            })
        }

        //ins like 方法
        for(let service_name of ins_like_list){
            $(".service[data-category = '"+service_name+"']").each(function (index,element){
                let item = item_post(element,'ins-like')
                if(ins_like_mix <= parseFloat(item.rate.substr(1)) && parseFloat(item.rate.substr(1)) <= ins_like_max && (item.time.includes('hour') == false)){
                    item.time = parseInt(item.time)
                    console.log(JSON.stringify(item))
                    csv_data.push(item)
                }
            })
        }

        //ins follow 方法
        for(let service_name of ins_follow_list){
            $(".service[data-category = '"+service_name+"']").each(function (index,element){
                let item = item_post(element,'ins-follow')
                if(ins_follow_mix <= parseFloat(item.rate.substr(1)) && parseFloat(item.rate.substr(1)) <= ins_follow_max && (item.time.includes('hour') == false)){
                    item.time = parseInt(item.time)
                    console.log(JSON.stringify(item))
                    csv_data.push(item)
                }
            })
        }

        //tik view 方法
        for(let service_name of tik_view_list){
            $(".service[data-category = '"+service_name+"']").each(function (index,element){
                let item = item_post(element,'tik-view')
                if(tik_view_mix <= parseFloat(item.rate.substr(1)) && parseFloat(item.rate.substr(1)) <= tik_view_max && (item.time.includes('hour') == false)){
                    item.time = parseInt(item.time)
                    console.log(JSON.stringify(item))
                    csv_data.push(item)
                }
            })
        }

        //tik like 方法
        for(let service_name of tik_like_list){
            $(".service[data-category = '"+service_name+"']").each(function (index,element){
                let item = item_post(element,'tik-like')
                if(tik_like_mix <= parseFloat(item.rate.substr(1)) && parseFloat(item.rate.substr(1)) <= tik_like_max && (item.time.includes('hour') == false)){
                    item.time = parseInt(item.time)
                    console.log(JSON.stringify(item))
                    csv_data.push(item)
                }
            })
        }

        //tik follow 方法
        for(let service_name of tik_follow_list){
            $(".service[data-category = '"+service_name+"']").each(function (index,element){
                let item = item_post(element,'tik-follow')
                if(tik_follow_mix <= parseFloat(item.rate.substr(1)) && parseFloat(item.rate.substr(1)) <= tik_follow_max && (item.time.includes('hour') == false)){
                    item.time = parseInt(item.time)
                    console.log(JSON.stringify(item))
                    csv_data.push(item)
                }
            })
        }

        //输出csv文件
        for(let i = 0; i < csv_data.length; i++ ){
            for(const key in csv_data[i]){
                csv_row +=`${csv_data[i][key] + '  '},`;
            }
            csv_row +='\n';
        }
        // encodeURIComponent解决中文乱码
        const uri = 'data:text/csv;charset=utf-8,ufeff' + encodeURIComponent(csv_row);
        // 通过创建a标签实现
        const link = document.createElement("a");
        link.href = uri;
        // 对下载的文件命名
        let now_time = new Date()
        link.download =  `jsp数据表${now_time.getFullYear()}-${now_time.getMonth()+1}-${now_time.getDate()}-${now_time.getHours()}:${now_time.getMinutes()}:${now_time.getSeconds()}.csv`;
        let btn=document.createElement("BUTTON");
        const t=document.createTextNode("点击下载CSV表格");
        btn.appendChild(t);
        link.appendChild(btn);
        document.querySelector("body > div.sidebar > div").appendChild(link);
        // link.click();



    }
    function item_post(element,type){
        let id = element.children[0].textContent.trim()
        let title = element.children[1].textContent
        let rate = element.children[2].textContent
        let mix = element.children[3].textContent
        let max = element.children[4].textContent
        let time = element.children[5].textContent
        let item = {id: id, type: type, rate: rate, mix: mix, max: max, time: time , title: title}
        return item
    }

    function create_element() {
        let ele = document.createElement('button')
        let t = document.createTextNode("下载csv表格")
        ele.appendChild(t)
        ele.onclick = 'link.click()'
    }

    setTimeout(func,4000 );
})();
