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

(function () {
    'use strict';

    function func() {

        //全局价格修改
        const rate_mix = 0;
        const rate_max = 5;


        const csv_data = []
        //表格表头
        let csv_row = 'id,category,rate,mix,max,time(minutes),title\n'

        //tik follow 方法
        $(".service").each(function (index, element) {
            let item = item_post(element)
            if (rate_mix <= parseFloat(item.rate.substr(1)) && parseFloat(item.rate.substr(1)) <= rate_max && (item.time.includes('hour') == false)) {
                item.time = parseInt(item.time)
                if(item.category.includes('Instagram') || item.category.includes('Tiktok')){
                    console.log(JSON.stringify(item))
                    csv_data.push(item)
                }

            }
        })


        //输出csv文件
        for (let i = 0; i < csv_data.length; i++) {
            for (const key in csv_data[i]) {
                csv_row += `${csv_data[i][key] + '  '},`;
            }
            csv_row += '\n';
        }
        // encodeURIComponent解决中文乱码
        const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(csv_row);
        // 通过创建a标签实现
        const link = document.createElement("a");
        link.href = uri;
        // 对下载的文件命名
        let now_time = new Date()
        link.download = `jsp数据表${now_time.getFullYear()}-${now_time.getMonth() + 1}-${now_time.getDate()}-${now_time.getHours()}:${now_time.getMinutes()}:${now_time.getSeconds()}.csv`;
        let btn = document.createElement("BUTTON");
        const t = document.createTextNode("点击下载CSV表格");
        btn.appendChild(t);
        link.appendChild(btn);
        document.querySelector("body > div.sidebar > div").appendChild(link);
        // link.click();


    }

    function item_post(element) {
        let id = element.children[0].textContent.trim()
        let title = element.children[1].textContent
        let rate = element.children[2].textContent
        let mix = element.children[3].textContent
        let max = element.children[4].textContent
        let time = element.children[5].textContent
        let category = element.getAttribute('data-category')
        let item = {id: id, category: category, rate: rate, mix: mix, max: max, time: time, title: title}
        return item
    }

    function create_element() {
        let ele = document.createElement('button')
        let t = document.createTextNode("下载csv表格")
        ele.appendChild(t)
        ele.onclick = 'link.click()'
    }

    setTimeout(func, 4000);
})();
