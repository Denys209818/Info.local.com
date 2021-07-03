window.onload = function () {
    SetMask();

    var btnSend = document.getElementById("btnSend");
    var txtName = document.getElementById("txtName");
    var txtPhone = document.getElementById("txtPhone");
    var txtArea = document.getElementById("txtArea");
    var btnSaveChanges = document.getElementById("btnSaveChanges");
    var form = document.getElementById("mainForm");
    var agreeCheck = document.getElementById("agreeCheck");
    
    form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
        }
    });

    btnSend.onclick = function (e)
    {
        if (form.checkValidity() === true) {
            $("#infoModal").modal("show");
            document.getElementById("spanName").innerHTML = txtName.value;
            document.getElementById("spanPhone").innerHTML = txtPhone.value;
            document.getElementById("paragrafInfo").innerHTML = txtArea.value;
            e.preventDefault();
        }
    }

    btnSaveChanges.onclick = function (e) {
        $("#infoModal").modal("hide");
        $("#modalSuccess").modal("show");
        form.classList.remove("was-validated");
        txtName.value = txtPhone.value = txtArea.value = "";
        agreeCheck.checked = false;
        e.preventDefault();
    }
}

function SetMask()
{
    var txtPhone = document.getElementById("txtPhone");
    var maskSettings = {
        mask: "+{38} (000)-000-00-00"
    };

    var phoneMask = new IMask(txtPhone, maskSettings);
    //phoneMask.on("accept", function () { alert('Hello'); });
    //phoneMask.updateOptions({mask: Number,
   //     min:10000,
    //    max:20000
    //});

    //phoneMask.typedValue = 100;
    //console.log(phoneMask.value);
    //console.log(phoneMask.unmaskedValue);
    //phoneMask.unmaskedValue = "+380680162723";
    //console.log(phoneMask.value);
    //console.log(phoneMask.unmaskedValue);
}