function genqrcode(){
    var table = document.getElementById('mytable');
    sum=0
    jsonstring="["

    for (var r = 1, n = table.rows.length; r < n; r++) {
//        for (var c = 1, m = table.rows[r].cells.length; c < m; c++) {
            thisid = "course_quant"+r
            //console.log(thisid)
            quantity = Number(document.getElementById(thisid).value)
            price = Number(table.rows[r].cells[2].innerHTML)
            name = table.rows[r].cells[1].innerHTML
            sum += quantity * price

            if (quantity != 0) {
            	if ( jsonstring != "[" ){
            		jsonstring += ","
            	}
	            jsonstring += '{"name":"' + name +'","quantity":'+quantity+ ',"price":'+price +'}'
	            //alert(jsonstring)
			}

            
//        }
    }
    jsonstring+=']'
    //jsonstring = encodeURIComponent(jsonstring)
    //alert(jsonstring)
    // if(sum == 0) {
    // 	sum = "nothing"
    // }
    // qr = '<img src = "https://api.qrserver.com/v1/create-qr-code/?data='
    // qr += jsonstring
    // qr += '&size=200x200" height = 200 width = 200>'
    prompt_array = JSON.parse(jsonstring);
    prompt = "You had "
    for (x in prompt_array) {
    	prompt += prompt_array[x]["quantity"] + '个 ' + prompt_array[x]["name"] + ';'
    }
    prompt += "\nthe total is: " + sum + ". Please scan the QR code below to pay"
    document.getElementById("confirmation").innerHTML = prompt
    //query = 'https://venmo.com/?txn=pay&recipients=ray-xiao&amount='+sum+'&note=nice food!! We had '+prompt_array["quantity"] + ' awesome ' + prompt_array["name"] +'!!Yummy!!&audience=private'

    query = 'https://venmo.com/?txn=pay&recipients=ray-xiao&amount='+sum+'&note=YummyAtRaysSteakHouse&audience=private'
    //    console.log(query)
    query = encodeURIComponent(query)
    qr = '<img src = "https://api.qrserver.com/v1/create-qr-code/?data='
    qr += query
    qr += '&size=200x200" height = 200 width = 200>'
    document.getElementById("qrcode").innerHTML = qr
    //alert(sum)
}