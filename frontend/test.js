var tempRole = 3;


$(document).ready(function(){
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
                +"<td>Người thực hiện</td>"
                +'<td><select id="assign_to" class="js-data-example-ajax" style="width: 100%"></select></td>'
              +"</tr>"
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
                    url: 'json-test/relate.json',
                    type: 'POST'
                    // data: {team_id : document.getElementById("input-team").value},
                    // headers: {
                    //     "Authorization": tempToken
                    // }
                }
            });

            var dateSlipt = ngay_het_han.split("/",3)
          var htmlRight;
          htmlRight = "<table class=\"table table-striped\">"
            +"<tbody>"
            +"<tr>"
                +"<td>Ngày tạo</td>"
                +"<td>"+ngay_tao+"</td>"
              +"</tr>"
              +"<tr>"
                +"<td>Ngày hết hạn</td>"
                +"<td><input id=\"ngay_het_han\" type=\"date\" name=\"\" required pattern=\"[0-9]{4}/[0-9]{2}/[0-9]{2}\" value=\""+dateSlipt[0]+"-"+dateSlipt[1]+"-"+dateSlipt[2]+"\">"
              +"</td>"
              +"</tr>"
              +"<tr>"
                +"<td>Trạng thái</td>"
                +"<td>";
                  htmlRight +="<select class=\"form-control\" id=\"trang_thai\">";

                // 1 là user, 2 la staff, 3 la leader, 4 la manager

                switch (tempRole) {
                  case 1:
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

                    case 2:
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

                    case 3:
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

                    case 4:
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
           // ngay_het_han = dateSlipt3[0]+"/"+dateSlipt3[1]+"/"+dateSlipt3[2];

            var name = $('#assign_to').select2('data')[0].text;

          var htmlLeftAfter
          htmlLeftAfter = "<table class=\"table table-striped\">"
            +"<tbody>"
            +"<tr>"
                +"<td>Người yêu cầu</td>"
                +'<td id="nguoi_yeu_cau">'+nguoi_yeu_cau+'</td>'
              +"</tr>"
              +"<tr>"
                +"<td>Người thực hiện</td>"
                +'<td id="nguoi_thuc_hien">'+name+"</td>"
              +"</tr>"
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
        }
    });
});
