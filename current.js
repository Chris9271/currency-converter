fetch('http://api.currencylayer.com/live?access_key=3f3904510a8696ed4f61e2994f0b9311')
    .then(
        ((response) => {
            console.log(response);
            response.json().then((data) => {
                let info = data.quotes;
                let array = new Array();
                console.log(info);
                Object.entries(info).forEach(([key,value]) => {
                    array.push([`${key}`,value]);
                });
                console.log(array);
                document.getElementById("amount-input").addEventListener("keyup", myFunction);
                document.getElementById("input1").addEventListener("change", myFunction);
                document.getElementById("input2").addEventListener("change", myFunction);
                 
                function myFunction() {
                    
                    let amount = Number(document.getElementById("amount-input").value);
                    let input1 = document.getElementById("input1").value;
                    let input2 = document.getElementById("input2").value;
                    
                    for (i = 0; i < array.length; i++) {
                        for (j = 0; j < array.length; j++) {
                            if ((input1 == array[i][0]) && (input2 == array[j][0])) {
                                let beforerate = array[i][1];
                                let afterrate = array[j][1];
                                $("#rate").text(parseFloat(afterrate / beforerate).toFixed(3));
                                let final = (afterrate / beforerate) * amount;
                                $("#res-input").val(parseFloat(final).toFixed(2));
                                $(document).ready(() => {
                                    $("#change-input").click(() => {
                                        $("#input1").val(input2);
                                        $("#input2").val(input1);
                                        $("#rate").text(parseFloat(beforerate / afterrate).toFixed(3));
                                        let final = (beforerate / afterrate) * amount;
                                        $("#res-input").val(parseFloat(final).toFixed(2));
                                    })
                                })
                            }
                        }
                    }
                }
            })
        })
    )

    .catch((error) => {
        console.log(error);
    })

    