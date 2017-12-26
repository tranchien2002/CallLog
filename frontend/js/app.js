var tempToken = sessionStorage.token;
var tempRole = sessionStorage.role;
var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
var router = new Navigo(root, true, hash);

// getElementById wrapper
function $id(id) {
    return document.getElementById(id);
}

//Data table
function initTable() {
    $('#example').DataTable( {
        initComplete: function () {
            this.api().columns([2, 6]).every( function () {
                var column = this;
                var select = $('<select><option value=""></option></select>')
                    .appendTo( $(column.footer()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );

                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            } );

            this.api().columns([1, 3, 4 ,5]).every(function () {
                var column = this;
                var search = $('<input type="text" placeholder="Tìm kiếm... " />')
                    .appendTo($(column.footer()).empty())
                    .on('keyup change', function () {
                        if (column.search() !== this.value) {
                            column
                                .search(this.value)
                                .draw();
                        }
                    });
            });
        }
    });

}

//Create table HTML by ajax
function loadTable(url, id) {
    $.ajax({
        url: url,
        type: 'GET',
        dataType: "json",
        headers: {
            "Authorization": tempToken
        },
        success: function(res){
            var html;
            html = '<span class="h3">Danh sách công việc yêu cầu</span>' +
                '<div class="mt-4">' +
                '    <table id="example" class="table table-striped table-bordered table-hover" cellspacing="0" width="100%">' +
                '        <thead>' +
                '            <tr>' +
                '            <th>STT</th>' +
                '            <th class="search">Tên công việc</th>' +
                '            <th class="select">Mức độ ưu tiên</th>' +
                '            <th class="search">Người yêu cầu</th>' +
                '            <th class="search">Người thực hiện</th>' +
                '            <th class="search">Ngày hết hạn</th>' +
                '            <th class="select">Trạng thái</th>' +
                '            </tr>' +
                '        </thead>' +
                '        <tfoot>' +
                '            <tr>' +
                '            <th></th>' +
                '            <th class="search">Tên công việc</th>' +
                '            <th class="select">Mức độ ưu tiên</th>' +
                '            <th class="search">Người yêu cầu</th>' +
                '            <th class="search">Người thực hiện</th>' +
                '            <th class="search">Ngày hết hạn</th>' +
                '            <th class="select">Trạng thái</th>' +
                '            </tr>' +
                '        </tfoot>' +
                '        <tbody>';

            var data = res.data;
            for (var i = 0; i < data.length; i++){
                var priority;
                switch (data[i].priority){
                    case 1:
                        priority = "Thấp";
                        break;
                    case 2:
                        priority = "Bình thường";
                        break;
                    case 3:
                        priority = "Cao";
                        break;
                    case 4:
                        priority = "Khẩn cấp";
                }
                var status;
                switch (data[i].status) {
                    case 1:
                        status = "New";
                        break;
                    case 2:
                        status = "Inprogress";
                        break;
                    case 3:
                        status = "Feedback";
                        break;
                    case 4:
                        status = "Resolved";
                        break;
                    case 5:
                        status = "Cancel";
                        break;
                    case 6:
                        status = "Closed";
                }
                 html = html + "<tr link='#!tickets/" + data[i].id + "'><td>" + (i+1) + "</td>"
                        + "<td>" + data[i].subject + "</td>"
                        + "<td>" + priority + "</td>"
                        + "<td>" + data[i].customer.name + "</td>"
                        + "<td>" + data[i].staff.name + "</td>"
                        + "<td>" + data[i].deadline + "</td>"
                        + "<td>" + status + "</td></tr>";
            }
            html = html + "</tbody></table></div>";
            $id(id).innerHTML = html;
            initTable();

            $('#example tbody').on('click', 'tr', function () {
                // var data = table.row( this ).data();
                // alert( 'You clicked on');
                var urlContent = "http://localhost:3000/tickets/";
                window.location.href=$(this).attr('link');
                urlContent = urlContent + window.location.hash.substr(10);
                console.log(urlContent);
                loadContent(urlContent , "view");
            } );
        }
    })
}

//Dummy func load HTML
function loadHTML(url, id) {
    req = new XMLHttpRequest();
    req.open('GET', url);
    req.send();
    req.onload = () => {
        $id(id).innerHTML = req.responseText;
        // initTable();
    }
}

//Load relative staff
function loadRela() {
    $('.js-data-example-ajax').select2({
        ajax: {
            url: 'http://localhost:3000/staff_team',
            type: 'POST',
            data: {team_id : document.getElementById("input-team").value},
            headers: {
                "Authorization": tempToken
            }
        }
    });
}

//Load content
function loadContent(url, id) {
    $.ajax({
        url: url,
        type: "get",
        dataType: "json",
        headers: {
            "Authorization": tempToken
        },
        success: function (res) {
            var priority;
            switch (res.data.ticket.priority){
                case 1:
                    priority = "Thấp";
                    break;
                case 2:
                    priority = "Bình thường"
                    break;
                case 3:
                    priority = "Cao";
                    break;
                case 4:
                    priority = "Khẩn cấp";
                    break;

            }

            var status;
            switch (res.data.ticket.status) {
                case 1:
                    status = "New";
                    break;
                case 2:
                    status = "Inprogress";
                    break;
                case 3:
                    status = "Feedback";
                    break;
                case 4:
                    status = "Resolved";
                    break;
                case 5:
                    status = "Cancel";
                    break;
                case 6:
                    status = "Closed";
            }

            var htmlContent = '<div class="container-fluid">'
                + '<div class="row">'
                + '<div class="col-md-10">'
                + '<div id="div_subject">'
                + '<span class="h3">' + res.data.ticket.subject + '</span>'
                + '</div>'
                + '</div>'
                + '<div class="col-md-2" align="right">'
                + '<button class="btn btn-primary" type="submit" id="btn_edit">Chỉnh sửa</button>'
                + '</div>'
                + '<div class="col-md-6">'
                + '<div id="div_detail_left">'
                + '<table class="table table-striped">'
                + '<tbody>'
                + '<tr>'
                + '<td>Người yêu cầu</td>'
                + '<td id="nguoi_yeu_cau">' + res.data.ticket.customer.name + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>Người thực hiện</td>'
                + '<td id="nguoi_thuc_hien">' + res.data.ticket.staff.name + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>Mức độ ưu tiên</td>'
                + '<td id="muc_do_uu_tien">' + priority + '</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
                + '</div>'

                + '</div>'
                + '<div class="col-md-6">'
                + '<div id="div_detail_right">'
                + '<table class="table table-striped">'
                + '<tbody>'
                + '<tr>'
                + '<td>Ngày tạo</td>'
                + '<td id="ngay_tao">' + res.data.time + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>Ngày hết hạn</td>'
                + '<td id="ngay_het_han">' + res.data.ticket.deadline + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>Trạng thái</td>'
                + '<td id="trang_thai">' + status + '</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '<div>'
                + '<div class="row mt-2">'
                + '<div class="col-md-12 mb-2">'
                + '<span class="h3">Nội dung</span>'
                + '<hr>'
                + '</div>'
                + '<div class="col-md-12" id="cmt">';

            var array = res.data.comments;
            for (var i = 0; i < array.length; i++) {
                htmlContent += "<h5>"+array[i].user.name+"</h5>"
                    +"<p>"+array[i].content+"</p>";
            }

            htmlContent = htmlContent + "</div>"
                + '<div class="col-md-12">'
                + '<span class="h3">Bình Luận</span>'
                + '</div>'
                + '<div class="col-md-12 mt-1">'
                + '<form>'
                + '<textarea class="form-control" rows="5" id="comment" required></textarea>'
                + '<button class="btn btn-primary float-right mt-2" id="btn-gui-binh-luan">Gửi bình luận</button>'
                + '</form>'
                + '</div>'
                + '</div>'
                + '</div>';

            document.getElementById(id).innerHTML = htmlContent;
            createCmt();
            edit();
        }
    })
}

//Create cmt
function createCmt(){

    var submit = $('#btn-gui-binh-luan');

    submit.click(function() {
        var text = document.getElementById("comment").value;
        if (text !== ""){
            $.ajax({
                url: "http://localhost:3000/comments",
                type: "post",
                data: {comment: {content : text, ticket_id: window.location.hash.substr(10)}},
                headers: {
                    "Authorization": tempToken
                },
                success: function (res) {
                    var html = '<h5>' + res.name +'</h5>' + '<p>' + text + '</p>';
                    $('#cmt').append(html);
                    document.getElementById("comment").value = "";
                }
            });
        } else {
            console.log("Cant cmt");
        }
    });
}


//Edit
function edit() {
    var edit = true;
    var nguoi_yeu_cau = $("#nguoi_yeu_cau").text();
    var nguoi_thuc_hien = $("#nguoi_thuc_hien").text();
    var muc_do_uu_tien = $("#muc_do_uu_tien").text();
    var ngay_tao = $("#ngay_tao").text();
    var ngay_het_han = $("#ngay_het_han").text();
    var trang_thai = $("#trang_thai").text();


    if (trang_thai === "Resolved" || trang_thai === "Cancel" || trang_thai === "Closed"){
        $("#btn_edit").attr("disabled", "");
    }

    $("#btn_edit").click(function(){
        if (edit) {
            edit = false;
            $("#btn_edit").html("Cập nhật");
            $("#div_detail_left").empty();
            $("#div_detail_right").empty();

            var htmlLeft;
            htmlLeft = "<table class=\"table table-striped\">"
                +"<tbody>"
                +"<tr>"
                +"<td>Người yêu cầu</td>"
                +"<td>"+nguoi_yeu_cau+"</td>"
                +"</tr>"
                +"<tr>"
                +"<td>Người thực hiện</td>";

            switch (tempRole) {
                case '1':
                case '2':
                    htmlLeft += "<td id=\"nguoi_thuc_hien\">"+nguoi_thuc_hien+"</td>";
                    break;
                case '3':
                case '4':
                    htmlLeft += '<td><select id="assign_to" class="js-data-example-ajax" style="width: 100%"></select></td>';
            }
                // +'<td><select id="assign_to" class="js-data-example-ajax" style="width: 100%"></select></td>'

            htmlLeft += "</tr>"
                        +"<tr>"
                        +"<td>Mức độ ưu tiên</td>"
                        +"<td>";

            switch (muc_do_uu_tien) {
                case "Thấp":
                    htmlLeft +="<select class=\"form-control\" id=\"muc_do_uu_tien\">"
                        +"<option selected value='1'>Thấp</option>"
                        +"<option value='2'>Bình thường</option>"
                        +"<option value='3'>Cao</option>"
                        +"<option value='4'>Khẩn cấp</option>"
                        +"</select>"
                        +"</td>"
                        +"</tr>"
                        +"</tbody>"
                        +"</table>";
                    break;
                case "Bình thường":
                    htmlLeft +="<select class=\"form-control\" id=\"muc_do_uu_tien\">"

                        +"<option value='2' selected>Bình thường</option>"
                        +"<option value='1'>Thấp</option>"
                        +"<option value='3'>Cao</option>"
                        +"<option value='4'>Khẩn cấp</option>"
                        +"</select>"
                        +"</td>"
                        +"</tr>"
                        +"</tbody>"
                        +"</table>";
                    break;
                case "Cao":
                    htmlLeft +="<select class=\"form-control\" id=\"muc_do_uu_tien\">"
                        +"<option value='3' selected>Cao</option>"
                        +"<option value='2'>Bình thường</option>"
                        +"<option value='1'>Thấp</option>"
                        +"<option value='4'>Khẩn cấp</option>"
                        +"</select>"
                        +"</td>"
                        +"</tr>"
                        +"</tbody>"
                        +"</table>";
                    break;

                case "Khẩn cấp":
                    htmlLeft +="<select class=\"form-control\" id=\"muc_do_uu_tien\">"
                        +"<option value='3'>Cao</option>"
                        +"<option value='2'>Bình thường</option>"
                        +"<option value='1'>Thấp</option>"
                        +"<option value='4' selected>Khẩn cấp</option>"
                        +"</select>"
                        +"</td>"
                        +"</tr>"
                        +"</tbody>"
                        +"</table>";
                    break;
            }


            $("#div_detail_left").html(htmlLeft);
            $('.js-data-example-ajax').select2({
                ajax: {
                    url: 'http://localhost:3000/staff_update',
                    type: 'GET',
                    // data: {team_id : document.getElementById("input-team").value},
                    headers: {
                        "Authorization": tempToken
                    }
                }
            });

            var htmlRight;
            htmlRight = "<table class=\"table table-striped\">"
                +"<tbody>"
                +"<tr>"
                +"<td>Ngày tạo</td>"
                +"<td>"+ngay_tao+"</td>"
                +"</tr>"
                +"<tr>"
                +"<td>Ngày hết hạn</td>"
                +'<td><input id="ngay_het_han" type="date" name="deadline" value="'+ ngay_het_han + '">'
                +"</td>"
                +"</tr>"
                +"<tr>"
                +"<td>Trạng thái</td>"
                +"<td>";
            htmlRight +="<select class=\"form-control\" id=\"trang_thai\">";

            // 1 là user, 2 la staff, 3 la leader, 4 la manager

            switch (tempRole) {
                case "1":
                    if (trang_thai == "New") {

                        htmlRight+="<option value='1'>New</option>"
                            +"<option value='5'>Cancel</option>";
                    }
                    else if (trang_thai == "Inprogress") {

                        htmlRight+="<option value='2'>Inprogress</option>"
                            +"<option value='3'>Feedback</option>"
                            +"<option value='5'>Cancel</option>";
                    }
                    else if (trang_thai == "Feedback") {
                        htmlRight+="<option value='2'>Inprogress</option>"
                            +"<option value='3'>Feedback</option>"
                            +"<option value='5'>Cancel</option>"
                            +"<option value='6'>Closed</option>";
                    }
                    break;

                case "2":
                    if (trang_thai == "New") {

                        htmlRight+="<option value='1'>New</option>"
                            +"<option value='2'>Inprogress</option>";
                    }
                    else if (trang_thai == "Inprogress") {

                        htmlRight+="<option value='2'>Inprogress</option>"
                            +"<option value='4'>Resolved</option>";
                    }
                    else if (trang_thai == "Feedback") {

                        htmlRight+="<option value='3'>Feedback</option>"
                            +"<option value='2'>Inprogress</option>";
                    }
                    break;

                case "3":
                    if (trang_thai == "New") {

                        htmlRight+="<option value='1'>New</option>"
                            +"<option value='2'>Inprogress</option>";
                    }
                    else if (trang_thai == "Inprogress") {

                        htmlRight+="<option value='2'>Inprogress</option>"
                            +"<option value='4'>Resolved</option>";
                    }
                    else if (trang_thai == "Feedback") {

                        htmlRight+="<option value='3'>Feedback</option>"
                            +"<option value='2'>Inprogress</option>";
                    }
                    break;

                case "4":
                    if (trang_thai == "New") {

                        htmlRight+="<option value='1'>New</option>"
                            +"<option value='2'>Inprogress</option>"
                            +"<option value='5'>Cancel</option>";
                    }
                    else if (trang_thai == "Inprogress") {

                        htmlRight+="<option value='2'>Inprogress</option>"
                            +"<option value='4'>Resolved</option>"
                            +"<option value='5'>Cancel</option>";
                    }
                    else if (trang_thai == "Feedback") {

                        htmlRight+="<option value='3'>Feedback</option>"
                            +"<option value='2'>Inprogress</option>"
                            +"<option value='5'>Cancel</option>"
                            +"<option value='6'>Closed</option>";
                    }
                    break;
            }

            htmlRight+="</select>"
                +"</td>"
                +"</tr>"
                +"</tbody>"
                +"</table>";


            $("#div_detail_right").html(htmlRight);
        }else {
            var urlContent = "http://localhost:3000/tickets/";
            urlContent = urlContent + window.location.hash.substr(10);
            switch (tempRole) {
                case '1':
                case '2':
                    $.ajax({
                        url: urlContent,
                        type: "PUT",
                        data: {ticket: {
                            priority: $("#muc_do_uu_tien").val(),
                            deadline: $("#ngay_het_han").val(),
                            status: $("#trang_thai").val()
                        }},
                        headers: {
                            "Authorization": tempToken
                        },
                        success: handleSuccess(),
                        error: console.log("Error")
                    });
                    break;
                case '3':
                case '4':
                    $.ajax({
                        url: urlContent,
                        type: "PUT",
                        data: {ticket: {
                            assign_to : $('#assign_to').select2('data')[0].id,
                            priority: $("#muc_do_uu_tien").val(),
                            deadline: $("#ngay_het_han").val(),
                            status: $("#trang_thai").val()
                        }},
                        headers: {
                            "Authorization": tempToken
                        },
                        success: handleSuccess(),
                        error: console.log("Error")
                    });
            }
        }
    });

    function handleSuccess() {
        edit = true;

        muc_do_uu_tien = $("#muc_do_uu_tien").val();
        trang_thai = $("#trang_thai").val();
        var priority;
        if (muc_do_uu_tien == 1){
            priority = "Thấp";
        } else if (muc_do_uu_tien == 2)
        {
            priority = "Bình thường";
        } else if (muc_do_uu_tien == 3){
            priority = "Cao"
        } else if (muc_do_uu_tien == 4){
            priority = "Khẩn cấp"
        }
        // 1: new,2:inprogress,3:feedback,4:resolved,5:cancel,6: closed
        var status;
        if (trang_thai == 1){
            status = "New";
        } else if (trang_thai == 2){
            status = "Inprogress";
        } else if (trang_thai == 3){
            status = "Feedback"
        } else if (trang_thai == 4){
            status = "Resolved";
        } else if (trang_thai == 5){
            status = "Cancel";
        } else if (trang_thai == 6){
            status = "Closed";
        }
        //
        // chinh sưa lại dịnh dang ngay
        // dateSlipt2 = $("#ngay_het_han").val();
        // dateSlipt3 = dateSlipt2.split("-",3);
        ngay_het_han = $("#ngay_het_han").val();
        var htmlLeftAfter;
        htmlLeftAfter = "<table class=\"table table-striped\">"
            +"<tbody>"
            +"<tr>"
            +"<td>Người yêu cầu</td>"
            +'<td id="nguoi_yeu_cau">'+nguoi_yeu_cau+'</td>'
            +"</tr>"
            +"<tr>"
            +"<td>Người thực hiện</td>";
            // +'<td id="nguoi_thuc_hien">'+name+"</td>"
        switch (tempRole) {
            case '1':
            case '2':
                htmlLeftAfter += '<td id="nguoi_thuc_hien">'+nguoi_thuc_hien+"</td>";
                break;
            case '3':
            case '4':
                var name = $('#assign_to').select2('data')[0].text;
                htmlLeftAfter += '<td id="nguoi_thuc_hien">'+name+"</td>";
        }
        htmlLeftAfter += "</tr>"
                        +"<tr>"
                        +"<td>Mức độ ưu tiên</td>"
                        +'<td id="muc_do_uu_tien">';

        htmlLeftAfter = htmlLeftAfter + priority + "</td>"
            +"</tr>"
            +"</tbody>"
            +"</table>";

        $("#div_detail_left").html(htmlLeftAfter);

        var htmlRightAfter;
        htmlRightAfter = "<table class=\"table table-striped\">"
            +"<tbody>"
            +"<tr>"
            +"<td>Ngày tạo</td>"
            +'<td id="ngay_tao">'+ngay_tao+"</td>"
            +"</tr>"
            +"<tr>"
            +"<td>Ngày hết hạn</td>"
            +'<td id="ngay_het_han">'+ngay_het_han+"</td>"
            +"</tr>"
            +"<tr>"
            +"<td>Trạng thái</td>"
            +'<td id="trang_thai">'+status+"</td>"
            +"</tr>"
            +"</tbody>"
            +"</table>";

        $("#div_detail_right").html(htmlRightAfter);


        $("#btn_edit").html("Chỉnh sửa");
        trang_thai = status;
        muc_do_uu_tien = priority;
        if (trang_thai === "Resolved" || trang_thai === "Cancel" || trang_thai === "Closed"){
            $("#btn_edit").attr("disabled", "");
        }
    }

}

//Document ready
$( document ).ready(function() {
    //Render menu = role
    if (tempRole == "3") {
        loadHTML("./templateHTML/teamMenu.html", 'teamMenu');
    }
    if (tempRole == "4") {
        loadHTML("./templateHTML/ITmenu.html", 'itMenu');
    }
    //Preload form
    loadRela();

    //Submit form
    $('#request-form').ajaxForm({
        url: 'http://localhost:3000/tickets',
        // dataType identifies the expected content type of the server response
        dataType:  'json',
        method: 'POST',
        headers: {
            "Authorization": tempToken
        },
        // success identifies the function to invoke when the server response
        // has been received
        success: processSuccess,
        error: processError
    });
});

function processSuccess() {
    console.log('success');
    $("#flash")
        .addClass("alert alert-success text-center")
        .text("Gửi yêu cầu công việc thành công")
        .fadeOut(3000);
    setTimeout(function () {
        $("#createForm").modal("hide");
        document.getElementById("request-form").reset();
    }, 2000);
}

function processError() {
    console.log('error');
    $("#flash")
        .addClass("alert alert-danger text-center")
        .text("Gửi yêu cầu công việc thất bại")
        .fadeOut(3000);
    setTimeout(function () {
        document.getElementById("request-form").reset();
    }, 1000);
}

//Change team event
$('#input-team').on("change", function () {
    var elements = document.getElementById('input-related');
    for(var i = 0; i < elements.length; i++){
        elements[i].selected = false;
    }
    loadRela();
});


//Logout
$('#logout').on("click", function () {
   sessionStorage.token = -1;
   sessionStorage.role = -1;
});

//Routing
router
    .on({
        'my-request/all': function () {
            loadTable("http://localhost:3000/user_all_request", "view");
        },
        'my-requset/new': function () {
            loadTable("http://localhost:3000/user_new_request", "view");
        },
        'my-request/inprogress': function () {
            loadTable("http://localhost:3000/user_inprogress_request", "view");
        },
        'my-request/resolved': function () {
            loadTable("http://localhost:3000/user_resolved_request", "view");
        },
        'my-request/ood': function () {
            loadTable("http://localhost:3000/user_out_request", "view");
        },
        'relation/all': function () {
            loadTable("http://localhost:3000/rela_all_request", "view");
        },
        'relation/new': function () {
            loadTable("http://localhost:3000/rela_new_request", "view");
        },
        'relation/inprogress': function () {
            loadTable("http://localhost:3000/rela_inprogress_request", "view");
        },
        'relation/resolved': function () {
            loadTable("http://localhost:3000/rela_resolved_request", "view");
        },
        'relation/ood': function () {
            loadTable("http://localhost:3000/rela_out_request", "view");
        },
        'my-job/all': function () {
            loadTable("http://localhost:3000/staff_all_request", "view");
        },
        'my-job/new': function () {
            loadTable("http://localhost:3000/staff_new_request", "view");
        },
        'my-job/inprogress': function () {
            loadTable("http://localhost:3000/staff_inprogress_request", "view");
        },
        'my-job/feedback': function () {
            loadTable("http://localhost:3000/staff_feedback_request", "view");
        },
        'my-job/ood': function () {
            loadTable("http://localhost:3000/staff_out_request", "view");
        },
        'team/all': function () {
            loadTable("http://localhost:3000/lead_all_request", "view");
        },
        'team/new': function () {
            loadTable("http://localhost:3000/lead_new_request", "view");
        },
        'team/inprogress': function () {
            loadTable("http://localhost:3000/lead_inprogress_request", "view");
        },
        'team/feedback': function () {
            loadTable("http://localhost:3000/lead_feedback_request", "view");
        },
        'team/ood': function () {
            loadTable("http://localhost:3000/lead_out_request", "view");
        },
        'team/closed': function () {
            loadTable("http://localhost:3000/lead_closed_request", "view");
        },
        'it/all': function () {
            loadTable("http://localhost:3000/tickets_all", "view");
        },
        'it/new': function () {
            loadTable("http://localhost:3000/tickets_new", "view");
        },
        'it/inprogress': function () {
            loadTable("http://localhost:3000/tickets_inprogress", "view");
        },
        'it/feedback': function () {
            loadTable("http://localhost:3000/tickets_feedback", "view");
        },
        'it/ood': function () {
            loadTable("http://localhost:3000/tickets_out", "view");
        },
        'it/closed': function () {
            loadTable("http://localhost:3000/tickets_closed", "view");
        },
        'tickets/:id': function (params) {
            loadContent("http://localhost:3000/tickets/" + params.id, "view")
        },
        'home': function () {
            loadHTML('./templateHTML/home.html', 'view');
        },
        '*': function () {
            loadHTML('./templateHTML/home.html', 'view');
        }
    })
    .resolve();


