/**
 * Created by PVer on 2017/3/18.
 */
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
  <div class="col-xs-12"><span>${title[j].innerHTML}</span><input type="text" value="${content[j].innerHTML}"/></div>`
        }else{
            html1 += `
  <div class="col-xs-12"><span>所属监控站</span><span><select style="width:200px">
                                <option>南京</option>
                                <option>上海</option>
                                <option>广州</option>
                            </select></span></div>`
        }
    }
    html1 += `</div><div class="row"><div class="col-xs-12"></div>
        <div class="col-xs-4"></div>
        <div class="col-xs-4"><botton type="button" class="btn my-btn" id="hostchange">保存</botton></div>
    </div>`;
    $('#correct').html(html1)
}
var title1=$('#example3 th');
function show1(oper) {
    var content=$(oper).parent().parent().children();
    console.log(content);
    var html1 = `<div class='row'>`;
    for (var j = 1; j < title1.length-1; j++) {
        if(!$(content[j]).attr('data-show')) {
            html1 += `
  <div class="col-xs-12"><span>${title1[j].innerHTML}</span><input type="text" value="${content[j].innerHTML}"/></div>`
        }else if($(content[j]).attr('data-show')==-1){
            html1 += `
  <div class="col-xs-12"><span>${title1[j].innerHTML}</span><span>
    <input type="button" class="btn" value="${content[j].innerHTML}" data-toggle="modal" data-target="#host-select">

  </span></div>`
        }else if($(content[j]).attr('data-show')==-2){
            html1 += `
  <div class="col-xs-12"><span>${title1[j].innerHTML}</span><span><select style="width:200px" id="room-select">
                            </select></span></div>`
        }else if($(content[j]).attr('data-show')==-3){
            html1 += `
  <div class="col-xs-12"><span>${title1[j].innerHTML}</span><span><select style="width:200px" id="dict-select">
                            </select></span></div>`
        }
    }
    html1 += `
        </div>
            <div class="row"><div class="col-xs-12"></div><div class="col-xs-4"></div>
            <div class="col-xs-4"><botton type="button" class="btn my-btn" data-toggle="modal"data-target='#binding2'id='bindR'>绑定</botton></div>
            <div class="col-xs-4"><botton type="button" class="btn my-btn" id="ctRevise-submit">保存</botton></div>
        </div>
        `;
    $('#correct').html(html1)
}