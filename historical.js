$(document).ready(() => {
    $("#check").click(() => {
        let toDate = document.getElementById("history-date").value;

        fetch(`http://api.currencylayer.com/historical?access_key=3f3904510a8696ed4f61e2994f0b9311&date=${toDate}`)
            .then(
                (response) => {
                    console.log(response);
                    response.json().then((history) => {
                        let info = history.quotes;
                        let array = new Array();
                        Object.entries(info).forEach(([key, value]) => {
                            array.push([`${key}`, value]);

                            let input1 = document.getElementById("input1").value;
                            let input2 = document.getElementById("input2").value;
                            for (i = 0; i < array.length; i++) {
                                for (j = 0; j < array.length; j++) {
                                    if ((input1 == array[i][0]) && (input2 == array[j][0])) {
                                        let beforerate = array[i][1];
                                        let afterrate = array[j][1];
                                        $("#show-history").text(parseFloat(afterrate / beforerate).toFixed(3));
                                        $(document).ready(() => {
                                            $("#change-input").click(() => {
                                                $("#show-history").text(parseFloat(beforerate / afterrate).toFixed(4));
                                            })
                                        })
                                    }
                                }
                            }
                        });
                    })
                })

            .catch((error) => {
                console.log(error);
            })
    })
})