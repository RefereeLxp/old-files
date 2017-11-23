//��ȡ��ʷ���ҳ���״̬
function getPageNumber(){
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/getPageNumber',
        dataType:"json",
        success: function(list){
            userNumber=list.userPageNumber;
            computerNumber=list.computerPageNumber;
            officeNumber=list.officePageNumber;
            storageNumber=list.storagePageNumber;
            state=list.state;
            ifLab=list.ifLab;
            viewType=list.viewType;
        }
    })
    return [userNumber,computerNumber,officeNumber,storageNumber,state,ifLab,viewType];
}
//�Զ����س�ʼҳ
function initialPage(){
    var pageNumber=getPageNumber();
    var userPageNumber=pageNumber[0];
    var computerPageNumber=pageNumber[1];
    var officePageNumber=pageNumber[2];
    var storagePageNumber=pageNumber[3];
    state=pageNumber[4];
    var ifLab=pageNumber[5];
    var viewType=pageNumber[6];
    if(state!=100){

        if(ifLab==1){
            userUrl='/nuaa/viewUserByLaboratory/'+state;
            computerUrl='/nuaa/viewComputerByLaboratory/'+state;
            officeUrl='/nuaa/viewOfficeByLaboratory/'+state;
            storageUrl='/nuaa/viewStorageByLaboratory/'+state;
            htmlPaginate='-lab';
        }
        else if(state==0){
            userUrl='/nuaa/viewUser';
            computerUrl='/nuaa/viewComputer';
            officeUrl='/nuaa/viewOffice';
            storageUrl='/nuaa/viewStorage';
            htmlPaginate='';
        }
        else if(state==99){
            userUrl='/nuaa/viewUserByself';
            computerUrl='/nuaa/viewComputerByself';
            officeUrl='/nuaa/viewOfficeByself';
            storageUrl='/nuaa/viewStorageByself';
            htmlPaginate='-self';
        }
        else{
            userUrl='/nuaa/viewUserByCollege/'+state;
            computerUrl='/nuaa/viewComputerByCollege/'+state;
            officeUrl='/nuaa/viewOfficeByCollege/'+state;
            storageUrl='/nuaa/viewStorageByCollege/'+state;
            htmlPaginate='-college';
        }
        $.ajax({
            type: 'POST',
            async: false,
            url: userUrl,
            data:{pageNumber:userPageNumber},
            dataType:"json",
            success: function(list){
                html_user='';
                for(var i in list.user){
                    html_user+=" <div class='col-xs-2 col-lg-1 user-info-box'> <div class='user-info'  data-toggle='modal' data-target='#user' user-no="+list.user[i].no+"> <div class='img-box'><img src='/nuaa/image/head.png' alt=''/></div> <p>"+list.user[i].name+"</p> </div> </div>"
                }
                html_userPaginate="<li data-direction data-page='backward' class='page-lf page"+htmlPaginate+"data-id="+state+"><a>&laquo;</a></li>";
                for(var i=1;i<=list.userTotalPage;i++){
                    html_userPaginate+="<li data-page="+i+"class='page"+htmlPaginate+" page-single' data-id="+state+"><a>"+i+"</a></li>";
                }
                html_userPaginate+="<li data-direction data-page='forward' class='page-rg page"+htmlPaginate+"  data-id="+state+"><a>&raquo;</a></li>";
                if(list.userTotalPage==0)
                    html_userPaginate="";
            }
        });
        $.ajax({
            type: 'POST',
            async: false,
            url: computerUrl,
            data:{pageNumber:computerPageNumber},
            dataType:"json",
            success: function(list){
                html_computer=``;
                for(var i in list.computer){
                    html_computer+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#eq-pop-computer" computer-id="${list.computer[i].id}">
                    <div class="img-box"><img src="/nuaa/image/com.png" alt=""/></div>
                    <p>${list.computer[i].sn}</p>
                </div>
            </div>
        		`;

                }
                html_computerPaginate=`
        	<li data-direction class="page-lf page${htmlPaginate}" data-page='backward'  data-id="${state}"><a>&laquo;</a></li>
        	`;
                for(var i=1;i<=list.computerTotalPage;i++){
                    html_computerPaginate+=`
        		<li data-page='${i}' class="page${htmlPaginate} page-single" data-id="${state}"><a>${i}</a></li>
        		`;
                }
                html_computerPaginate+=`
        	<li data-direction data-page='forward' class="page-rg page${htmlPaginate}"  data-id="${state}"><a>&raquo;</a></li>
        	`;
                if(list.computerTotalPage==0)
                    html_computerPaginate=``;
            }
        })
        $.ajax({
            type: 'POST',
            async: false,
            url: officeUrl,
            data:{pageNumber:officePageNumber},
            dataType:"json",
            success: function(list){
                html_office=``;
                for(var i in list.office){
                    html_office+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#eq-pop-office" office-id="${list.office[i].id}">
                    <div class="img-box"><img src="/nuaa/image/dayinji.png" alt=""/></div>
                    <p>${list.office[i].sn}</p>
                </div>
            </div>
        		`;

                }
                html_officePaginate=`
        	<li data-direction class="page-lf page${htmlPaginate}" data-page='backward'  data-id="${state}"><a>&laquo;</a></li>
        	`;
                for(var i=1;i<=list.officeTotalPage;i++){
                    html_officePaginate+=`
        		<li data-page='${i}' class="page${htmlPaginate} page-single" data-id="${state}"><a>${i}</a></li>
        		`;
                }
                html_officePaginate+=`
        	<li data-direction data-page='forward' class="page-rg page${htmlPaginate}"  data-id="${state}"><a>&raquo;</a></li>
        	`;
                if(list.officeTotalPage==0)
                    html_officePaginate=``;
            }
        })
        $.ajax({
            type: 'POST',
            async: false,
            url: storageUrl,
            data:{pageNumber:storagePageNumber},
            dataType:"json",
            success: function(list){
                html_storage=``;
                for(var i in list.storage){
                    html_storage+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#eq-pop-storage" storage-id="${list.storage[i].id}">
                    <div class="img-box"><img src="/nuaa/image/yingpan.png" alt=""/></div>
                    <p>${list.storage[i].sn}</p>
                </div>
            </div>
        		`;

                }
                html_storagePaginate=`
        	<li data-direction class="page-lf page${htmlPaginate}" data-page='backward'  data-id="${state}"><a>&laquo;</a></li>
        	`;
                for(var i=1;i<=list.storageTotalPage;i++){
                    html_storagePaginate+=`
        		<li data-page='${i}' class="page${htmlPaginate} page-single" data-id="${state}"><a>${i}</a></li>
        		`;
                }
                html_storagePaginate+=`
        	<li data-direction data-page='forward' class="page-rg page${htmlPaginate}"  data-id="${state}"><a>&raquo;</a></li>
        	`;
                if(list.storageTotalPage==0)
                    html_storagePaginate=``;
            }
        })
        $('#view-user').empty().html(html_user);
        $('#user_paginate').empty().html(html_userPaginate);
        $('#view-computer').empty().html(html_computer);
        $('#computer_paginate').empty().html(html_computerPaginate);
        $('#view-office').empty().html(html_office);
        $('#office_paginate').empty().html(html_officePaginate);
        $('#view-storage').empty().html(html_storage);
        $('#storage_paginate').empty().html(html_storagePaginate);
        $("#user_paginate li[data-page='"+pageNumber[0]+"']").each(function(){
            $(this).addClass("active");
        })
        $("#computer_paginate li[data-page='"+pageNumber[1]+"']").each(function(){
            $(this).addClass("active");
        })
        $("#office_paginate li[data-page='"+pageNumber[2]+"']").each(function(){
            $(this).addClass("active");
        })
        $("#storage_paginate li[data-page='"+pageNumber[3]+"']").each(function(){
            $(this).addClass("active");
        })

    }else if(state==100){
        if(viewType==1){
            $.ajax({
                type: 'POST',
                //async: false,
                url: '/nuaa/inquireRecord',
                success: function(list){
                    var html_user=`
		            <div class="col-xs-2 col-lg-1 user-info-box">
		              <div class="user-info"  data-toggle="modal" data-target="#user" user-no="${list.user.no}">
		                <div class="img-box"><img src="/nuaa/image/head.png" alt=""/></div>
		                <p>${list.user.name}</p>
		              </div>
		            </div>
		    		`;
                    $('#view-user').empty().html(html_user);
                    $('#user_paginate').empty();
                }
            })
        }else if(viewType==0){
            inquireMachineInitial();
        }
    }
}
//��ѯ�豸����Զ�����
function inquireMachineInitial(){
    $.ajax({
        type: 'POST',
        //async: false,
        url: '/nuaa/inquireRecord',
        success: function(list){
            if(list.machine.type=="�����"){
                var html=`
                    <div class="col-xs-2 col-lg-1 user-info-box">
                    <div class="user-info"  data-toggle="modal" data-target="#eq-pop-computer" computer-id="${list.machine.id}">
                        <div class="img-box"><img src="/nuaa/image/com.png" alt=""/></div>
                        <p>${list.machine.sn}</p>
                    </div>
                </div>`;
                $('#view-computer').empty().html(html);
            }
            else if(list.machine.type=="�Զ��칫�豸"){
                var html=`
                    <div class="col-xs-2 col-lg-1 user-info-box">
                    <div class="user-info"  data-toggle="modal" data-target="#eq-pop-office" office-id="${list.machine.id}">
                        <div class="img-box"><img src="/nuaa/image/dayinji.png" alt=""/></div>
                        <p>${list.machine.sn}</p>
                    </div>
                </div>`;
                $('#view-office').empty().html(html);
            }
            else if(list.machine.type=="�ƶ��洢"){
                var html=`
                        <div class="col-xs-2 col-lg-1 user-info-box">
                        <div class="user-info"  data-toggle="modal" data-target="#eq-pop-storage" storage-id="${list.machine.id}">
                            <div class="img-box"><img src="/nuaa/image/yingpan.png" alt=""/></div>
                            <p>${list.machine.sn}</p>
                        </div>
                    </div>`;
                $('#view-storage').empty().html(html);
            }
        }
    })
}
//�����ƶ���ťЧ��
$('.pagination').on('click','li[data-direction]', function () {
    if($(this).hasClass('page-lf')&&$(this).parent().find('li.active').attr('data-page')>1){
        if($(this).parent().find('.page').length>0){
            $(this).parent().find('li.active').removeClass('active').prev('.page').addClass('active');
        }else if($(this).parent().find('.page-college').length>0){
            $(this).parent().find('li.active').removeClass('active').prev('.page-college').addClass('active');
        }else if($(this).parent().find('.page-lab').length>0){
            $(this).parent().find('li.active').removeClass('active').prev('.page-lab').addClass('active');
        }else if($(this).parent().find('.page-self').length>0){
            $(this).parent().find('li.active').removeClass('active').prev('.page-self').addClass('active');
        }
    }else if($(this).hasClass('page-rg')&&$(this).parent().find('li.active').attr('data-page')<$(this).parent().find('li.page-single').length){
        if($(this).parent().find('.page').length>0){
            $(this).parent().find('li.active').removeClass('active').next('.page').addClass('active');
        }else if($(this).parent().find('.page-college').length>0){
            $(this).parent().find('li.active').removeClass('active').next('.page-college').addClass('active');
        }else if($(this).parent().find('.page-lab').length>0){
            $(this).parent().find('li.active').removeClass('active').next('.page-lab').addClass('active');
        }else if($(this).parent().find('.page-self').length>0){
            $(this).parent().find('li.active').removeClass('active').next('.page-self').addClass('active');
        }
    }
});
//���ҳ����ɫ�仯
$('#user_paginate').on('click','li.page-single', function () {
    var page=null;
    $(this).parent().find('li.active').removeClass('active');
    $(this).addClass('active');
});
$('#computer_paginate').on('click','li.page-single',function () {
    var page=null;
    $(this).parent().find('li.active').removeClass('active');
    $(this).addClass('active');
    page=parseInt($(this).parent().find('li.active').attr('data-page'));
});
$('#office_paginate').on('click','li.page-single', function () {
    var page=null;
    $(this).parent().find('li.active').removeClass('active');
    $(this).addClass('active');
    page=parseInt($(this).parent().find('li.active').attr('data-page'));
});
$('#storage_paginate').on('click','li.page-single', function () {
    var page=null;
    $(this).parent().find('li.active').removeClass('active');
    $(this).addClass('active');
    page=parseInt($(this).parent().find('li.active').attr('data-page'));
});
//ȫУ��Ա��ҳ
$('#user_paginate').on('click','.page', function () {
    var page=getPageNumber();
    var userPageNumber=page[0];
    var pageNumber;
    if($(this).attr('data-page')=="backward"){
        if(userPageNumber!=1)
            pageNumber=userPageNumber-1;
        else
            pageNumber=1;
    }else if($(this).attr('data-page')=="forward"){
        if(userPageNumber!=$(this).parent().find('li.page-single').size())
            pageNumber=userPageNumber+1;
        else
            pageNumber=$(this).parent().find('li.page-single').size();
    }else {
        var pageNumber=$(this).attr('data-page');
    }
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/viewUser',
        data:{pageNumber:pageNumber},
        dataType:"json",
        success: function(list){
            html_user=``;
            for(var i in list.user){
                html_user+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#user" user-no="${list.user[i].no}">
                    <div class="img-box"><img src="/nuaa/image/head.png" alt=""/></div>
                    <p>${list.user[i].name}</p>
                </div>
            </div>
        		`;

            }
        }
    })
    $('#view-user').empty().html(html_user);
})
//ѧԺ��Ա��ҳ
$('#user_paginate').on('click','.page-college', function () {
    var page=getPageNumber();
    var userPageNumber=page[0];
    var pageNumber;
    if($(this).attr('data-page')=="backward"){
        if(userPageNumber!=1)
            pageNumber=userPageNumber-1;
        else
            pageNumber=1;
    }else if($(this).attr('data-page')=="forward"){
        if(userPageNumber!=$(this).parent().find('li.page-single').size())
            pageNumber=userPageNumber+1;
        else
            pageNumber=$(this).parent().find('li.page-single').size();
    }else {
        var pageNumber=$(this).attr('data-page');
    }
    var id=$(this).attr('data-id');
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/viewUserByCollege/'+id,
        data:{pageNumber:pageNumber},
        dataType:"json",
        success: function(list){
            html_user=``;
            for(var i in list.user){
                html_user+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#user" user-no="${list.user[i].no}">
                    <div class="img-box"><img src="/nuaa/image/head.png" alt=""/></div>
                    <p>${list.user[i].name}</p>
                </div>
            </div>
        		`;

            }
        }
    })
    $('#view-user').empty().html(html_user);
})
//�о�����Ա��ҳ
$('#user_paginate').on('click','.page-lab', function () {
    var page=getPageNumber();
    var userPageNumber=page[0];
    if($(this).attr('data-page')=="backward"){
        if(userPageNumber!=1)
            var pageNumber=userPageNumber-1;
        else
            var pageNumber=1;
    }else if($(this).attr('data-page')=="forward"){
        if(userPageNumber!=$(this).parent().find('li.page-single').size())
            var pageNumber=userPageNumber+1;
        else
            var pageNumber=$(this).parent().find('li.page-single').size();
    }else {
        var pageNumber=$(this).attr('data-page');
    }
    var id=$(this).attr('data-id');
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/viewUserByLaboratory/'+id,
        data:{pageNumber:pageNumber},
        dataType:"json",
        success: function(list){
            html_user=``;
            for(var i in list.user){
                html_user+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#user" user-no="${list.user[i].no}">
                    <div class="img-box"><img src="/nuaa/image/head.png" alt=""/></div>
                    <p>${list.user[i].name}</p>
                </div>
            </div>
        		`;

            }
        }
    })
    $('#view-user').empty().html(html_user);
})
//�������ҳ
$('#computer_paginate').on('click','.page', function () {
    var page=getPageNumber();
    var computerNumber=page[1];
    if($(this).attr('data-page')=="backward"){
        if(computerNumber!=1)
            var pageNumber=computerNumber-1;
        else
            var pageNumber=1;
    }else if($(this).attr('data-page')=="forward"){
        if(computerNumber!=$(this).parent().find('li.page-single').size())
            var pageNumber=computerNumber+1;
        else
            var pageNumber=$(this).parent().find('li.page-single').size();
    }else {
        var pageNumber=$(this).attr('data-page');
    }
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/viewComputer',
        data:{pageNumber:pageNumber},
        dataType:"json",
        success: function(list){
            html_computer=``;
            for(var i in list.computer){
                html_computer+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#eq-pop-computer" computer-id="${list.computer[i].id}">
                    <div class="img-box"><img src="/nuaa/image/com.png" alt=""/></div>
                    <p>${list.computer[i].sn}</p>
                </div>
            </div>
        		`;

            }
        }
    })
    $('#view-computer').empty().html(html_computer);
})
//�����ѧԺ��ҳ
$('#computer_paginate').on('click','.page-college', function () {
    var id=$(this).attr('data-id');
    var page=getPageNumber();
    var computerNumber=page[1];
    if($(this).attr('data-page')=="backward"){
        if(computerNumber!=1)
            var pageNumber=computerNumber-1;
        else
            var pageNumber=1;
    }else if($(this).attr('data-page')=="forward"){
        if(computerNumber!=$(this).parent().find('li.page-single').size())
            var pageNumber=computerNumber+1;
        else
            var pageNumber=$(this).parent().find('li.page-single').size();
    }else {
        var pageNumber=$(this).attr('data-page');
    }
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/viewComputerByCollege/'+id,
        data:{pageNumber:pageNumber},
        dataType:"json",
        success: function(list){
            html_computer=``;
            for(var i in list.computer){
                html_computer+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#eq-pop-computer" computer-id="${list.computer[i].id}">
                    <div class="img-box"><img src="/nuaa/image/com.png" alt=""/></div>
                    <p>${list.computer[i].sn}</p>
                </div>
            </div>
        		`;

            }
        }
    })
    $('#view-computer').empty().html(html_computer);
})
//������о�����ҳ
$('#computer_paginate').on('click','.page-lab', function () {
    var id=$(this).attr('data-id');
    var page=getPageNumber();
    var computerNumber=page[1];
    if($(this).attr('data-page')=="backward"){
        if(computerNumber!=1)
            var pageNumber=computerNumber-1;
        else
            var pageNumber=1;
    }else if($(this).attr('data-page')=="forward"){
        if(computerNumber!=$(this).parent().find('li.page-single').size())
            var pageNumber=computerNumber+1;
        else
            var pageNumber=$(this).parent().find('li.page-single').size();
    }else {
        var pageNumber=$(this).attr('data-page');
    }
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/viewComputerByLaboratory/'+id,
        data:{pageNumber:pageNumber},
        dataType:"json",
        success: function(list){
            html_computer=``;
            for(var i in list.computer){
                html_computer+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#eq-pop-computer" computer-id="${list.computer[i].id}">
                    <div class="img-box"><img src="/nuaa/image/com.png" alt=""/></div>
                    <p>${list.computer[i].sn}</p>
                </div>
            </div>
        		`;

            }
        }
    })
    $('#view-computer').empty().html(html_computer);
})
//�������ͨ�û���ҳ
$('#computer_paginate').on('click','.page-self', function () {
    var page=getPageNumber();
    var computerNumber=page[1];
    if($(this).attr('data-page')=="backward"){
        if(computerNumber!=1)
            var pageNumber=computerNumber-1;
        else
            var pageNumber=1;
    }else if($(this).attr('data-page')=="forward"){
        if(computerNumber!=$(this).parent().find('li.page-single').size())
            var pageNumber=computerNumber+1;
        else
            var pageNumber=$(this).parent().find('li.page-single').size();
    }else {
        var pageNumber=$(this).attr('data-page');
    }
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/viewComputerByself',
        data:{pageNumber:pageNumber},
        dataType:"json",
        success: function(list){
            html_computer=``;
            for(var i in list.computer){
                html_computer+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#eq-pop-computer" computer-id="${list.computer[i].id}">
                    <div class="img-box"><img src="/nuaa/image/com.png" alt=""/></div>
                    <p>${list.computer[i].sn}</p>
                </div>
            </div>
        		`;

            }
        }
    })
    $('#view-computer').empty().html(html_computer);
})
//�칫�Զ�����ҳ
$('#office_paginate').on('click','.page', function () {
    var page=getPageNumber();
    var officeNumber=page[2];
    if($(this).attr('data-page')=="backward"){
        if(officeNumber!=1)
            var pageNumber=officeNumber-1;
        else
            var pageNumber=1;
    }else if($(this).attr('data-page')=="forward"){
        if(officeNumber!=$(this).parent().find('li.page-single').size())
            var pageNumber=officeNumber+1;
        else
            var pageNumber=$(this).parent().find('li.page-single').size();
    }else {
        var pageNumber=$(this).attr('data-page');
    }
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/viewOffice',
        data:{pageNumber:pageNumber},
        dataType:"json",
        success: function(list){
            html_office=``;
            for(var i in list.office){
                html_office+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#eq-pop-office" office-id="${list.office[i].id}">
                    <div class="img-box"><img src="/nuaa/image/dayinji.png" alt=""/></div>
                    <p>${list.office[i].sn}</p>
                </div>
            </div>
        		`;

            }
        }
    })
    $('#view-office').empty().html(html_office);
})
//�칫�Զ���ѧԺ��ҳ
$('#office_paginate').on('click','.page-college', function () {
    var id=$(this).attr('data-id');
    var page=getPageNumber();
    var officeNumber=page[2];
    if($(this).attr('data-page')=="backward"){
        if(officeNumber!=1)
            var pageNumber=officeNumber-1;
        else
            var pageNumber=1;
    }else if($(this).attr('data-page')=="forward"){
        if(officeNumber!=$(this).parent().find('li.page-single').size())
            var pageNumber=officeNumber+1;
        else
            var pageNumber=$(this).parent().find('li.page-single').size();
    }else {
        var pageNumber=$(this).attr('data-page');
    }
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/viewOfficeByCollege/'+id,
        data:{pageNumber:pageNumber},
        dataType:"json",
        success: function(list){
            html_office=``;
            for(var i in list.office){
                html_office+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#eq-pop-office" office-id="${list.office[i].id}">
                    <div class="img-box"><img src="/nuaa/image/dayinji.png" alt=""/></div>
                    <p>${list.office[i].sn}</p>
                </div>
            </div>
        		`;

            }
        }
    })
    $('#view-office').empty().html(html_office);
})
//�칫�Զ����о�����ҳ
$('#office_paginate').on('click','.page-lab', function () {
    var id=$(this).attr('data-id');
    var page=getPageNumber();
    var officeNumber=page[2];
    if($(this).attr('data-page')=="backward"){
        if(officeNumber!=1)
            var pageNumber=officeNumber-1;
        else
            var pageNumber=1;
    }else if($(this).attr('data-page')=="forward"){
        if(officeNumber!=$(this).parent().find('li.page-single').size())
            var pageNumber=officeNumber+1;
        else
            var pageNumber=$(this).parent().find('li.page-single').size();
    }else {
        var pageNumber=$(this).attr('data-page');
    }
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/viewOfficeByLaboratory/'+id,
        data:{pageNumber:pageNumber},
        dataType:"json",
        success: function(list){
            html_office=``;
            for(var i in list.office){
                html_office+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#eq-pop-office" office-id="${list.office[i].id}">
                    <div class="img-box"><img src="/nuaa/image/dayinji.png" alt=""/></div>
                    <p>${list.office[i].sn}</p>
                </div>
            </div>
        		`;

            }
        }
    })
    $('#view-office').empty().html(html_office);
})
//�칫�Զ�����ͨ�û���ҳ
$('#office_paginate').on('click','.page-self', function () {
    var page=getPageNumber();
    var officeNumber=page[2];
    if($(this).attr('data-page')=="backward"){
        if(officeNumber!=1)
            var pageNumber=officeNumber-1;
        else
            var pageNumber=1;
    }else if($(this).attr('data-page')=="forward"){
        if(officeNumber!=$(this).parent().find('li.page-single').size())
            var pageNumber=officeNumber+1;
        else
            var pageNumber=$(this).parent().find('li.page-single').size();
    }else {
        var pageNumber=$(this).attr('data-page');
    }
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/viewOfficeByself',
        data:{pageNumber:pageNumber},
        dataType:"json",
        success: function(list){
            html_office=``;
            for(var i in list.office){
                html_office+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#eq-pop-office" office-id="${list.office[i].id}">
                    <div class="img-box"><img src="/nuaa/image/dayinji.png" alt=""/></div>
                    <p>${list.office[i].sn}</p>
                </div>
            </div>
        		`;

            }
        }
    })
    $('#view-office').empty().html(html_office);
})
//�洢��ҳ
$('#storage_paginate').on('click','.page', function () {
    var page=getPageNumber();
    var storageNumber=page[3];
    if($(this).attr('data-page')=="backward"){
        if(storageNumber!=1)
            var pageNumber=storageNumber-1;
        else
            var pageNumber=1;
    }else if($(this).attr('data-page')=="forward"){
        if(storageNumber!=$(this).parent().find('li.page-single').size())
            var pageNumber=storageNumber+1;
        else
            var pageNumber=$(this).parent().find('li.page-single').size();
    }else {
        var pageNumber=$(this).attr('data-page');
    }
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/viewStorage',
        data:{pageNumber:pageNumber},
        dataType:"json",
        success: function(list){
            html_storage=``;
            for(var i in list.storage){
                html_storage+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#eq-pop-storage" storage-id="${list.storage[i].id}">
                    <div class="img-box"><img src="/nuaa/image/yingpan.png" alt=""/></div>
                    <p>${list.storage[i].sn}</p>
                </div>
            </div>
        		`;

            }
        }
    })
    $('#view-storage').empty().html(html_storage);
})
//�洢ѧԺ��ҳ
$('#storage_paginate').on('click','.page-college', function () {
    var id=$(this).attr('data-id');
    var page=getPageNumber();
    var storageNumber=page[3];
    if($(this).attr('data-page')=="backward"){
        if(storageNumber!=1)
            var pageNumber=storageNumber-1;
        else
            var pageNumber=1;
    }else if($(this).attr('data-page')=="forward"){
        if(storageNumber!=$(this).parent().find('li.page-single').size())
            var pageNumber=storageNumber+1;
        else
            var pageNumber=$(this).parent().find('li.page-single').size();
    }else {
        var pageNumber=$(this).attr('data-page');
    }
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/viewStorageByCollege/'+id,
        data:{pageNumber:pageNumber},
        dataType:"json",
        success: function(list){
            html_storage=``;
            for(var i in list.storage){
                html_storage+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#eq-pop-storage" storage-id="${list.storage[i].id}">
                    <div class="img-box"><img src="/nuaa/image/yingpan.png" alt=""/></div>
                    <p>${list.storage[i].sn}</p>
                </div>
            </div>
        		`;

            }
        }
    })
    $('#view-storage').empty().html(html_storage);
})
//�洢�о�����ҳ
$('#storage_paginate').on('click','.page-lab', function () {
    var id=$(this).attr('data-id');
    var page=getPageNumber();
    var storageNumber=page[3];
    if($(this).attr('data-page')=="backward"){
        if(storageNumber!=1)
            var pageNumber=storageNumber-1;
        else
            var pageNumber=1;
    }else if($(this).attr('data-page')=="forward"){
        if(storageNumber!=$(this).parent().find('li.page-single').size())
            var pageNumber=storageNumber+1;
        else
            var pageNumber=$(this).parent().find('li.page-single').size();
    }else {
        var pageNumber=$(this).attr('data-page');
    }
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/viewStorageByLaboratory/'+id,
        data:{pageNumber:pageNumber},
        dataType:"json",
        success: function(list){
            html_storage=``;
            for(var i in list.storage){
                html_storage+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#eq-pop-storage" storage-id="${list.storage[i].id}">
                    <div class="img-box"><img src="/nuaa/image/yingpan.png" alt=""/></div>
                    <p>${list.storage[i].sn}</p>
                </div>
            </div>
        		`;

            }
        }
    })
    $('#view-storage').empty().html(html_storage);
})
//�洢��ͨ�û���ҳ
$('#storage_paginate').on('click','.page-self', function () {
    var page=getPageNumber();
    var storageNumber=page[3];
    if($(this).attr('data-page')=="backward"){
        if(storageNumber!=1)
            var pageNumber=storageNumber-1;
        else
            var pageNumber=1;
    }else if($(this).attr('data-page')=="forward"){
        if(storageNumber!=$(this).parent().find('li.page-single').size())
            var pageNumber=storageNumber+1;
        else
            var pageNumber=$(this).parent().find('li.page-single').size();
    }else {
        var pageNumber=$(this).attr('data-page');
    }
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/viewStorageByself',
        data:{pageNumber:pageNumber},
        dataType:"json",
        success: function(list){
            html_storage=``;
            for(var i in list.storage){
                html_storage+=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#eq-pop-storage" storage-id="${list.storage[i].id}">
                    <div class="img-box"><img src="/nuaa/image/yingpan.png" alt=""/></div>
                    <p>${list.storage[i].sn}</p>
                </div>
            </div>
        		`;

            }
        }
    })
    $('#view-storage').empty().html(html_storage);
})/**
 * Created by PVer on 2017/5/17.
 */
