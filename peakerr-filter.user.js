// ==UserScript==
// @name         Peakerr-service数据筛选
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       小付
// @match        https://peakerr.com/services
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      https://cdn.staticfile.org/jquery/3.5.0/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';

    function func() {

        //Peakerr全局价格修改
        const rate_mix = 0;
        const rate_max = 5;


        const csv_data = []
        //表格表头
        let csv_row = 'id,category,rate,mix,max,time(minutes),title\n'
        const category_list = new Map()

        //方法
        $(".services-list-category-title").each(function (index, element) {
            const categoryid = element.getAttribute('data-filter-table-category-id')
            const category = element.children[0].children[0].children[0].children[1].textContent
            if(category.includes('Instagram') || category.includes('TikTok') || category.includes('YouTube')){
                category_list.set(categoryid,category)
                // console.log(category_list)
            }
        })

        $("#service-tbody tr[class != 'services-list-category-title']").each(function (index, element){
            let item = item_post(element,category_list)
            if (item.category != undefined && rate_mix <= parseFloat(item.rate.substr(1)) && parseFloat(item.rate.substr(1)) <= rate_max && (item.time.includes('hour') == false)) {
                item.time = parseInt(item.time)
                console.log(JSON.stringify(item))
                csv_data.push(item)
                console.log(item.length)

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
        link.download = `Peakerr数据表${now_time.getFullYear()}-${now_time.getMonth() + 1}-${now_time.getDate()}-${now_time.getHours()}:${now_time.getMinutes()}:${now_time.getSeconds()}.csv`;
        let btn = document.createElement("BUTTON");
        const t = document.createTextNode("点击下载CSV表格");
        btn.appendChild(t);
        link.appendChild(btn);
        document.querySelector("#block_55 > span.component_private_sidebar > div > div > ul").appendChild(link);
        // link.click();

    }

    function item_post(element,category_list) {
        let id = element.children[0].textContent.trim()
        let title = element.children[1].textContent
        let rate = element.children[2].textContent.trim()
        let mix = element.children[3].textContent
        let max = element.children[4].textContent
        let time = element.children[5].textContent
        let category = category_list.get(element.getAttribute('data-filter-table-category-id'))
        let item = {id: id, category: category, rate: rate, mix: mix, max: max, time: time, title: title}
        return item
    }




    setTimeout(func, 4000);
})();
