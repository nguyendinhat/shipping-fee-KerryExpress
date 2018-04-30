function get_fee_ship1(ma_tinhthanh, kg) {
    var result = 0;
    var j = 0;
    $.get('KerryExpress_van_chuyen_duong_bo.json',function(data){        
        $.each(data, function (index, value) {
            var data_child = this;
            $.each(data_child.city, function (index1, value1) { 
                j++;
                console.log(index1,j);              
                if (ma_tinhthanh==index1) {
                    x = parseInt(index);
                    var base = 0;
                    var upper = kg-20;
                    var upper_fee = 0;
                    var upper_sum = 0;
                    if (kg<=20) {
                        if (kg<=5) {
                            $.each(data_child['fee<20'], function (index2, value2) {
                                if (index2=="<5") {
                                    result = parseInt(value2);
                                }
                            });                            
                        } else {
                            $.each(data_child['fee<20'], function (index2, value2) {
                                if (index2=="5-20") {
                                    result = parseInt(value2);
                                }
                            });
                        }
                    } else {
                        if (kg<=50) {
                            $.each(data_child['fee<20'], function (index2, value2) {
                                if (index2=="5-20") {
                                    base = parseInt(value2);
                                }
                            });
                            $.each(data_child['fee>20'], function (index2, value2) {
                                if (index2=="20-50") {
                                    upper_fee = parseInt(value2);
                                }
                            });
                            for (var i = 0; i < upper; i++) {
                                upper_sum += upper_fee;
                                
                            }
                            result = upper_sum + base;

                        } else if (kg<=200) {
                            $.each(data_child['fee<20'], function (index2, value2) {
                                if (index2=="5-20") {
                                    base = parseInt(value2);
                                }
                            });
                            $.each(data_child['fee>20'], function (index2, value2) {
                                if (index2=="50-200") {
                                    upper_fee = parseInt(value2);
                                }
                            });
                            for (i = 0; i < upper; i++) {
                                upper_sum += upper_fee;
                                
                            }
                            result = upper_sum + base;
                        } else if (kg<=500) {
                            $.each(data_child['fee<20'], function (index2, value2) {
                                if (index2=="5-20") {
                                    base = parseInt(value2);
                                }
                            });
                            $.each(data_child['fee>20'], function (index2, value2) {
                                if (index2=="200-500") {
                                    upper_fee = parseInt(value2);
                                }
                            });
                            for (i = 0; i < upper; i++) {
                                upper_sum += upper_fee;
                                
                            }
                            result = upper_sum + base;
                        } else if (kg<=1000) {
                            $.each(data_child['fee<20'], function (index2, value2) {
                                if (index2=="5-20") {
                                    base = parseInt(value2);
                                }
                            });
                            $.each(data_child['fee>20'], function (index2, value2) {
                                if (index2=="500-1000") {
                                    upper_fee = parseInt(value2);
                                }
                            });
                            for (i = 0; i < upper; i++) {
                                upper_sum += upper_fee;
                                
                            }
                            result = upper_sum + base;
                        } else if (kg<=3000) {
                            $.each(data_child['fee<20'], function (index2, value2) {
                                if (index2=="5-20") {
                                    base = parseInt(value2);
                                }
                            });
                            $.each(data_child['fee>20'], function (index2, value2) {
                                if (index2=="1000-3000") {
                                    upper_fee = parseInt(value2);
                                }
                            });
                            for (i = 0; i < upper; i++) {
                                upper_sum += upper_fee;
                                
                            }
                            result = upper_sum + base;
                        } else if (kg<=5000) {
                            $.each(data_child['fee<20'], function (index2, value2) {
                                if (index2=="5-20") {
                                    base = parseInt(value2);
                                }
                            });
                            $.each(data_child['fee>20'], function (index2, value2) {
                                if (index2=="3000-5000") {
                                    upper_fee = parseInt(value2);
                                }
                            });
                            for (i = 0; i < upper; i++) {
                                upper_sum += upper_fee;
                                
                            }
                            result = upper_sum + base;
                        } else if (kg<=10000) {
                            $.each(data_child['fee<20'], function (index2, value2) {
                                if (index2=="5-20") {
                                    base = parseInt(value2);
                                }
                            });
                            $.each(data_child['fee>20'], function (index2, value2) {
                                if (index2=="5000-10000") {
                                    upper_fee = parseInt(value2);
                                }
                            });
                            for (i = 0; i < upper; i++) {
                                upper_sum += upper_fee;
                                
                            }
                            result = upper_sum + base;
                        } else if (kg>10000) {
                            $.each(data_child['fee<20'], function (index2, value2) {
                                if (index2=="5-20") {
                                    base = parseInt(value2);
                                }
                            });
                            $.each(data_child['fee>20'], function (index2, value2) {
                                if (index2==">10000") {
                                    upper_fee = parseInt(value2);
                                }
                            });
                            for (i = 0; i < upper; i++) {
                                upper_sum += upper_fee;
                                
                            }
                            result = upper_sum + base;
                        }
                    }  
                    $("#fee").text(result);   
                    
                }
            });
        });
    });
}
$(document).ready(function(){    
    $.get('tree.json',function(data){  
        $.each(data, function (index, value) {  
            $("#tinhthanh").append('<option rel="' + index + '" value="'+value.code+'">'+value.name_with_type+'</option>');
        });
    });
    var tinhthanh;
    $('#tinhthanh').change(function(){
        if ($(this).find(':selected').attr("rel")==-1){
            tinhthanh = null;
        } else {                
            tinhthanh = $(this).find(':selected').attr("rel");
        }
    });
    $('#kg1').on('blur', function() {
        get_fee_ship1(tinhthanh, parseFloat($(this).val()));
    });
    $("#btnSubmit").click(function(){
        var kg = (parseFloat($("#d").val())*parseFloat($("#r").val())*parseFloat($("#c").val()))*3/10000;
        console.log(kg);
        $("#kg2").text(kg);
        get_fee_ship1(tinhthanh, kg);
    });
});