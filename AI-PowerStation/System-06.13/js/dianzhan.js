/**
 * Created by PVer on 2017/6/9.
 */
$('#return').click(function(){
    location.href='menu1.html'
});
$('#back-btn').click(function(){
    location.href='index.html'
});
setTimeout(function () {
    $('body').find('.loading').removeClass('loadingin')
},1000);
function table_djust(address,num){
    var html;
    if(address.find('.table-box2 tr').length<2){
        //html='<tr>';
        //for(var i=0;i<address.find('.table-box1 .table-h th').length;i++){
        //    html+='<td></td>';
        //}
        //html+='</tr>';
        //address.find('.table-box2 tbody').append(html);
        //address.find('.scroll-add').css('background','transparent');
    }else{
        address.find('.scroll-add').css('background','#F1F1F1');

    }
    if(num.length=0){
        num=3;
    }else if(num>6){
        num=6
    }
    address.find('.table-box2').css('height',num*41+2);
    var scrollbarWidth = address.find('.table-box2')[0].offsetWidth - $('.table-box2')[0].scrollWidth;
    console.log(scrollbarWidth);
    console.log(address.find('.table-box1')[0].offsetWidth-scrollbarWidth);
    address.find('.scroll-add').width(scrollbarWidth);
    address.find('.table-h').width($('.table-box1')[0].offsetWidth-scrollbarWidth-4);
    address.find('.table-h').each(function(){
        var th_num=address.find('.table-h').find('th').length;
        var tr_num=address.find('.table-b').find('tr').length;
        var th_width;
        console.log(tr_num);
        for(var i=0;i<th_num;i++){
            th_width=address.find('.table-h').find('th').eq(i).outerWidth();
            console.error(i,th_width);
            address.find('.table-b').find('tr').eq(0).find('td').eq(i).outerWidth(th_width) ;
        }
    });
}