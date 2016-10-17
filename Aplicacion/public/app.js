$(document).ready(function() {

    $("#btnLogout").hide();
    $(".authUserData").hide();
    $("#btnSend").click(sendData);

    var rootRef = new Firebase('https://roster-playerss.firebaseio.com/');

    var getData = function() {
        rootRef.on("value", function(snapshot) {
            //console.log(snapshot.val());

            var data = snapshot.val();

            $("#playersTable tbody").empty();

            var row = "";

            for (player in snapshot.val()) {
                //console.log(player, ',', data[player]);

                row += "<tr>" +
                    "<td class=\"playerName\">" + player + "</td>" +
                    "<td class=\"mail\">" + data[player].mail + "</td>" +
                    "<td class=\"number\">" + data[player].number + "</td>" +
                    "<td class=\"position\">" + data[player].position + "</td>" +
                    "<td> <div class=\"btnEdit btn btn-warning glyphicon glyphicon-edit\"></div> </td>" +
                    "<td> <div class=\"btnDelete btn btn-danger glyphicon glyphicon-remove\"></div> </td>" +
                    "</tr>"
            }

            // console.log(row)

            $("#playersTable tbody").append(row);
            row = "";

            //*** Delete record from firebase
            $(".btnDelete").click(function() {
                console.log('clicked')
                var selectedPlayer = $(this).closest("tr")
                    .find(".playerName")
                    .text();

                // Si dejas rootRef.remove() son parametros se borra toda la base de datos ¡CUIDADO!
                console.log(selectedPlayer)
                rootRef.child(selectedPlayer).remove();

            })

            //*** Edit record from firebase
            $(".btnEdit").click(function() {
                console.log('clicked')
                var selectedPlayer = $(this).closest("tr")
                    .find(".playerName")
                    .text();

                //console.log(selectedPlayer)
                //Asign data to form fields
                $("#fullName").val($(this).closest("tr").find(".playerName").text());
                $("#mail").val($(this).closest("tr").find(".mail").text());
                $("#number").val($(this).closest("tr").find(".number").text());
                $("#position").val($(this).closest("tr").find(".position").text());
                $("#btnSend").text("Actualizar").removeClass("btn-primary").addClass("btn-warning").unbind("click").click(function() {

                    rootRef.child(selectedPlayer).update({
                        mail: $("#mail").val(),
                        number: $("#number").val(),
                        position: $("#position option:selected").text()
                    }, function() {
                        $("#fullName").val("");
                        $("#mail").val("");
                        $("#number").val("");
                        $("#position").val("");
                        $("#btnSend").text("Enviar").removeClass("btn-warning").addClass("btn-primary").unbind("click").click(sendData);
                    })

                });
            })



        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }



    $("#btnLogin").click(function() {
        $("#btnLogin").toggle();
        $("#btnLogout").toggle();
        login();
    })

    $("#btnLogout").click(function() {
        $("#btnLogin").toggle();
        $("#btnLogout").toggle();
        clearDataLabels();

        rootRef.unauth();
        $("#playersTable tbody").empty();
        $('#myModalNoSession').modal('show');
    })


    var setDataLabels = function(authData) {

        console.log(authData)

        $("#authUser").text(authData[authData.provider].displayName + " ( "+ authData.uid +" )");
        $(".usrPhoto").css('background-image', 'url(' + authData[authData.provider].profileImageURL +')');
        $("#authProvider").text(authData.provider);
        $(".authUserData").toggle();
    }

    var clearDataLabels = function(authData) {
        $("#authUser").text("");
        $(".usrPhoto").css('background-image', 'none');
        $("#authProvider").text("");
        $(".authUserData").toggle();
    }



    //Ask for session and auth data
    var authData = rootRef.getAuth();
    if (authData) {
        console.log("Usuario " + authData.uid + " logueado con " + authData.provider);
        $("#btnLogin").toggle();
        $("#btnLogout").toggle();
        getData();
        setDataLabels(authData);
    } else {
        console.log("El usuario ha cerrado sesión");
         $('#myModalNoSession').modal('show');
    }

    //Login method
    var login = function() {
        rootRef.authWithOAuthPopup("github", function(error, authData) {
            if (error) {
                console.log("EL login falló :( ", error);
            } else {
                console.log("Autenticado con los datos:", authData);
                getData();
                setDataLabels(authData);
            }
        })
    }




    //*** Sending data to firebase
    function sendData() {
        var fullName = $("#fullName").val();

        var dataPlayer = {
            mail: $("#mail").val(),
            number: $("#number").val(),
            position: $("#position option:selected").text()
        }

        var onComplete = function(error) {
            if (error) {
                console.log(error, 'La sincronización falló :(');
            } else {
                console.log(error, 'La sincronización ha sido exitosa');
            }
        }

        rootRef.once('value', function(snapshot) {
            if (snapshot.hasChild(fullName)) {
                $('#myModal').modal('show');
            } else {
                rootRef.child(fullName).set(dataPlayer, onComplete);
            }
        })
    }




});
