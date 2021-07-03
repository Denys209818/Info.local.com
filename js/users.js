var number = 1;
window.onload = function () {
    SetMask();
    var trId = 1;

    //User Code

    var btnAddUser = document.getElementById("btnAddUser");
    
    var tbodyUsers = document.getElementById("tbodyUsers");
    var btnSaveChanges = document.getElementById("btnSaveChanges");


    AddOnclick(btnSaveChanges, tbodyUsers, btnAddUser, number);

    var mainForm = document.getElementById('mainForm');
    mainForm.addEventListener('submit', function (event) {
        if (mainForm.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            mainForm.classList.add('was-validated');
        }
    });


    bootbox.setLocale('uk');
}

function SetMask()
{
    //Mask
    var txtPhone = document.getElementById("txtPhone");
    var phoneMask = {
        mask: "+{38} (000)-000-00-00"
    };

    var inputMask = new IMask(txtPhone, phoneMask);
}

function DeleteRow(e)
{
    var tbodyUsers = document.getElementById('tbodyUsers');

    bootbox.confirm("Ви точно хочете видалити об'єкт?", function (result) {
        if(result) {
            tbodyUsers.removeChild(e.parentElement.parentElement);
        }
    });



}

function UpdateRow(e)
{
    var mainForm = document.getElementById('mainForm');
    var txtName = document.getElementById('txtName');
    var txtLastname = document.getElementById('txtLastname');
    var txtPhone = document.getElementById('txtPhone');
    var txtMail = document.getElementById('txtMail');
    var btnSaveChanges = document.getElementById('btnSaveChanges');
    var cancelChanges = document.getElementById('cancelChanges');
    var closeSpan = document.getElementById('closeSpan');

    mainForm.classList.add('was-validated');

    var tr = e.parentElement.parentElement;

    txtName.value = tr.cells.item(1).innerHTML;
    txtLastname.value = tr.cells.item(2).innerHTML;
    txtPhone.value = tr.cells.item(3).innerHTML;
    txtMail.value = tr.cells.item(4).innerHTML;

    btnSaveChanges.onclick = function (e)
    {
        if(mainForm.checkValidity() === true) {
            ChangeRow(tr);
            btnSaveChanges.onclick = SaveChanges;
            cancelChanges.onclick = null;
            closeSpan.onclick = null;
            mainForm.classList.remove("was-validated");
            e.preventDefault();
        }
    };
    cancelChanges.onclick = function (e)
    {
        btnSaveChanges.onclick = SaveChanges;
        cancelChanges.onclick = null;
        closeSpan.onclick = null;
        mainForm.classList.remove("was-validated");
        txtName.value = txtPhone.value = txtLastname.value = txtMail.value = "";
    };

    closeSpan.onclick = function ()
    {
        btnSaveChanges.onclick = SaveChanges;
        cancelChanges.onclick = null;
        closeSpan.onclick = null;
        mainForm.classList.remove("was-validated");
        txtName.value = txtPhone.value = txtLastname.value = txtMail.value = "";
    }


    $('#registerModal').modal('show');
}

function AddOnclick(btnSaveChanges, tbodyUsers, btnAddUser, number)
{
    btnSaveChanges.onclick = SaveChanges;

    btnAddUser.onclick = function (e) {
        $("#registerModal").modal("show");
        e.preventDefault();
    }
}

function SaveChanges (e) {
    var mainForm = document.getElementById('mainForm');
    var txtName = document.getElementById("txtName");
    var txtPhone = document.getElementById("txtPhone");
    var txtLastname = document.getElementById("txtLastname");
    var txtMail = document.getElementById("txtMail");
    var tbodyUsers = document.getElementById("tbodyUsers");
    if (mainForm.checkValidity() === true)
    {
        $("#registerModal").modal("hide");
        var tr = document.createElement("tr");
        tr.innerHTML = `
                <td scope="row">${number++}</td>
                <td>${txtName.value}</td>
                <td>${txtLastname.value}</td>
                <td>${txtPhone.value}</td>
                <td>${txtMail.value}</td>
                <td><span class="text-danger" onclick="DeleteRow(this)">
                <i class="fa fa-trash fa-2x"></i></span>&nbsp;
                <span class="text-primary" onclick="UpdateRow(this)">
                <i class="fa fa-pencil fa-2x"></i>
                </span>
                </td>
            `;

        tbodyUsers.appendChild(tr);
        txtName.value = txtLastname.value = txtPhone.value = txtMail.value = "";
        mainForm.classList.remove('was-valid0ated');


        e.preventDefault();
    }
}

function ChangeRow(tr)
{
    var mainForm = document.getElementById('mainForm');
    var txtName = document.getElementById("txtName");
    var txtPhone = document.getElementById("txtPhone");
    var txtLastname = document.getElementById("txtLastname");
    var txtMail = document.getElementById("txtMail");

    if(mainForm.checkValidity() === true)
    {
        tr.cells.item(1).innerHTML = txtName.value;
        tr.cells.item(2).innerHTML = txtLastname.value;
        tr.cells.item(3).innerHTML = txtPhone.value;
        tr.cells.item(4).innerHTML = txtMail.value;
        $('#registerModal').modal('hide');
        txtName.value = txtPhone.value = txtLastname.value = txtMail.value = "";
    }
}