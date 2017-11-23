/**
 * Created by PVer on 2017/3/18.
 */
/**
 * Created by PVer on 2017/3/17.
 */

var title=$('#example2 th');
var html="<div class='row'>";
for(var i=1;i<title.length-1;i++){
    html+=`
  <div class="row"><span>${title[i].innerHTML}</span><input type="text"/></div>`
}
html+=`<div class="col-xs-4"><span>所有权限</span><input type="button" class="btn"value="显示"data-toggle="modal"data-target="#role-select"></div></div><div class="row"><div class="col-xs-4"></div><div class="col-xs-4"></div><div class="col-xs-4"><botton type="button" class="btn my-btn">保存</botton></div></div>`;
$('#add .row').html(html);
function show(oper) {
    var content=$(oper).parent().parent().children();
    console.log(content);
    var html1 = `<div class='row'>`;
    for (var j = 1; j < title.length-1; j++) {
        if($(content[j]).attr('data-show')!='no') {
            html1 += `
            <div class="col-xs-12 input-line">
                <span>${title[j].innerHTML}</span>
                <div class="input-box">
                    <input type="text" value="${content[j].innerHTML}" data-type='${j}'/>
                </div>
                <b></b>
            </div>
            `
        }
    }
    html1 += `</div><div class="row"><div class="col-xs-12"></div><div class="col-xs-4"></div><div class="col-xs-4"></div><div class="col-xs-4"><botton type="button" class="btn my-btn" id="stationChange">保存</botton></div></div>`;
    $('#correct').html(html1)
}
var title1=$('#example3 th');
function show1(oper) {
    var content=$(oper).parent().parent().children();
    console.log(content);
    var html1 = `<div class='row'>`;
    for (var j = 1; j < title1.length-1; j++) {
        if($(content[j]).attr('data-show')!='no') {
            html1 += `
            <div class="col-xs-12 input-line">
                <span>${title1[j].innerHTML}</span>
                <div class="input-box">
                    <input type="text" value="${content[j].innerHTML}" data-type='${j}'/>
                </div>
                <b></b>
            </div>`
        }else{
            html1 += `
                 <div class="col-xs-12 input-line">
                <span>${title[j].innerHTML}</span>
                <div class="input-box">
                    <select style="width:200px" >
                    </select>
                </div>
                <b></b>
            </div>`
        }
    }
    html1 += `
        </div><div class="row"><div class="col-xs-12"></div><div class="col-xs-4"></div><div class="col-xs-4"></div><div class="col-xs-4"><botton type="button" class="btn my-btn" id="stationChange1">保存</botton></div></div>`;
    $('#correct').html(html1)
}